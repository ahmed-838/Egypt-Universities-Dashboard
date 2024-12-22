import axios from 'axios';
import { University, UniversityFilters } from '../types/university';

const API_URL = 'http://localhost:5000/api';

export const fetchUniversities = async (filters: UniversityFilters) => {
    const params = new URLSearchParams();
    
    if (filters.type) params.append('type', filters.type);
    if (filters.degreeType) params.append('degreeType', filters.degreeType);
    if (filters.tuitionMin) params.append('tuitionMin', filters.tuitionMin.toString());
    if (filters.tuitionMax) params.append('tuitionMax', filters.tuitionMax.toString());
    if (filters.search) params.append('search', filters.search);
    
    const response = await axios.get(`${API_URL}/universities?${params.toString()}`);
    return response.data.faculties;
};

export const getFacultyById = async (id: string) => {
    const response = await axios.get(`${API_URL}/universities/${id}`);
    return response.data.faculty;
};

export const createUniversity = async (university: Omit<University, '_id'>) => {
    const response = await axios.post(`${API_URL}/universities`, university);
    return response.data.faculty;
};

export const updateUniversity = async (university: University) => {
    const response = await axios.put(`${API_URL}/universities/${university._id}`, university);
    return response.data.faculty;
};

export const deleteUniversity = async (id: string) => {
    await axios.delete(`${API_URL}/universities/${id}`);
};