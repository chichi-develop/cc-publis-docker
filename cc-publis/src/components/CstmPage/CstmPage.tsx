import React from "react";
import { Route } from "react-router-dom";

import SearchForm from "./search/SearchForm";
import CstmDetailContainer from "./cstmDetail/CstmDetailContainer";
import OtherListFrame from "./OtherListFrame/otherListFrameContainer";

import "./CstmPage.css";

const CstmPage: React.FC = () => (
  <div className="cstmPage-body">
    <SearchForm />
    <Route path="/cstm" component={CstmDetailContainer} />
    <OtherListFrame />
  </div>
);

export default CstmPage;
