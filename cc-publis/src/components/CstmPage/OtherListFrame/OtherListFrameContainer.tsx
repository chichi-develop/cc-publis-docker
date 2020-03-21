import React from "react";
import { Route, Switch } from "react-router-dom";

import MdmmContainer from "./mdmm/MdmmContainer";
import AclgContainer from "./aclg/AclgContainer";
import CsmmContainer from "./csmm/CsmmContainer";
import CstmListContainer from "./cstmList/CstmListContainer";
import CstmZandakaHistoryContainer from "./cstmZandakaHistory/CstmZandakaHistoryContainer";

import "./OtherListFrameContainer.css";

const OtherListFrame: React.FC = () => (
  <div className="otherListFrame-body">
    <Switch>
      <Route exact path="/cstm" component={CstmListContainer} />
      <Route path="/cstm/:cdcstm/csmm" component={CsmmContainer} />
      <Route
        exact
        path="/cstm/:cdcstm/cstm-zandaka-history"
        component={CstmZandakaHistoryContainer}
      />
      <Route path="/cstm/:cdcstm/aclg" component={AclgContainer} />
      <Route path="/cstm/:cdcstm/mdmm" component={MdmmContainer} />
    </Switch>
  </div>
);

export default OtherListFrame;
