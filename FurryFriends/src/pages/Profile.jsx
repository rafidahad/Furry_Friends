import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        setUser(response.data);
      } catch (error) {
        navigate('/login');
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      <button onClick={() => localStorage.removeItem('token') || navigate('/login')}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
