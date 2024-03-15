import ClassAssignment from "../../components/TeacherDashboard/ClassAssignment";
import ClassProgress from "../../components/TeacherDashboard/ClassProgress";

const MyClassDetails = () => {
  return (
    <div className="bg-[#001E2B] h-screen">
      {/* class progress section */}
      <ClassProgress/>

	{/* class assignment */}
	<ClassAssignment/>
    </div>
  );
};

export default MyClassDetails;
