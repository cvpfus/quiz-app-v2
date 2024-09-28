import axios from "axios";
import { Difficulty } from "@/types";
import { getRandomNumber } from "@/lib/utils.ts";

const baseUrl = "https://opentdb.com/api.php?type=multiple&amount=10";

const getAll = async (difficulty: Difficulty) => {
  const response = await axios.get(`${baseUrl}&difficulty=${difficulty}`);

  const data = response.data.results;

  return [...data].map((item) => {
    const answer_index = getRandomNumber(0, 3);
    const all_answers: string[] = [];
    const incorrect_answers = [...item.incorrect_answers];

    for (let i = 0; i < 4; i++) {
      if (i === answer_index) {
        all_answers.push(item.correct_answer);
      } else {
        all_answers.push(incorrect_answers.shift());
      }
    }

    return {
      ...item,
      all_answers,
      answer_index,
    };
  });
};

export default { getAll };
