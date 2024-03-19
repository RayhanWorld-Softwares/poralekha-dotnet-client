import Container from "../Container/Container";

const Banner = () => {
  return (
    <Container>
      <div className="py-16 md:flex justify-between items-center md:min-h-[90vh]">
        {/* content area */}
        <div className="">
          <h2 className="text-3xl lg:text-5xl font-bold">
           Explore Our Range of Dynamic Courses Today!
          </h2>
          <p className="my-5">
          Embark on a Journey of Learning Excellence with Our Wide Selection of Courses! From Skill Enhancement to Career Advancement, Discover Your Path to Success. Explore Now!
          </p>

          <div>
            <button className="btn bg-[#61adff] hover:bg-[#006ce1] text-white ">
              Get Stated
            </button>
          </div>
        </div>

        {/* banner image */}
        <div className="mt-2.5 hidden md:block">
          <img src="https://i.postimg.cc/MKB0WdNp/banner.jpg" alt="" />
        </div>
      </div>
    </Container>
  );
};

export default Banner;
