import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";

import { fetchCharacters } from "./redux/slices/characterSlice";
import { AppDispatch, RootState } from "./redux/store";

import { CharacterItem } from "./components/CharacterItem";
import { SelectedItem } from "./components/SelectedItem";

import { IoReloadOutline } from "react-icons/io5";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const characters = useSelector(
    (state: RootState) => state.characters.characters
  );
  const selectedCharacters = useSelector(
    (state: RootState) => state.selected.selectedCharacters
  );
  const status = useSelector((state: RootState) => state.characters.status);
  const error = useSelector((state: RootState) => state.characters.error);

  useEffect(() => {
    dispatch(fetchCharacters(searchTerm || ""));
    searchTerm && setIsMenuOpen(true);
  }, [dispatch, searchTerm]);

  if (status === "loading" && !characters.length) {
    return (
      <div className="text-gray-800 justify-center items-center flex h-screen flex-col">
        <IoReloadOutline className="animate-spin" size={40} />
      </div>
    );
  }

  if (status === "failed") {
    console.log(error);
    return (
      <div className="text-red-500 justify-center items-center flex h-screen flex-col">
        <p>Something went wrong!</p>
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          Click to refresh
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen px-4">
      <div
        className="relative md:w-1/2 sm:w-2/3 w-full flex flex-wrap border border-gray-200 my-4 rounded-md pr-20 cursor-text"
        onClick={() => {
          inputRef?.current?.focus();
        }}
      >
        {selectedCharacters.map((character) => (
          <SelectedItem
            key={character.id}
            name={character.name}
            id={character.id}
          />
        ))}
        <input
          ref={inputRef}
          type="text"
          className="p-2 my-2 bg-transparent text-black focus:outline-none rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="absolute self-center right-2 p-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-all duration-300 ease-in-out"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {isMenuOpen ? <IoCaretUp size={20} /> : <IoCaretDown size={20} />}
        </button>
      </div>

      <div
        className={`md:w-1/2 sm:w-2/3 w-full ${
          isMenuOpen ? "border md:h-1/2 h-full" : "h-0"
        } mb-4 border-gray-200 rounded-lg divide-y overflow-y-scroll transition-all duration-300 ease-in-out`}
      >
        {characters.map((character) => (
          <CharacterItem
            key={character.id}
            character={character}
            searchTerm={searchTerm}
            isSelected={selectedCharacters.some((c) => c.id === character.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
