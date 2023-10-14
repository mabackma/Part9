import { useState, useEffect } from "react";
import diaryService from "./services/diaries"
import Content from "./components/Content";
import EntryForm from "./components/EntryForm"
import { DiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiaryList();
    console.log("diaries:", diaries)
  }, []);

  return (
    <div>
      <EntryForm setDiaries={setDiaries}/>
      <Content entries={diaries} />
    </div>
  );
};

export default App;