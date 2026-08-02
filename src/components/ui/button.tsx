import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80",

        outline:
          "border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",

        ghost:
          "hover:bg-muted hover:text-foreground",

        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20",

        link:
          "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default:
          "h-9 gap-1.5 px-3",

        xs:
          "h-6 px-2 text-xs",

        sm:
          "h-8 px-3",

        lg:
          "h-10 px-4",

        icon:
          "size-9",

        "icon-xs":
          "size-6",

        "icon-sm":
          "size-8",

        "icon-lg":
          "size-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<ButtonPrimitive.Props, "render">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

function Button({
  className,
  variant,
  size,
  children,
  disabled,
  loading = false,
  loadingText,
  asChild = false,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
          })
        )}
      >
        {children}
      </Slot>
    );
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        })
      )}
      {...props}
    >
      {loading && (
        <Loader2 className="size-4 animate-spin" />
      )}

      {loading ? loadingText || children : children}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
