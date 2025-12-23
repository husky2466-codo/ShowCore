import { Star, MapPin, BadgeCheck, Shield, Bookmark, TrendingUp } from 'lucide-react'
import type { TechnicianCardProps } from '../types'

// Avatar imports
import techFemaleBlackYoung from '@/assets/avatars/tech-female-black-young.png'
import techFemaleBlackOlder from '@/assets/avatars/tech-female-black-older.png'
import techFemaleHispanicYoung from '@/assets/avatars/tech-female-hispanic-young.png'
import techFemaleHispanicOlder from '@/assets/avatars/tech-female-hispanic-older.png'
import techFemaleWhiteYoung from '@/assets/avatars/tech-female-white-young.png'
import techFemaleWhiteOlder from '@/assets/avatars/tech-female-white-older.png'
import techMaleBlackYoung from '@/assets/avatars/tech-male-black-young.png'
import techMaleBlackOlder from '@/assets/avatars/tech-male-black-older.png'
import techMaleHispanicYoung from '@/assets/avatars/tech-male-hispanic-young.png'
import techMaleHispanicOlder from '@/assets/avatars/tech-male-hispanic-older.png'
import techMaleWhiteYoung from '@/assets/avatars/tech-male-white-young.png'
import techMaleWhiteOlder from '@/assets/avatars/tech-male-white-older.png'

// Tier badge import
import tierBadges from '@/assets/icons/tier-badges.png'

// Avatar mapping
const avatars = [
  techFemaleBlackYoung,
  techFemaleBlackOlder,
  techFemaleHispanicYoung,
  techFemaleHispanicOlder,
  techFemaleWhiteYoung,
  techFemaleWhiteOlder,
  techMaleBlackYoung,
  techMaleBlackOlder,
  techMaleHispanicYoung,
  techMaleHispanicOlder,
  techMaleWhiteYoung,
  techMaleWhiteOlder,
]

/**
 * Generates a consistent avatar URL based on technician ID
 */
function getAvatarForTechnician(id: string): string {
  // Simple hash function to get a consistent index
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i)
    hash = hash & hash // Convert to 32-bit integer
  }
  const index = Math.abs(hash) % avatars.length
  return avatars[index]
}

const tierColors = {
  Beginner: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
  Experienced: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Advanced: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Pro: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}

const tierGlow = {
  Beginner: '',
  Experienced: '',
  Advanced: 'ring-1 ring-purple-200 dark:ring-purple-800/50',
  Pro: 'ring-1 ring-amber-300 dark:ring-amber-700/50 shadow-amber-100 dark:shadow-amber-900/20',
}

const tierBadgePositions = {
  Beginner: '0%',
  Experienced: '33.33%',
  Advanced: '66.66%',
  Pro: '100%',
}

export function TechnicianCard({ technician, onClick, onBookmark, onViewRanking }: TechnicianCardProps) {
  return (
    <div
      className={`group relative bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 hover:-translate-y-0.5 cursor-pointer ${tierGlow[technician.tier]}`}
      onClick={onClick}
    >
      {/* Bookmark Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onBookmark?.()
        }}
        className={`absolute top-3 right-3 z-10 p-1.5 rounded-full transition-all duration-200 ${
          technician.isBookmarked
            ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
            : 'bg-white/80 dark:bg-zinc-800/80 text-zinc-400 hover:text-amber-500 dark:hover:text-amber-400 opacity-0 group-hover:opacity-100'
        }`}
      >
        <Bookmark className={`w-4 h-4 ${technician.isBookmarked ? 'fill-current' : ''}`} />
      </button>

      {/* Card Content */}
      <div className="p-5">
        {/* Header: Avatar + Basic Info */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <img
            src={technician.avatarUrl || getAvatarForTechnician(technician.id)}
            alt={technician.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-zinc-100 dark:ring-zinc-800"
          />

          {/* Name + ID + Location */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                {technician.name}
              </h3>
              {technician.verificationStatus === 'verified' && (
                <BadgeCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono mb-1">
              {technician.randomizedId}
            </p>
            <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>{technician.location.city}, {technician.location.state}</span>
              <span className="text-zinc-300 dark:text-zinc-600 mx-1">·</span>
              <span className="text-amber-600 dark:text-amber-400 font-medium">
                {technician.location.distance} mi
              </span>
            </div>
          </div>
        </div>

        {/* Tier + Rate Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 bg-no-repeat bg-contain flex-shrink-0"
              style={{
                backgroundImage: `url(${tierBadges})`,
                backgroundPosition: `${tierBadgePositions[technician.tier]} center`,
                backgroundSize: '400% 100%',
              }}
              title={technician.tier}
            />
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tierColors[technician.tier]}`}>
              {technician.tier}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              ${technician.hourlyRate}
            </span>
            <span className="text-sm text-zinc-400 dark:text-zinc-500">/hr</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {technician.skills.slice(0, 4).map((skill) => (
            <span
              key={skill.name}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                skill.verified
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                  : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500'
              }`}
            >
              {skill.name}
              {skill.verified && <BadgeCheck className="w-3 h-3 text-amber-500" />}
            </span>
          ))}
          {technician.skills.length > 4 && (
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-zinc-50 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500">
              +{technician.skills.length - 4}
            </span>
          )}
        </div>

        {/* Footer: Rating + Insurance + Ranking */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-900/20">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                {technician.averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              ({technician.reviewCount})
            </span>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2">
            {technician.insuranceStatus === 'verified' && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Insured</span>
              </div>
            )}

            {/* Ranking Score Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onViewRanking?.()
              }}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-amber-100 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-xs font-mono font-medium">{technician.rankingScore}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
