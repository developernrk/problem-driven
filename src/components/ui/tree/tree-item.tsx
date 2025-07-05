import React, { forwardRef, HTMLAttributes } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { FlattenedItem } from "@/types/tree";
import { ChevronRight, File, Folder } from "lucide-react";

interface TreeItemProps extends HTMLAttributes<HTMLDivElement> {
  item: FlattenedItem;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  onCollapse?: (id: string) => void;
}

const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(
  ({ item, isExpanded, onToggle, onCollapse, className, ...props }, ref) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
      isOver,
      over,
    } = useSortable({
      id: item.id,
      data: {
        type: "item",
        item,
      },
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggle(item.id);
    };

    const isFolder = item.type === "folder";

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "flex items-center py-1 px-2 select-none rounded-md",
          isDragging ? "opacity-50 bg-accent" : "hover:bg-accent/50",
          isOver && item.type === "folder" ? "bg-blue-100 dark:bg-blue-900/30 ring-2 ring-blue-400 dark:ring-blue-600" : "",
          className
        )}
        {...attributes}
        {...listeners}
        {...props}
      >
        <div
          className="flex items-center gap-2 w-full"
          style={{ paddingLeft: item.depth * 16 }}
        >
          {isFolder && (
            <button
              onClick={handleToggle}
              className="h-4 w-4 flex items-center justify-center rounded-sm hover:bg-accent"
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  isExpanded ? "transform rotate-90" : ""
                )}
              />
            </button>
          )}
          {isFolder ? (
            <Folder className={cn(
              "h-4 w-4",
              isExpanded ? "text-blue-600" : "text-blue-500"
            )} />
          ) : (
            <File className="h-4 w-4 text-gray-500" />
          )}
          <span className="text-sm truncate">{item.name}</span>
        </div>
      </div>
    );
  }
);

TreeItem.displayName = "TreeItem";

export default TreeItem;