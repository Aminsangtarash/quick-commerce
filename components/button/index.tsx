import { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
} & ComponentPropsWithoutRef<"button">;

function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const baseStyles = "cursor-pointer font-medium px-4 py-2 rounded-md transition-colors duration-200";
  
  const variantStyles = {
    primary: "bg-[var(--primary)] text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    secondary: "bg-[var(--secondary)] text-white hover:bg-secondary-300 focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2",
    tertiary: "bg-[var(--tertiary)] text-white border border-tertiary-600 hover:bg-tertiary-50 focus:ring-2 focus:ring-tertiary-500 focus:ring-offset-2"
  };

  const classes = twMerge(baseStyles, variantStyles[variant], className);

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;