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
        date <input type="date" id="date" value={newEntry.date} onChange={handleInputChange} />
        <br></br>
        visibility
        great <input type="radio" id="visibility" name="visibility" value={Visibility.Great} checked={newEntry.visibility === Visibility.Great} onChange={handleInputChange} />
        good <input type="radio" id="visibility" name="visibility" value={Visibility.Good} onChange={handleInputChange} />
        ok <input type="radio" id="visibility" name="visibility" value={Visibility.Ok} onChange={handleInputChange} />
        poor <input type="radio" id="visibility" name="visibility" value={Visibility.Poor} onChange={handleInputChange} />
        <br></br>
        weather
        sunny <input type="radio" id="weather" name="weather" value={Weather.Sunny} checked={newEntry.weather === Weather.Sunny} onChange={handleInputChange} />
        cloudy <input type="radio" id="weather" name="weather" value={Weather.Cloudy} onChange={handleInputChange} />
        rainy <input type="radio" id="weather" name="weather" value={Weather.Rainy} onChange={handleInputChange} />
        windy <input type="radio" id="weather" name="weather" value={Weather.Windy} onChange={handleInputChange} />
        stormy <input type="radio" id="weather" name="weather" value={Weather.Stormy} onChange={handleInputChange} />
        <br></br>
        comment <input type="text" id="comment" value={newEntry.comment} onChange={handleInputChange} />
        <br></br>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default EntryForm;