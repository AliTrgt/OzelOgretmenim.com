import React from "react";
import style from "./button.module.css";

const Button = ({ styled, children, onClick,type }) => {
  return (
    <button
      className={`${style.button}`}
      style={styled}
      onClick={onClick}
        type={type}
    >
      {children}
    </button>
  );
};

export default Button;
