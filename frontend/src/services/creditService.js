import axios from "axios";

// Use environment variable for API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://bureau-management-system-o4t77k4o0-selekanes-projects-badb545a.vercel.app/"; 

// Fetch credit score for a user
export const getCreditScore = async (userId) => {
  try {
    const response = await axios.get(`https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app/creditscore/${userId}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching credit score:", error);
    throw error; // Rethrow the error so the calling code can handle it if needed
  }
};

// Update credit score for a user
export const updateCreditScore = async (userId, creditScore) => {
  try {
    const response = await axios.post(`https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app/creditscore/${userId}`, {
      creditScore,
    });
    return response.data; 
  } catch (error) {
    console.error("Error updating credit score:", error);
    throw error; // Rethrow the error to be handled elsewhere if necessary
  }
};
