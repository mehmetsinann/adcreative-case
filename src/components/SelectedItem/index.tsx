import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";

import { unselect } from "../../redux/slices/selectedSlice";
import { AppDispatch } from "../../redux/store";

export const SelectedItem = ({ name, id }: { name: string; id: number }) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <span
      className="flex flex-row items-center bg-gray-200 hover:bg-gray-300 p-2 m-2 space-x-2 w-auto rounded-md cursor-pointer transition-all duration-300 ease-in-out"
      onClick={() => {
        dispatch(unselect(id));
      }}
    >
      <p className="text-black">{name}</p>
      <div className="w-6 h-6 rounded-md bg-gray-600 items-center justify-center flex cursor-pointer">
        <IoClose size={20} color="white" />
      </div>
    </span>
  );
};
