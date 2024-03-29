import { useEffect, useState } from "react";
import { CartItem } from "../../../types/index.type";
import {
  useDeleteItemMutation,
  useMinusItemMutation,
  usePlusItemMutation,
} from "../checkoutApiSlice";

const ProductItem = ({ item }: { item: CartItem }) => {
  const [deleteItem] = useDeleteItemMutation();
  const [minus] = useMinusItemMutation();
  const [plus] = usePlusItemMutation();

  const [price, setPrice] = useState<number>(
    item.productItem.price * item.quantity
  );

  const handleDelete = (id: number) => {
    deleteItem(id);
  };
  const handleMinus = (id: number) => {
    if (item.quantity > 1) {
      return minus({ id });
    }
    return deleteItem(id);
  };

  const handlePlus = (id: number) => {
    plus({ id });
  };
  useEffect(() => {
    setPrice(item.productItem.price * item.quantity);
  }, [item]);

  return (
    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
      <img
        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
        src={item.productItem.imageUrl}
      />
      <div className="flex w-full flex-col px-4 py-4">
        <span className="font-semibold">{item.productItem.name}</span>
        <div className="flex items-center border-gray-100 my-2">
          <span
            onClick={() => handleMinus(item.id)}
            className="cursor-pointer rounded-l bg-gray-100 py-2.5 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
          >
            {" "}
            -{" "}
          </span>
          <input
            className="h-10 pl-2 w-14 border  bg-white text-center text-xs outline-none"
            type="number"
            value={item.quantity}
            min="1"
          />
          <span
            onClick={() => handlePlus(item.id)}
            className="cursor-pointer rounded-r bg-gray-100 py-2.5 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
          >
            {" "}
            +{" "}
          </span>
          <div className="ml-3" onClick={() => handleDelete(item.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <p className="text-lg font-bold">${price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
