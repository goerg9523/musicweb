import React, { useEffect, useState } from "react";
import style from "./quantity.module.css";

export const CartQuantity = ({ handleDeleteClick, cartItems, handleIncrement, handleDecrement, albumId, index }) => {

  const [plusIsPressed, setPlusIsPressed] = useState(false);
  const [deIsPressed, setDeIsPressed] = useState(false);

  return (
    <>
      <div className={style["quantity"]}>
        <div
          className={
            deIsPressed ? style["div-wrapper-clicked"] : style["div-wrapper"]
          }
          onMouseDown={() => setDeIsPressed(true)}
          onMouseUp={() => setDeIsPressed(false)}
          onClick={()=>{handleDeleteClick(albumId)}}
        >
          <button className={style["text-wrapper-2"]}>–</button>
        </div>

        <div className={style["QUTANTITY"]}>
          <div className={style["text-wrapper"]}> {cartItems[index] ? cartItems[index].p_cart_quantity : 0}</div>
        </div>

        <div
          className={
            plusIsPressed
              ? style["div-wrapper-plus-clicked"]
              : style["div-wrapper-plus"]
          }
          onMouseDown={() => setPlusIsPressed(true)}
          onMouseUp={() => setPlusIsPressed(false)}
          onClick={()=>{handleIncrement(albumId)}}
        >
          <button className={style["div"]}>+</button>
        </div>
      </div>
    </>
  );
};
