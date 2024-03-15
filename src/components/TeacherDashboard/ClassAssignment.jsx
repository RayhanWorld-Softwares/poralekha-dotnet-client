import { MdCreateNewFolder } from "react-icons/md";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import toast from "react-hot-toast";

const ClassAssignment = () => {
  const axiosLocal = useAxiosLocal();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const assignmentInfo = {
      title: data.title,
      endDate: data.endDate,
      description: data.description,
    };

    const res = await axiosLocal.post("/api/assignment", assignmentInfo);
    if (res?.data.success === true) {
      toast.success("Assignment Created Successfully ");
      reset();
    }
  };

  return (
    <div className="py-6 ">
      <div className="flex justify-end mr-16">
        <label
          htmlFor="my_modal_6"
          className="btn border-none bg-[#61adff] hover:bg-[#006ce1] text-white"
        >
          <MdCreateNewFolder size={25} /> <span>Create</span>
        </label>
      </div>

      {/* Modal */}
      <div className="">
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box relative p-12">
            <label
              htmlFor="my_modal_6"
              className="absolute top-0 right-0 p-4 cursor-pointer "
            >
              <span className="text-xl ">
                <AiOutlineCloseCircle size={30} />
              </span>
            </label>

            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="label">Title</label>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="Assignment Title"
                className="input input-bordered input-info w-full"
              />

              <label className="label">End Date</label>
              <input
                {...register("endDate", { required: true })}
                type="date"
                className="input input-bordered input-info w-full"
              />

              <label className="label"></label>
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-info w-full min-h-24"
                placeholder="Description"
              ></textarea>

              <div className="mt-5 mx-auto flex justify-center">
                <button
                  type="submit"
                  className="btn mr-5 bg-[#61adff] hover:bg-[#006ce1] text-white"
                >
                  Create Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassAssignment;
