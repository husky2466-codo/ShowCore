import welcomeIllustration from '@/assets/illustrations/welcome.png';

export interface WelcomeBannerProps {
  userName: string;
  avatarUrl?: string;
  progressPercent: number;
  isComplete: boolean;
}

export function WelcomeBanner({
  userName,
  avatarUrl,
  progressPercent,
  isComplete,
}: WelcomeBannerProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getProgressMessage = () => {
    if (isComplete) {
      return "You're all set up and ready to go!";
    }
    if (progressPercent >= 75) {
      return "Almost there! Just a few more steps.";
    }
    if (progressPercent >= 50) {
      return "You're making great progress!";
    }
    if (progressPercent >= 25) {
      return "Keep going! You're on the right track.";
    }
    return "Let's get your account set up.";
  };

  return (
    <div className="relative bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 dark:from-amber-600 dark:via-amber-700 dark:to-orange-700 rounded-xl p-6 sm:p-8 text-white shadow-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
      </div>
      
      {/* Hero Illustration */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-20 sm:opacity-30">
        <img
          src={welcomeIllustration}
          alt="Welcome illustration"
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
        />
      </div>

      <div className="relative flex items-start gap-4">
        {avatarUrl && (
          <div className="flex-shrink-0">
            <img
              src={avatarUrl}
              alt={userName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white/30 object-cover shadow-lg"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-sm">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-amber-50 text-base sm:text-lg drop-shadow-sm">
            {getProgressMessage()}
          </p>
          {!isComplete && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-amber-100">Account setup</span>
                <span className="font-semibold">{progressPercent}%</span>
              </div>
              <div className="h-2 bg-amber-800/40 dark:bg-amber-900/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
