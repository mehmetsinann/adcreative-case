import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";

import { unselect } from "../../redux/slices/selectedSlice";

export const SelectedItem = ({ name, id }: { name: string; id: number }) => {
  const dispatch = useDispatch();
  return (
    <span className="flex flex-row items-center bg-gray-300 p-2 m-2 space-x-2 w-auto rounded-md">
      <p className="text-black">{name}</p>
      <div
        className="w-6 h-6 rounded-md bg-gray-600 items-center justify-center flex cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-in-out"
        onClick={() => {
          dispatch(
            unselect({
              id,
            })
          );
        }}
      >
        <IoClose size={20} color="white" />
      </div>
    </span>
  );
};
