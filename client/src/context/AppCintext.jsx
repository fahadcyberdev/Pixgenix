import axios from "axios";
import React, { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [credits, setCredits] = useState(false);

  const navigate = useNavigate();

  // Use useCallback to avoid dependency issues in useEffect
  const loadCreditsData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/credits', {
        headers: { token },
      });

      if (data.success) {
        setCredits(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl, token]);

  // ✅ UPDATED FUNCTION WITH COMMENTS
  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/image/generate-image',
        { prompt },
        { headers: { token } }
      );

      console.log("Image Generation API Response:", data); // ✅ DEBUG: Log full response

      if (data.success) {
        loadCreditsData();

        // ✅ FIXED: Return correct image URL key from response
        // Use `data.image` instead of `data.resultImage` 
        return data.image; 
      } else {
        toast.error(data.message || 'Image generation failed. Please try again.');
        loadCreditsData();
        if (data.creditBalance === 0) {
          navigate('/buy');
        }
      }
    } catch (error) {
      toast.error(error.message || 'Image generation failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token, loadCreditsData]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credits,
    setCredits,
    loadCreditsData,
    logout,
    generateImage
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
