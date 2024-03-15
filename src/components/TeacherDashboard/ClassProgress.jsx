


const ClassProgress = () => {
	return (
		<div>
			<div className="grid grid-cols-3 text-center mx-14 gap-14 pt-12 text-xl font-bold text-white">
        <div className="bg-[#162C46] w-fit px-6 py-10 rounded-md">
          <h2>
            Total Enrollment: <span>100</span>
          </h2>
        </div>

        <div className="bg-[#162C46] w-fit px-6 py-10 rounded-md">
          <h2>
            Total Assignment: <span>100</span>
          </h2>
        </div>

        <div className="bg-[#162C46] w-fit px-6 py-10 rounded-md">
          <h2>
            Per day Assignment: <span>100</span>
          </h2>
        </div>
      </div>
		</div>
	);
};

export default ClassProgress;