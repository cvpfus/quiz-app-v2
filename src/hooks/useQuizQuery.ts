import { Difficulty } from "@/types";
import { useQuery } from "@tanstack/react-query";
import quizService from "@/services/quizService.ts";

export const useQuizQuery = (isEnabled: boolean, difficulty: Difficulty) => {
  return useQuery({
    queryKey: ["quiz", difficulty],
    queryFn: () => quizService.getAll(difficulty),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: isEnabled,
  });
};
