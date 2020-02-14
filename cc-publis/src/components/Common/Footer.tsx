import React from "react";
import "./Footer.css";

type Props = {
  footerText: string;
};

const Footer: React.FC<Props> = ({ footerText }) => (
  <div className="footerBar">
    <div className="footerBar-container">
      <p className="footerBar-container-copyright">{footerText}</p>
    </div>
  </div>
);

export default Footer;
