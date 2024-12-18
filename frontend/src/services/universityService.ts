import axios from 'axios';
import { University, UniversityFilters } from '../types/university';

const API_BASE_URL = 'http://localhost:5000/api/universities';

export async function fetchUniversities(filters: UniversityFilters): Promise<University[]> {
  const params = new URLSearchParams();
  if (filters.type) params.append('type', filters.type);
  if (filters.degreeType) params.append('degreeType', filters.degreeType);
  if (filters.tuitionMin !== undefined) params.append('tuitionMin', filters.tuitionMin.toString());
  if (filters.tuitionMax !== undefined) params.append('tuitionMax', filters.tuitionMax.toString());
  if (filters.search) params.append('search', filters.search);

  const { data } = await axios.get<{faculties: University[]}>(`${API_BASE_URL}?${params}`);
  return data.faculties;
}

export async function createUniversity(university: Omit<University, '_id'>): Promise<University> {
  console.log('Sending request to create university:', university);
  const { data } = await axios.post<University>(API_BASE_URL, university);
  return data;
}

export async function deleteUniversity(_id: string): Promise<void> {
  await axios.delete(`${API_BASE_URL}/${_id}`);
}

export async function updateUniversity(university: University): Promise<University> {
  const { data } = await axios.put<University>(`${API_BASE_URL}/${university._id}`, university);
  return data;
}

export async function getUniversityById(_id: string): Promise<University | null> {
  try {
    const { data } = await axios.get<University>(`${API_BASE_URL}/${_id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}