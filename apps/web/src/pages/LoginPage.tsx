import { SignIn } from '@clerk/clerk-react'

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <SignIn routing="path" path="/login" signUpUrl="/register" />
    </div>
  )
}
