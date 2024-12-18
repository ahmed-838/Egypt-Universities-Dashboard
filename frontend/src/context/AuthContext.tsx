import React, { createContext, useState, useCallback } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    // Mock login - replace with actual API call
    if (email === 'admin@example.com' && password === 'admin') {
      setUser({ id: '1', email, role: 'admin' });
    } else {
      throw new Error('Invalid credentials');
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}