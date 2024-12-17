import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import MainLayout from "../Layouts/MainLayout";

const CalendarView = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <MainLayout>
      <div className="calendar-container flex justify-center mt-[150px] ">
        <Calendar
          onChange={handleDateChange}
          value={date}
          showWeekNumbers
          minDate={new Date()}
        />
        <p className="ml-[50px]">Selected Date: {date.toDateString()}</p>{" "}
      </div>
    </MainLayout>
  );
};

export default CalendarView;
