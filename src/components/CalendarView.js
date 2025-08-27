import { useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectDate, clearSelection } from "../store/calendarSlice";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const localizer = momentLocalizer(moment);

export default function CalendarView() {
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

      {selectedData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ background: "white", padding: "20px", borderRadius: "8px", width: "600px" }}>
            <h3>Data for {selectedDate}</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={selectedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="user" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>

            <button
              onClick={() => dispatch(clearSelection())}
              style={{ marginTop: "15px", padding: "8px 16px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
