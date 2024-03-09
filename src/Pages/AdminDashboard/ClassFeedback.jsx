import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import toast from "react-hot-toast";

const ClassFeedback = () => {
  const { user } = useAuth();
  const axiosLocal = useAxiosLocal();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const feedback = {
        userName: data.name,
        title: data.title,
        feedbackText: data.feedback,
        image: user?.photoURL,
      };
      const res = await axiosLocal.post("/api/feedback", feedback);
      if (res?.data.success === true) {
        toast.success("Feedback submit Successfully ");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Poralekha | Feedback</title>
      </Helmet>

      <div className="w-full min-h-screen flex bg-cover bg-center bg-[#f9fdff]">
        <div className="hero">
          <div className="hero-content flex flex-col md:flex-row  rounded-xl justify-between">
            <div className="card w-full flex-shrink-0 shadow-2xl">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body w-full md:px-16 bg-white rounded-md"
              >
                <div className="avatar flex justify-center items-center">
                  <div className="w-24 rounded-full">
                    <img src="https://i.postimg.cc/8zDJKtRW/feedback-message-5351721-4471252.webp" />
                  </div>
                </div>

                <div className="flex gap-12">
                  <div className="form-control">
                    <label className="label"></label>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      placeholder="Full Name"
                      className="input input-bordered w-80"
                    />
                    {errors.name && (
                      <span className="text-[#D1A054]">Name is required</span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label"></label>
                    <input
                      type="text"
                      {...register("title", { required: true })}
                      placeholder="Class Title"
                      className="input input-bordered  w-80"
                    />
                    {errors.title && (
                      <span className="text-[#006ce1]">title is required</span>
                    )}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label"></label>

                  <textarea
                    type="text"
                    {...register("feedback", { required: true })}
                    className="textarea textarea-bordered textarea-lg"
                    placeholder="Feedback Text"
                  ></textarea>
                  {errors.title && (
                    <span className="text-[#006ce1]">title is required</span>
                  )}
                </div>

                <div className="form-control mt-2">
                  <button
                    type="submit"
                    className="btn  bg-[#61adff] hover:bg-[#006ce1] text-white  "
                  >
                    Submit Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassFeedback;
