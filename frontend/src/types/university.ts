export interface University {
  _id: string;
  name: string;
  university_name:string;
  description: string;
  location: string;
  type: 'Mainstream' | 'Credit';
  degreeType: 'Single' | 'Dual';
  tuition: number;
  imageUrl: string;
  departments: string[];
  established: number;
  rating: number;
  website: string;
  contactEmail: string;
  studentCount: number;
  facultyCount: number;
}

export interface UniversityFilters {
  type?: 'Mainstream' | 'Credit';
  degreeType?: 'Single' | 'Dual';
  tuitionMin?: number;
  tuitionMax?: number;
  search?: string;
}
    