import { CloudOff } from 'lucide-react'

interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200"
    >
      <CloudOff size={18} className="shrink-0" />
      <span>{message}</span>
    </div>
  )
}

export default ErrorMessage
