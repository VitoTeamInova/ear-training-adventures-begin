
import { useState, useEffect } from 'react';
import { ExerciseResult, calculateSuccessPercentage } from '../utils/noteUtils';

const LOCAL_STORAGE_KEY = 'ear-training-progress';

const useProgress = () => {
  const [results, setResults] = useState<ExerciseResult[]>([]);

  useEffect(() => {
    // Load saved results from localStorage
    const savedResults = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedResults) {
      try {
        const parsed = JSON.parse(savedResults);
        // Convert string dates back to Date objects
        const resultsWithDates = parsed.map((result: any) => ({
          ...result,
          date: new Date(result.date)
        }));
        setResults(resultsWithDates);
      } catch (error) {
        console.error('Failed to parse saved results', error);
      }
    }
  }, []);

  const saveResult = (totalExercises: number, totalAttempts: number) => {
    const successPercentage = calculateSuccessPercentage(totalExercises, totalAttempts);
    
    const newResult: ExerciseResult = {
      date: new Date(),
      totalExercises,
      totalAttempts,
      successPercentage
    };
    
    const updatedResults = [...results, newResult];
    setResults(updatedResults);
    
    // Save to localStorage
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedResults));
    } catch (error) {
      console.error('Failed to save results to localStorage', error);
    }
    
    return newResult;
  };

  return { results, saveResult };
};

export default useProgress;
