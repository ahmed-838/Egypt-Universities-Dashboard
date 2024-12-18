import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { University } from '../../types/university';

const universitySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  university_name: z.string().min(1, 'University Name is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required'),
  type: z.enum(['Mainstream', 'Credit']),
  degreeType: z.enum(['Single', 'Dual']),
  tuition: z.number().min(0, 'Tuition must be positive'),
  imageUrl: z.string().url('Must be a valid URL'),
  departments: z.array(z.string()),
  established: z.number().min(1800, 'Year must be after 1800'),
  rating: z.number().min(0).max(5),
  website: z.string().url('Must be a valid URL'),
  contactEmail: z.string().email('Must be a valid email'),
  studentCount: z.number().min(0),
  facultyCount: z.number().min(0)
});

interface UniversityFormProps {
  university?: University;
  onSubmit: (data: University) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function UniversityForm({ university, onSubmit, onCancel, isLoading }: UniversityFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<University>({
    resolver: zodResolver(universitySchema),
    defaultValues: university || {
      type: 'Mainstream',
      degreeType: 'Single',
      departments: [],
      tuition: 0,
      rating: 0,
      studentCount: 0,
      facultyCount: 0,
      established: new Date().getFullYear(),
    }
  });

  const departments = watch('departments');

  const handleAddDepartment = () => {
    const newDepartment = prompt('Enter department name:');
    if (newDepartment?.trim()) {
      const updatedDepartments = [...(departments || []), newDepartment.trim()];
      setValue('departments', updatedDepartments);
    }
  };

  const handleRemoveDepartment = (index: number) => {
    const updatedDepartments = departments?.filter((_, i) => i !== index);
    setValue('departments', updatedDepartments || []);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {/* University Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">University Name</label>
          <input
            type="text"
            {...register('university_name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.university_name && <p className="mt-1 text-sm text-red-600">{errors.university_name.message}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            {...register('location')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Mainstream">Mainstream</option>
            <option value="Credit">Credit</option>
          </select>
        </div>

        {/* Degree Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Degree Type</label>
          <select
            {...register('degreeType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Single">Single</option>
            <option value="Dual">Dual</option>
          </select>
        </div>

        {/* Tuition */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tuition</label>
          <input
            type="number"
            {...register('tuition', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.tuition && <p className="mt-1 text-sm text-red-600">{errors.tuition.message}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            {...register('imageUrl')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>}
        </div>

        {/* Departments */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Departments</label>
          <div className="mt-2 space-y-2">
            <div className="flex flex-wrap gap-2">
              {departments?.map((dept, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  {dept}
                  <button
                    type="button"
                    onClick={() => handleRemoveDepartment(index)}
                    className="ml-2 text-indigo-600 hover:text-indigo-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            
            <button
              type="button"
              onClick={handleAddDepartment}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Department
            </button>
          </div>
          {errors.departments && (
            <p className="mt-1 text-sm text-red-600">{errors.departments.message}</p>
          )}
        </div>

        {/* Established Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Established Year</label>
          <input
            type="number"
            {...register('established', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.established && <p className="mt-1 text-sm text-red-600">{errors.established.message}</p>}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            {...register('rating', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>}
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="url"
            {...register('website')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>}
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Email</label>
          <input
            type="email"
            {...register('contactEmail')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.contactEmail && <p className="mt-1 text-sm text-red-600">{errors.contactEmail.message}</p>}
        </div>

        {/* Student Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Student Count</label>
          <input
            type="number"
            {...register('studentCount', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.studentCount && <p className="mt-1 text-sm text-red-600">{errors.studentCount.message}</p>}
        </div>

        {/* Faculty Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Faculty Count</label>
          <input
            type="number"
            {...register('facultyCount', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.facultyCount && <p className="mt-1 text-sm text-red-600">{errors.facultyCount.message}</p>}
        </div>
      </div>

      {/* Description - Full Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      {/* Form Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}