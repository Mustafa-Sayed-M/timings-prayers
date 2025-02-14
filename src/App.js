import React from "react";
import backgroundImage from './Images/background.jpg';
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Prayers from "./Components/Prayers";
import DateInfo from "./Components/DateInfo";
import NextPrayer from "./Components/NextPrayer";

// Get Timings Data:
const getTimingsData = async () => {
  try {
    const currentDate = moment().format("DD-MM-YYYY");
    const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${currentDate}?city=Cairo&country=EG`;
    const res = await fetch(apiUrl);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

function App() {
  // Timings Data:
  const [timingsData, setTimingsData] = React.useState([]);
  // Next Prayer:
  const [nextPrayer, setNextPrayer] = React.useState(null);

  const timingsQuery = useQuery({
    queryKey: ["timingsData"],
    queryFn: getTimingsData,
  });

  // Request Timings Data:
  React.useEffect(() => {
    if (timingsQuery.data) {
      const timingsData = timingsQuery.data.data.timings;
      const fivePrayers = [
        { name: "Fajr", nativeName: "الفجر", time: timingsData["Fajr"] },
        { name: "Dhuhr", nativeName: "الظهر", time: timingsData["Dhuhr"] },
        { name: "Asr", nativeName: "العصر", time: timingsData["Asr"] },
        { name: "Maghrib", nativeName: "المغرب", time: timingsData["Maghrib"] },
        { name: "Isha", nativeName: "العشاء", time: timingsData["Isha"] }
      ];
      setTimingsData(fivePrayers);
    }
  }, [timingsQuery.data]);

  // Get Next Prayer:
  React.useEffect(() => {
    if (timingsData.length > 0) {
      const now = moment();
      let nextPrayerIndex = timingsData.findIndex(prayer => moment(`${moment().format('YYYY-MM-DD')} ${prayer.time}`).isAfter(now));
      if (nextPrayerIndex === -1) {
        nextPrayerIndex = 0;
      }
      const nextPrayer = timingsData[nextPrayerIndex];
      setNextPrayer(nextPrayer);
    }
  }, [timingsData, timingsData.length]);

  return (
    <div className="App h-screen p-5 flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      {/* Overlay */}
      <div className="overlay w-full h-full absolute bg-black/60 left-0 top-0 z-10"></div>
      {/*  */}
      <div className="p-5 rounded-md backdrop-blur-md bg-[#3f51b50d] text-white relative z-20 shadow-md w-full md:w-[750px]">
        {/* Date Info */}
        <DateInfo />
        {/* Next Prayer */}
        <NextPrayer nextPrayer={nextPrayer} />
        {/* Display Five Prayers */}
        <Prayers timingsData={timingsData} />
      </div>
    </div>
  );
}

export default App;