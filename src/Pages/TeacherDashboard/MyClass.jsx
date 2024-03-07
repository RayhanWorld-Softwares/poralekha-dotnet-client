import { FiEdit } from "react-icons/fi";
import { MdFolderDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const MyClass = () => {
  const axiosLocal = useAxiosLocal();
  const { user } = useAuth();

  const [myClasses, setMyClasses] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMyClass = async () => {
      try {
        setLoading(true);
        const res = await axiosLocal.get(`/api/class/${user?.email}`);
        setMyClasses(res?.data?.payload?.allClass);
      } catch (error) {
        throw new Error("fetch all class from teacher dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
		fetchMyClass();
    }
  }, [axiosLocal, user?.email]);

  if(loading){
	<h2>Loading..</h2>
  }

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: "swal-wide",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosLocal.delete(`/api/class/${id}`).then((res) => {
          if (res?.data.success === true) {
            console.log(id);
            const remaining = myClasses.filter((asset) => asset._id !== id);
            setMyClasses(remaining);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 md:px-6 xl:px-16 pt-5 pb-12 bg-slate-100 h-screen">
      {myClasses.map((myClass) => (
        <div key={myClass?._id}>
          <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img
                src={myClass?.image}
                alt="blog"
                className="w-full h-[200px]"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {myClass?.title?.length > 35 ? (
                  <p>{myClass?.title.slice(0, 30)}</p>
                ) : (
                  <p>{myClass?.title}</p>
                )}{" "}
              </h2>

              <h2>Author Name: {myClass?.name}</h2>
              <h2>Author email: {myClass?.email}</h2>
              <h2>Price: ${myClass?.price}</h2>
              <h2>Status: {myClass?.status}</h2>
              <h3>
                {myClass?.description.length > 150 ? (
                  <p>{myClass?.description.slice(0, 140)}...</p>
                ) : (
                  <p>{myClass?.description}</p>
                )}{" "}
              </h3>

              <div className="flex justify-between">
                <button className="btn btn-sm">See Details</button>

                <div className="flex gap-6 items-center shadow-2xl">
                  <Link to={`/teacher-dashboard/update-class/${myClass?._id}`}>
                    <button className="btn btn-sm">
                      <FiEdit size={20} />
                    </button>
                  </Link>

                  <button
                    className="btn btn-sm"
                    onClick={() => handleDelete(myClass?._id)}
                  >
                    <MdFolderDelete size={30} />
                  </button>
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
