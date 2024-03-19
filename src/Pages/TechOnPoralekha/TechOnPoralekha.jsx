import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import useLoggingUser from "../../hooks/useLoggingUser";
import Container from "../../components/Container/Container";

const TechOnPoralekha = () => {
  const { user } = useAuth();
  const axiosLocal = useAxiosLocal();
  const { loggingUser } = useLoggingUser();

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const userInfo = {
        name: data.name,
        email: user?.email,
        image: user?.photoURL,
        title: data.title,
        category: data.category,
        experience: data.experience,
        status: "pending",
        userId: loggingUser?._id,
      };
      const res = await axiosLocal.post("/api/teacher", userInfo);
      if (res?.data.success === true) {
        toast.success("Application Submit Successfully ");
        reset();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="bg-[#f9fdff]">
    <Container>
      <div className="w-full min-h-screen flex bg-cover bg-center bg-[#f9fdff]">
        <div className="hero">
          <div className="hero-content flex items-center flex-col lg:flex-row  rounded-xl justify-between xl:gap-x-36 ">
            {/* image area */}
            <div className="text-center hidden lg:flex lg:text-left w-1/2">
              <img
                className="w-[85%]"
                src="https://i.postimg.cc/q7MMyVSM/bigstock-vector-application-form-clipart-white-448033435-1200px-removebg-preview.png"
                alt=""
              />
            </div>

            {/* form area */}
            <div className="card w-1/1  flex-shrink-0 shadow-2xl">
              <div className="card-body  md:w-[450px] md:px-16 bg-white rounded-md">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                  <h2 className="text-center text-3xl font-bold mt-5">
                    Teaching Now
                  </h2>

                  <div className="form-control">
                    <label className="label"></label>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      placeholder="Name"
                      className="input input-bordered "
                    />
                    {errors.name && (
                      <span className="text-[#006ce1]">Name is required</span>
                    )}
                  </div>

                  <div className="form-control ">
                    <label className="label"></label>
                    <input
                      type="text"
                      {...register("title", { required: true })}
                      placeholder="Title"
                      className="input input-bordered "
                    />
                    {errors.name && (
                      <span className="text-[#006ce1]">Name is required</span>
                    )}
                  </div>

                  <div className="py-3 ">
                    <label className="text-lg gap-5 font-semibold ">
                      <Controller
                        name="experience"
                        control={control}
                        defaultValue="" // Set your default value if needed
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="radio"
                              value="beginner"
                              id="beginner"
                              className="mr-1"
                            />
                            <label htmlFor="beginner">Beginner</label>

                            <input
                              {...field}
                              className="mx-1"
                              type="radio"
                              value="experienced"
                              id="experienced"
                            />
                            <label htmlFor="experienced">Experienced</label>

                            <input
                              {...field}
                              className="mx-1"
                              type="radio"
                              value="some idea"
                              id="some idea"
                            />
                            <label htmlFor="some idea">Some idea</label>
                          </>
                        )}
                      />
                    </label>
                  </div>

                  <select
                    className="border py-3 rounded-md w-full  text-lg font-semibold"
                    {...register("category", { required: true })}
                  >
                    <option disabled selected required>
                      Select to Category
                    </option>
                    <option value="web development">Web Development</option>
                    <option value="video editing">Video Editing</option>
                    <option value="digital marketing">
                      Digital Marketing{" "}
                    </option>
                    <option value="digital marketing">
                      Digital Marketing{" "}
                    </option>
                    <option value="graphics design">Graphics Design</option>
                    <option value="3d animation">3D Animation</option>
                  </select>

                  <div className="mt-6 flex justify-center">
                    <button
                      type="submit"
                      className="btn   bg-[#61adff] hover:bg-[#006ce1] text-white"
                    >
                      Submit for review{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
    </div>
  );
};

export default TechOnPoralekha;
