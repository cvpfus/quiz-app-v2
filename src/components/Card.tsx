import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative m-6 w-full max-w-[500px] min-h-[600px] bg-white rounded-3xl flex flex-col items-center justify-center">
            {children}
        </div>
    );
};

export default Card;
