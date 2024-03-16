import { useQuery } from "@tanstack/react-query";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import useAuth from "../../hooks/useAuth";

const MyRequest = () => {
  const { user } = useAuth();
  const axiosLocal = useAxiosLocal();

  const getMyRequest = async () => {
    const res = await axiosLocal.get(`/api/teacher/${user?.email}`);
    return res?.data?.payload;
  };
  const { data: requests } = useQuery({
    queryKey: ["requests"],
    queryFn: getMyRequest,
  });

  console.log(requests);

  if (!requests) {
    return <h2>Loading..</h2>;
  }

  return (
    <div className="bg-[#001E2B] h-screen text-white">
      <div className="overflow-x-auto pt-2 ">
        <table className="table ">
          {/* head */}
          <thead className="bg-[#162C46] text-white rounded-lg">
            <tr className="uppercase font-bold">
              <th>Name</th>
              <th>Title </th>
              <th>Experience</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests?.map((request) => (
              <tr key={request._id}>
                <td>
                  <div className="flex items-center gap-3 ">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={request?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{request?.name}</div>
                      <div className="text-sm opacity-50">{request?.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {request?.title}
                  
                </td>
                <td>{request?.experience}</td>
                <th>{request?.status}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRequest;
