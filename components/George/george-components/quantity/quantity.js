import React from "react";
import style from "./quantity.module.css";
import { useQuantity } from "../../context/quantity-provider";

export const Quantity = () => {
  const {
    quantity,
    handleIncrement,
    handleDecrement,
    plusIsPressed,
    deIsPressed,
    setPlusIsPressed,
    setDeIsPressed,
  } = useQuantity();

  return (
    <>
      <div className={style["quantity"]}>
        <div
          className={
            deIsPressed ? style["div-wrapper-clicked"] : style["div-wrapper"]
          }
          onMouseDown={() => setDeIsPressed(true)}
          onMouseUp={() => setDeIsPressed(false)}
          onClick={handleDecrement}
        >
          <button className={style["text-wrapper-2"]}>–</button>
        </div>

        <div className={style["QUTANTITY"]}>
          <div className={style["text-wrapper"]}>{quantity}</div>
        </div>

        <div
          className={
            plusIsPressed
              ? style["div-wrapper-plus-clicked"]
              : style["div-wrapper-plus"]
          }
          onMouseDown={() => setPlusIsPressed(true)}
          onMouseUp={() => setPlusIsPressed(false)}
          onClick={handleIncrement}
        >
          <button className={style["div"]}>+</button>
        </div>
      </div>
    </>
  );
};
