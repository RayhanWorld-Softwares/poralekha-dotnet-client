import { useState, useEffect } from "react";
import useAxiosLocal from "../../hooks/useAxiosLocal";

const TeacherRequest = () => {
  const axiosLocal = useAxiosLocal();
  const [isLoading, setIsLoading] = useState(true);
  const [teacherRequests, setTeacherRequests] = useState([]);

  useEffect(() => {
    const fetchTeacherRequest = async () => {
      try {
        const res = await axiosLocal.get("/api/teacher/request");
        setTeacherRequests(res?.data?.payload?.teacherRequest);
      } catch (err) {
        console.error("Error fetching teacher request:", err);
        // setError(err);
        throw new Error("Teacher request data fetch error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeacherRequest();
  }, [axiosLocal]);

  return (
    <div className="border">
		{isLoading && <p>Loading...</p>}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#F9FAFE]">
            <tr className="uppercase font-bold">
              <th>Name</th>
              <th>Title </th>
              <th>Experience</th>
              <th>Status</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teacherRequests.map((teacherRequest) => (
              <tr key={teacherRequest._id}>
                <td>
                  <div className="flex items-center gap-3 ">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={teacherRequest?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{teacherRequest?.name}</div>
                      <div className="text-sm opacity-50">
                        {teacherRequest?.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {teacherRequest?.title}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Web developer{" "}
                  </span>
                </td>
                <td>{teacherRequest?.experience}</td>

                <th>{teacherRequest?.status}</th>
                <th>
                  <button className="btn btn-primary btn-xs">Approved</button>
                </th>
                <th>
                  <button className="btn btn-primary btn-xs">Reject</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequest;
