import { useState } from 'react'
import { Search, SlidersHorizontal, X, Users } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import type { TechnicianDiscoveryProps } from '../types'
import { TechnicianCard } from './TechnicianCard'
import { FilterPanel } from './FilterPanel'
import technicianSet1 from '@/assets/avatars/technician-set-1.png'
import technicianSet2 from '@/assets/avatars/technician-set-2.png'
import noResultsIllustration from '@/assets/illustrations/no-results.png'

export function TechnicianDiscovery({
  technicians,
  filters,
  searchState,
  isLoading = false,
  onSearch,
  onFilterChange,
  onClearFilters,
  onViewProfile,
  onToggleBookmark,
  onViewRanking,
  onPageChange,
}: TechnicianDiscoveryProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchState.query)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  const activeFilterCount =
    searchState.selectedSkills.length +
    searchState.selectedTiers.length +
    (searchState.verifiedOnly ? 1 : 0) +
    (searchState.insuredOnly ? 1 : 0) +
    (searchState.rateMin > filters.rateRange.min ? 1 : 0) +
    (searchState.rateMax < filters.rateRange.max ? 1 : 0)

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header Banner */}
      <div className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 rounded-xl p-6 sm:p-8 text-white shadow-lg overflow-hidden">
            {/* Background Technician Avatars */}
            <div className="absolute inset-0 opacity-5">
              <img
                src={technicianSet1}
                alt=""
                className="absolute top-4 left-4 w-24 h-24 object-contain"
              />
              <img
                src={technicianSet2}
                alt=""
                className="absolute bottom-4 right-4 w-32 h-32 object-contain"
              />
            </div>

            <div className="relative">
              <div className="text-center mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Find Your <span className="text-amber-400">Perfect Technician</span>
                </h1>
                <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
                  Browse verified AV professionals ranked by skill, experience, and client reviews
                </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, skill, or keyword..."
                    className="w-full pl-12 pr-4 py-3 text-base bg-white dark:bg-zinc-800 border-0 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <Users className="w-5 h-5" />
              <span className="font-medium">
                {searchState.totalResults} technician{searchState.totalResults !== 1 ? 's' : ''} found
              </span>
            </div>
            {searchState.query && (
              <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-sm text-zinc-600 dark:text-zinc-400">
                "{searchState.query}"
              </span>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-amber-500 text-white text-xs rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                searchState={searchState}
                onChange={onFilterChange}
                onClear={onClearFilters}
              />
            </div>
          </aside>

          {/* Results Grid */}
          <section className="flex-1 min-w-0">
            {isLoading ? (
              /* Loading Skeleton */
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 animate-pulse"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                      <div className="flex-1">
                        <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
                        <div className="h-3 w-24 bg-zinc-100 dark:bg-zinc-800 rounded mb-2" />
                        <div className="h-4 w-28 bg-zinc-100 dark:bg-zinc-800 rounded" />
                      </div>
                    </div>
                    <div className="flex justify-between mb-4">
                      <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
                      <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-700 rounded" />
                    </div>
                    <div className="flex gap-1.5 mb-4">
                      <div className="h-6 w-20 bg-zinc-100 dark:bg-zinc-800 rounded" />
                      <div className="h-6 w-16 bg-zinc-100 dark:bg-zinc-800 rounded" />
                      <div className="h-6 w-24 bg-zinc-100 dark:bg-zinc-800 rounded" />
                    </div>
                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between">
                      <div className="h-6 w-20 bg-zinc-100 dark:bg-zinc-800 rounded" />
                      <div className="h-6 w-16 bg-zinc-100 dark:bg-zinc-800 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : technicians.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="w-32 h-32 mb-6">
                  <img
                    src={noResultsIllustration}
                    alt="No results found"
                    className="w-full h-full object-contain opacity-60"
                  />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  No technicians found
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-center max-w-sm mb-4">
                  Try adjusting your filters or search terms to find more technicians.
                </p>
                <button
                  onClick={onClearFilters}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              /* Results */
              <>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {technicians.map((technician) => (
                    <TechnicianCard
                      key={technician.id}
                      technician={technician}
                      onClick={() => onViewProfile?.(technician.id)}
                      onBookmark={() => onToggleBookmark?.(technician.id)}
                      onViewRanking={() => onViewRanking?.(technician.id)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {searchState.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => onPageChange?.(searchState.page - 1)}
                      disabled={searchState.page === 1}
                      className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <div className="flex items-center gap-1">
                      {[...Array(searchState.totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => onPageChange?.(i + 1)}
                          className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                            searchState.page === i + 1
                              ? 'bg-amber-500 text-white'
                              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => onPageChange?.(searchState.page + 1)}
                      disabled={searchState.page === searchState.totalPages}
                      className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <Modal
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        ariaLabel="Filter technicians"
        closeOnBackdropClick={true}
        className="lg:hidden fixed inset-y-0 right-0 w-full max-w-sm"
      >
        <div className="h-full bg-zinc-50 dark:bg-zinc-950 shadow-xl overflow-y-auto flex flex-col">
          <div className="sticky top-0 flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Filters</h2>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="p-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 flex-1">
            <FilterPanel
              filters={filters}
              searchState={searchState}
              onChange={onFilterChange}
              onClear={onClearFilters}
            />
          </div>
          <div className="sticky bottom-0 p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
            >
              View {searchState.totalResults} Results
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
