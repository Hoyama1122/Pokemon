import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const App = () => {
  const [Poke, setPoke] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [number, setnumber] = useState(1);
  const [input, setInput] = useState("");
  // Pokemon Total 1025
  useEffect(() => {
    let abortController = new AbortController();

    loadPoke();

    return () => abortController.abort();
  }, [number]);

  const loadPoke = async () => {
    try {
      setloading(true);
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`);
      setPoke(res.data);
      seterror("");
    } catch (err) {
      seterror("Error Something");
    } finally {
      setloading(false);
    }
  };
  const PrevPoke = () => {
    if (number > 1) setnumber((number) => number - 1);
  };
  const NextPoke = () => {
    if (number < 1025) setnumber((number) => number + 1);
  };


  const handleSearch = () => {
    const parsedNumber = parseInt(input);
    if (parsedNumber >= 1 && parsedNumber <= 1025) {
      setnumber(parsedNumber);
      setInput(""); // Clear input field after search
    } else {
      seterror("Invalid Pokémon number.");
    }
  };

  const catipalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-start items-center font-sans bg-slate-800 bg-cover bg-center ">
        <h1 className="text-5xl font-semibold text-white mt-16 mb-8">Poke</h1>
        {loading ? (
          <p className="text-white text-xl">Loading...</p>
        ) : error ? (
          <p className="text-white text-xl">{error}</p>
        ) : Poke ? (
          <div className="bg-slate-900 bg-opacity-70 p-6 rounded-lg shadow-lg text-center flex flex-col items-center space-y-4 scale-100 duration-300 h-full">
            <p className="text-white mb-2 text-2xl px-6 py-3 rounded-lg bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {Poke.id}
            </p>
            <img
              src={Poke?.sprites?.other?.home?.front_default}
              alt={Poke.name}
              className="w-[300px] h-[300px] object-contain"
            />
            <p className="text-white text-2xl font-medium bg-slate-700 px-4 py-2 rounded-md ">
              {catipalizeFirstLetter(Poke.name)}
            </p>

            <ul>
              <p className="text-white bg-red-500 rounded-md px-3 py-2 text-xl font-semibold mb-3">
                ความสามารถ
              </p>
              {Poke.abilities.map((abil, index) => (
                <li key={index} className="text-white text-lg">
                  {abil.ability.name}
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center w-full mt-4 gap-8">
              <a
                onClick={PrevPoke}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
              >
                Previous Pokémon
              </a>
              <a
                onClick={NextPoke}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
              >
                Next Pokémon
              </a>
            </div>
            <div className="flex justify-center items-center mt-8">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="1025 ตัว"
                className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Search
              </button>
            </div>
          </div>
        ) : (
          <p className="text-white text-xl">No data available.</p>
        )}
      </div>
    </>
  );
};

export default App;
