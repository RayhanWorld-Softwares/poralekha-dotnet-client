import useAxiosLocal from "../../hooks/useAxiosLocal";
import toast from "react-hot-toast";
import useLoggingUser from "../../hooks/useLoggingUser";
import { useQuery } from "@tanstack/react-query";

const TeacherRequest = () => {
  const axiosLocal = useAxiosLocal();
  const { loggingUser } = useLoggingUser();

  const getTeacherRequest = async () => {
    const res = await axiosLocal.get("/api/teacher");
    return res?.data?.payload?.teacherRequest;
  };
  const { data: teacherRequests, refetch } = useQuery({
    queryKey: ["teacherRequests"],
    queryFn: getTeacherRequest,
  });

  const handleStatusUpdate = async (id, status) => {
    try {
      const updateStatus = { status };
      const res = await axiosLocal.put(`/api/teacher/${id}`, updateStatus);
      if (res?.data?.payload?.status === status) {
        toast.success(`teacher request (${status})`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleApproved = async (id) => {
    await handleStatusUpdate(id, "accepted");
    await axiosLocal.put(`/api/users/update/${loggingUser?._id}`, {
      role: "teacher",
    });
    refetch();
  };
  const handleReject = async (id) => {
    await handleStatusUpdate(id, "rejected");
    refetch();
  };

  return (
    <div className=" bg-[#001E2B] h-screen text-white">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#162C46] text-white">
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
            {teacherRequests?.map((teacherRequest) => (
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

                {teacherRequest?.status === "pending" ? (
                  <>
                    {" "}
                    <th>
                      <button
                        className="btn border-none bg-[#61adff] hover:bg-[#006ce1] text-white   btn-xs"
                        onClick={() => handleApproved(teacherRequest?._id)}
                      >
                        Approved
                      </button>
                    </th>
                    <th>
                      <button
                        className="btn border-none bg-[#d14249] hover:bg-[#c6131b] text-white btn-sm"
                        onClick={() => handleReject(teacherRequest?._id)}
                      >
                        Reject
                      </button>
                    </th>
                  </>
                ) : (
                  <>
                    <th>
                      <button className="btn btn-primary btn-xs " disabled>
                        Approved
                      </button>
                    </th>
                    <th>
                      <button className="btn btn-primary btn-xs" disabled>
                        Reject
                      </button>
                    </th>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequest;
