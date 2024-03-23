import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import { Link } from "react-router-dom";

const MyEnrollClass = () => {
  const axiosLocal = useAxiosLocal();
  const { user } = useAuth();

  const getEnrolledClass = async () => {
    const response = await axiosLocal.get(`/api/order/${user?.email}`);
    return response?.data?.payload;
  };

  const {
    data: enrolledClasses,
    // isLoading,
    // isError,
    // error,
    // refetch,
  } = useQuery({
    queryKey: ["enrolledClass"],
    queryFn: getEnrolledClass,
  });
  

  return (
    <div className=" bg-[#001E2B] h-screen w-full flex justify-center">
      <div className="pt-24 ">
        {enrolledClasses?.map((enrolledClass) => (
          <div
            key={enrolledClass?._id}
            className=" bg-[#162C46]  flex  w-fit p-4 rounded-lg"
          >
            <div className="w-72">
              <img src={enrolledClass?.image} alt="enrolled class image" />
            </div>
            <div className="ml-4">
              <h2 className="text-3xl font-bold text-white ">
                {enrolledClass?.classTitle}
              </h2>
              <h2 className="text-xl font-semibold text-white ">
                {enrolledClass?.teacherName}
              </h2>

              <Link
                to={`/student-dashboard/my-enroll-class/${enrolledClass?._id}`}
              >
                <button className="text-white font-bold btn-info btn mt-11">
                  Continue
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClass;
