
import React from 'react';
import { cn } from '@/lib/utils';

type SectionDividerProps = {
  variant?: 'magenta' | 'yellow' | 'mixed';
  className?: string;
};

const SectionDivider = ({ variant = 'mixed', className }: SectionDividerProps) => {
  return (
    <div className={cn('w-full h-24 relative overflow-hidden', className)}>
      {variant === 'magenta' && (
        <div className="absolute inset-0 flex justify-center">
          <div className="w-full max-w-md h-24 bg-podcast-magenta/20 blur-3xl rounded-full"></div>
        </div>
      )}
      
      {variant === 'yellow' && (
        <div className="absolute inset-0 flex justify-center">
          <div className="w-full max-w-md h-24 bg-podcast-yellow/20 blur-3xl rounded-full"></div>
        </div>
      )}
      
      {variant === 'mixed' && (
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-20 bg-podcast-magenta/20 blur-3xl rounded-full"></div>
          <div className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-64 h-20 bg-podcast-yellow/20 blur-3xl rounded-full"></div>
        </div>
      )}
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default SectionDivider;
