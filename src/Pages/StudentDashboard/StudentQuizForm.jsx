import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosLocal from "../../hooks/useAxiosLocal";

const StudentQuizForm = ({ quizzes, selectedAnswers, setSelectedAnswers }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const axiosLocal = useAxiosLocal();

  const handleNextQuestion = () => {
    if (quizzes && quizzes[0]?.questions && currentQuestionIndex < quizzes[0]?.questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
    } else {
      setShowSubmitButton(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsAnswered(false);
    }
  };

  const handleAnswerSelection = (optionIndex) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex].option = String.fromCharCode(65 + optionIndex);
    updatedAnswers[currentQuestionIndex].correctAnswer = quizzes[0]?.questions[currentQuestionIndex].correctAnswer;
    updatedAnswers[currentQuestionIndex].text = quizzes[0]?.questions[currentQuestionIndex].text;
    setSelectedAnswers(updatedAnswers);
    setIsAnswered(true);
  };

  const handleSubmit = async () => {
    try {
      const answersArray = selectedAnswers
        .filter((answer) => answer.option !== null)
        .map((answer) => ({
          selectedAnswer: answer.option,
          correctAnswer: answer.correctAnswer,
          text: answer.text,
          userEmail: answer.userEmail,
        }));

      const res = await axiosLocal.post("/api/quizAnswer", {
        answers: answersArray,
      });

      if (res.data.success) {
        setSelectedAnswers(
          selectedAnswers.map(() => ({
            option: null,
            correctAnswer: null,
            text: null,
            userEmail: "",
          }))
        );
        toast.success("Quiz submitted successfully");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#001E2B]">
      <div className="border p-16 bg-[#162C46] text-white">
        {quizzes && quizzes.length > 0 && (
          <div>
            <h1 className="py-3 border-b border-gray-500">Title: {quizzes[0].title}</h1>
            <p className="border-b border-gray-500 py-3">
              Question: {currentQuestionIndex + 1} {quizzes[0]?.questions[currentQuestionIndex].text}
            </p>
            <div>
              {quizzes[0]?.questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="border-b border-gray-500 py-3">
                  <input
                    required
                    type="radio"
                    id={`option-${index}`}
                    name="options"
                    value={option}
                    checked={selectedAnswers[currentQuestionIndex].option === String.fromCharCode(65 + index)}
                    onChange={() => handleAnswerSelection(index)}
                  />
                  <label htmlFor={`option-${index}`}>
                    {String.fromCharCode(65 + index)}. {option}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-5">
              {currentQuestionIndex === 0 ? (
                <button className="btn hover:none btn-primary opacity-20 cursor-default">
                  Previous
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handlePreviousQuestion}>
                  Previous
                </button>
              )}
              {showSubmitButton ? (
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleNextQuestion} disabled={!isAnswered}>
                  Next
                </button>
              )}
            </div>
          </div>
        )}
        {(!quizzes || quizzes?.length === 0) && <p>No quizzes available</p>}
      </div>
    </div>
  );
};

export default StudentQuizForm;
