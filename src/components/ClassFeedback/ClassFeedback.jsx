import { BsStarFill, BsStar } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Rating from "react-rating";
import useFeedback from "../../hooks/useFeedback";

const ClassFeedback = () => {
  const { feedbacks } = useFeedback();

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
          {feedbacks.map((item) => (
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
                      <p className="text-lg"> {item?.title}</p>
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
