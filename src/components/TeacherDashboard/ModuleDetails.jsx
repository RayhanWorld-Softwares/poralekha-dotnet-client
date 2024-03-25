import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Module from "../../components/TeacherDashboard/module";
import useAxiosLocal from "../../hooks/useAxiosLocal";

const ModuleDetails = () => {
  const { id: moduleId } = useParams();
  console.log(moduleId);

  const axiosLocal = useAxiosLocal();

  const getAllVideos = async () => {
    const res = await axiosLocal.get(`/api/videos/${moduleId}`);
    return res?.data?.payload;
  };
  const { data: Videos, refetch } = useQuery({
    queryKey: ["Videos"],
    queryFn: getAllVideos,
  });

  return (
    <div className="ml-2 bg-[#001E2B] min-h-screen text-white">
      <h2>module details page this is module ID: {moduleId}</h2>
      {/* add resourse module video section  */}
      <Module moduleId={moduleId} refetch={refetch} />

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#162C46] text-white">
            <tr className="uppercase font-bold">
              <th>MV SL</th>
              <th>title</th>
              <th>img url </th>
              <th>video url </th>
              <th>pdf url </th>
            </tr>
          </thead>
          <tbody>
            {Videos?.map((video) => (
              <tr className="" key={video._id}>
                <td>{video?.moduleSerial}</td>
                <td>{video?.title}</td>
                <th>
                  {" "}
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={video?.imgUrl}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </th>
                {/* <th>{video?.videoUrl}</th> */}
                <th>
                  <Link className="border p-2" to={video?.videoUrl}>
                    Video URL
                  </Link>
                </th>
                {video?.pdfUrl ? (
                  <div className="dropdown dropdown-left text-black">
                    <div
                      tabIndex={0}
                      role="button"
                      className="border text-white p-2 mt-5 m-1"
                    >
                      Pdf Url
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit py-10"
                    >
                      <li>{video?.pdfUrl}</li>
                    </ul>
                  </div>
                ) : (
                  <h2 className="mt-6 ml-4">N/A</h2>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModuleDetails;
