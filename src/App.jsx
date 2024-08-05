import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import RedHerth from "./assets/icons8-pixel-heart-48.png";
import Fav from "./components/Fav";
import { FaSearch } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
  const [Poke, setPoke] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [number, setnumber] = useState(1);
  const [input, setInput] = useState("");
  const [FavoritePokems, setFavoritePokems] = useState([]);

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

  const handleInputChange = (event) => {
    setInput(event.target.value.toLowerCase());
  };

  const handleSearch = () => {
    if (input.trim() !== "") {
      setloading(true);
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${input}`)
        .then((res) => {
          setPoke(res.data);
          seterror("");
          setInput("");
        })
        .catch((err) => {
          seterror("Pokémon not found.");
          setPoke("");
        })
        .finally(() => {
          setloading(false);
        });
    }
  };

  const catipalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const AddFev = () => {
    setFavoritePokems((prevstate) => [...prevstate, Poke]);
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-start items-center font-sans bg-slate-800 bg-cover bg-center">
        <h1 className="text-5xl font-semibold text-white mt-16 mb-8">Poke</h1>
        {loading ? (
          <ClipLoader
            color={"#ffffff"}
            loading={loading}
            cssOverride={{ display: "block", margin: "0 auto" }}
            size={50}
          />
        ) : error ? (
          <p className="text-white text-xl">{error}</p>
        ) : Poke ? (
          <div className="bg-slate-900 bg-opacity-70 p-6 rounded-lg shadow-lg text-center flex flex-col items-center space-y-4 duration-300 h-full relative">
            <p className="text-white mb-2 text-2xl px-6 py-3 rounded-lg bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {Poke.id}
            </p>
            <img
              onClick={AddFev}
              src={RedHerth}
              alt="Favorite"
              className="fixed left-[20px] top-[20px] cursor-pointer w-11 h-11"
            />
            <img
              src={Poke?.sprites?.other?.home?.front_default}
              alt={Poke.name}
              className="w-[300px] h-[300px] object-contain"
            />
            <p className="text-white text-2xl font-medium bg-slate-700 px-4 py-2 rounded-md">
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
                onChange={handleInputChange}
                type="text"
                placeholder="1025 ตัว"
                className="w-full max-w-md p-3 border  border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center "
              >
                <FaSearch className="mr-3" />
                Search
              </button>
            </div>
            <Fav
              FavoritePokems={FavoritePokems}
              catipalizeFirstLetter={catipalizeFirstLetter}
            />
          </div>
        ) : (
          <p className="text-white text-xl">No data available.</p>
        )}
      </div>
    </>
  );
};

export default App;
