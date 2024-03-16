/* eslint-disable react/prop-types */
import { BsStarFill, BsStar } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { VscFeedback } from "react-icons/vsc";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import toast from "react-hot-toast";
import { useState } from "react";
import Rating from "react-rating";

const ClassFeedbackForm = ({ payload }) => {
  const { user } = useAuth();
  const axiosLocal = useAxiosLocal();
  const [rating, setRating] = useState(0);

  const {
    register,
    reset,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const feedback = {
        userName: user?.displayName,
        title: payload?.classTitle,
        feedbackText: data.feedbackText,
        image: user?.photoURL,
        rating: rating,
      };
      console.log(feedback);
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
    <div className="bg-[#001E2B] ">
      <Helmet>
        <title>Poralekha | Feedback</title>
      </Helmet>
      {/* TED Feedback section */}
      <div className="py-6 ">
        <div className="flex justify-end mr-10">
          <label
            htmlFor="my_modal_6"
            className="btn btn-sm border-none bg-[#61adff] hover:bg-[#006ce1] text-white"
          >
            <VscFeedback size={20} /> <span>TER</span>
          </label>
        </div>

        {/* Modal */}
        <div className="">
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal " role="dialog">
            <div className="modal-box relative p-12 bg-[#001E2B]  ">
              <label
                htmlFor="my_modal_6"
                className="absolute top-0 right-0 p-4 cursor-pointer "
              >
                <span className="text-xl ">
                  <AiOutlineCloseCircle size={30} />
                </span>
              </label>
              <div className="avatar flex justify-center">
                <div className="w-24 rounded-full">
                  <img src="https://i.postimg.cc/8zDJKtRW/feedback-message-5351721-4471252.webp" />
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="label"></label>

                <label className="label">Rating </label>
                <Rating
                  emptySymbol={
                    <BsStar
                      size={30}
                      className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                    />
                  }
                  fullSymbol={
                    <BsStarFill size={30} className="text-yellow-400" />
                  }
                  fractions={2}
                  onClick={(value) => setRating(value)}
                />

                <label className="label"></label>
                <textarea
                  {...register("feedbackText", { required: true })}
                  className="textarea textarea-info w-full min-h-32 bg-[#162C46] border-white focus:border-[#006ce1]"
                  placeholder="Feedback Text"
                ></textarea>

                <div className="mt-5 mx-auto flex justify-center">
                  <button
                    type="submit"
                    className="btn mr-5 bg-[#61adff] hover:bg-[#006ce1] text-white border-none"
                  >
                    Send Now
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

export default ClassFeedbackForm;
