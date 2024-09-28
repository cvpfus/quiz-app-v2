import React from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage.ts";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuizStore } from "@/hooks/useQuizStore.ts";
import Card from "@/components/Card.tsx";
import Button from "@/components/Button.tsx";

interface ResultProps {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  isStarted: boolean;
}

const Result = ({ setIsStarted, isStarted }: ResultProps) => {
  const { storedValue: quiz, removeValue: removeQuiz } =
    useLocalStorage<object[]>("quiz");
  const { storedValue: user } = useLocalStorage<object>("user");
  const { removeValue: removeTimeLeft } = useLocalStorage<number>("timeLeft");

  const navigate = useNavigate();

  const userAnswers = useQuizStore((state) => state.userAnswers);

  if (!isStarted) return <Navigate to="/initial" />;

  const totalCorrectAnswers = user.userAnswers.reduce(
    (acc: number, curr: number, i: number) => {
      if (quiz[i].answer_index === curr) return acc + 1;
      else return acc;
    },
    0,
  );

  const handleNewQuiz = () => {
    setIsStarted(false);
    removeQuiz();
    removeTimeLeft();
    navigate("/");
  };

  return (
    <Card>
      <h3 className="mb-3">Your Final Score</h3>
      <h3>{totalCorrectAnswers * 10}</h3>
      <table className="mt-6 p-1.5 border border-black">
        <tbody>
          <tr>
            <td className="p-1.5 border border-black">Total answered</td>
            <td className="p-1.5 border border-black">{userAnswers.length}</td>
          </tr>
          <tr>
            <td className="p-1.5 border border-black">Total correct answers</td>
            <td className="p-1.5 border border-black">{totalCorrectAnswers}</td>
          </tr>
          <tr>
            <td className="p-1.5 border border-black">Total wrong answers</td>
            <td className="p-1.5 border border-black">
              {10 - totalCorrectAnswers}
            </td>
          </tr>
        </tbody>
      </table>

      <Button className="mt-6" onClick={handleNewQuiz}>
        Start new Quiz
      </Button>
    </Card>
  );
};

export default Result;
