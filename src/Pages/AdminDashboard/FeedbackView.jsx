import Rating from "react-rating";
import useFeedback from "../../hooks/useFeedback";
import { BsStarFill, BsStar } from "react-icons/bs";

const FeedbackView = () => {
  const { feedbacks } = useFeedback();

  return (
    <div className="bg-[#001E2B] min-h-screen  text-white pt-16 pr-6 xl:pr-0">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#162C46] text-white">
            <tr className="uppercase font-bold">
              <th>Image</th>
              <th>name </th>
              <th>class title</th>
              <th>feedback text</th>
              <th>rating</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks?.map((feedback) => (
              <tr key={feedback._id}>
                <td>
                  <div className="flex items-center gap-3 ">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={feedback?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{feedback?.userName}</td>
                <td>{feedback?.title}</td>
                <td className="min-w-[500px] md:max-w-52">
                  {feedback?.feedbackText}
                </td>
                <td>
                  <Rating
                    emptySymbol={<BsStar size={25} className="text-gray-400" />}
                    fullSymbol={
                      <BsStarFill size={25} className="text-yellow-400" />
                    }
                    fractions={2}
                    initialRating={feedback?.rating}
                    readonly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackView;
