import React, { createContext, useState, useCallback, ReactNode } from 'react';

// Mock data
const MOCK_USER = {
  username: 'demo_user',
  email: 'demo@example.com',
};

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete project setup',
    description: 'Set up React Native project with navigation',
    completed: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Work',
  },
  {
    id: '2',
    title: 'Design UI mockups',
    description: 'Create mockups for home and task screens',
    completed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Design',
  },
  {
    id: '3',
    title: 'Implement task list',
    description: 'Build task list component with sorting',
    completed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Development',
  },
  {
    id: '4',
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, vegetables',
    completed: false,
    createdAt: new Date().toISOString(),
    category: 'Personal',
  },
];

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  category?: string;
}

export interface AppContextType {
  user: { username: string; email: string } | null;
  tasks: Task[];
  loading: boolean;
  error: string | null;
  signOutUser: () => Promise<void>;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; email: string } | null>(MOCK_USER);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signOutUser = useCallback(async () => {
    try {
      setLoading(true);
      // Mock sign out
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser(null);
      setTasks([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      // Mock fetch - simulates API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTasks(MOCK_TASKS);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      setLoading(true);
      // Mock add - simulates API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    try {
      setLoading(true);
      // Mock update - simulates API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      setLoading(true);
      // Mock delete - simulates API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  }, []);

  const value: AppContextType = {
    user,
    tasks,
    loading,
    error,
    signOutUser,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
