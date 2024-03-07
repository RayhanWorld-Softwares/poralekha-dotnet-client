import { useEffect, useState } from "react";
import useAxiosLocal from "../../hooks/useAxiosLocal";

const AdminAllClasses = () => {
  const [allClasses, setAllClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosLocal = useAxiosLocal();

  useEffect(() => {
    const fetchAllClass = async () => {
      try {
        setLoading(true);
        const res = await axiosLocal.get("/api/class/");
        setAllClasses(res?.data?.payload);
      } catch (error) {
        throw new Error("fetch all class from teacher dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllClass();
  }, [axiosLocal]);

  return (
    <div className="border">
		{loading && <p>Loading...</p>}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#F9FAFE]">
            <tr className="uppercase font-bold">
              <th>Name</th>
              <th>Title </th>
              <th>description</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allClasses.map((allClass) => (
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
                <td>
                  {allClass?.title}
                </td>
                
                <td className="my-auto flex ">
                {allClass?.description.length > 150 ? (
                  <p>{allClass?.description.slice(0, 150)}...</p>
                ) : (
                  <p>{allClass?.description}</p>
                )}{" "}
              </td>

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

export default AdminAllClasses;
