/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import ClassFeedbackForm from "../AdminDashboard/ClassFeedbackForm";
import { useLoaderData } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Certificate from "../../components/Certificate/Certificate";

const MyEnrollClassDetails = () => {
  const axiosLocal = useAxiosLocal();
  const { payload } = useLoaderData();
  console.log(payload);


  const getAssignment = async () => {
    const res = await axiosLocal.get(`/api/assignment`);
    return res?.data?.payload;
  };
  const { data: assignments } = useQuery({
    queryKey: ["assignments"],
    queryFn: getAssignment,
  });

  return (
    <div className="bg-[#001E2B] h-screen text-white">
      {/* certificate  */}
      <PDFDownloadLink document={<Certificate courseName={payload?.classTitle} name={payload?.name} />} fileName="certificate.pdf">
        {({ loading, url, error, blob }) =>
          loading ? (
            <button >Loading Document ...</button>
          ) : (
            <button className="btn flex justify-center items-center mx-auto ">Download Now!</button>
          )
        }
      </PDFDownloadLink>

      {/* TED Feedback section */}
      <ClassFeedbackForm payload={payload} />

      {/* assignment info */}
      <div className="overflow-x-auto ">
        <table className="table">
          {/* head */}
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
      </div>
    </div>
  );
};

export default MyEnrollClassDetails;
