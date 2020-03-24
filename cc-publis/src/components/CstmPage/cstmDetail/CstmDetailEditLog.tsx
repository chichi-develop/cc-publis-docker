import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { CCLogs } from "../../../types/models";

type Props = {
  cclogs: CCLogs;
};

const useStyles = makeStyles({
  root: {
    width: 900
  },
  container: {
    maxHeight: 900
  }
});

const columns = [
  {
    id: "created",
    label: "更新日",
    minWidth: 220,
    align: "right",
    format: (value: string) => moment(value).format("Y年M月D日 k時mm分")
  },
  {
    id: "userId",
    label: "更新者",
    minWidth: 100,
    align: "center",
    format: (value: any) => value
  },
  {
    id: "detail",
    label: "更新内容",
    minWidth: 540,
    align: "left",
    format: (value: any) => value
    // format: (value: any) => value.replace(/,/g, "\n")
  }
] as const;

const CstmDetailEditLog: React.FC<Props> = ({ cclogs }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  // align={column.align}
                  align={"center"}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {cclogs.map(row => (
              <TableRow key={row._id}>
                <TableCell align="right">
                  {moment(row.created as string).format("Y年M月D日 k時mm分")}
                </TableCell>
                <TableCell align="center">{row.userId}</TableCell>
                <TableCell align="left">{row.detail}</TableCell>
              </TableRow>
            ))} */}
            {cclogs.map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format !== undefined
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CstmDetailEditLog;
