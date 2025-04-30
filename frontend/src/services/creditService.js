import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; 


export const getCreditScore = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/creditscore/${userId}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching credit score:", error);
    throw error;
  }
};


export const updateCreditScore = async (userId, creditScore) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/creditscore/${userId}`, {
      creditScore,
    });
    return response.data; 
  } catch (error) {
    console.error("Error updating credit score:", error);
    throw error;
  }
};
