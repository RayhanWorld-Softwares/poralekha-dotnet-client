import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [isShow, setIsShow] = useState(true);
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    <h2>Loading...</h2>;
  }

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await signIn(data?.email, data?.password);
      if (res?.user) {
        navigate("/");
        toast.success("Login Successful");
        reset();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex bg-cover bg-center bg-[#f9fdff]">
        <div className="hero">
          <div className="hero-content flex flex-col md:flex-row  rounded-xl justify-between">
            {/* image area */}
            <div className="text-center hidden md:flex lg:text-left w-1/2">
              <img
                className=""
                src="https://i.postimg.cc/FRpbRLxf/3d-account-login-password-form-165488-5795.avif"
                alt=""
              />
            </div>

            {/* form area */}
            <div className="card w-1/1  flex-shrink-0 shadow-2xl">
              <div className="card-body w-[380px] md:w-[450px] md:px-16 bg-white rounded-md">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                  <h2 className="text-center text-3xl font-bold mt-5">Login</h2>

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
                      className="input input-bordered relative"
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

                    <button
                      type="submit"
                      className="btn mt-4  bg-[#61adff] hover:bg-[#006ce1] text-white  "
                    >
                      Login In
                    </button>
                  </div>
                </form>
                <div className="form-control ">
                  <div className="mt-3">
                    <SocialLogin />
                  </div>
                  <p className=" text-center mt-2">
                    Are you new user?{" "}
                    <Link to={"/register"}>
                      <span className="font-semibold text-[#006ce1]">
                        Register Now
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
