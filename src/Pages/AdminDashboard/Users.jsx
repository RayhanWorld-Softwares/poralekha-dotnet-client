import { useEffect, useState } from "react";
import useAxiosLocal from "../../hooks/useAxiosLocal";

const Users = () => {
  const axiosLocal = useAxiosLocal();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosLocal.get("/api/users");
        setUsers(res?.data?.payload?.users);
      } catch (err) {
        console.error("Error fetching users request:", err);
        // setError(err);
        throw new Error("users data fetch error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [axiosLocal]);

  return (
    <div className="border">
      {isLoading && <p>Loading...</p>}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#F9FAFE]">
            <tr className="uppercase font-bold">
              <th>Image</th>
              <th>name </th>
              <th>email</th>
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
                <th>
                  <button className="btn btn-primary btn-xs">Make Admin </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
