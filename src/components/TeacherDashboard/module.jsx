import { MdCreateNewFolder } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Module = ({refetch, moduleId}) => {
  console.log({moduleId});
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (type, timestamp, signature) => {
    const folder = type === "image" ? "images" : "videos";
    const data = new FormData();
    data.append("file", type === "image" ? img : video);
    data.append("timestamp", timestamp);
    data.append("signature", signature);
    data.append("api_key", 698939185558578); //TODO: api_key set to .env.local file in
    data.append("folder", folder);
    try {
      let cloudName = "dudjn6epk"; //TODO: cloud name set to .env.local file in
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const getSignatureForUpload = async (folder) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/sign-upload`, {
        folder,
      });
      console.log("Signature response:", res.data.payload);
      return res.data.payload;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Get signature for Image upload
      const { timestamp: imgTimestamp, signature: imgSignature } =
        await getSignatureForUpload("images");
      // Get signature for Video upload
      const { timestamp: videoTimestamp, signature: videoSignature } =
        await getSignatureForUpload("videos");
      // Upload image file
      const imgUrl = await uploadFile("image", imgTimestamp, imgSignature);
      // Upload video file
      const videoUrl = await uploadFile(
        "video",
        videoTimestamp,
        videoSignature
      );

      // send backend api request
      const response = await axios.post(`http://localhost:5000/api/videos`, {
        title,
        imgUrl,
        videoUrl,
        moduleId
      });
      if (response.status === 200) {
        toast.success("File upload Successfully ");
        setLoading(false);
        document.getElementById("my_modal_7").checked = false;
        refetch()
      }
      // reset status
      setTitle("")
      setImg(null);
      setVideo(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-6 ">
      <div className="flex justify-end mr-16">
        <label
          htmlFor="my_modal_7"
          className="btn border-none bg-[#61adff] hover:bg-[#006ce1] text-white"
        >
          <MdCreateNewFolder size={25} /> <span>Add Resource</span>
        </label>
      </div>

      {/* Modal */}
      <div className="">
        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box relative p-12 bg-[#162C46] text-white">
            {/* close btn icon */}
            <label
              htmlFor="my_modal_7"
              className="absolute top-0 right-0 p-4 cursor-pointer "
            >
              <span className="text-xl ">
                <AiOutlineCloseCircle size={30} />
              </span>
            </label>

            {/* input form */}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title">Title</label>
                <br />
                <input
                  type="text"
                  required
                  id="title"
                  placeholder="Title"
                  className="w-full p-2 rounded-md text-black"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="video">Video:</label>
                <br />
                <input
                  required
                  type="file"
                  accept="video/*"
                  id="video"
                  onChange={(e) => setVideo((prev) => e.target.files[0])}
                />
              </div>
              <br />
              <div>
                <label htmlFor="img">Image:</label>
                <br />
                <input
                  required
                  type="file"
                  accept="image/*"
                  id="img"
                  onChange={(e) => setImg((prev) => e.target.files[0])}
                />
              </div>
              <div className="flex flex-col ">
                {loading && (
                  <progress className="progress text-white bg-white w-56 my-5"></progress>
                )}

                {loading ? (
                  "Please wait"
                ) : (
                  <button
                    className="btn btn-sm mt-12 border-none bg-[#61adff] hover:bg-[#006ce1] text-white"
                    type="submit"
                  >
                    Upload Resource{" "}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module;
