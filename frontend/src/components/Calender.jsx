import React, { useState } from 'react';
import styled from 'styled-components';

const Calendar = ({ selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(selectedYear, currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, currentDate.getMonth(), 1).getDay();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const nextMonth = () => {
    let nextMonth = currentDate.getMonth() + 1;
    let nextYear = selectedYear;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }
    setSelectedYear(nextYear);
    setCurrentDate(new Date(nextYear, nextMonth));
  };
  
  const prevMonth = () => {
    let prevMonth = currentDate.getMonth() - 1;
    let prevYear = selectedYear;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear -= 1;
    }
    setSelectedYear(prevYear);
    setCurrentDate(new Date(prevYear, prevMonth));
  };
  
  const handleDateClick = (day, event) => {
    event.stopPropagation();
    const selected = new Date(selectedYear, currentDate.getMonth(), day);
  
    if (isNaN(selected.getTime())) {
      console.error("Invalid selected date:", selected);
      return;
    }
  
    // Convert to YYYY-MM-DD format
    const formattedDate = selected.toISOString().split("T")[0];
  
    onDateSelect(formattedDate); // Pass properly formatted date
    setShowCalendar(false);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };
  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
    setCurrentDate(new Date(Number(e.target.value), currentDate.getMonth()));
  };

  const days = Array.from({ length: firstDayOfMonth }, (_, i) => <DayCell key={`empty-${i}`} />)
    .concat(
      Array.from({ length: daysInMonth }, (_, day) => {
        const date = new Date(selectedYear, currentDate.getMonth(), day + 1);
        return (
          <DayCell key={day} onClick={(event) => handleDateClick(day + 1 , event)}>
            {day + 1}
          </DayCell>
        );
      })
    );

  return (
    <CalendarWrapper>
      <DateInput onClick={() => setShowCalendar(!showCalendar)} value={formatDate(selectedDate)} readOnly />
      {showCalendar && (
        <CalendarDropdown onClick={(e)=>e.stopPropagation()}>
          <CalendarHeader>
            <MonthNav onClick={prevMonth}>◀</MonthNav>
            <MonthYear>{months[currentDate.getMonth()]}</MonthYear>
            <YearSelect value={selectedYear} onChange={handleYearChange}>
              {Array.from({ length: 30 }, (_, i) => 2000 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </YearSelect>
            <MonthNav onClick={nextMonth}>▶</MonthNav>
          </CalendarHeader>
          <WeekDays>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <WeekDay key={day}>{day}</WeekDay>
            ))}
          </WeekDays>
          <DaysGrid>{days}</DaysGrid>
        </CalendarDropdown>
      )}
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  font-size: 1.4rem;
  cursor: pointer;
  color: white;
  &:focus { border-color: #007bff; }
  &::placeholder { color: gray; }
`;

const CalendarDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fffffe;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 280px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 8px;
  flex: 1000;
  z-index: 1000;
`;

const MonthNav = styled.button`
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  &:hover { color: #007bff; }
`;

const MonthYear = styled.span`
  font-size: 1.4rem;
`;

const YearSelect = styled.select`
  font-size: 1rem;
  border: none;
  cursor: pointer;
`;

const WeekDays = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const WeekDay = styled.div`
  width: 14%;
  text-align: center;
  font-weight: bold;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const DayCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  &:hover { background: #007bff; color: white; }
`;

export default Calendar;
