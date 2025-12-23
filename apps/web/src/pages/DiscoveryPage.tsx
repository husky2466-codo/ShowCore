import { useState } from 'react'
import { TechnicianDiscovery } from '@/sections/technician-discovery/components/TechnicianDiscovery'
import data from '@/sections/technician-discovery/data.json'
import type { Technician, Filters, SearchState } from '@/sections/technician-discovery/types'

export function DiscoveryPage() {
  const [technicians, setTechnicians] = useState<Technician[]>(data.technicians as Technician[])
  const [searchState, setSearchState] = useState<SearchState>(data.searchState as SearchState)
  const filters = data.filters as Filters

  const handleSearch = (query: string) => {
    const filtered = query
      ? (data.technicians as Technician[]).filter(
          (t) =>
            t.name.toLowerCase().includes(query.toLowerCase()) ||
            t.skills.some((s) => s.name.toLowerCase().includes(query.toLowerCase()))
        )
      : (data.technicians as Technician[])
    setTechnicians(filtered)
    setSearchState((prev) => ({ ...prev, query, totalResults: filtered.length }))
  }

  const handleFilterChange = (newFilters: Partial<SearchState>) => {
    setSearchState((prev) => {
      const updated = { ...prev, ...newFilters }
      let filtered = data.technicians as Technician[]

      if (updated.selectedSkills.length > 0) {
        filtered = filtered.filter((t) =>
          updated.selectedSkills.some((skill) => t.skills.some((s) => s.name === skill))
        )
      }
      if (updated.selectedTiers.length > 0) {
        filtered = filtered.filter((t) => updated.selectedTiers.includes(t.tier))
      }
      if (updated.verifiedOnly) {
        filtered = filtered.filter((t) => t.verificationStatus === 'verified')
      }
      if (updated.insuredOnly) {
        filtered = filtered.filter((t) => t.insuranceStatus === 'verified')
      }
      if (updated.rateMin > filters.rateRange.min) {
        filtered = filtered.filter((t) => t.hourlyRate >= updated.rateMin)
      }
      if (updated.rateMax < filters.rateRange.max) {
        filtered = filtered.filter((t) => t.hourlyRate <= updated.rateMax)
      }

      setTechnicians(filtered)
      return { ...updated, totalResults: filtered.length }
    })
  }

  const handleClearFilters = () => {
    setTechnicians(data.technicians as Technician[])
    setSearchState(data.searchState as SearchState)
  }

  const handleToggleBookmark = (id: string) => {
    setTechnicians((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isBookmarked: !t.isBookmarked } : t))
    )
  }

  return (
    <TechnicianDiscovery
      technicians={technicians}
      filters={filters}
      searchState={searchState}
      isLoading={false}
      onSearch={handleSearch}
      onFilterChange={handleFilterChange}
      onClearFilters={handleClearFilters}
      onViewProfile={(id) => console.log('View profile:', id)}
      onToggleBookmark={handleToggleBookmark}
      onViewRanking={(id) => console.log('View ranking:', id)}
      onPageChange={(page) => setSearchState((prev) => ({ ...prev, page }))}
    />
  )
}
