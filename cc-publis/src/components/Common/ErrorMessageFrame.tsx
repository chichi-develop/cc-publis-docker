import React from "react";
import "./ErrorMessageFrame.css";

type Props = {
  message: string;
};

const errorMessageFrame: React.FC<Props> = ({ message }) => (
  <div className="common-errorMessageFrame">
    <p>{message}</p>
  </div>
);

export default errorMessageFrame;
