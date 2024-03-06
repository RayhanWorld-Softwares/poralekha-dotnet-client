import { FaSquareGithub } from "react-icons/fa6";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosLocal from "../../hooks/useAxiosLocal";

const SocialLogin = () => {
  const { loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();
  const axiosLocal = useAxiosLocal()

  const handleSignIn = async (provider) => {
    try {
      //1. User Registration
      const result = await provider();
      console.log(result.user);
      if(result?.user){
        const userInfo = {
          name: result?.user.displayName,
          email: result?.user.email,
          image: result?.user.photoURL,
          role: "student",
        };
        const res = await axiosLocal.post("/api/user/register", userInfo);
        if(res?.data.success === true){
          toast.success("Login Successfully");
          navigate("/");
        }
      }
     
    } catch (error) {
      toast.error(error?.message);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between">
      <button
        onClick={() => handleSignIn(loginWithGoogle)}
        type="submit"
        className="btn bg-[#61adff] hover:bg-[#006ce1] text-white  px-5"
      >
        <FcGoogle className="text-4xl" />
        <span className="text-white text-xl font-semibold  py-1">Google</span>
      </button>
      <button
        onClick={() => handleSignIn(loginWithGithub)}
        type="submit"
        className="btn  bg-[#61adff] hover:bg-[#006ce1] text-white px-5"
      >
        <FaSquareGithub  className="text-4xl" />
        <span className="text-white text-xl font-semibold  py-1 ">Github </span>
      </button>
    </div>
  );
};

export default SocialLogin;
