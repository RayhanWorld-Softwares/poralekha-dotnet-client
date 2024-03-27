import { useFieldArray, useForm } from "react-hook-form";
import useAxiosLocal from "../../hooks/useAxiosLocal";
import toast from "react-hot-toast";

const QuizForm = () => {
  const axiosLocal = useAxiosLocal();

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      questions: [{ text: "", options: ["", "", "", ""], correctAnswer: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const MAX_OPTIONS = 4;

  const onSubmit = async (data) => {
    try {
      const res = await axiosLocal.post("/api/quiz", data);
      if (res?.data.success === true) {
        toast.success(res?.data?.message);
        reset();
      }
    } catch (error) {
      console.log("Error saving quiz:", error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex bg-cover bg-center bg-[#001E2B]">
      <div className="hero">
        <div className="hero-content flex items-center flex-col md:flex-row  rounded-xl justify-between gap-x-36">
          <div className="card w-full flex-shrink-0 shadow-2xl text-white">
            <div className="card-body  md:px-16 bg-[#162C46] rounded-md">
              <div className="text-center">
                <h2 className="text-3xl font-bold ">Create A Quiz</h2>
                <p className="my-2">Test Your Student Knowledge</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* quiz title field */}
                <label
                  className="label
				"
                >
                  Quiz Title
                </label>
                <input
                  type="text"
                  placeholder="Enter a quiz title"
                  {...register("title")}
                  className="input input-bordered bg-[#162C46] border-white focus:border-[#006ce1] min-w-[400px]"
                />

                {/* Question Fields */}
                {fields?.map((question, index) => (
                  <div key={question.id} className="mb-5">
                    <label className="label">Question: {index + 1}</label>
                    <input
                      type="text"
                      placeholder="Enter a question"
                      {...register(`questions.${index}.text`)}
                      className="input input-bordered bg-[#162C46] border-white focus:border-[#006ce1] min-w-[400px]"
                    />
                    <br />

                    <label className="label">Options</label>
                    {question?.options?.map((option, optionIndex) => (
                      <div key={option?.id}>
                        <input
                          className="input input-bordered bg-[#162C46] border-white focus:border-[#006ce1] min-w-[400px] mb-4"
                          placeholder={`Enter an answer ${optionIndex + 1}`}
                          type="text"
                          {...register(
                            `questions.${index}.options.${optionIndex}`
                          )}
                        />

                        {fields?.length > 1 && optionIndex === 0 && (
                          <button
                            type="button"
                            className="btn mb-3 btn-error text-white ml-3 absolute -mt-[88px]"
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        )}
                        <br />
                      </div>
                    ))}

                    <label className="label">Correct Answer</label>
                    <select
                      className="select select-bordered input text-white bg-[#162C46] border-white focus:border-[#006ce1] min-w-[400px] mb-4"
                      {...register(`questions.${index}.correctAnswer`)}
                    >
                      <option disabled selected value="">
                        Select a correct answer
                      </option>

                      {question?.options?.map((_, optionIndex) => (
                        <option
                          key={optionIndex}
                          value={String.fromCharCode(65 + optionIndex)}
                          className=""
                        >
                          {String.fromCharCode(65 + optionIndex)}
                        </option>
                      ))}
                    </select>

                    {question?.options?.length < MAX_OPTIONS && (
                      <button
                        className="btn mb-4"
                        onClick={() => append({ options: "" }, index)}
                        type="button"
                      >
                        Add Option
                      </button>
                    )}
                  </div>
                ))}

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="btn mr-4"
                    onClick={() =>
                      append({
                        text: "",
                        options: ["", "", "", ""],
                        correctAnswer: "",
                      })
                    }
                  >
                    Add New Question
                  </button>

                  <button className="btn" type="submit">
                    Save{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
