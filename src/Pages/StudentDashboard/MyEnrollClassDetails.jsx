/* eslint-disable no-unused-vars */
import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import ClassFeedbackForm from "../AdminDashboard/ClassFeedbackForm";
// import moment from "moment";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import Certificate from "../../components/Certificate/Certificate";
import { pdfjs } from "react-pdf";
import PdfDocumentViewer from "../../components/PdfDocumentViewer/PdfDocumentViewer";
import StudentQuizForm from "./StudentQuizForm";
import useAuth from "../../hooks/useAuth";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const MyEnrollClassDetails = () => {
  const axiosLocal = useAxiosLocal();
  const { payload } = useLoaderData();
  const [moduleVideos, setModuleVideos] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  console.log({ selectedVideoUrl });

  const { user } = useAuth();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  console.log(selectedQuiz);
  console.log(selectedModuleId);
  // useEffect(() => {
  //   const fetchQuizzes = async () => {
  //     try {
  //       const response = await axiosLocal.get(`/api/quiz/65fd2c5629c0087fe12f90a6`);
  //       setQuizzes(response.data.payload.quiz);
  //       console.log(response.data.payload.quiz)
  //       setSelectedAnswers(
  //         response.data.payload.quiz?.questions.map(() => ({
  //           option: null,
  //           correctAnswer: null,
  //           text: null,
  //           userEmail: user?.email,
  //         }))
  //       );
  //     } catch (error) {
  //       console.error("Error fetching quizzes:", error);
  //     }
  //   };
  //   fetchQuizzes();
  // }, [axiosLocal, user?.email]);

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
    console.log(res?.data?.payload);
    return res?.data?.payload;
  };
  const { data: classModules, refetch } = useQuery({
    queryKey: ["classModules"],
    queryFn: getAllClassModule,
  });

  
  const handleQuizClick = async (quiz) => {
    // setShowQuiz(true);
    setSelectedVideoUrl(null); // Reset selected video/PDF when selecting a quiz
    setSelectedQuiz(quiz);
  };



  const handleModule = async (moduleId) => {
    const res = await axiosLocal.get(`/api/videos/${moduleId}`);
    console.log(moduleId);
    setModuleVideos(res.data?.payload);
    const response = await axiosLocal.get(`/api/quiz/${moduleId}`);
    setQuizzes(response.data.payload.quiz);
    console.log(response.data.payload.quiz);
    setSelectedAnswers(
      response.data.payload.quiz[0]?.questions.map(() => ({
        option: null,
        correctAnswer: null,
        text: null,
        userEmail: user?.email,
      }))
    );
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
        {/* video  pdf and quiz area */}
        {selectedVideoUrl ? (
          <div className=" w-4/6 ml-7 ">
            {selectedVideoUrl && selectedVideoUrl.endsWith(".pdf") ? (
              <PdfDocumentViewer pdfUrl={selectedVideoUrl} />
            ) : (
              <ReactPlayer
                controls
                playIcon
                playing
                pip={true}
                width={"100%"}
                height={"400px"}
                url={selectedVideoUrl}
              />
            )}
          </div>
        ) : (
          <div className=" w-4/6 ml-7 ">
            {selectedQuiz &&  (
              <StudentQuizForm
                quizzes={quizzes}
                selectedAnswers={selectedAnswers}
                setSelectedAnswers={setSelectedAnswers}
              />
            )}
          </div>
        )}

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
                      onClick={() =>
                        handleModuleVideo(
                          moduleVideo?.pdfUrl || moduleVideo?.videoUrl
                        )
                      }
                    >
                      <div className="border-b py-6 shadow-2xl mb-2 px-2 shadow-slate-950">
                        <h2>{moduleVideo?.title}</h2>
                      </div>
                    </div>
                  ))}

                  {quizzes?.map((quiz) => (
                    <div key={quiz?._id} onClick={() => handleQuizClick(quiz)}>
                      <h2 className="border p-3 cursor-pointer">
                        {quiz?.title}
                      </h2>
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
