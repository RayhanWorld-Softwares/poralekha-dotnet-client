import { useEffect, useState } from "react";
import useAxiosLocal from "./useAxiosLocal";

const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const axiosLocal = useAxiosLocal();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axiosLocal.get("/api/feedback");
        setFeedbacks(res?.data?.payload);
      } catch (err) {
        console.error("Error fetching feedback request:", err);
        throw new Error("feedback data fetch error");
      }
    };
    fetchFeedback();
  }, [axiosLocal]);

  return { feedbacks };
};

export default useFeedback;
