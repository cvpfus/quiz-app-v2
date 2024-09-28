import Card from "@/components/Card.tsx";
import { OctagonX } from "lucide-react";
import Button from "@/components/Button.tsx";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

  return (
    <Card>
      <div className="flex flex-col gap-2 items-center">
        <OctagonX className="text-red-500" />
        <span>Route Not Found</span>
      </div>
        <Button className="mt-4" onClick={() => navigate("/")}>Home</Button>
    </Card>
  );
};

export default NotFound;
