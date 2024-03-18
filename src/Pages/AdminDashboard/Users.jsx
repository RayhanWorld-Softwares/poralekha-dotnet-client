import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosLocal from "../../hooks/useAxiosLocal";

const Users = () => {
  const axiosLocal = useAxiosLocal();
  const [searchValue, setSearchValue] = useState("");

  const getUsers = async () => {
    const res = await axiosLocal.get(`/api/users?email=${searchValue}`);
    return res?.data?.payload?.users;
  };
  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  useEffect(() => {
    refetch();
  }, [searchValue, refetch]);

  const makeAdmin = async (id) => {
    const res = await axiosLocal.put(`/api/users/update/${id}`, {
      role: "admin",
    });
    if (res?.data.success === true) {
      refetch();
    }
  };

  return (
    <div className="bg-[#001E2B] min-h-screen text-white pl-3">
      <div className="overflow-x-auto">
        {/* search bar */}
        <div className="flex justify-center items-center my-6">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search by user email"
            className="input input-bordered input-info w-full max-w-xs bg-[#162C46] text-white"
          />
        </div>
        <table className="table">
          {/* head */}
          <thead className="bg-[#162C46] text-white">
            <tr className="uppercase font-bold">
              <th>Image</th>
              <th>name </th>
              <th>email</th>
              <th>role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3 ">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td className="">
                  <span className=" text-white rounded-lg">
                    {user?.role}
                  </span>
                </td>

                {user?.role === "admin" ? (
                  <th>
                    <button disabled className="btn btn-primary btn-xs ">
                      Make Admin{" "}
                    </button>
                  </th>
                ) : (
                  <th>
                    <button
                      onClick={() => makeAdmin(user?._id)}
                      className="btn border-none bg-[#61adff] hover:bg-[#006ce1] text-white   btn-xs"
                    >
                      Make Admin{" "}
                    </button>
                  </th>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
