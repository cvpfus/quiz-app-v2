import { create } from "zustand";
import { User } from "@/types";
import React from "react";

interface IQuiz extends User {
  initialize: (user: User) => void;
  setCurrentQuestionIdx: (
    idx: number,
    setUser: React.Dispatch<React.SetStateAction<object>>,
  ) => void;
  setUsername: (
    username: string,
    setUser: React.Dispatch<React.SetStateAction<object>>,
  ) => void;
  addUserAnswer: (
    userAnswer: number,
    setUser: React.Dispatch<React.SetStateAction<object>>,
  ) => void;
  clearUserAnswers: (
    setUser: React.Dispatch<React.SetStateAction<object>>,
  ) => void;
}

export const useQuizStore = create<IQuiz>((set) => {
  return {
    username: "",
    userAnswers: [],
    currentQuestionIndex: 0,
    initialize: (user) => {
      set({
        username: user.username,
        userAnswers: user.userAnswers,
        currentQuestionIndex: user.currentQuestionIndex,
      });
    },
    setCurrentQuestionIdx: (idx, setUser) => {
      set((state) => {
        setUser({
          username: state.username,
          currentQuestionIndex: idx,
          userAnswers: state.userAnswers,
        });

        return { currentQuestionIndex: idx };
      });
    },
    setUsername: (username, setUser) => {
      set((state) => {
        setUser({
          username,
          currentQuestionIndex: state.currentQuestionIndex,
          userAnswers: state.userAnswers,
        });

        return { username };
      });
    },
    addUserAnswer: (userAnswer, setUser) => {
      set((state) => {
        setUser({
          username: state.username,
          currentQuestionIndex: state.currentQuestionIndex,
          userAnswers: state.userAnswers.concat(userAnswer),
        });

        return { userAnswers: state.userAnswers.concat(userAnswer) };
      });
    },
    clearUserAnswers: (setUser) => {
      set((state) => {
        setUser({
          username: state.username,
          currentQuestionIndex: 0,
          userAnswers: [],
        });

        return { userAnswers: [], currentQuestionIndex: 0 };
      });
    },
  };
});
