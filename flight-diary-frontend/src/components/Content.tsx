import { DiaryEntry } from "../types";
import Entry from "./Entry";

const Content = ({ entries }: { entries: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {entries.map((entry, index) => (
        <div key={index}>
          <Entry entry={entry} />
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default Content;