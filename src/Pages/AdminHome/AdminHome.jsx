import { Link } from "react-router-dom";

const AdminHome = () => {
	return (
		<div className="flex gap-4">
			
			<button className="btn btn-primary mt-24"><Link to={"/"}>Back to home</Link></button>
			<button className="btn btn-primary mt-24"><Link to={"/dashboard/teacherRequest"}>Teacher Request</Link></button>
		</div>
	);
};

export default AdminHome;