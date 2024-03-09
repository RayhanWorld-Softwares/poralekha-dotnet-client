import { Link, useLoaderData } from "react-router-dom";

const ClassDetails = () => {
  const { payload } = useLoaderData();
  console.log(payload);

  return (
    <div className="w-full px-2 md:px-6 lg:px-16 xl:px-44 mx-auto bg-slate-100">
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
            <Link to={`/payment/${payload?._id}`} className="btn btn-sm">
              Pay Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
