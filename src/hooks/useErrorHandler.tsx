
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface ErrorState {
  error: Error | null;
  isLoading: boolean;
}

export const useErrorHandler = () => {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isLoading: false,
  });

  const handleAsync = useCallback(async <T,>(
    asyncOperation: () => Promise<T>,
    successMessage?: string,
    customErrorHandler?: (error: Error) => void
  ): Promise<T | null> => {
    setErrorState({ error: null, isLoading: true });
    
    try {
      const result = await asyncOperation();
      
      if (successMessage) {
        toast({
          title: "Success",
          description: successMessage,
          className: "bg-teal-50 border-teal-200 text-teal-800",
        });
      }
      
      setErrorState({ error: null, isLoading: false });
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error occurred');
      
      setErrorState({ error: errorObj, isLoading: false });
      
      if (customErrorHandler) {
        customErrorHandler(errorObj);
      } else {
        toast({
          title: "Error",
          description: errorObj.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
      
      console.error('Async operation failed:', errorObj);
      return null;
    }
  }, []);

  const clearError = useCallback(() => {
    setErrorState({ error: null, isLoading: false });
  }, []);

  return {
    error: errorState.error,
    isLoading: errorState.isLoading,
    handleAsync,
    clearError,
  };
};
