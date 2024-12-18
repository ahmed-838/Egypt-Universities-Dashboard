import { University } from '../../types/university';
import { UniversityForm } from './UniversityForm';

interface AddUniversityModalProps {
  onAdd: (data: Omit<University, '_id'>) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export function AddUniversityModal({ onAdd, onClose, isLoading }: AddUniversityModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add New University</h2>
        <UniversityForm
          onSubmit={onAdd}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}