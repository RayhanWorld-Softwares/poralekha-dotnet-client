import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { imageUpload } from "../../Utils/Utils";
import useAuth from "../../hooks/useAuth";
import useAxiosLocal from "../../hooks/useAxiosLocal";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(true);
  const axiosLocal = useAxiosLocal();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const image = data.image[0];

    try {
      const imageData = await imageUpload(image);
      // user registration with firebase
      const result = await createUser(data.email, data.password);
      console.log(result);

      // profile update and data send to DB
      await updateUserProfile(data.name, imageData?.data?.display_url);
      const userInfo = {
        name: data.name,
        email: data.email,
        image: imageData?.data?.display_url,
        role: "student",
      };
      const res = await axiosLocal.post("/api/users/register", userInfo);
      if(res?.data.success === true){
        toast.success("Registration Successfully ")
        reset()
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Poralekha | Register Now</title>
      </Helmet>

      <div className="w-full min-h-screen flex bg-cover bg-center bg-[#f9fdff]">
        <div className="hero">
          <div className="hero-content flex flex-col md:flex-row  rounded-xl justify-between">
            <div className="text-center hidden md:flex lg:text-left w-1/2">
              <img
                className=""
                src="https://i.postimg.cc/FRpbRLxf/3d-account-login-password-form-165488-5795.avif"
                alt=""
              />
            </div>
            <div className="card w-1/1  flex-shrink-0 shadow-2xl">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body w-[380px] md:w-[450px] md:px-16 bg-white rounded-md"
              >
                <h2 className="text-center text-3xl font-bold mt-5">
                  Register Now
                </h2>

                <div className="form-control">
                  <label className="label"></label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Full Name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-[#D1A054]">Name is required</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label"></label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                    className="input input-bordered "
                  />
                  {errors.email && (
                    <span className="text-[#006ce1]">Email is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label"></label>
                  <input
                    type={isShow ? "password" : "text"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                    placeholder="Password"
                    className="input input-bordered  relative"
                  />

                  {errors.password?.type === "required" && (
                    <p className="text-[#006ce1]">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-[#006ce1]">
                      Password must be 6 Character
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-[#006ce1]">
                      Password must be less den 20 Character
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-[#006ce1]">
                      Password must have one upper case one lower carse, one
                      number and one special character
                    </p>
                  )}

                  <p
                    onClick={() => setIsShow(!isShow)}
                    className="text-xl absolute cursor-pointer mt-7 ml-[290px]"
                  >
                    {isShow ? (
                      <FaEyeSlash size={25} className="text-black" />
                    ) : (
                      <FaEye size={25} className="text-black" />
                    )}
                  </p>
                </div>

                <div>
                  <label htmlFor="image" className="block mb-2 text-sm">
                    Select Profile Image:
                  </label>
                  <input
                    {...register("image", { required: true })}
                    required
                    type="file"
                    id="image"
                    accept="image/*"
                  />
                  {errors.image && (
                    <span className="text-[#D1A054]">Image is required</span>
                  )}
                </div>

                <div className="form-control mt-2">
                  <button
                    type="submit"
                    className="btn mr-5 bg-[#61adff] hover:bg-[#006ce1] text-white  "
                  >
                    Register Now
                  </button>
                  <p className=" text-center mt-2">
                    Already have Account?{" "}
                    <Link to={"/login"}>
                      <span className="font-semibold text-[#006ce1]">
                        Login Now
                      </span>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
