import { NewDiaryEntry, Visibility, Weather, EntryFormProps } from "../types";
import { useState } from "react";
import diaryService from "../services/diaries"

const EntryForm = ({ setDiaries }: EntryFormProps) => {
  const [notification, setNotification] = useState('')

  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: '',
    visibility: Visibility.Great,
    weather: Weather.Sunny,
    comment: '',
  });

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { date, visibility, weather, comment } = newEntry;
    const diaryEntry: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    console.log(diaryEntry);

    diaryService.create(diaryEntry)
    .then((createdEntry) => {
      setDiaries((prevDiaries) => [...prevDiaries, createdEntry]);
      setNotification('');
    })
    .catch((error) => {
      if (error.response) {
        const errorMessage = error.response.data;
        setNotification(errorMessage)
        console.error(errorMessage);
      } else {
        console.error('An error occurred:', error.message);
      }
    });

    setNewEntry({
      date: "",
      visibility: Visibility.Great,
      weather: Weather.Sunny,
      comment: "",
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setNewEntry({
      ...newEntry,
      [id]: id === 'visibility' ? value as Visibility : (id === 'weather' ? value as Weather : value),
    });
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <p style={{ color: 'red' }}>{notification}</p>
      <form onSubmit={handleFormSubmit}>
        date <input type="text" id="date" value={newEntry.date} onChange={handleInputChange} />
        <br></br>
        visibility <input type="text" id="visibility" value={newEntry.visibility} onChange={handleInputChange} />
        <br></br>
        weather <input type="text" id="weather" value={newEntry.weather} onChange={handleInputChange} />
        <br></br>
        comment <input type="text" id="comment" value={newEntry.comment} onChange={handleInputChange} />
        <br></br>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default EntryForm;