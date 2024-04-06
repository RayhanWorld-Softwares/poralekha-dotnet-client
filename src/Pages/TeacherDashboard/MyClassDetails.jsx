import { Link, useParams } from "react-router-dom";
import AddModule from "../../components/TeacherDashboard/AddModule";
// import ClassAssignment from "../../components/TeacherDashboard/ClassAssignment";
// import ClassProgress from "../../components/TeacherDashboard/ClassProgress";
import { useQuery } from "@tanstack/react-query";
import useAxiosLocal from "../../hooks/useAxiosLocal";

const MyClassDetails = () => {
  const { id: classId } = useParams();
  const axiosLocal = useAxiosLocal();

  const getAllClassModule = async () => {
    const res = await axiosLocal.get(`/api/classModule/${classId}`);
    return res?.data?.payload;
  };
  const { data: classModules, refetch } = useQuery({
    queryKey: ["classModules"],
    queryFn: getAllClassModule,
  });

  return (
    <div className="bg-[#001E2B] min-h-screen pt-10 xl:pt-0">
      {/* class progress section */}
      {/* <ClassProgress /> */}

      <div className="flex gap-10 justify-end">
        {/* class assignment */}
        {/* <ClassAssignment /> */}

        {/* add module ?id to classId*/}
        <AddModule classId={classId} refetch={refetch} />
      </div>

      {/* existing resource */}
      <div className="overflow-x-auto mr-6">
        <table className="table">
          {/* head */}
          <thead className="bg-[#162C46] text-white">
            <tr className="uppercase font-bold">
              <th>SL</th>
              <th>module title </th>
              <th>Course Name </th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {classModules?.map((classModule) => (
              <tr className="text-white" key={classModule._id}>
                <td>{classModule?.moduleNumber}</td>
                <th>{classModule?.moduleTitle}</th>
                <th>{classModule?.className}</th>
                <Link
                  to={`/teacher-dashboard/module-details/${classModule?._id}`}
                >
                  <button
                    className="btn btn-sm border-none bg-[#61adff] hover:bg-[#006ce1] text-white mt-4 md:my-4"
                    type="submit"
                  >
                    Add Resource{" "}
                  </button>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClassDetails;
