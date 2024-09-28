import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col items-center justify-center mx-6">
      {children}
    </div>
  );
};

export default Container;
