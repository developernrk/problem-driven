'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Eye, Lock, LogIn } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

interface SearchSuggestion {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
}

interface SearchDropdownProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  userData?: {
    isPremium: boolean;
    viewsRemaining: number;
  } | null;
  onShowSubscriptionPrompt?: () => void;
}

export default function SearchDropdown({ 
  onSearch, 
  placeholder = "Search Idea",
  className = "",
  userData,
  onShowSubscriptionPrompt
}: SearchDropdownProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length === 0) {
        setSuggestions([]);
        setIsOpen(false);
        
return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/ideas/suggestions?q=${encodeURIComponent(searchQuery)}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.suggestions || []);
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    
return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = async (suggestion: SearchSuggestion) => {
    // Check if user is signed in
    if (!isSignedIn) {
      // Redirect to sign-in for non-authenticated users
      window.location.href = '/sign-in';
      
return;
    }

    // Check if user has reached free limit
    if (!userData?.isPremium && (userData?.viewsRemaining || 0) <= 0) {
      if (onShowSubscriptionPrompt) {
        onShowSubscriptionPrompt();
      }
      setIsOpen(false);
      
return;
    }

    // Navigate to idea detail page
    router.push(`/idea/${suggestion._id}`);
    setIsOpen(false);
    setSearchQuery('');

    // Record the view (similar to handleIdeaView in HomePage)
    try {
      await fetch('/api/user/view-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaId: suggestion._id })
      });
    } catch (error) {
      console.error('Error recording view:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="w-full relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          className="pl-10 pr-4 w-full"
        />
      </form>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full mx-auto"></div>
              <span className="ml-2 text-sm">Searching...</span>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="py-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion._id}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0 ${
                    index === selectedIndex ? 'bg-gray-50 dark:bg-gray-700' : ''
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {suggestion.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {suggestion.shortDescription}
                      </p>
                      <div className="flex items-center mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {suggestion.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      {!isSignedIn ? (
                        <LogIn className="h-4 w-4 text-blue-500" title="Sign in required" />
                      ) : !userData?.isPremium && (userData?.viewsRemaining || 0) <= 0 ? (
                        <Lock className="h-4 w-4 text-orange-500" title="Premium required" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery.trim() && !loading ? (
            <div className="p-4 text-center text-gray-500">
              <p className="text-sm">No ideas found for "{searchQuery}"</p>
              <button
                onClick={handleSearch}
                className="text-blue-600 hover:text-blue-800 text-sm mt-1"
              >
                Search anyway
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}