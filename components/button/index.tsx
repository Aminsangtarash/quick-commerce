import { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
} & ComponentPropsWithoutRef<"button">

function Button({className, children, ...props}: ButtonProps) {
    return ( 
        <button className={"cursor-pointer color-primary "+ className} {...props}>
            {children}
        </button>
     );
}

export default Button;