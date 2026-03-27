import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, Unit } from './types';

interface AppContextType {
  progress: UserProgress | null;
  loading: boolean;
  refreshProgress: () => Promise<void>;
  submitTest: (unitId: string, score: number) => Promise<any>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProgress = async () => {
    try {
      const res = await fetch('/api/progress');
      const data = await res.json();
      setProgress(data);
    } catch (err) {
      console.error("Failed to fetch progress", err);
    } finally {
      setLoading(false);
    }
  };

  const submitTest = async (unitId: string, score: number) => {
    try {
      const res = await fetch('/api/submit-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitId, score }),
      });
      const result = await res.json();
      await refreshProgress();
      return result;
    } catch (err) {
      console.error("Failed to submit test", err);
      throw err;
    }
  };

  useEffect(() => {
    refreshProgress();
  }, []);

  return (
    <AppContext.Provider value={{ progress, loading, refreshProgress, submitTest }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
