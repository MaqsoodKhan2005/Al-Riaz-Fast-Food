import React from 'react';

export const MenuItemSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] w-full bg-slate-200 dark:bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        {/* Badge Skeleton */}
        <div className="absolute top-3 left-3 w-16 h-5 rounded-md bg-slate-300 dark:bg-slate-700" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2.5">
          {/* Category & Time */}
          <div className="flex items-center gap-2">
            <div className="w-14 h-3.5 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="w-12 h-3.5 rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Title */}
          <div className="w-3/4 h-5 rounded-md bg-slate-200 dark:bg-slate-800" />

          {/* Description Lines */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-3 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="w-5/6 h-3 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Portion Selector Skeleton */}
        <div className="space-y-1 pt-1">
          <div className="w-20 h-2.5 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="grid grid-cols-3 gap-1">
            <div className="h-6 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-6 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-6 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Price & Action Skeleton */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-8 h-2 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="w-16 h-5 rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="w-28 h-8 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
};

export const MenuGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <MenuItemSkeleton key={idx} />
      ))}
    </div>
  );
};
