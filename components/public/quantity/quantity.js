import React, {useState} from "react";
import style from "./quantity.module.css";

export const Quantity = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = ()=>{
    if(quantity > 1 ){
      setQuantity(quantity + 1)
    }
  }
  const handleDecrement = ()=>{
    if(quantity > 1 ){
      setQuantity(quantity - 1)
    }
  }

  return (
    <>
      <div className={style["quantity"]}>
        <div className={style["div-wrapper"]}>
          <div className={style["text-wrapper-2"]} onClick={handleDecrement}>–</div>
        </div>

        <div className={style["QUTANTITY"]}>
          <div className={style["text-wrapper"]} >1</div>
        </div>

        <div className={style["div-wrapper"]}>
          <div className={style["div"]} onClick={handleIncrement}>+</div>
        </div>
      </div>
    </>
  );
};
