import { useQuery } from 'react-query';
import { UniversityFilters } from '../types/university';
import { fetchUniversities } from '../services/universityService';

export function useUniversities(filters: UniversityFilters) {
  return useQuery(['universities', filters], () => fetchUniversities(filters), {
    keepPreviousData: true,
    staleTime: 5000,
  });
}