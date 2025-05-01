import axios from "axios";

// Use environment variable for API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://bureau-management-system-o4t77k4o0-selekanes-projects-badb545a.vercel.app/"; 

// Fetch all loans
export const getLoans = async () => {
  try {
    const response = await axios.get(`https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app/loans`);
    return response.data; // Returns the list of loans
  } catch (error) {
    console.error("Error fetching loans:", error);
    throw error; // Rethrow the error to be handled elsewhere
  }
};

// Fetch loan details by loan ID
export const getLoanById = async (loanId) => {
  try {
    const response = await axios.get(`https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app/loans/${loanId}`);
    return response.data; // Returns loan details
  } catch (error) {
    console.error("Error fetching loan details:", error);
    throw error; // Rethrow the error to be handled elsewhere
  }
};

// Update the status of a specific loan
export const updateLoanStatus = async (loanId, status) => {
  try {
    const response = await axios.put(`https://bureau-management-system-9w1ya0gho-selekanes-projects-badb545a.vercel.app/loans/${loanId}`, {
      status,
    });
    return response.data; // Returns success message
  } catch (error) {
    console.error("Error updating loan status:", error);
    throw error; // Rethrow the error to be handled elsewhere
  }
};
