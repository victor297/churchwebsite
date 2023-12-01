"use client";
declare const window: {
  Email: any;
} & Window;

import { PaystackButton } from "react-paystack";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Paystack = () => {
  const { cartTotalAmount, handleClearCart } = useCart();
  const publicKey = "pk_your_public_key_here";
  const amount: number = 1000000;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const handleSubmit = () => {
    event.preventDefault();
    if (window.Email) {
      window.Email.send({
        Host: "smtp.elasticemail.com",
        Username: "davidvictor295@gmail.com",
        Password: "80C2754334CC0AADAA41B68D977124920154",
        To: "davidvictor297@duck.com",
        From: "davidvictor295@gmail.com",
        Subject: "A BOOK WAS GOTTEN FROM YOUR WEBSITE ",
        Body: `${name} WITH ${email} BOUGHT A BOOK TOTAL AMOUNT IS N${cartTotalAmount} `,
        Port: 2525,
      }).then((message) => {
        console.log(message);
        toast.success("Response received");
      });
    } else {
      toast.error("kindly fill in correct details");
    }
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: name,
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: phone,
        },
      ],
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  };

  return (
    <div className="App text-center font-Roboto tracking-wider">
      <div className="flex flex-row mx-auto w-96 h-72 bg-white shadow-2xl">
        <div className="w-1/2 relative">
          <div className="absolute top-0 bottom-0 left-0 right-0 opacity-20 bg-gray-800 z-10"></div>
          <div className="absolute bottom-0 mb-5 ml-4 text-left text-green-500">
            <p className="text-xl">Dancing Shoes</p>
            <p>{cartTotalAmount}</p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-center bg-green-500 p-5">
          <form>
            <div className="mb-5">
              <label
                className="text-left text-white text-xs uppercase mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                required
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent border-1 border-gray-300 rounded p-2 text-white h-9"
              />
            </div>
            <div className="mb-5">
              <label
                className="text-left text-white text-xs uppercase mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-1 border-gray-300 rounded p-2 text-white h-9"
              />
            </div>
            <div className="mb-5">
              <label
                className="text-left text-white text-xs uppercase mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                required
                type="text"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent border-1 border-gray-300 rounded p-2 text-white h-9"
              />
            </div>
          </form>
          <PaystackButton
            email={email}
            amount={cartTotalAmount * 100}
            metadata={{
              custom_fields: [
                { display_name: "Name", variable_name: "name", value: name },
                { display_name: "Phone", variable_name: "phone", value: phone },
              ],
            }}
            publicKey={`pk_test_24f80340f75a34e90b00aa800e59608dfd6a0b06`}
            text="Pay Now"
            onSuccess={() => {
              alert("Thanks for doing business with us! Come back soon!!");
              router.push("/cart");
              handleClearCart();
              handleSubmit();
            }}
            onClose={() => alert("Wait! Don't leave :(")}
            className="cursor-pointer text-center text-xs uppercase bg-gray-600 font-bold text-white border-none rounded h-9 mt-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Paystack;
