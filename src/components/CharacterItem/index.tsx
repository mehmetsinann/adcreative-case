import { useDispatch } from "react-redux";

import { Character } from "../../types/Character";
import { HighlightedText } from "../HighlightedText";
import { select, unselect } from "../../redux/slices/selectedSlice";
import { AppDispatch } from "../../redux/store";

export const CharacterItem = ({
  character,
  searchTerm,
  isSelected,
}: {
  character: Character;
  searchTerm: string;
  isSelected: boolean;
}) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className={`w-full flex flex-row space-x-4 items-center p-2`}>
      <input
        type="checkbox"
        className="w-6 h-6"
        onChange={() => {
          !isSelected
            ? dispatch(select(character))
            : dispatch(unselect(character));
        }}
        checked={isSelected}
      />
      <img
        src={character.image}
        alt={character.name}
        width={40}
        height={40}
        className="rounded-md"
      />
      <div className="flex flex-col">
        <HighlightedText
          text={character.name}
          searchTerm={searchTerm}
          style="text-black text-xl"
        />
        <p className="text-gray-600 text-md">
          {character.episode.length} Episodes
        </p>
      </div>
    </div>
  );
};
