import { Building2, MapPin, GraduationCap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { University } from '../../types/university';

interface UniversityCardProps {
  university: University;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export function UniversityCard({ university, onEdit, onDelete, isAdmin = false }: UniversityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={university.imageUrl}
        alt={university.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{university.name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{university.location}</span>
        </div>
        <p className="text-gray-600 mb-4">{university.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Building2 className="h-4 w-4 text-indigo-600 mr-2" />
            <span className="text-sm">{university.type}</span>
          </div>
          <div className="flex items-center">
            <GraduationCap className="h-4 w-4 text-indigo-600 mr-2" />
            <span className="text-sm">{university.degreeType}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 text-indigo-600 mr-2" />
            <span className="text-sm">{university.studentCount} Students</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-semibold text-indigo-600">
              ${university.tuition.toLocaleString()}/year
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <Link
            to={`/universities/${university._id}`}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Details
          </Link>

          {isAdmin && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit?.(university._id)}
                className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete?.(university._id)}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}