import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('team_token'));

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API = `${BACKEND_URL}/api`;

  // Set up axios interceptor for authentication
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Load team profile on mount if token exists
  useEffect(() => {
    const loadTeamProfile = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API}/teams/profile`);
          setTeam(response.data);
        } catch (error) {
          console.error('Failed to load team profile:', error);
          // Token might be invalid, clear it
          localStorage.removeItem('team_token');
          setToken(null);
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    loadTeamProfile();
  }, [token, API]);

  const register = async (registrationData) => {
    try {
      const response = await axios.post(`${API}/teams/register`, registrationData);
      const { access_token, team_profile } = response.data;
      
      setToken(access_token);
      setTeam(team_profile);
      localStorage.setItem('team_token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Registration failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Registration failed' 
      };
    }
  };

  const login = async (loginData) => {
    try {
      const response = await axios.post(`${API}/teams/login`, loginData);
      const { access_token, team_profile } = response.data;
      
      setToken(access_token);
      setTeam(team_profile);
      localStorage.setItem('team_token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  const logout = () => {
    setTeam(null);
    setToken(null);
    localStorage.removeItem('team_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateProfile = async (updateData) => {
    try {
      const response = await axios.put(`${API}/teams/profile`, updateData);
      setTeam(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Profile update failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Profile update failed' 
      };
    }
  };

  const uploadMaterial = async (materialData) => {
    try {
      const response = await axios.post(`${API}/teams/materials`, materialData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Material upload failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Material upload failed' 
      };
    }
  };

  const getMaterials = async () => {
    try {
      const response = await axios.get(`${API}/teams/materials`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Failed to get materials:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Failed to get materials' 
      };
    }
  };

  const deleteMaterial = async (materialId) => {
    try {
      await axios.delete(`${API}/teams/materials/${materialId}`);
      return { success: true };
    } catch (error) {
      console.error('Failed to delete material:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Failed to delete material' 
      };
    }
  };

  const contactTeam = async (teamId, contactData) => {
    try {
      await axios.post(`${API}/teams/${teamId}/contact`, contactData);
      return { success: true };
    } catch (error) {
      console.error('Failed to contact team:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Failed to contact team' 
      };
    }
  };

  const value = {
    team,
    loading,
    isAuthenticated: !!team,
    register,
    login,
    logout,
    updateProfile,
    uploadMaterial,
    getMaterials,
    deleteMaterial,
    contactTeam
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};