import { Link } from "react-router-dom";

const TeachersJoin = () => {
  return (
    <div className="flex px-24 bg-[#ECF2FE] items-center py-12">
      {/* teaching image */}
      <div className="w-1/2">
        <img
          src="https://i.postimg.cc/LskQNQX0/techer-section-image.jpg"
          alt=""
        />
      </div>

      {/* teaching content */}
      <div className="w-1/2">
		<h2 className="text-5xl font-bold">Become an instructor</h2>
		<p className="text-xl font-semibold my-4">Share your passion, and inspire growth. Join us as an instructor and shape the future through education. Your expertise matters become a catalyst for change today!</p>
		
		<Link to={"/techOnPoralekha"}>
		<button className="btn text-xl bg-[#61adff] hover:bg-[#006ce1] text-white  ">Start teaching today</button>
		</Link>
		</div>
    </div>
  );
};

export default TeachersJoin;
