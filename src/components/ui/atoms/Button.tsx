import React, { forwardRef, ReactNode } from "react";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

type ButtonTheme = "primary" | "secondary" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

const buttonStyles = tv({
  base: "inline-flex items-center cursor-pointer justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  variants: {
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-5 text-base",
    },
    theme: {
      primary:
        "bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-700 hover:to-brand-600 transition-all duration-200 shadow-md active:bg-[--color-brand-800] focus-visible:ring-brand-600",
      secondary:
        "bg-white text-brand-600 border border-[#e5e7eb] hover:bg-[#f8f7fc] active:bg-[#f2eff9] focus-visible:ring-brand-600",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-600",
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
  },
  defaultVariants: {
    size: "sm",
    theme: "primary",
    fullWidth: false,
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  theme?: ButtonTheme;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  text: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      text,
      leftIcon,
      rightIcon,
      size = "md",
      theme = "primary",
      fullWidth = false,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const classes = twMerge(
      buttonStyles({ size, theme, fullWidth }),
      className
    );

    return (
      <button ref={ref} className={classes} type={type} {...rest}>
        {leftIcon ? (
          <span className="inline-flex items-center">{leftIcon}</span>
        ) : null}
        {text}
        {rightIcon ? (
          <span className="inline-flex items-center">{rightIcon}</span>
        ) : null}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
