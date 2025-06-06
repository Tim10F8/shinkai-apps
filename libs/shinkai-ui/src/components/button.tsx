import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { cn } from '../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 border border-transparent text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-gray-50',
  {
    variants: {
      variant: {
        default:
          'bg-brand hover:bg-brand-500 text-white disabled:bg-gray-200 disabled:text-gray-100',
        destructive:
          'bg-red-500 text-gray-50 shadow-sm hover:bg-red-500/90 disabled:bg-gray-200 disabled:text-gray-100',
        outline:
          'hover:bg-official-gray-850 border border-gray-200 bg-transparent text-white shadow-sm hover:text-gray-50',
        secondary: 'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-100/80',
        tertiary:
          'hover:bg-official-gray-800/60 bg-transparent hover:text-white',
        ghost: 'bg-gray-400 hover:bg-gray-400/60',
        link: 'text-white underline-offset-4 hover:underline',
        gradient:
          'bg-brand-gradient border-brand border-[1px] text-white transition-colors hover:bg-[#201F1F]',
      },
      size: {
        default: 'h-[50px] px-8 text-sm',
        xs: 'h-[34px] gap-1.5 px-3 text-xs',
        sm: 'h-[36px] gap-1.5 px-3 text-xs',
        md: 'h-[40px] gap-1.5 px-3 text-xs',
        lg: 'h-[48px] gap-2 px-2 text-sm',
        icon: 'h-9 w-9',
        auto: 'h-auto p-4',
      },
      rounded: {
        full: 'rounded-full',
        lg: 'rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'full',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      asChild = false,
      isLoading = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <Loader2
            className={cn('h-4 w-4 animate-spin', size !== 'icon' && 'mr-2')}
          />
        ) : null}
        {isLoading && size === 'icon' ? null : props.children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
