import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

// export const CartContext = createContext(null);

interface Props {
  [PropName: string]: any;
}

export const CartContext = createContext<any | null>(null);

export const CartcontextProvider = (props: Props) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(
    JSON.parse(Cookies.get("cart") || "[]")
  );
  const [totalPrice, setTotalPrice] = useState(
    JSON.parse(Cookies.get("totalPrice") || "0")
  );
  const [totalQuantities, setTotalQuantities] = useState(
    JSON.parse(Cookies.get("totalQuantities") || "0")
  );
  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cartItems));
    Cookies.set("totalPrice", JSON.stringify(totalPrice));
    Cookies.set("totalQuantities", JSON.stringify(totalQuantities));
  }, [cartItems, totalQuantities, totalPrice]);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);
  let foundProduct: any;
  let index;
  const onAdd = useCallback(
    (bookData: any, quantity: any) => {
      const checkProductInCart = cartItems.find(
        (item: any) => item._id === bookData._id
      );

      setTotalPrice(
        (prevTotalPrice: any) => prevTotalPrice + bookData.price * quantity
      );
      setTotalQuantities(
        (prevTotalQuantities: any) => prevTotalQuantities + quantity
      );

      if (checkProductInCart) {
        const updatedCartItems = cartItems.map((cartProduct: any) => {
          if (cartProduct._id === bookData._id)
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
        });

        setCartItems(updatedCartItems);
      } else {
        bookData.quantity = quantity;

        setCartItems([...cartItems, { ...bookData }]);
      }

      toast.success(`${qty} ${bookData.name} added to the cart.`);
    },
    [cartItems, qty]
  );

  const onRemove = (bookData: any) => {
    foundProduct = cartItems.find((item: any) => item._id === bookData._id);
    const newCartItems = cartItems.filter(
      (item: any) => item._id !== bookData._id
    );

    setTotalPrice(
      (prevTotalPrice: any) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities: any) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };
  const toggleCartItemQuantity = (id: any, value: any) => {
    foundProduct = cartItems.find((item: any) => item._id === id);
    index = cartItems.findIndex((bookData: any) => bookData._id === id);
    const newCartItems = cartItems.filter((item: any) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice(
        (prevTotalPrice: any) => prevTotalPrice + foundProduct.price
      );
      setTotalQuantities((prevTotalQuantities: any) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice(
          (prevTotalPrice: any) => prevTotalPrice - foundProduct.price
        );
        setTotalQuantities(
          (prevTotalQuantities: any) => prevTotalQuantities - 1
        );
      }
    }
  };
  const incQty = useCallback(() => {
    setQty((prevQty) => prevQty + 1);
  }, []);

  const decQty = useCallback(() => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  }, []);

  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, SetCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<any[] | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("NovaNestCartItems");
    const cProducts: any[] | null = JSON.parse(cartItems);
    setCartProducts(cProducts);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQty(qty);
        SetCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: any) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        const existingProductIndex = prev.findIndex(
          (item) => item._id === product._id
        );

        if (existingProductIndex !== -1) {
          // If the product is already in the cart, update its quantity
          updatedCart = [...prev];
          ++updatedCart[existingProductIndex].quantity;
          toast.success("Cart Quantity Increased");
          localStorage.setItem(
            "NovaNestCartItems",
            JSON.stringify(updatedCart)
          );
          return updatedCart;
        } else {
          return (updatedCart = [...prev, product]);
        }
      } else {
        updatedCart = [product];
      }
      toast.success("Product Added to Cart");
      localStorage.setItem("NovaNestCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  // const handleAddProductToCart = useCallback((product: any) => {
  //   setCartProducts((prev) => {
  //     let updatedCart;
  //     if (!prev) {
  //       // If the cart is empty, add the product with quantity 1
  //       updatedCart = [product];
  //       toast.success("Product Added to Cart");
  //       localStorage.setItem("NovaNestCartItems", JSON.stringify(updatedCart));
  //       return updatedCart;
  //     }

  //     // Check if the product is already in the cart
  //     const existingProductIndex = prev.findIndex(
  //       (item) => item._id === product._id
  //     );

  //     if (existingProductIndex !== -1) {
  //       // If the product is already in the cart, update its quantity
  //       updatedCart = [...prev];
  //       updatedCart[existingProductIndex].quantity += 1;
  //       toast.success("Product Quantity Updated in Cart");
  //       localStorage.setItem("NovaNestCartItems", JSON.stringify(updatedCart));
  //       return updatedCart;
  //     } else {
  //       // If the product is not in the cart, add it with quantity 1
  //       updatedCart = [...prev, product];
  //       toast.success("Product Added to Cart");
  //       localStorage.setItem("NovaNestCartItems", JSON.stringify(updatedCart));
  //       return updatedCart;
  //     }
  //   });
  // }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: any) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item: any) => {
          return product._id !== item._id;
        });
        console.log("filvrer valut", filteredProducts);
        if (filteredProducts.length === 0) {
          setCartProducts(null);
          localStorage.setItem("NovaNestCartItems", JSON.stringify(null));
        } else {
          setCartProducts(filteredProducts);
          localStorage.setItem(
            "NovaNestCartItems",
            JSON.stringify(filteredProducts)
          );

          toast.success("Product Removed");
          console.log("this is filter", filteredProducts);
        }
      }
    },
    [cartProducts]
  );
  const handleCartQtyIncrease = useCallback(
    (product: any) => {
      let updatedCart;
      if (product.quantity === 99) {
        return toast.error("Ooops! Maximum reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item._id === product._id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("NovaNestCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );
  const handleCartQtyDecrease = useCallback(
    (product: any) => {
      let updatedCart;
      if (product.quantity === 1) {
        return toast.error("Ooops! Minimum reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item._id === product._id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("NovaNestCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("NovaNestCartItems", JSON.stringify(null));
  }, []);
  const value = {
    cartTotalQty, //--//
    cartTotalAmount, //--//
    cartProducts, //--//
    handleAddProductToCart, //--//
    handleRemoveProductFromCart, //--//
    handleCartQtyIncrease, //--//
    handleCartQtyDecrease, //--//
    handleClearCart,
    setShowCart,
    showCart,
    open,
    setOpen,
  };
  const value1 = {
    open,
    setOpen,
    showCart,
    setShowCart,
    cartItems, //--//
    totalPrice, //--//
    totalQuantities, //--//
    qty,
    incQty, //--//
    decQty, //--//
    onAdd, //--//
    toggleCartItemQuantity,
    onRemove, //--//
  };
  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CasrtcontextProvider");
  }
  return context;
};
