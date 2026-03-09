import { createElement, type ElementType, type HTMLAttributes } from 'react'
import { cn } from './cn'

type SkeletonRadius = 'sm' | 'md' | 'pill'

const radiusClasses: Record<SkeletonRadius, string> = {
  sm: '',
  md: 'skeleton--md',
  pill: 'skeleton--pill',
}

interface SkeletonProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  radius?: SkeletonRadius
}

export function Skeleton({ as = 'div', radius = 'sm', className, ...props }: SkeletonProps) {
  return createElement(as, {
    className: cn('skeleton', radiusClasses[radius], className),
    'aria-hidden': true,
    ...props,
  })
}

export function InputSkeleton(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return <Skeleton className={cn('skeleton-input', className)} {...rest} />
}

export function ButtonSkeleton(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return <Skeleton className={cn('skeleton-btn', className)} {...rest} />
}

export function IconButtonSkeleton(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return <Skeleton className={cn('skeleton-icon-btn', className)} {...rest} />
}

export function SelectSkeleton(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return <Skeleton className={cn('skeleton-select', className)} {...rest} />
}

export function TextareaSkeleton(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return <Skeleton className={cn('skeleton-textarea', className)} {...rest} />
}

export function ThumbSkeleton(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return <Skeleton className={cn('skeleton-thumb', className)} {...rest} />
}

export function ChipSkeleton(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return <Skeleton radius="pill" className={cn('skeleton-chip', className)} {...rest} />
}

export function TitleSkeleton(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return <Skeleton className={cn('skeleton-title', className)} {...rest} />
}

interface LineSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  short?: boolean
}

export function LineSkeleton({ short = false, className, ...props }: LineSkeletonProps) {
  return <Skeleton className={cn('skeleton-line', short && 'skeleton-line--short', className)} {...props} />
}

export function AvatarSkeleton(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return <Skeleton radius="pill" className={cn('skeleton-avatar', className)} {...rest} />
}

export function CanvasSkeleton(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return <Skeleton className={cn('skeleton-canvas', className)} {...rest} />
}
