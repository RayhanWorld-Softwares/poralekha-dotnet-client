/* eslint-disable no-unused-vars */
import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import { useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
// import ClassFeedbackForm from "../AdminDashboard/ClassFeedbackForm";
// import moment from "moment";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import Certificate from "../../components/Certificate/Certificate";

const MyEnrollClassDetails = () => {
  const axiosLocal = useAxiosLocal();
  const { payload } = useLoaderData();
  const [moduleVideos, setModuleVideos] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  console.log({ selectedVideoUrl });

  // const getAssignment = async () => {
  //   const res = await axiosLocal.get(`/api/assignment`);
  //   return res?.data?.payload;
  // };
  // const { data: assignments } = useQuery({
  //   queryKey: ["assignments"],
  //   queryFn: getAssignment,
  // });

  const getAllClassModule = async () => {
    const res = await axiosLocal.get(`/api/classModule/${payload?.classId}`);
    return res?.data?.payload;
  };
  const { data: classModules, refetch } = useQuery({
    queryKey: ["classModules"],
    queryFn: getAllClassModule,
  });

  const handleModule = async (moduleId) => {
    const res = await axiosLocal.get(`/api/videos/${moduleId}`);
    setModuleVideos(res.data?.payload);
    console.log(res.data?.payload);
  };

  const handleModuleVideo = async (videoUrl) => {
    console.log({ videoUrl });
    setSelectedVideoUrl(videoUrl);
  };

  return (
    <div className="bg-[#001E2B] min-h-screen text-white">
      {/* certificate  */}
      {/* <PDFDownloadLink document={<Certificate courseName={payload?.classTitle} name={payload?.name} />} fileName="certificate.pdf">
        {({ loading, url, error, blob }) =>
          loading ? (
            <button >Loading Document ...</button>
          ) : (
            <button className="btn flex justify-center items-center mx-auto ">Download Now!</button>
          )
        }
      </PDFDownloadLink> */}

      {/* TED Feedback section */}
      {/* <ClassFeedbackForm payload={payload} /> */}

      {/* assignment info */}
      {/* <div className="overflow-x-auto ">
        <table className="table">
          <thead className="bg-[#162C46] text-white">
            <tr className="uppercase font-bold">
              <th>Title </th>
              <th>description</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments?.map((assignment) => (
              <tr key={assignment._id}>
                <td>
                  <div className="flex items-center gap-3 ">
                    <div>
                      <div className="text-sm ">{assignment?.title}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-sm max-w-96">
                    {assignment?.description}{" "}
                  </div>
                </td>
                <td>
                  <div className="text-sm max-w-96">
                    {moment(assignment?.endDate).format("DD-MM-YYYY hh:mm a")}{" "}
                  </div>
                </td>

                <th>
                  <button className="btn btn-sm border-none bg-[#61adff] hover:bg-[#006ce1] text-white  ">
                    Submit
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      {/* module section */}
      <div className="flex gap-10 min-h-screen">
        {/* video area */}
        <div className=" w-4/6 ml-7 ">
          <ReactPlayer
            controls
            playIcon
            playing
            pip={true}
            width={"100%"}
            height={"400px"}
            url={selectedVideoUrl}
          />
        </div>

        {/* module list */}
        <div className=" w-1/3 mr-3 bg-[#162C46] ">
          {classModules?.map((classModule) => (
            <div
              onClick={() => handleModule(classModule?._id)}
              key={classModule?._id}
            >
              <div className="collapse collapse-arrow rounded-sm mb-4">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                  Module {classModule?.moduleNumber} :{" "}
                  {classModule?.moduleTitle}
                </div>
                <div className="collapse-content mx-3 ">
                  {moduleVideos?.map((moduleVideo) => (
                    <div
                      className="cursor-pointer"
                      key={moduleVideo?._id}
                      onClick={() => handleModuleVideo(moduleVideo?.videoUrl)}
                    >
                      <div className="border-b py-6 shadow-2xl mb-2 px-2 shadow-slate-950">
                        <h2>{moduleVideo?.title}</h2>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyEnrollClassDetails;
