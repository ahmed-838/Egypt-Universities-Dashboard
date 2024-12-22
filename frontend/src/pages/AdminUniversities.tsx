import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useUniversities } from '../hooks/useUniversities';
import { useUniversityMutations } from '../hooks/useUniversityMutations';
import { UniversityFilters } from '../components/universities/UniversityFilters';
import { UniversityGrid } from '../components/universities/UniversityGrid';
import { EditUniversityModal } from '../components/admin/EditUniversityModal';
import { AddUniversityModal } from '../components/admin/AddUniversityModal';
import { University, UniversityFilters as FilterType } from '../types/university';

export function AdminUniversities() {
  const [filters, setFilters] = useState<FilterType>({});
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);
  const [isAddingUniversity, setIsAddingUniversity] = useState(false);
  const { data: universities, isLoading, error } = useUniversities(filters);
  const { 
    deleteUniversity, 
    updateUniversity, 
    createUniversity,
    isUpdating,
    isCreating
  } = useUniversityMutations();

  const handleEdit = (_id: string) => {
    const university = universities?.find((u: University) => u._id === _id);
    if (university) {
      setEditingUniversity(university);
    }
  };

  const handleDelete = async (_id: string) => {
    if (window.confirm('Are you sure you want to delete this university?')) {
      await deleteUniversity(_id);
    }
  };

  const handleUpdate = async (data: University) => {
    if (editingUniversity) {
      await updateUniversity({ ...data, _id: editingUniversity._id });
      setEditingUniversity(null);
    }
  };

  const handleAdd = async (data: Omit<University, '_id'>) => {
    try {
      console.log('Adding university with data:', data);
      await createUniversity(data);
      setIsAddingUniversity(false);
      alert('University added successfully!');
    } catch (error) {
      console.error('Error adding university:', error);
      alert('Failed to add university. Please try again.');
    }
  };

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
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Universities</h1>
        <button
          onClick={() => setIsAddingUniversity(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add University
        </button>
      </div>

      {editingUniversity && (
        <EditUniversityModal
          university={editingUniversity}
          onUpdate={handleUpdate}
          onClose={() => setEditingUniversity(null)}
          isLoading={isUpdating}
        />
      )}

      {isAddingUniversity && (
        <AddUniversityModal
          onAdd={handleAdd}
          onClose={() => setIsAddingUniversity(false)}
          isLoading={isCreating}
        />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <UniversityFilters filters={filters} onFilterChange={setFilters} />
        </div>
        
        <div className="lg:col-span-3">
          <UniversityGrid
            universities={universities || []}
            isAdmin={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}