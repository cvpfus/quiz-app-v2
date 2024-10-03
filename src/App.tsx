import { useLocalStorage } from "@/hooks/useLocalStorage.ts";
import { useQuizQuery } from "@/hooks/useQuizQuery.ts";
import { useEffect, useState } from "react";
import { Difficulty } from "@/types";
import { Routes, Route, useNavigate } from "react-router-dom";
import Initial from "@/pages/Initial";
import Login from "@/pages/Login";
import Container from "@/components/Container.tsx";
import { useQuizStore } from "@/hooks/useQuizStore.ts";
import toast, { Toaster } from "react-hot-toast";
import Card from "@/components/Card.tsx";
import Quiz from "@/pages/Quiz";
import Result from "@/pages/Result";
import Loader from "@/components/Loader.tsx";
import NotFound from "@/pages/NotFound";
import Account from "@/components/Account.tsx";
import { useAuth } from "@workos-inc/authkit-react";

const App = () => {
  const {
    storedValue: quiz,
    setValue: setQuiz,
    removeValue: removeQuiz,
  } = useLocalStorage<object[]>("quiz");
  const { storedValue: timeLeft, removeValue: removeTimeLeft } =
    useLocalStorage<number>("timeLeft");

  const [isStarted, setIsStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const quizQueryResult = useQuizQuery(isStarted && !quiz, difficulty);

  const navigate = useNavigate();

  const clearUserAnswers = useQuizStore((state) => state.clearUserAnswers);
  const currentQuestionIndex = useQuizStore(state => state.currentQuestionIndex);

  const { user } = useAuth();

  const handleStart = async () => {
    try {
      setIsLoggedOut(false);
      setIsStarted(true);
      clearUserAnswers();
      await quizQueryResult.refetch();
      removeQuiz();
      navigate("/quiz");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    if (quiz) {
      if (timeLeft) setIsStarted(true);
      if (currentQuestionIndex >= quiz.length - 1) {
        setIsStarted(false);
        removeTimeLeft();
      }
    }
  }, []);

  useEffect(() => {
    if (quizQueryResult.data) {
      const data = quizQueryResult.data;

      setQuiz(data);
      removeTimeLeft();
    }
  }, [quizQueryResult.data]);

  if (quizQueryResult.isLoading) {
    return (
      <Container>
        {user && (
          <Account
            setIsStarted={setIsStarted}
            setIsLoggedOut={setIsLoggedOut}
          />
        )}
        <Card>
          <Loader />
        </Card>
      </Container>
    );
  }

  if (quizQueryResult.isError) {
    return (
      <Container>
        {user && (
          <Account
            setIsStarted={setIsStarted}
            setIsLoggedOut={setIsLoggedOut}
          />
        )}
        <Card>
          <div>Error:</div>
          <div>{quizQueryResult.error.message}</div>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Toaster position="bottom-right" />
      {user && (
        <Account setIsStarted={setIsStarted} setIsLoggedOut={setIsLoggedOut} />
      )}
      <Routes>
        <Route path="/" element={<Login isLoggedOut={isLoggedOut} />} />
        <Route path="/quiz" element={<Quiz isStarted={isStarted} />} />
        <Route
          path="/initial"
          element={
            <Initial
              handleStart={handleStart}
              isStarted={isStarted}
              setDifficulty={setDifficulty}
            />
          }
        />
        <Route
          path="/result"
          element={<Result setIsStarted={setIsStarted} isStarted={isStarted} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
};

export default App;
