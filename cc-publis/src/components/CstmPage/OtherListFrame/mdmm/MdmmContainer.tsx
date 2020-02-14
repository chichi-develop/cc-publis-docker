import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../../store/actions";
import { StoreState } from "../../../../store";
import { useParams } from "react-router-dom";

import moment from "moment";
import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon
} from "@material-ui/icons";

import LinkList from "../common/LinkList";
import { Mdmms, Mdmm } from "../../../../types/models";

// import CircularProgress from '@material-ui/core/CircularProgress';

import Modal from "../../../Common/Modal";

import MdmmEdit from "./MdmmModalEdit";
import MdmmAdd from "./MdmmModalAdd";
import "./Mdmm.css";

type Props = {
  mdmms: Mdmms;
  mdmmEdit: typeof Actions.editMdmmsStart;
  mdmmDelete: typeof Actions.deleteMdmmsStart;
  clearSortFilter: boolean;
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  icon: {
    margin: theme.spacing(1)
  },
  iconHover: {
    margin: theme.spacing(1),
    color: "#668ad8",
    "&:hover": {
      // color: '#0b7dda',
      color: blue[800]
    }
  }
}));

const MdmmContainer: React.FC = () => {
  const { cdcstm } = useParams();
  const mdmmState = useSelector((state: StoreState) => state.mdmm);
  const dispatch = useDispatch();
  const mdmmSearch = useCallback(
    (cdcstm: string) => dispatch(Actions.getMdmmsStart(cdcstm)),
    [dispatch]
  );
  const mdmmAdd = useCallback(
    (mdmm: Mdmm) => dispatch(Actions.addMdmmsStart(mdmm)),
    [dispatch]
  );
  const mdmmDelete = useCallback(
    (cdcstm: string, nommrb: number) =>
      dispatch(Actions.deleteMdmmsStart(cdcstm, nommrb)),
    [dispatch]
  );
  const mdmmEdit = useCallback(
    (cdcstm: string, nommrb: number, mdmm) =>
      dispatch(Actions.editMdmmsStart(cdcstm, nommrb, mdmm)),
    [dispatch]
  );

  let cm_mdmms = mdmmState.cm_mdmms;
  let showListMdmms = mdmmState.showListMdmms;
  let clearSortFilter = mdmmState.showListMdmms;

  useEffect(() => {
    console.log("MdmmContainer render!");
    mdmmSearch(cdcstm || "0");
    return () => console.log("unmounting...");
  }, [mdmmSearch, cdcstm]);

  return (
    <div className="mdmm-body">
      {showListMdmms ? (
        <>
          <div className="mdmm-menu">
            <p className="frame-title">お客様窓口メモ</p>
            <Modal
              title="新規メモ登録"
              // open={handleOpenModal => <button className='mdmmTable-addButton' onClick={handleOpenModal}>新規メモ登録</button>}
              open={(handleOpenModal: () => void) => (
                <button
                  className="commonTable-addButton"
                  type="button"
                  onClick={handleOpenModal}
                >
                  新規
                </button>
              )}
              content={(handleCloseModal: () => void) => (
                <MdmmAdd
                  mdmmAdd={mdmmAdd}
                  handleCloseModal={handleCloseModal}
                />
              )}
              outClickClose={false}
            />
            <LinkList cdcstm={cdcstm || "0"} showLinkMdmm={false} />
          </div>
          <MdmmTable
            mdmms={cm_mdmms}
            mdmmEdit={mdmmEdit}
            mdmmDelete={mdmmDelete}
            clearSortFilter={clearSortFilter}
          />
          {/* {props.state.isLoading && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress style={{ margin: "10px" }} />
            </div>
          )} */}
        </>
      ) : (
        <LinkList cdcstm={cdcstm || "0"} showLinkMdmm={false} />
      )}
    </div>
  );
};

