import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Styles/Calendar.css";
import MainLayout from "../Layouts/MainLayout";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventText, setEventText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    setEvents(savedEvents);
  }, []);

  const handleDateSelect = (slotInfo) => {
    setDate(slotInfo.start);
  };

  const handleEventChange = (e) => {
    setEventText(e.target.value);
  };

  const handleAddEvent = () => {
    if (!eventText.trim()) return;
    const newEvent = {
      title: `${eventText} ${selectedEmoji}`,
      start: date,
      end: date,
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEventText("");
    setSelectedEmoji("");
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  return (
    <MainLayout>
      <div className="cal-con flex flex-col items-center mt-[150px]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: "100%", maxWidth: 880 }}
          onSelectSlot={handleDateSelect}
          selectable
        />
        <p className="mt-4">Selected Date: {date.toDateString()}</p>

        <div className="mt-4">
          <input
            type="text"
            value={eventText}
            onChange={handleEventChange}
            placeholder="Enter event description"
            className="cal-in border p-2 rounded"
          />
          <button
            onClick={handleAddEvent}
            className="cal-but ml-2 p-2 rounded"
            style={{ backgroundColor: "#ecbe80" }}
          >
            Add Event
          </button>
        </div>

        <div className="emoji-picker mt-4 flex flex-wrap gap-2">
          {["😀", "🎉", "❤️", "👍", "🌟", "🔥"].map((emoji) => (
            <span
              key={emoji}
              className={`emoji ${selectedEmoji === emoji ? "selected" : ""}`}
              onClick={() => handleEmojiClick(emoji)}
              style={{ cursor: "pointer", fontSize: "1.5rem" }}
            >
              {emoji}
            </span>
          ))}
        </div>

        <div className="mt-4 w-full max-w-md" style={{ color: "#ecbe80" }}>
          <h3 className="text-lg font-bold">
            Events on {date.toDateString()}:
          </h3>
          <ul className="list-disc list-inside" style={{ color: "#ecbe80" }}>
            {events
              .filter((event) => moment(event.start).isSame(date, "day"))
              .map((event, index) => (
                <li key={index}>{event.title}</li>
              ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default CalendarView;
