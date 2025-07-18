import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { mockApi } from '../data/mockData';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload, isAuthenticated: true };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'REGISTER_START':
      return { ...state, loading: true, error: null };
    case 'REGISTER_SUCCESS':
      return { ...state, loading: false, user: action.payload, isAuthenticated: true };
    case 'REGISTER_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  });

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(savedUser) });
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await mockApi.login(email, password);
      if (response.success) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.user });
        return { success: true };
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: response.message });
        return { success: false, message: response.message };
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' });
      return { success: false, message: 'Login failed' };
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'REGISTER_START' });
    try {
      const response = await mockApi.register(userData);
      if (response.success) {
        dispatch({ type: 'REGISTER_SUCCESS', payload: response.user });
        return { success: true };
      } else {
        dispatch({ type: 'REGISTER_FAILURE', payload: response.message });
        return { success: false, message: response.message };
      }
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: 'Registration failed' });
      return { success: false, message: 'Registration failed' };
    }
  };

  const logout = () => {
    mockApi.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};