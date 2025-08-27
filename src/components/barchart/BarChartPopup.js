import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useDispatch } from "react-redux";
import { clearSelection } from "../../store/calendarSlice";
import "./BarChartPopup.css";

const BarChartPopup = ({ date, data }) => {
  const dispatch = useDispatch();

  if (!data) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3 className="popup-title">Data for {date}</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="user" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3173ad" />
          </BarChart>
        </ResponsiveContainer>

        <button
          className="close-btn"
          onClick={() => dispatch(clearSelection())}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BarChartPopup;
