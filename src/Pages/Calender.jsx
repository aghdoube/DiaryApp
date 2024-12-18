import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MainLayout from "../Layouts/MainLayout";
import "../Styles/Calendar.css";

const emojis = [
  "😀",
  "🎉",
  "❤️",
  "👍",
  "🌟",
  "🔥",
  "🎂",
  "🎁",
  "😎",
  "😢",
  "😇",
  "🤩",
  "🥳",
  "😴",
  "🤒",
  "🤕",
  "❣️",
  "🏖️",
  "🎆",
  "🚨",
];

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [eventText, setEventText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events") || "{}");
    setEvents(savedEvents);
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleEventChange = (e) => {
    setEventText(e.target.value);
  };

  const handleAddEvent = () => {
    const dateString = date.toDateString();
    setEvents((prevEvents) => {
      const newEvents = { ...prevEvents };
      if (!newEvents[dateString]) {
        newEvents[dateString] = [];
      }
      newEvents[dateString].push({ text: eventText, emoji: selectedEmoji });
      localStorage.setItem("events", JSON.stringify(newEvents));
      return newEvents;
    });
    setEventText("");
    setSelectedEmoji("");
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const tileContent = ({ date, view }) => {
    const dateString = date.toDateString();
    if (view === "month" && events[dateString]) {
      return (
        <div className="emoji-container">
          {events[dateString].map((event, index) => (
            <span key={index} className="emoji">
              {event.emoji}
            </span>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <MainLayout>
      <div className="cal-con flex flex-col items-center mt-[150px]">
        <Calendar
          onChange={handleDateChange}
          value={date}
          showWeekNumbers={false}
          minDate={new Date()}
          tileContent={tileContent}
        />
        <p className="mt-4">Selected Date: {date.toDateString()}</p>
        <div className="mt-4">
          <input
            type="text"
            value={eventText}
            onChange={handleEventChange}
            placeholder="Enter event"
            className="cal-in border p-2 rounded"
          />
          <button
            onClick={handleAddEvent}
            className="cal-but ml-2 p-2 bg-blue-500 text-white rounded"
          >
            Add Event
          </button>
        </div>
        <div className="emoji-picker mt-4">
          {emojis.map((emoji) => (
            <span
              key={emoji}
              className={`emoji ${selectedEmoji === emoji ? "selected" : ""}`}
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </span>
          ))}
        </div>
        <div className="mt-4 w-full max-w-md">
          <h3 className="text-lg font-bold">
            Events on {date.toDateString()}:
          </h3>
          <ul className="list-disc list-inside">
            {(events[date.toDateString()] || []).map((event, index) => (
              <li key={index}>
                {event.emoji} {event.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default CalendarView;
