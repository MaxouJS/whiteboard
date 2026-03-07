import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Loader2 } from './icons'
import { cn } from './cn'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  fullWidth?: boolean
  iconOnly?: boolean
  loading?: boolean
  loadingText?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: '',
  secondary: 'secondary-btn',
  danger: 'danger-btn',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    fullWidth = false,
    iconOnly = false,
    loading = false,
    disabled,
    className,
    children,
    loadingText,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(variantClasses[variant], fullWidth && 'full-width-btn', iconOnly && 'icon-only-btn', className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 size={14} className="icon-spin" />
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </button>
  )
})
