import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import useLoggingUser from "../../hooks/useLoggingUser";
import Container from "../../components/Container/Container";

const ClassDetails = () => {
  const { payload } = useLoaderData();
  const { loggingUser } = useLoggingUser();
  const axiosLocal = useAxiosLocal();
  console.log(loggingUser);

  const handleOrder = async (id) => {
    console.log(id);
    const orderInfo = {
      userId: loggingUser?._id,
      name: loggingUser?.name,
      email: loggingUser?.email,
      classId: id,
    };
    console.log(orderInfo);

    const res = await axiosLocal.post("/api/order", orderInfo);
    if (res?.data?.url) {
      toast.success("order post successfully ");
      window.location.replace(res?.data?.url);
      console.log(26, res?.data);
    }
  };

  return (
    <div className="bg-slate-100 lg:px-24 min-h-screen">
    <Container>
      <div className="w-full ">
        <div className="card card-compact bg-base-100 rounded-t-lg">
          <figure>
            <img
              src={payload?.image}
              alt="blog"
              className="w-full h-[250px] md:h-[400px]"
            />
          </figure>
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h2 className="card-title">{payload?.title}</h2>
            </div>

            <p>{payload?.description}</p>
            <p>Instructor: {payload?.name}</p>
            <p>Price: $ {payload?.price}</p>
            <div className="card-actions ">
              <button
                onClick={() => handleOrder(payload?._id)}
                className="btn "
              >
                Pay Now{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
    </div>
  );
};

export default ClassDetails;
