import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from './cn'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn(className)} {...props} />
})
