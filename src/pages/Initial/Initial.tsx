import React, { useState } from "react";
import { Difficulty } from "@/types";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button.tsx";
import { DIFFICULTIES } from "@/constants";
import Card from "@/components/Card.tsx";
import { useIsFetching } from "@tanstack/react-query";
import Loader from "@/components/Loader.tsx";
import { useLocalStorage } from "@/hooks/useLocalStorage.ts";

interface InitialProps {
  handleStart: () => void;
  isStarted: boolean;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
}

const Initial = ({ handleStart, isStarted, setDifficulty }: InitialProps) => {
  const navigate = useNavigate();

  const [difficultyIndex, setDifficultyIndex] = useState(0);

  const { storedValue: userFromStorage } = useLocalStorage<object>("user");

  const isFetching = useIsFetching();

  const handleResume = () => {
    navigate("/quiz");
  };

  const handleDifficulty = (i: number) => {
    setDifficultyIndex(i);
    setDifficulty(DIFFICULTIES[i]);
  };

  if (isFetching) {
    return (
      <Card>
        <Loader />
      </Card>
    );
  }

  if (isStarted) {
    return (
      <Card>
        <div className="mb-6">You have an ongoing quiz.</div>
        <Button onClick={handleResume}>Resume</Button>
      </Card>
    );
  }

  return (
    <Card>
      <h5 className="mb-6">Hello, {userFromStorage.username}!</h5>

      <h5 className="mb-3">About this Quiz</h5>

      <div className="mx-6">
        <div>1. Time limit is 2 minutes.</div>
        <div>2. This quiz is a multiple choice quiz.</div>
        <div>3. There are 10 random questions (not categorized).</div>
        <div>4. Before you begin, select the difficulty below.</div>
      </div>

      <h5 className="mt-6 mb-3">Difficulty</h5>
      <div className="flex gap-3">
        {DIFFICULTIES.map((difficulty, i) => {
          return (
            <Button
              className={
                difficultyIndex === i
                  ? "bg-secondary border-2 border-secondary text-white"
                  : "bg-white border-2 border-black"
              }
              key={i}
              onClick={() => handleDifficulty(i)}
            >
              {difficulty}
            </Button>
          );
        })}
      </div>

      <Button className="mt-3" onClick={handleStart}>
        Start
      </Button>
    </Card>
  );
};

export default Initial;
