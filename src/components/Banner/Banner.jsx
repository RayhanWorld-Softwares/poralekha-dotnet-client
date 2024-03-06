const Banner = () => {
  return (
    <div className="flex justify-between px-24 items-center min-h-[90vh]">
      {/* content area */}
      <div className="">
        <h2 className="text-5xl font-bold">
          Find a Job With Your Interest and Abilities{" "}
        </h2>
        <p className="my-5">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
          expedita suscipit laudantium eos quisquam natus qui, corporis
          molestias! Quod, odio.
        </p>

        <div>
          <button className="btn bg-[#61adff] hover:bg-[#006ce1] text-white ">
            Get Stated
          </button>
        </div>
      </div>

      {/* banner image */}
      <div className="mt-2.5">
        <img src="https://i.postimg.cc/MKB0WdNp/banner.jpg" alt="" />
      </div>
    </div>
  );
};

export default Banner;
