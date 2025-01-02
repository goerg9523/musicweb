import { createContext, useState, useContext } from "react";

const QuantityContext = createContext();

export const QuantityProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(1);
  const [plusIsPressed, setPlusIsPressed] = useState(false);
  const [deIsPressed, setDeIsPressed] = useState(false);

  const handleIncrement = () => {
    if (10 > quantity > 0) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <QuantityContext.Provider
      value={{
        quantity,
        handleIncrement,
        handleDecrement,
        plusIsPressed,
        deIsPressed,
        setPlusIsPressed,
        setDeIsPressed,
      }}
    >
      {children}
    </QuantityContext.Provider>
  );
};

export const useQuantity = () => useContext(QuantityContext);
