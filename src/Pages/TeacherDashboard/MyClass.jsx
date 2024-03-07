import { FiEdit } from "react-icons/fi";
import { MdFolderDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import useAuth from "../../hooks/useAuth";

const MyClass = () => {
  const axiosLocal = useAxiosLocal();
  const { user } = useAuth();

  const [allClasses, setAllClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(allClasses);

  useEffect(() => {
    const fetchAllClass = async () => {
      try {
        setLoading(true);
        const res = await axiosLocal.get(`/api/class/${user?.email}`);
        setAllClasses(res?.data?.payload?.allClass);
      } catch (error) {
        throw new Error("fetch all class from teacher dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchAllClass();
    }
  }, [axiosLocal, user?.email]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 md:px-6 xl:px-16 pt-5 pb-12 bg-slate-100 h-screen">
      {allClasses.map((allClass) => (
        <div key={allClass?._id}>
          <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img
                src={allClass?.image}
                alt="blog"
                className="w-full h-[200px]"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {allClass?.title?.length > 35 ? (
                  <p>{allClass?.title.slice(0, 30)}</p>
                ) : (
                  <p>{allClass?.title}</p>
                )}{" "}
              </h2>

              <h2>Author Name: {allClass?.name}</h2>
              <h2>Author email: {allClass?.email}</h2>
              <h2>Price: ${allClass?.price}</h2>
              <h2>Status: {allClass?.status}</h2>
              <h3>
                {allClass?.description.length > 150 ? (
                  <p>{allClass?.description.slice(0, 140)}...</p>
                ) : (
                  <p>{allClass?.description}</p>
                )}{" "}
              </h3>

              <div className="flex justify-between">
                <button className="btn btn-sm">See Details</button>

                <div className="flex gap-6 items-center">
                  <Link to={`/teacher-dashboard/update-class/${allClass?._id}`}>
                    <FiEdit size={20} />
                  </Link>
				
                  <MdFolderDelete size={25} />
				
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyClass;
