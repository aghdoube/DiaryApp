// src/Components/CalendarView.jsx
import React, { useState } from "react";
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css"; // Import default styles for calendar
import { Link } from "react-router-dom";

const CalendarView = () => {
  const [date, setDate] = useState(new Date()); // State to manage selected date

  const handleDateChange = (newDate) => {
    setDate(newDate); // Update selected date when user picks a date
  };

  return (
    <div className="calendar-container">
      <h2>Choose a Date</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        showWeekNumbers
        minDate={new Date()} // Optional: Disable past dates
      />
      <p>Selected Date: {date.toDateString()}</p> {/* Display selected date */}
    </div>
  );
};

export default CalendarView;
