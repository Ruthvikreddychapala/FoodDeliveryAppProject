import React, {
  createContext,
  useContext,
  useState
} from "react";

const CartContext = createContext();

export function CartProvider({
  children
}) {

  const [cart, setCart] = useState([]);

  // ADD TO CART
  const addToCart = (item) => {

    const existingItem = cart.find(
      (cartItem) =>
        cartItem.id === item.id
    );

    // IF ITEM EXISTS
    if (existingItem) {

      setCart(

        cart.map((cartItem) =>

          cartItem.id === item.id

            ? {
                ...cartItem,
                quantity:
                  cartItem.quantity + 1
              }

            : cartItem
        )
      );

    } else {

      // NEW ITEM
      setCart([

        ...cart,

        {
          id:
            item.id ||
            Math.random(),

          name: item.name,

          price: item.price,

          quantity: 1,

          restaurantId:
            item.restaurantId,

          restaurantName:
            item.restaurantName || "",

          image:
            item.image ||
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
        }
      ]);
    }
  };

  // INCREASE
  const increaseQty = (id) => {

    setCart(

      cart.map((item) =>

        item.id === id

          ? {
              ...item,
              quantity:
                item.quantity + 1
            }

          : item
      )
    );
  };

  // DECREASE
  const decreaseQty = (id) => {

    setCart(

      cart
        .map((item) =>

          item.id === id

            ? {
                ...item,
                quantity:
                  item.quantity - 1
              }

            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  // CLEAR
  const clearCart = () => {

    setCart([]);
  };

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        clearCart
      }}
    >

      {children}

    </CartContext.Provider>
  );
}

export function useCart() {

  return useContext(CartContext);
}