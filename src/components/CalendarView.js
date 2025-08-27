import React, { useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectDate } from "../store/calendarSlice";
import BarChartPopup from "./barchart/BarChartPopup";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const dispatch = useDispatch();
  const { data, selectedDate, selectedData, alert } = useSelector((state) => state.calendar);

  const events = useMemo(() => {
    return Object.keys(data).map((dateStr) => {
      const date = moment(dateStr, "DD-MM-YYYY").toDate();
      return {
        title: `${data[dateStr].length} Records`,
        start: date,
        end: date,
        allDay: true,
      };
    });
  }, [data]);

  const handleSelectSlot = (slotInfo) => {
    const clickedDate = moment(slotInfo.start).format("DD-MM-YYYY");
    dispatch(selectDate(clickedDate));
  };

  return (
    <div className="p-6">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectSlot}
      />

      {alert && (
        <div style={{ marginTop: "20px", padding: "10px", background: "#fff3cd", color: "#856404", border: "1px solid #ffeeba" }}>
        {alert}
        </div>
      )}

      
      {selectedData && <BarChartPopup date={selectedDate} data={selectedData} />}
    </div>
  );
}

export default CalendarView;
