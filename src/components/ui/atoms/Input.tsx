"use client";

import React, { forwardRef, ReactNode } from "react";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

type InputSize = "sm" | "md" | "lg";

const inputStyles = tv({
  base: "w-full rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  variants: {
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-3 text-base",
      lg: "h-12 px-4 text-base",
    },
    invalid: {
      true: "border-red-500 focus-visible:ring-red-500",
      false: "border-gray-300 focus-visible:border-brand-500",
    },
  },
  defaultVariants: {
    size: "md",
    invalid: false,
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fieldSize?: InputSize;
  invalid?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      leftIcon,
      rightIcon,
      fieldSize = "md",
      invalid,
      label,
      error,
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id ?? rest.name ?? undefined;
    const inputClass = twMerge(
      inputStyles({ size: fieldSize, invalid }),
      className
    );
    const wrapperClass = "w-full flex flex-col gap-1";
    const labelClass = "text-sm font-medium text-gray-800";
    const errorClass = "text-xs text-red-600";

    return (
      <div className={wrapperClass}>
        {label ? (
          <label htmlFor={inputId} className={labelClass}>
            {label}
          </label>
        ) : null}
        <div className="relative">
          {leftIcon ? (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 inline-flex items-center">
              {leftIcon}
            </span>
          ) : null}
          <input
            id={inputId}
            ref={ref}
            className={twMerge(
              inputClass,
              leftIcon ? "pl-10" : undefined,
              rightIcon ? "pr-10" : undefined
            )}
            {...rest}
          />
          {rightIcon ? (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 inline-flex items-center">
              {rightIcon}
            </span>
          ) : null}
        </div>
        {error ? <span className={errorClass}>{error}</span> : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
