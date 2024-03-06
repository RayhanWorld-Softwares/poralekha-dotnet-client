import axios from "axios";

const axiosLocal = axios.create({
  baseURL: "http://localhost:5000" ,
});
const useAxiosLocal = () => {
  return axiosLocal;
};

export default useAxiosLocal;