export function DashboardPage() {
  return (
    <div className="p-6 sm:p-8">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Welcome to ShowCore!
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Here's what's happening with your account.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Active Bookings</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">3</p>
          </div>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">This Month's Earnings</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">$2,450</p>
          </div>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">XP Points</p>
            <p className="text-3xl font-bold text-amber-500">1,250</p>
          </div>
        </div>
      </div>
    </div>
  )
}
