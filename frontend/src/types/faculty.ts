export interface Faculty {
  _id: string;
  name: string;
  university_name: string;
  imageUrl: string;
  description: string;
  location: string;
  type: string;
  degreeType: string;
  tuition: number;
  departments: string[];
  established: number;
  rating: number;
  website: string;
  contactEmail: string;
  studentCount: number;
  facultyCount: number;
}

export interface FacultyFilters {
  search?: string;
  type?: string;
  degreeType?: string;
  tuitionMin?: number;
  tuitionMax?: number;
} 