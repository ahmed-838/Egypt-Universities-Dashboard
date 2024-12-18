import { UniversityFilters as FilterType } from '../../types/university';

interface UniversityFiltersProps {
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
}

export function UniversityFilters({ filters, onFilterChange }: UniversityFiltersProps) {
  const handleChange = (key: keyof FilterType, value: string | number | undefined) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Department Type
        </label>
        <select
          value={filters.type || ''}
          onChange={(e) => handleChange('type', e.target.value || undefined)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Types</option>
          <option value="Mainstream">Mainstream</option>
          <option value="Credit">Credit</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Degree Type
        </label>
        <select
          value={filters.degreeType || ''}
          onChange={(e) => handleChange('degreeType', e.target.value || undefined)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Degrees</option>
          <option value="Single">Single</option>
          <option value="Dual">Dual</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tuition Range
        </label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Min"
            value={filters.tuitionMin || ''}
            onChange={(e) => handleChange('tuitionMin', e.target.value ? Number(e.target.value) : undefined)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.tuitionMax || ''}
            onChange={(e) => handleChange('tuitionMax', e.target.value ? Number(e.target.value) : undefined)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <input
          type="text"
          placeholder="Search universities..."
          value={filters.search || ''}
          onChange={(e) => handleChange('search', e.target.value || undefined)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}