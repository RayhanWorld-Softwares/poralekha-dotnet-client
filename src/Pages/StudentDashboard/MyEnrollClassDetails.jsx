import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import ClassFeedbackForm from "../AdminDashboard/ClassFeedbackForm";


const MyEnrollClassDetails = () => {
  const axiosLocal = useAxiosLocal();

  const getAssignment = async () => {
    const res = await axiosLocal.get(`/api/assignment`);
    return res?.data?.payload;
  };
  const { data: assignments } = useQuery({
    queryKey: ["assignments"],
    queryFn: getAssignment,
  });

  return (
    <div>
      {/* TED Feedback section */}
      <ClassFeedbackForm/>

      {/* assignment info */} 
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#F9FAFE]">
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
                  <button className="btn btn-primary btn-sm ">Submit</button>
                </th>

                {/* see progress */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEnrollClassDetails;
