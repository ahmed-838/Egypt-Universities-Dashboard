import { useMutation, useQueryClient } from 'react-query';
import { University } from '../types/university';
import { deleteUniversity, updateUniversity, createUniversity } from '../services/universityService';

export function useUniversityMutations() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (id: string) => deleteUniversity(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('universities');
      },
    }
  );

  const updateMutation = useMutation(
    (university: University) => updateUniversity(university),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('universities');
      },
    }
  );

  const createMutation = useMutation(
    (university: Omit<University, '_id'>) => createUniversity(university),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('universities');
      },
    }
  );

  return {
    deleteUniversity: deleteMutation.mutate,
    updateUniversity: updateMutation.mutate,
    createUniversity: createMutation.mutate,
    isDeleting: deleteMutation.isLoading,
    isUpdating: updateMutation.isLoading,
    isCreating: createMutation.isLoading,
  };
}