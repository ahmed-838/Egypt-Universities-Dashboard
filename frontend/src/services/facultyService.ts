import { Faculty } from '../types/faculty';

export async function fetchFaculties(): Promise<Faculty[]> {
  const response = await fetch('/api/universities');
  if (!response.ok) {
    throw new Error('Failed to fetch faculties');
  }
  const data = await response.json();
  return data.faculties;
}

export async function getFacultyById(_id: string): Promise<Faculty | null> {
  try {
    const response = await fetch(`http://localhost:5000/api/universities/${_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch faculty');
    }
    const data = await response.json();
    return data.faculty;
  } catch (error) {
    console.error('Error fetching faculty:', error);
    throw error;
  }
}

export async function createFaculty(faculty: Omit<Faculty, '_id'>): Promise<Faculty> {
  const response = await fetch('/api/universities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(faculty),
  });
  if (!response.ok) {
    throw new Error('Failed to create faculty');
  }
  const data = await response.json();
  return data.faculty;
}

export async function updateFaculty(_id: string, faculty: Partial<Faculty>): Promise<Faculty> {
  const response = await fetch(`/api/universities/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(faculty),
  });
  if (!response.ok) {
    throw new Error('Failed to update faculty');
  }
  const data = await response.json();
  return data.faculty;
}

export async function deleteFaculty(_id: string): Promise<void> {
  const response = await fetch(`/api/universities/${_id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete faculty');
  }
} 