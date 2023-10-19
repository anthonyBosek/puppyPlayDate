import { useEffect, useState } from "react";
import PlayEvent from "../components/PlayEvent";

const PlayEvents = () => {
  const [playEvents, setPlayEvents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3005/events");
      const data = await response.json();
      setPlayEvents(data);
    };
    getData();
  }, []);

  const allPlayEvents = playEvents.map((playInfo) => (
    <PlayEvent key={playInfo.id} {...playInfo} />
  ));

  return (
    <div>
      <h1>Upcoming Puppy PlayDate Events 🐾</h1>
      <div className="events">{allPlayEvents}</div>
    </div>
  );
};

export default PlayEvents;
