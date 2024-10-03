import { useAuth } from "@workos-inc/authkit-react";
import { useLocalStorage } from "@/hooks/useLocalStorage.ts";
import React, { useState } from "react";
import Button from "@/components/Button.tsx";
import { useQuizStore } from "@/hooks/useQuizStore.ts";

interface AccountProps {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedOut: React.Dispatch<React.SetStateAction<boolean>>;
}

const Account = ({ setIsStarted, setIsLoggedOut }: AccountProps) => {
  const { user, signOut } = useAuth();

  const { removeValue: removeQuiz } = useLocalStorage<object[]>("quiz");
  const { removeValue: removeTimeLeft } = useLocalStorage<number>("timeLeft");

  const [isClicked, setIsClicked] = useState(false);

  const clearUserAnswers = useQuizStore((state) => state.clearUserAnswers);
  const reset = useQuizStore(state => state.reset);

  const handleAccountClick = () => {
    setIsClicked(!isClicked);
  };

  const handleLogout = () => {
    signOut();
    setIsStarted(false);
    setIsLoggedOut(true);
    clearUserAnswers();
    removeQuiz();
    reset();
    removeTimeLeft();
  };

  const username = `${user?.firstName}${user?.lastName ? user.lastName : ""}`;

  return (
    <div className="min-[880px]:absolute min-[880px]:mt-0 top-6 right-0 mt-4 self-end">
      <div className="flex flex-col items-end">
        <button
          onClick={handleAccountClick}
          className="flex items-center gap-2 bg-white rounded-full p-1 cursor-pointer hover:shadow-md"
        >
          <img
            className="size-10 rounded-full border-2 border-gray-500"
            src={user?.profilePictureUrl ? user?.profilePictureUrl : ""}
            alt="profile picture"
          />
          <span>{username}</span>
        </button>

        {isClicked && (
          <Button className="bg-white text-black mt-2" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Account;
