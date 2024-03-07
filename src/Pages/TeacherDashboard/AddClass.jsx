import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import { imageUpload } from "../../Utils/Utils";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  const { user } = useAuth();
  const axiosLocal = useAxiosLocal();
  const navigate = useNavigate();

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
      const ClassInfo = {
        title: data.title,
        name: user?.displayName,
        email: user?.email,
        price: data.price,
        description: data.description,
        image: imageData?.data?.display_url,
      };
      const res = await axiosLocal.post("/api/class", ClassInfo);
      if (res?.data.success === true) {
        toast.success("Class Added Successfully ");
        navigate("/teacher-dashboard/my-classes");
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
          <div className="hero-content flex items-center flex-col md:flex-row  rounded-xl justify-between gap-x-36">
            {/* form area */}
            <div className="card w-full  flex-shrink-0 shadow-2xl">
              <div className="card-body  md:px-16 bg-white rounded-md">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                  <h2 className="text-center text-3xl font-bold my-5">
                    Add New Class
                  </h2>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <div className="form-control">
                      <input
                        type="text"
                        {...register("title", { required: true })}
                        placeholder="Title"
                        className="input input-bordered "
                      />
                      {errors.name && (
                        <span className="text-[#006ce1]">
                          Title is required
                        </span>
                      )}
                    </div>

                    <div className="form-control min-w-[350px]">
                      <input
                        type="text"
                        {...register("price", { required: true })}
                        placeholder="Price $"
                        className="input input-bordered w-full"
                      />
                      {errors.name && (
                        <span className="text-[#006ce1]">
                          price is required
                        </span>
                      )}
                    </div>

                    <div className="border flex items-center rounded-md px-2">
                      {user?.displayName}
                    </div>

                    <div className="border p-3 flex items-center rounded-md ">
                      {user?.email}
                    </div>

                    <div className="border rounded-lg px-2 flex items-center">
                      <input
                        {...register("image", { required: true })}
                        required
                        type="file"
                        id="image"
                        accept="image/*"
                      />
                      {errors.image && (
                        <span className="text-[#D1A054]">
                          Image is required
                        </span>
                      )}
                    </div>

                    <div className="form-control min-w-[350px]">
                      <input
                        type="text"
                        {...register("description", { required: true })}
                        placeholder="Description"
                        className="input input-bordered w-full"
                      />
                      {errors.name && (
                        <span className="text-[#006ce1]">
                          price is required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      type="submit"
                      className="btn   bg-[#61adff] hover:bg-[#006ce1] text-white"
                    >
                      Add Class
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClass;
