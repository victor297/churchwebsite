"use client";
import React from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
// import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
const CartClient = () => {
  //   const {
  //       totalPrice,
  //       totalQuantities,
  //       cartItems,
  //       setShowCart,
  //       toggleCartItemQuantity,
  //       onRemove,
  // } = useAppContext();

  const router = useRouter();
  const {
    cartTotalAmount: totalPrice,
    totalQuantities,
    cartProducts: cartItems,
    setShowCart,

    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleRemoveProductFromCart: onRemove,
  } = useCart();

  return (
    <div className="p-10 md:mb-10 mb-0">
      <div className="">
        {!cartItems ? (
          <div className="flex flex-col items-center justify-center">
            <AiOutlineShopping fontSize="5em" />
            <h3 className="text-black text-xl font-normal pt-2">
              Your shopping bag is empty
            </h3>
            <Link href="/books" className="pt-8">
              <button
                type="button"
                onClick={() => {
                  setShowCart(false);
                }}
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded w-[170px]"
              >
                Back to books
              </button>
            </Link>
          </div>
        ) : null}

        {cartItems ? (
          <>
            <div>
              <h1 className="text-black text-3xl font-bold">SHOPPING CART</h1>
              <div className="border-t border-gray-400 h-0 md:w-[600px] w-82 mt-2"></div>
            </div>

            <div className="flex justify-between flex-col md:flex-row">
              <div className="pt-2">
                {cartItems.map((item: CartItem) => (
                  <div className="" key={item._id}>
                    <div className="flex pb-2 pt-2">
                      <div className="flex">
                        <div className="rounded-lg bg-gray-300 md:w-[100px] w-[100px] h-[100px]">
                          <Image
                            src={item.image}
                            width={100}
                            height={100}
                            alt="detailImage"
                            className=""
                          />
                        </div>
                        <div className="pl-4">
                          <h3 className="text-black text-xl font-normal">
                            {item.name}
                          </h3>
                          <h4 className="pt-8">₦{item.price}</h4>
                        </div>
                      </div>
                      <div className="md:pl-64 pl-12">
                        <div className="pl-20">
                          <button
                            type="button"
                            className=""
                            onClick={() => onRemove(item)}
                          >
                            <Image
                              src="/assets/close-svgrepo.svg"
                              alt="hamburger-menu"
                              width={24}
                              height={24}
                            />
                          </button>
                        </div>
                        <div className="border border-gray-500 p-0 flex mt-4">
                          <span
                            className="cursor-pointer pr-2 pl-2 border-r border-gray-500 py-2"
                            onClick={() => handleCartQtyDecrease(item)}
                          >
                            <AiOutlineMinus className="text-red-500" />
                          </span>
                          <span className="pl-4 pr-4 border-r border-gray-500 py-1">
                            {item.quantity}
                          </span>
                          <span
                            className="cursor-pointer pl-4 pr-2 py-2"
                            onClick={() => handleCartQtyIncrease(item)}
                          >
                            <AiOutlinePlus className="text-green-500" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-400 h-0 md:w-[600px] w-82 mt-2"></div>
                  </div>
                ))}
              </div>
              <div>
                <div>
                  <div className="mr-52 rounded-lg bg-gray-100 md:w-[200px] w-[200px] h-[110px] md:h-[200px] p-4 md:mt-0 mt-8 ml-[100px] md:ml-0">
                    <div className="flex justify-around">
                      <h3 className="font-bold text-black">Subtotal:</h3>
                      <h3 className="font-bold text-black">₦{totalPrice}</h3>
                    </div>
                    <div className="md:pt-8 pt-2">
                      <button
                        onClick={() => router.push("/paystack")}
                        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded w-[170px]"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CartClient;
