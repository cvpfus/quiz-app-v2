export type Difficulty = "easy" | "medium" | "hard";

export interface User {
  username: string;
  userAnswers: number[];
  currentQuestionIndex: number;
}
