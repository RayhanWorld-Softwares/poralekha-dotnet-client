import { MdCreateNewFolder } from "react-icons/md";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import toast from "react-hot-toast";

const AddModule = ({ classId, refetch }) => {
  const axiosLocal = useAxiosLocal();

  const {
    register,
    reset,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const moduleInfo = {
      moduleTitle: data.moduleTitle,
      classId: classId,
    };
    const res = await axiosLocal.post("/api/classModule", moduleInfo);
    if (res?.data.success === true) {
      toast.success("Module Created Successfully ");
      reset();
      refetch();
      document.getElementById("my_modal_8").checked = false;
    }
  };

  return (
    <div className="py-6 ">
      <div className="flex justify-end mr-16">
        <label
          htmlFor="my_modal_8"
          className="btn border-none bg-[#61adff] hover:bg-[#006ce1] text-white"
        >
          <MdCreateNewFolder size={25} /> <span>Add Module </span>
        </label>
      </div>

      {/* Modal */}
      <div className="">
        <input type="checkbox" id="my_modal_8" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box relative p-12 bg-[#162C46] text-white">
            <label
              htmlFor="my_modal_8"
              className="absolute top-0 right-0 p-4 cursor-pointer "
            >
              <span className="text-xl ">
                <AiOutlineCloseCircle size={30} />
              </span>
            </label>

            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="label">Module Title </label>
              <input
                {...register("moduleTitle", { required: true })}
                type="text"
                placeholder="module title"
                className="input input-bordered input-info w-full text-black"
              />

              <div className="mt-5 mx-auto flex justify-center">
                <button
                  type="submit"
                  className="btn mr-5 bg-[#61adff] hover:bg-[#006ce1] text-white"
                >
                  Add Module
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModule;
