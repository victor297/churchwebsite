"use client";
import { BookData } from "@/app/lib/interface";
// import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { FaCartArrowDown, FaShoppingBasket } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

interface BookDetailsContentProps {
  bookData: BookData;
}
const BookDetailContent = ({ bookData }: BookDetailsContentProps) => {
  const [qty, setQty] = useState(1);
  const [disable, setDisable] = useState(true);
  console.log("bookdtat", bookData);
  const bookWithQuantity = {
    ...bookData,
    quantity: qty,
  };
  console.log("bookWithQuantity", bookWithQuantity);

  // const { qty, decQty, incQty, onAdd, setShowCart } = useCart();
  const {
    handleAddProductToCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    setShowCart,
  } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    handleAddProductToCart(bookWithQuantity);
    setDisable(!disable);
    // onAdd(bookData, qty);
  };

  const handleBuyNow = () => {
    // Use a setTimeout to defer the state update until after the rendering phase
    handleAddProductToCart(bookWithQuantity);
    setTimeout(() => {
      setShowCart(true);
      router.push("/cart");
    }, 0.001);
  };
  return (
    <div>
      <div className="bg-white pt-20 pb-20">
        <div className="flex justify-around items-center flex-col md:flex-row">
          <div className="rounded-lg bg-gray-300 md:w-[500px] w-[400px] h-[450px]">
            <div className="">
              <Image
                src={bookData.image}
                width={500}
                height={500}
                alt="detailImage"
                className=""
              />
            </div>
          </div>
          <div className="md:pt-0 pt-4">
            <h1 className="text-black md:text-7xl text-6xl font-bold">
              {bookData.name}
            </h1>
            <h4 className="pt-4 text-gray-700 text-lg font-normal">
              {bookData.details}
            </h4>
            <p className="pt-4 font-bold">₦{bookData.price}</p>
            {disable ? (
              <div className="flex gap-4 mt-4 items-center ">
                <h3>Quantity:</h3>
                <p className="border border-gray-500 p-2 flex">
                  <span
                    className="cursor-pointer pr-2 pl-2 border-r border-gray-500 py-2"
                    onClick={() =>
                      setQty((prevQty) => {
                        if (prevQty - 1 < 1) return 1;

                        return prevQty - 1;
                      })
                    }
                  >
                    <AiOutlineMinus className="text-red-500" />
                  </span>
                  <span className="pl-4 pr-4 border-r border-gray-500 py-1">
                    {qty}
                  </span>
                  <span
                    className="cursor-pointer pl-4 pr-2 py-2"
                    onClick={() => setQty((prevQty) => prevQty + 1)}
                  >
                    <AiOutlinePlus className="text-green-500" />
                  </span>
                </p>
              </div>
            ) : null}
            <div className="flex md:gap-10 gap-4">
              <div
                className={`flex ${
                  disable ? "block" : "hidden"
                } mt-4 justify-center items-center gap-8 bg-red-500 text-white hover:bg-red-400 rounded-lg md:w-64 w-52 h-14 cursor-pointer`}
                onClick={handleAddToCart}
              >
                <FaCartArrowDown className="text-white" fontSize="2em" />
                <button className="md:text-xl tex-lg font-bold">
                  ADD TO CART
                </button>
              </div>
              <div
                className="flex mt-4 justify-center items-center gap-8 bg-transparent border-red-500  border text-red hover:bg-red-100 rounded-lg md:w-64 w-52 h-14 cursor-pointer"
                onClick={handleBuyNow}
              >
                <FaShoppingBasket className="text-red-500" fontSize="2em" />
                <button className="md:text-xl text-lg font-bold text-red-500">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailContent;
