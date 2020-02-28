import React from "react";
import { Cstm } from "../../../types/models";
import "./print.css";

type Props = {
  cstm: Cstm;
};

class Print extends React.Component<Props> {
  render() {
    const { cstm } = this.props;
    return (
      <>
        <div className="cstmLabel-container">
          <div className="cstmLabel-row-1">
            <div>
              <p>〒{cstm.CT_NOYUBN.trim()} </p>
            </div>
            <div>
              <p>読者番号: {cstm.CT_CDCSTM.trim()} </p>
            </div>
          </div>
          <div className="cstmLabel-row">
            <p>{cstm.CT_ADCST1.trim()} </p>
          </div>
          <div className="cstmLabel-row">
            <p>{cstm.CT_ADCST2.trim()} </p>
          </div>
          <div className="cstmLabel-row">
            <p>{cstm.CT_ADCST3.trim()} </p>
          </div>
          <div className="cstmLabel-row">
            <p>{cstm.CT_NMCSTM.trim()} </p>
          </div>
          {cstm.CT_NMTNBU.trim() !== "" && (
            <div className="cstmLabel-row">
              <p>{cstm.CT_NMTNBU.trim()} </p>
            </div>
          )}
          {cstm.CT_NMTNTO.trim() !== "" && (
            <div className="cstmLabel-row">
              <p>{cstm.CT_NMTNTO.trim()} </p>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Print;
