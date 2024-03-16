import { BsStarFill, BsStar } from "react-icons/bs";
import { useEffect, useState } from "react";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Rating from "react-rating";

const ClassFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const axiosLocal = useAxiosLocal();
  console.log(feedback);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axiosLocal.get("/api/feedback");
        setFeedback(res?.data?.payload);
      } catch (err) {
        console.error("Error fetching feedback request:", err);
        throw new Error("feedback data fetch error");
      }
    };
    fetchFeedback();
  }, [axiosLocal]);

  return (
    <div className="h-[70vh] border  bg-slate-900  flex justify-center items-center">
      <div className=" w-2/4  m-4 flex justify-center mx-auto ">
        <Swiper
          spaceBetween={30}
          centeredSlides={false}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {feedback.map((item) => (
            <SwiperSlide key={item._id}>
              <div>
                {/* feeback card */}
                <div>
                  {/* content  */}
                  <div className="card  bg-neutral text-neutral-content relative mt-16">
                    <div className="card-body items-center text-center">
                      <h2 className=" mt-8 text-xl font-bold">
                        {item?.userName}
                      </h2>
                      <p className="">Class Title : {item?.title}</p>
                      <p>{item?.feedbackText}</p>
                      <Rating
                        emptySymbol={
                          <BsStar size={30} className="text-gray-400" />
                        }
                        fullSymbol={
                          <BsStarFill size={30} className="text-yellow-400" />
                        }
                        fractions={2}
                        initialRating={item?.rating}
                        readonly
                      />
                    </div>
                    {/* avater */}
                    <div className="avatar absolute -mt-12 ml-72">
                      <div className="w-24 rounded-full border-4 border-green-600">
                        <img src={item?.image} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ClassFeedback;
