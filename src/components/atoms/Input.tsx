import * as React from "react";

import cn from "classnames";
import { Label } from "@/components/atoms/Label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, value, suffix, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col">
        {label && <Label className="pb-2 text-xs font-semibold">{label}</Label>}
        <div className="relative">
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-gray-100 focus:bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              `${suffix ? "pr-8" : ""}`,
              className
            )}
            ref={ref}
            value={value}
            {...props}
          />
          {suffix && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm font-medium text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
