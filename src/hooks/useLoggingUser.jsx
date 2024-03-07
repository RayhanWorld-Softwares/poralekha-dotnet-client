import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosLocal from "./useAxiosLocal";

const useLoggingUser = () => {
  const axiosLocal = useAxiosLocal();
  const { user } = useAuth();

  const [logging, setLogging] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosLocal.get(`/api/users/${user?.email}`);
        setLogging(res?.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) {
      fetchData();
    }
  }, [axiosLocal, user?.email]);

  const loggingUser = logging?.payload?.user;

  console.log(loggingUser);
  return { loggingUser, loading, error };
};

export default useLoggingUser;
