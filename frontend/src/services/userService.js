import axios from "axios";

// Update to your deployed backend URL
const API_BASE_URL = "https://bureau-management-system-o4t77k4o0-selekanes-projects-badb545a.vercel.app/"; 

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
