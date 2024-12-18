import { University } from '../../types/university';
import { UniversityCard } from './UniversityCard';

interface UniversityGridProps {
  universities: University[];
  isAdmin?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function UniversityGrid({ 
  universities, 
  isAdmin = false, 
  onEdit, 
  onDelete 
}: UniversityGridProps) {
  if (universities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No universities found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {universities.map((university) => (
        <UniversityCard
          key={university._id}
          university={university}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}