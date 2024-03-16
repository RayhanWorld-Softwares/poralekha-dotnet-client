import { FiEdit } from "react-icons/fi";
import useLoggingUser from "../../hooks/useLoggingUser";

const StudentProfile = () => {
  const { loggingUser } = useLoggingUser();

  return (
    <div className="flex text-white bg-[#001E2B] h-screen">
      <div className=" w-1/4  flex justify-center py-4 my-4 px-4 bg-[#162C46]">
        <div>
          <div className="avatar flex justify-center items-center">
            <div className="w-24 rounded-full">
              <img src={loggingUser?.image} />
            </div>
          </div>
          <div className="text-center mt-4">
            <h2 className="text-lg font-bold">{loggingUser?.name}</h2>
            <h2 className="">{loggingUser?.role}</h2>
            <h2 className="">{loggingUser?.email}</h2>
            <h2 className="">+8801967310130</h2>
          </div>
        </div>
      </div>

      <div className="w-full m-4  bg-[#162C46] p-4">
        <div className="flex justify-between mb-6">
          <h3>My Profile</h3>
          <FiEdit size={20} />
        </div>

        <div className="flex mb-12">
          <div className="flex justify-between w-1/2">
            <div className="">
              <h3>Full name</h3>
              <h3 className="font-semibold">{loggingUser?.name}</h3>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="">
              <h3>Email</h3>
              <h3 className="font-semibold">{loggingUser?.email}</h3>
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="flex justify-between w-1/2">
            <div className="">
              <h3>Role </h3>
              <h3 className="font-semibold">{loggingUser?.role}</h3>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="">
              <h3>Mobile</h3>
              <h3 className="font-semibold">+8801967-31010</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
