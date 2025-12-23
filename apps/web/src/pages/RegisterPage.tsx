import { SignUp } from '@clerk/clerk-react'

export function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <SignUp routing="path" path="/register" signInUrl="/login" />
    </div>
  )
}
