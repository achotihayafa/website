
import React from 'react';
import { cn } from '@/lib/utils';

type SectionDividerProps = {
  variant?: 'magenta' | 'yellow' | 'mixed';
  className?: string;
};

const SectionDivider = ({ variant = 'mixed', className }: SectionDividerProps) => {
  return (
    <div className={cn('w-full h-32 relative overflow-hidden', className)}>
      {variant === 'magenta' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 bg-podcast-magenta/10 rounded-full blur-3xl absolute -left-1/4"></div>
          <div className="w-96 h-96 bg-podcast-magenta/10 rounded-full blur-3xl absolute -right-1/4"></div>
        </div>
      )}
      
      {variant === 'yellow' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 bg-podcast-yellow/10 rounded-full blur-3xl absolute -left-1/4"></div>
          <div className="w-96 h-96 bg-podcast-yellow/10 rounded-full blur-3xl absolute -right-1/4"></div>
        </div>
      )}
      
      {variant === 'mixed' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 bg-podcast-magenta/10 rounded-full blur-3xl absolute -left-1/4"></div>
          <div className="w-96 h-96 bg-podcast-yellow/10 rounded-full blur-3xl absolute -right-1/4"></div>
        </div>
      )}
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-[1px] bg-white/20"></div>
      </div>
    </div>
  );
};

export default SectionDivider;
