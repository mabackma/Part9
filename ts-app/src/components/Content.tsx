import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <div key={index}>
          <Part part={part} />
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default Content;