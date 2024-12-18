import { useState } from 'react';
import { useUniversities } from '../hooks/useUniversities';
import { UniversityFilters } from '../components/universities/UniversityFilters';
import { UniversityGrid } from '../components/universities/UniversityGrid';
import { UniversityFilters as FilterType } from '../types/university';

export function UniversityList() {
  const [filters, setFilters] = useState<FilterType>({});
  const { data: universities, isLoading, error } = useUniversities(filters);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error loading universities. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Universities</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <UniversityFilters filters={filters} onFilterChange={setFilters} />
        </div>
        
        <div className="lg:col-span-3">
          <UniversityGrid universities={universities || []} />
        </div>
      </div>
    </div>
  );
}