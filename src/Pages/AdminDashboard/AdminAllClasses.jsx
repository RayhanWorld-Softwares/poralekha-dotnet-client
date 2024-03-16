// import { useEffect, useState } from "react";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const AdminAllClasses = () => {
  // const [allClasses, setAllClasses] = useState([]);
  // const [loading, setLoading] = useState(true);
  const axiosLocal = useAxiosLocal();

  const getAllClasses = async () => {
    const res = await axiosLocal.get("/api/class/");
    return res?.data?.payload;
  };
  const { data: allClasses, refetch } = useQuery({
    queryKey: ["allClasses"],
    queryFn: getAllClasses,
  });

  const handleStatusUpdate = async (id, status) => {
    try {
      const updateStatus = { status };
      const res = await axiosLocal.put(`/api/class/${id}`, updateStatus);
      if (res?.data?.payload?.status === status) {
        refetch();
        toast.success(`class (${status})`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleApproved = async (id) => {
    await handleStatusUpdate(id, "accepted");
  };
  const handleReject = async (id) => {
    await handleStatusUpdate(id, "rejected");
  };

  return (
    <div className="bg-[#001E2B] h-screen text-white">
      {/* {loading && <p>Loading...</p>} */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#162C46] text-white">
            <tr className="uppercase font-bold">
              <th>Name</th>
              <th>Title </th>
              <th>description</th>
              <th>Action</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allClasses?.map((allClass) => (
              <tr key={allClass._id}>
                <td>
                  <div className="flex items-center gap-3 ">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={allClass?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm opacity-50">
                        {allClass?.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{allClass?.title}</td>

                <td className="my-auto flex ">
                  {allClass?.description.length > 150 ? (
                    <p>{allClass?.description.slice(0, 150)}...</p>
                  ) : (
                    <p>{allClass?.description}</p>
                  )}{" "}
                </td>

                {/* see progress */}
                {allClass?.status === "accepted" ? (
                  <th>
                    <Link
                      to={`/admin-dashboard/class-feedback-view/${allClass?._id}`}
                    >
                      <button className="btn border-none bg-[#61adff] hover:bg-[#006ce1] text-white   btn-sm">
                        See Progress
                      </button>
                    </Link>
                  </th>
                ) : (
                  <th>
                    <button disabled className="btn btn-primary btn-sm ">
                      See Progress
                    </button>
                  </th>
                )}

                {allClass?.status === "pending" ? (
                  <>
                    <th>
                      <button
                        className="btn border-none bg-[#61adff] hover:bg-[#006ce1] text-white   btn-sm"
                        onClick={() => handleApproved(allClass._id)}
                      >
                        Approve
                      </button>
                    </th>
                    <th>
                      <button
                        className="btn border-none bg-[#d14249] hover:bg-[#c6131b] text-white btn-sm"
                        onClick={() => handleReject(allClass?._id)}
                      >
                        Reject
                      </button>
                    </th>
                  </>
                ) : (
                  <>
                    <th>
                      <button className="btn btn-primary btn-sm" disabled>
                        Approve
                      </button>
                    </th>
                    <th>
                      <button className="btn btn-primary btn-sm" disabled>
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

export default AdminAllClasses;
