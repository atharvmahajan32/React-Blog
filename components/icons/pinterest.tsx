interface IconProps {
  size?: number
  className?: string
}

export function PinterestIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6c-2.5 0-4.5 2-4.5 4.5 0 1.5.8 2.8 2 3.5-.1.5-.3 1.5-.3 1.5l-.1.5h.5c.5-.3 1-.6 1.4-1 .3.1.7.1 1 .1 2.5 0 4.5-2 4.5-4.5S14.5 6 12 6z" />
    </svg>
  )
}
