import Button from "@/components/Button.tsx";
import { useAuth } from "@workos-inc/authkit-react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/Card.tsx";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useQuizStore } from "@/hooks/useQuizStore.ts";
import { useLocalStorage } from "@/hooks/useLocalStorage.ts";
import Loader from "@/components/Loader.tsx";

interface LoginProps {
  isLoggedOut: boolean;
}

const Login = ({ isLoggedOut }: LoginProps) => {
  const { isLoading, user, signIn } = useAuth();

  const setUsername = useQuizStore((state) => state.setUsername);

  const { setValue: setUser } = useLocalStorage<object>("user");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(
        `${user.firstName}${user.lastName ? user.lastName : ""}`,
        setUser,
      );
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await signIn();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  if (isLoading || isLoggedOut)
    return (
      <Card>
        <Loader />
      </Card>
    );

  if (user) navigate("/initial");

  return (
    <Card>
      <h4>Welcome to Quiz App!</h4>
      <img className="mt-4 mb-20" src="/quiz-app.png" alt="quiz app logo" />
      <Button variant="secondary" onClick={handleLogin}>
        Login
      </Button>
    </Card>
  );
};

export default Login;
