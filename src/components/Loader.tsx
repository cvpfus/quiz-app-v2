import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex gap-2 items-center">
      <Loader2 className="size-4 animate-spin" />
      <span>Loading</span>
    </div>
  );
};

export default Loader;
