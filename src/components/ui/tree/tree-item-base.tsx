import React, {forwardRef, HTMLAttributes} from 'react';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {ChevronRight, GripVertical, X} from 'lucide-react';

export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  value: string;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      style,
      value,
      wrapperRef,
      ...props
    },
    ref
  ) => {
    return (
      <li
        className={cn(
          'list-none box-border mb-[-1px]',
          clone && 'inline-block pointer-events-none p-0 pl-2.5 pt-1.5',
          ghost && indicator && 'opacity-100 relative z-10 mb-[-1px]',
          ghost && !indicator && 'opacity-50'
        )}
        style={{
          paddingLeft: clone ? undefined : `${indentationWidth * depth}px`,
        }}
        ref={wrapperRef}
      >
        <div
          className={cn(
            'relative flex items-center py-2.5 px-2.5 bg-white border border-gray-300 text-gray-800 box-border',
            clone && 'pr-6 rounded border-none shadow-lg',
            ghost && indicator && 'relative p-0 h-2 border-blue-500 bg-blue-400 before:absolute before:left-[-8px] before:top-[-4px] before:block before:w-3 before:h-3 before:rounded-full before:border before:border-blue-500 before:bg-white',
            ghost && indicator && '[&>*]:opacity-0 [&>*]:h-0',
            ghost && !indicator && '[&>*]:shadow-none [&>*]:bg-transparent',
            disableInteraction && 'pointer-events-none',
            disableSelection && 'select-none'
          )}
          style={style}
          ref={ref}
          {...props}
        >
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-6 w-6 p-0 mr-1',
              !onCollapse && 'invisible'
            )}
            onClick={onCollapse}
            {...handleProps}
          >
            <GripVertical className="h-4 w-4" />
          </Button>
          {onCollapse && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 mr-1"
              onClick={onCollapse}
            >
              <ChevronRight
                className={cn(
                  'h-4 w-4 transition-transform',
                  collapsed ? '' : 'rotate-90'
                )}
              />
            </Button>
          )}
          <span className="flex-grow pl-2 whitespace-nowrap text-ellipsis overflow-hidden">
            {value}
          </span>
          {!clone && onRemove && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 ml-1"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {clone && childCount && childCount > 1 ? (
            <span className="absolute top-[-10px] right-[-10px] flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-xs font-semibold text-white">
              {childCount}
            </span>
          ) : null}
        </div>
      </li>
    );
  }
);

TreeItem.displayName = 'TreeItem';