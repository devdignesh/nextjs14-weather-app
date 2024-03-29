import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TimeFormate: React.FC = () => {
  const initial = new Date();
  const { data } = useSelector((state: RootState) => state.weather);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const calculateLocalTime = (
      initialTime: Date,
      offsetSeconds: number
    ): Date => new Date(initialTime.getTime() + offsetSeconds * 1000);

    const updateLocalTime = () =>
      setTime(calculateLocalTime(new Date(), data.timezone));
    setTime(new Date(0));
    const timer = setInterval(updateLocalTime, 1000);
    return () => clearInterval(timer);
  }, [data.timezone]);

  const formattedTime = time?.toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
  return <p className="font-semibold">{formattedTime}</p>;
};

export default TimeFormate;
