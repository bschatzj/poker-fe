import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("PokerToken");

  return axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: token
    }
  });
};