const MdmmTable: React.FC<Props> = ({
  mdmms,
  mdmmEdit,
  mdmmDelete,
  clearSortFilter
}) => {
  type Key = {
    md_nmmmbr_key: string;
  };

  type FilterQuery = Key & Partial<Mdmm>;

  type Sort = {
    key: string;
    order: number;
    icon: JSX.Element;
  };

  const classes = useStyles();

  const initialState = {
    md_nmmmbr: [],
    md_nmmmbr_key: "",
    sort: {
      key: "md_nommrb",
      order: 0,
      icon: <span />
    },
    filterQuery: {
      md_nmmmbr_key: ""
    }
  };

  const [md_nmmmbrs, setNmmmbrs] = useState<string[]>(initialState.md_nmmmbr);
  // 検索条件
  const [filterQuery, setFilterQuery] = useState<FilterQuery>(
    initialState.filterQuery
  );
  // ソート条件
  const [sort, setSort] = useState<Sort>(initialState.sort);

  useEffect(() => {
    console.log("MdmmTable render!");
    setNmmmbrs(_.uniq(_.map(mdmms, "md_nmmmbr")));
    if (clearSortFilter) {
      setFilterQuery({ md_nmmmbr_key: "" });
      setSort({ key: "md_nmmmbr", order: 0, icon: <span /> });
      setSort({ key: "md_nmmmbr", order: 0, icon: <span /> });
    }
    return () => console.log("unmounting...");
  }, [mdmms, clearSortFilter]);

  const filteredMdmm = useMemo(() => {
    // const filteredMdmm = (() => {
    let tmpMdmms = mdmms;
    // 入力した文字は小文字にする
    const filterTxmdmm: string | undefined = filterQuery.md_txmdmm;
    // 絞り込み検索
    tmpMdmms = tmpMdmms.filter(row => {
      // タイトルで絞り込み
      if (
        filterQuery.md_txmdmm &&
        String(row.md_txmdmm)
          .toLowerCase()
          .indexOf(filterTxmdmm || "") === -1
      ) {
        return false;
      }

      // カテゴリーで絞り込み
      if (
        filterQuery.md_nmmmbr_key &&
        row.md_nmmmbr !== filterQuery.md_nmmmbr_key
      ) {
        return false;
      }

      return row;
    });

    // ソート
    if (sort.key) {
      tmpMdmms = tmpMdmms.sort((a: any, b: any) => {
        const A = a[sort.key];
        const B = b[sort.key];

        return (A === B ? 0 : A > B ? 1 : -1) * sort.order;
      });
    }

    return tmpMdmms;
  }, [filterQuery, sort, mdmms]);
  // })();

  // 入力した情報をfilterQueryに入れる
  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilterQuery({ ...filterQuery, [name]: value });
  };

  // 選択したカラムをSortに入れる
  const handleSort = (column: string) => {
    if (sort.key === column) {
      setSort({
        ...sort,
        order: -sort.order,
        icon: -sort.order === 1 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
      });
    } else {
      setSort({
        key: column,
        order: 1,
        icon: <ArrowDropUpIcon />
      });
    }
  };

  return (
    <div
      className="mdmm-container"
      style={mdmms.length < 12 ? { overflowY: "hidden" } : {}}
    >
      <table className="commonTable-table">
        <thead className="commonTable-thead">
          <tr>
            <th rowSpan={2} onClick={() => handleSort("updatedAt")}>
              <p>更新日付 {sort.key === "updatedAt" ? sort.icon : <span />}</p>
            </th>
            <th rowSpan={2} onClick={() => handleSort("md_nommrb")}>
              <p>メモ連番 {sort.key === "md_nommrb" ? sort.icon : <span />}</p>
            </th>
            <th onClick={() => handleSort("md_nmmmbr")}>
              <p>メモ分類 {sort.key === "md_nmmmbr" ? sort.icon : <span />}</p>
            </th>
            <th onClick={() => handleSort("md_txmdmm")}>
              <p>内容 {sort.key === "md_txmdmm" ? sort.icon : <span />}</p>
            </th>
            <th rowSpan={2} style={{ padding: "0", width: "4em" }}>
              <p>編集</p>
            </th>
            <th rowSpan={2} style={{ padding: "0", width: "4em" }}>
              <p>削除</p>
            </th>
          </tr>
          <tr>
            <th>
              <select
                name="md_nmmmbr_key"
                // value={filterQuery.md_nmmmbr_key||""}
                value={filterQuery.md_nmmmbr_key}
                onChange={handleFilter}
              >
                <option value="">選択</option>
                {/* {md_nmmmbrs.map((item: string, index: any) => { */}
                {md_nmmmbrs.map((item: string) => {
                  return (
                    // <option key={index} value={item}>
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </th>
            <th>
              <input
                type="text"
                name="md_txmdmm"
                placeholder="絞り込み検索"
                value={filterQuery.md_txmdmm || ""}
                autoComplete="off"
                onChange={handleFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody className="commonTable-tbody">
          {filteredMdmm.map(mdmm => {
            return (
              <tr key={mdmm.md_idmdmm}>
                <td>{moment(mdmm.updatedAt).format("YYYY/MM/DD")}</td>
                <td style={{ textAlign: "right" }}>{mdmm.md_nommrb}</td>
                <td>{mdmm.md_nmmmbr}</td>
                <td>{mdmm.md_txmdmm}</td>
                {/* {
                      mdmm.md_nmmmbr ?
                        md_nmmmbrs.find(c => c.id === mdmm.md_nmmmbr).title : ''
                  } */}
                <td style={{ padding: "0", textAlign: "center", width: "3em" }}>
                  <Modal
                    title="メモ編集"
                    // open={handleOpenModal => <EditIcon className={classes.iconHover} style={{fontSize: '1.5em', color: '#668ad8'}} onClick={handleOpenModal} />}
                    open={(handleOpenModal: () => void) => (
                      <EditIcon
                        className={classes.iconHover}
                        style={{ fontSize: "1.5em" }}
                        onClick={handleOpenModal}
                      />
                    )}
                    content={(handleCloseModal: () => void) => (
                      <MdmmEdit
                        mdmm={mdmm}
                        mdmmEdit={mdmmEdit}
                        handleCloseModal={handleCloseModal}
                      />
                    )}
                    outClickClose={false}
                  />
                </td>
                <td style={{ padding: "0", textAlign: "center", width: "3em" }}>
                  <DeleteIcon
                    className={classes.iconHover}
                    style={{ fontSize: "1.5em" }}
                    onClick={e => {
                      e.preventDefault();
                      mdmmDelete(mdmm.md_cdcstm, mdmm.md_nommrb);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MdmmContainer;
