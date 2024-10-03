import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface IQuiz extends User {
  setCurrentQuestionIdx: (currentQuestionIndex: number) => void;
  setUsername: (username: string) => void;
  addUserAnswer: (userAnswer: number) => void;
  clearUserAnswers: () => void;
  reset: () => void;
}

const initialState = {
  username: "",
  userAnswers: [],
  currentQuestionIndex: 0,
};

export const useQuizStore = create(
  persist<IQuiz>(
    (set) => {
      return {
        ...initialState,
        setCurrentQuestionIdx: (currentQuestionIndex) => {
          set({ currentQuestionIndex });
        },
        setUsername: (username) => {
          set({ username });
        },
        addUserAnswer: (userAnswer) => {
          set((state) => ({
            userAnswers: state.userAnswers.concat(userAnswer),
          }));
        },
        clearUserAnswers: () => {
          set({ userAnswers: [], currentQuestionIndex: 0 });
        },
        reset: () => {
          set(initialState);
        },
      };
    },
    {
      name: "user",
    },
  ),
);
