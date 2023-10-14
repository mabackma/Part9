import { DiaryEntry } from "../types";

const Entry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <div>
      <b>{entry.date}</b>
      <br></br>
      Visibility: {entry.visibility}
      <br></br>
      Weather: {entry.weather}
      <br></br> 
      Comments: <i>{entry.comment}</i>
    </div>
  )
}

export default Entry;