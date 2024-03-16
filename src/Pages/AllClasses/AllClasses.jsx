import { useEffect, useState } from "react";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import { Link } from "react-router-dom";

const AllClasses = () => {
  const [allClasses, setAllClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosLocal = useAxiosLocal();

  useEffect(() => {
    const fetchAllClass = async () => {
      try {
        setLoading(true);
        const res = await axiosLocal.get(`/api/class/accepted`);
        setAllClasses(res?.data?.payload?.allClasses);
      } catch (error) {
        throw new Error("fetch all class error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllClass();
  }, [axiosLocal]);

  if (loading) {
    <h2>Loading..</h2>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 md:px-6 xl:px-16 pt-5 pb-12 bg-slate-100 h-screen">
      {allClasses?.map((allClass) => (
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

              <h2>Instructor: {allClass?.name}</h2>
              <h2>Price: ${allClass?.price}</h2>
              <h2>Total enrolment: coming soon</h2>
              <h3>
                {allClass?.description.length > 150 ? (
                  <p>{allClass?.description.slice(0, 140)}...</p>
                ) : (
                  <p>{allClass?.description}</p>
                )}{" "}
              </h3>

              <div className="flex justify-between">
                <Link to={`/class-details/${allClass?._id}`}>
                  <button className="btn btn-sm">Enroll Now </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllClasses;
