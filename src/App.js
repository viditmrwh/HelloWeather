import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({q: "Mandi"});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location"
      toast.info("Fetching weather for " +  message)
      await getFormattedWeatherData({...query, units}).then
      ((data) => {
        toast.success(`Successfully fetched for ${data.name}, ${data.country}.`)
        setWeather(data);
      });
    };

    fetchWeather(); 
  }, [query, units])

  const formatBackground = () => {
    if(!weather) return "from-blue-700 via-blue-800 to-gray-900"
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-blue-700 via-blue-800 to-gray-900";

    return "from-yellow-600 to-red-600";
  } 

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>


    <TopButtons setQuery={setQuery}/>
    <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

    {weather && (
        <div>
          <TimeAndLocation weather = {weather}/>
          <TempAndDetails weather = {weather}/>

          <Forecast title = "Hourly Forecast" items={weather.hourly}/>
          <Forecast title = "Daily Forecast" items={weather.daily}/>
        </div>
      )}

    <ToastContainer autoClose={2000} theme="dark" newestOnTop={true}/>
    </div>
  );
}

export default App;



// from-pink-600 via-red-500 to-yellow-500
// from-indigo-500 via-purple-500 to-pink-500