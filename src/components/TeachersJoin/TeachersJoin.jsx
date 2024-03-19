import { Link } from "react-router-dom";
import Container from "../Container/Container";

const TeachersJoin = () => {
  return (
    <div className="bg-[#ECF2FE] py-20">
      <Container>
        <div className="flex items-center flex-col md:flex-row ">
          {/* teaching image */}
          <div className="md:w-1/2">
            <img
              src="https://i.postimg.cc/LskQNQX0/techer-section-image.jpg"
              alt=""
            />
          </div>

          {/* teaching content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-bold">Become an instructor</h2>
            <p className=" lg:text-xl font-semibold my-4">
              Share your passion, and inspire growth. Join us as an instructor
              and shape the future through education. Your expertise matters
              become a catalyst for change today!
            </p>

            <Link to={"/techOnPoralekha"}>
              <button className="btn text-xl bg-[#61adff] hover:bg-[#006ce1] text-white  ">
                Start teaching today
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TeachersJoin;
