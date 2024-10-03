import { useLocalStorage } from "@/hooks/useLocalStorage.ts";
import React, { useEffect, useState } from "react";
import { INITIAL_TIMER } from "@/constants";
import Card from "@/components/Card.tsx";
import { useQuizStore } from "@/hooks/useQuizStore.ts";
import { Navigate } from "react-router-dom";
import { decodeText, getReadableTimeFormat } from "@/lib/utils.ts";
import Loader from "@/components/Loader.tsx";

const Quiz = ({ isStarted }: { isStarted: boolean }) => {
  const { storedValue: quiz } = useLocalStorage<object[]>("quiz");
  const {
    storedValue: timeLeft,
    setValue: setTimeLeft,
    removeValue: removeTimeLeft,
  } = useLocalStorage<number>("timeLeft");

  const [seconds, setSeconds] = useState(() => {
    if (timeLeft) return timeLeft;
    else return INITIAL_TIMER;
  });

  const currentQuestionIndex = useQuizStore(
    (state) => state.currentQuestionIndex,
  );
  const userAnswers = useQuizStore((state) => state.userAnswers);
  const setCurrentQuestionIdx = useQuizStore(
    (state) => state.setCurrentQuestionIdx,
  );
  const addUserAnswer = useQuizStore((state) => state.addUserAnswer);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(seconds - 1);
        setSeconds((prevSeconds: number) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      removeTimeLeft();
    }
  }, [seconds]);

  const handleAnswer = (e: React.MouseEvent, i: number) => {
    const clickedButton = e.target as HTMLButtonElement;

    const currentAnswerIndex = quiz[currentQuestionIndex].answer_index;

    const allButtons = Array.from(
      clickedButton.parentNode!.children,
    ) as HTMLButtonElement[];

    allButtons.forEach((button, index) => {
      button.disabled = true;
      if (button !== clickedButton && currentAnswerIndex === index)
        button.style.backgroundColor = "green";
    });

    if (currentAnswerIndex === i) clickedButton.style.backgroundColor = "green";
    else clickedButton.style.backgroundColor = "red";

    setTimeout(() => {
      allButtons.forEach((button) => {
        button.style.backgroundColor = "var(--secondary)";
      });
      setCurrentQuestionIdx(userAnswers.length + 1);
      addUserAnswer(i);
      allButtons.forEach((button) => (button.disabled = false));
    }, 3000);
  };

  if (!isStarted) return <Navigate to="/initial" />;

  if (!quiz)
    return (
      <Card>
        <Loader />
      </Card>
    );

  const maxQuestionIndex = quiz.length - 1;

  if (seconds === 0 || currentQuestionIndex - 1 === maxQuestionIndex) {
    return <Navigate to="/result" />;
  }

  return (
    <Card>
      <span className="absolute top-6 left-6 bg-secondary text-white select-none p-1 rounded-[4px]">
        {getReadableTimeFormat(seconds)}
      </span>
      <span className="absolute top-6 right-6 bg-secondary text-white select-none p-1 rounded-[4px]">
        {userAnswers.length + 1}/10
      </span>
      <h5 className="my-[72px] px-6 text-center">
        {decodeText(quiz[currentQuestionIndex].question)}
      </h5>
      <div className="flex flex-col min-w-full gap-6 mb-6">
        {quiz[currentQuestionIndex].all_answers.map(
          (item: string, i: number) => {
            return (
              <button
                className="mx-6 p-6 text-white text-sm font-bold hover:opacity-80 bg-secondary"
                onClick={(e) => handleAnswer(e, i)}
                key={i}
              >
                {decodeText(item)}
              </button>
            );
          },
        )}
      </div>
    </Card>
  );
};

export default Quiz;
