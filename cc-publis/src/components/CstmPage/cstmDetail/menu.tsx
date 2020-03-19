import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { CCLogs } from "../../../types/models";

type Props = {
  cstmDetailHistory: CCLogs;
};

const SimpleMenu: React.FC<Props> = ({ cstmDetailHistory }) => {
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    console.log("handloClick");
    setAnchorEl(event.currentTarget);
  };

  const handleSearchHistory = (cdcstm: string) => {
    setAnchorEl(null);
    history.push(`/cstm?columnName=ct_cdcstm&key=${cdcstm}`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        表示履歴
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {cstmDetailHistory
          .sort(function(a: any, b: any) {
            if (a.created < b.created) {
              return 1;
            } else {
              return -1;
            }
          })
          .map(cclog => {
            return (
              <MenuItem
                key={cclog._id}
                onClick={() => {
                  handleSearchHistory(cclog.cdcstm);
                }}
              >
                {cclog.cdcstm}　{cclog.nmcstm}　（
                {moment(cclog.created as string).format("Y年M月D日 k時mm分")}）
              </MenuItem>
            );
          })}
      </Menu>
    </div>
  );
};

export default SimpleMenu;
