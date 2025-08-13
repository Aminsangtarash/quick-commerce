import { ComponentPropsWithoutRef, MouseEvent, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "error";
  className?: string;
  permission?: boolean;
} & ComponentPropsWithoutRef<"button">;

function Button({ variant = "primary", className = "", children, permission, disabled = false, onClick = () => { }, ...props }: ButtonProps) {
  const [openPermission, setOpenPermission] = useState<boolean>(false)
  const baseStyles = "cursor-pointer font-medium px-4 py-2 rounded-md transition-colors duration-200";

  const variantStyles = {
    primary: "bg-[var(--primary)] text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-nowrap",
    secondary: "bg-[var(--secondary)] text-white hover:bg-secondary-300 focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 text-nowrap",
    tertiary: "bg-[var(--tertiary)] text-white border border-tertiary-600 hover:bg-tertiary-50 focus:ring-2 focus:ring-tertiary-500 focus:ring-offset-2 text-nowrap",
    error: "bg-[var(--error)] text-white border border-tertiary-600 hover:bg-tertiary-50 focus:ring-2 focus:ring-tertiary-500 focus:ring-offset-2 text-nowrap",
  };

  const classes = twMerge(baseStyles, variantStyles[variant], className, "relative flex justify-center w-full", (disabled ? "bg-[#cccccc] cursor-not-allowed" : ""));

  const handleOpenPermission = () => {
    setOpenPermission(prev => !prev)
  }

  const handleClickPermission = (event: MouseEvent<HTMLButtonElement>) => {
    onClick(event);
    setOpenPermission(false)
  }

  return (
    <div className="w-full relative flex justify-center">
      {
        permission && openPermission &&
        <div className="absolute bottom-0 translate-y-full w-[120%] shadow-lg bg-white rounded-lg p-3 flex flex-wrap justify-center gap-2">
          <span>
            آیا مطمئن هستید؟
          </span>
          <div className="flex items-center">
            <Button variant="tertiary" onClick={handleClickPermission}>بله</Button>
            <Button variant="error" onClick={handleOpenPermission}>خیر</Button>
          </div>
        </div>
      }
      <button className={classes} onClick={permission ? handleOpenPermission : onClick} disabled={disabled} {...props}>
        {children}
      </button>
    </div>
  );
}

export default Button;