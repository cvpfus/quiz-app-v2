import { cn } from "@/lib/utils.ts";
import React from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  variant?: ButtonVariant;
}

const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#FFC700]",
  secondary: "bg-[#FF8343] text-white",
};

const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 hover:opacity-80 rounded-xl font-bold",
        buttonVariantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
