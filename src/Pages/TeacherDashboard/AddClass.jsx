import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../Utils/Utils";
import useAuth from "../../hooks/useAuth";
import useAxiosLocal from "../../hooks/useAxiosLocal";

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
        status: "pending",
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
      <div className="w-full min-h-screen flex bg-cover bg-center bg-[#001E2B]">
        <div className="hero">
          <div className="hero-content flex items-center flex-col md:flex-row  rounded-xl justify-between pl-0 pr-6 lg:pr-0 ">
            {/* form area */}
            <div className="card w-full  flex-shrink-0 shadow-2xl text-white">
              <div className="card-body mt-12 xl:mt-0 lg:px-16 bg-[#162C46] rounded-md">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                  <h2 className="text-center text-3xl font-bold my-5">
                    Add New Class
                  </h2>

                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="form-control">
                      <input
                        type="text"
                        {...register("title", { required: true })}
                        placeholder="Title"
                        className="input input-bordered bg-[#162C46] border-white focus:border-white"
                      />
                      {errors.name && (
                        <span className="text-[#006ce1]">
                          Title is required
                        </span>
                      )}
                    </div>

                    <div className="form-control ">
                      <input
                        type="text"
                        {...register("price", { required: true })}
                        placeholder="Price $"
                        className="input input-bordered w-full bg-[#162C46] border-white focus:border-white"
                      />
                      {errors.name && (
                        <span className="text-[#006ce1]">
                          price is required
                        </span>
                      )}
                    </div>

                    <div className="border flex items-center rounded-md px-2 py-2.5 md:py-0">
                      {user?.displayName}
                    </div>

                    <div className="border p-3 flex items-center rounded-md ">
                      {user?.email}
                    </div>

                    <div className="border rounded-lg px-2 flex items-center py-2.5 md:py-0">
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

                    <div className="form-control ">
                      <input
                        type="text"
                        {...register("description", { required: true })}
                        placeholder="Description"
                        className="input input-bordered w-full bg-[#162C46] border-white focus:border-white"
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
