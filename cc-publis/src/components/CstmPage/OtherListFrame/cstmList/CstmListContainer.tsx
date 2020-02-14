import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../../store/actions";
import { StoreState } from "../../../../store";
import { useLocation, useHistory } from "react-router-dom";

import moment from "moment";
import _ from "lodash";

import {
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon
} from "@material-ui/icons";

import LinkList from "../common/LinkList";
import { Cstms, Cstm, Gycms } from "../../../../types/models";

import "./CstmListContainer.css";

type Props = {
  cstms: Cstms;
  cstm: Cstm;
  switchCstm: typeof Actions.switchCstm;
  gycms: Gycms;
};

const CstmListContainer: React.FC = () => {
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);
  const key = query.get("key");
  const columnName = query.get("columnName");

  const publisState = useSelector((state: StoreState) => state.publis);
  const dispatch = useDispatch();

  const cstmSearch = useCallback(
    (columnName: string, key: string, selectTarget: string) =>
      dispatch(Actions.getCstmStart(columnName, key)),
    [dispatch]
  );

  const switchCstm = useCallback(
    (cstms: Cstms, cdcstm: string) =>
      dispatch(Actions.switchCstm(cstms, cdcstm)),
    [dispatch]
  );

  const getGycmStart = useCallback(() => dispatch(Actions.getGycmStart()), [
    dispatch
  ]);

  let cstm = publisState.cstm as Cstm;
  let cstms = publisState.cstms;
  let showListCstm = publisState.showListCstm;
  // let gycms = publisState.gycms as Gycms;
  let gycms = publisState.gycms;
  let setGycm = publisState.setGycm;

  useEffect(() => {
    console.log("CstmListContainer render!");
    console.log("CstmListContainer render!");
    if (key !== null && columnName !== null) {
      cstmSearch(columnName, key, "cstm");
    }
    if (!setGycm) {
      getGycmStart();
    }
    return () => console.log("unmounting...");
  }, [cstmSearch, columnName, key, gycms, setGycm, getGycmStart]);

  return (
    <div className="cstmList-body">
      {showListCstm && (
        <>
          <div className="cstmList-menu">
            <p className="frame-title">顧客マスタリスト</p>
            <LinkList cdcstm={cstm.CT_CDCSTM} showLinkCstmList={false} />
          </div>
          <CstmList
            cstms={cstms}
            cstm={cstm}
            switchCstm={switchCstm}
            gycms={gycms}
          />
        </>
      )}
    </div>
  );
};

const CstmList: React.FC<Props> = ({ cstms, cstm, switchCstm, gycms }) => {
  let history = useHistory();
  type Key = {
    ct_kbcstm_key: string;
  };

  type FilterQuery = Key & Partial<Cstm>;

  type Sort = {
    key: string;
    order: number;
    icon?: JSX.Element;
  };

  const initialState = {
    ct_kbcstm: [],
    ct_kbcstm_key: "",
    sort: {
      key: "CT_CDCSTM",
      order: 0,
      icon: <span />
    },
    filterQuery: {
      ct_kbcstm_key: ""
    }
  };

  const [ct_kbcstms, setKbcstms] = useState<string[]>(initialState.ct_kbcstm);
  // 検索条件
  const [filterQuery, setFilterQuery] = useState<FilterQuery>(
    initialState.filterQuery
  );
  // ソート条件
  const [sort, setSort] = useState<Sort>(initialState.sort);

  useEffect(() => {
    console.log("CstmList render!");
    // setCstms(publisState.cstms);
    setKbcstms(_.uniq(_.map(cstms, "CT_KBCSTM"))); // TODO: 要検討、select絞り込み
    setFilterQuery({ ct_kbcstm_key: "" });
    setSort({ key: "ct_kbcstm", order: 0, icon: <span /> });
    // if (aclgState.clearSortFilter) {
    //   setFilterQuery({ ct_kbcstm_key: "" });
    //   setSort({ key: "ct_kbcstm", order: 0, icon: <span /> });
    // }
    // }, [aclgState.cm_aclgs, aclgState.clearSortFilter]);
  }, [cstms]);

  const filteredCstm = useMemo(() => {
    // cnst filteredMdmm = (() => {
    let tmpCstms = cstms;
    // 入力した文字は小文字にする
    const filterTxactv: string | undefined = filterQuery.CT_ADCST1;
    // 絞り込み検索
    tmpCstms = tmpCstms.filter(row => {
      // タイトルで絞り込み
      if (
        filterQuery.CT_ADCST1 &&
        String(row.CT_ADCST1)
          .toLowerCase()
          .indexOf(filterTxactv || "") === -1
      ) {
        return false;
      }

      // カテゴリーで絞り込み
      if (
        filterQuery.ct_kbcstm_key &&
        // row.md_nmmmbr !== parseInt(filterQuery.md_nmmmbr_key)
        // row.md_nmmmbr !== md_nmmmbrs[parseInt(filterQuery.md_nmmmbr_key)].title
        row.CT_KBCSTM !== filterQuery.ct_kbcstm_key
      ) {
        return false;
      }

      return row;
    });
    // ソート
    if (sort.key) {
      tmpCstms = tmpCstms.sort((a: any, b: any) => {
        const A = a[sort.key];
        const B = b[sort.key];

        return (A === B ? 0 : A > B ? 1 : -1) * sort.order;
      });
    }

    return tmpCstms;
  }, [filterQuery, sort, cstms]);

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

  const gycmConv = (cdbnri: string, cdbnsy: string) =>
    gycms.filter(r => r.GY_CDBNRI === cdbnri && r.GY_CDBNSY === cdbnsy)[0]
      .GY_NMBNSY;

  return (
    <div
      className="cstmList-container"
      style={cstms.length < 12 ? { overflowY: "hidden" } : {}}
    >
      <table className="commonTable-table">
        <thead className="commonTable-thead">
          <tr>
            <th rowSpan={2}>
              <p></p>
            </th>
            <th rowSpan={2} onClick={() => handleSort("CT_CDCSTM")}>
              <p>読者番号{sort.key === "CT_CDCSTM" ? sort.icon : <span />}</p>
            </th>
            <th onClick={() => handleSort("CT_KBCSTM")}>
              <p>区分{sort.key === "CT_KBCSTM" ? sort.icon : <span />}</p>
            </th>
            <th rowSpan={2}>
              <p>顧客名</p>
            </th>
            <th rowSpan={2}>
              <p>カナ</p>
            </th>
            <th rowSpan={2}>
              <p>氏名</p>
            </th>
            <th rowSpan={2}>
              <p>氏名カナ</p>
            </th>
            <th onClick={() => handleSort("CT_ADCST1")}>
              <p>住所{sort.key === "CT_ADCST1" ? sort.icon : <span />}</p>
            </th>
            <th rowSpan={2}>
              <p>TEL1</p>
            </th>
            <th rowSpan={2}>
              <p>TEL2</p>
            </th>
            <th rowSpan={2}>
              <p>生年月日</p>
            </th>
          </tr>
          <tr>
            <th>
              <select
                name="ct_kbcstm_key"
                // value={filterQuery.md_nmmmbr_key||""}
                value={filterQuery.ct_kbcstm_key}
                onChange={handleFilter}
              >
                <option value="">選択</option>
                {ct_kbcstms.map((item: string) => {
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
                name="CT_ADCST1"
                placeholder="絞り込み検索"
                value={filterQuery.CT_ADCST1 || ""}
                autoComplete="off"
                onChange={handleFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody
          className="commonTable-tbody"
          style={{ scrollBehavior: "smooth", height: "300px" }}
        >
          {filteredCstm.map((row, index) => {
            return (
              // <tr key={cstm.CT_CDCSTM}>
              // className={[ 'post', isPublished ? 'published' : 'unpublished' ].join(' ')}
              <tr
                key={row.CT_CDCSTM}
                style={
                  row.CT_CDCSTM === cstm.CT_CDCSTM
                    ? { background: "#d9efff" }
                    : {}
                }
              >
                <td style={{ textAlign: "right" }}>
                  <button
                    style={{
                      color: "#668ad8",
                      borderStyle: "none",
                      backgroundColor: "transparent"
                    }}
                    // className="commonTable-addButton"
                    type="button"
                    onClick={() => switchCstm(cstms, row.CT_CDCSTM)}
                  >
                    {index + 1}
                  </button>
                </td>
                {/* <td>{moment(row.CT_CCDATEX).format("YYYY/MM/DD")}</td> */}
                {/* <td style={{ textAlign: "right" }}>{row.CT_CDCSTM}</td> */}
                {/* TODO: redux */}
                <td>
                  <div style={{ display: "flex" }}>
                    <button
                      style={{
                        color: "#FF9265",
                        borderStyle: "none",
                        backgroundColor: "transparent",
                        padding: "0"
                      }}
                      // className="commonTable-addButton"
                      type="button"
                      onClick={() => {
                        switchCstm(cstms, row.CT_CDCSTM);
                        history.push(
                          `/kiyk-list?columnName=ky_cdsqsk_cdshsk&key=${row.CT_CDCSTM}`
                        );
                      }}
                    >
                      {row.CT_CDCSTM}
                    </button>
                    {/* <div className="maru">
                      <button
                        style={{
                          borderStyle: "none",
                          color: "white",
                          backgroundColor: "transparent",
                          padding: "0"
                        }}
                        type="button"
                        onClick={() =>
                          history.push(
                            `/kiyk-list?columnName=ky_cdsqsk&key=${row.CT_CDCSTM}`
                          )
                        }
                      >
                        契
                      </button>
                    </div> */}
                  </div>
                </td>
                {/* <td>
                  {
                    gycms.filter(
                      r =>
                        r.GY_CDBNRI === "KBCSTM" &&
                        r.GY_CDBNSY === row.CT_KBCSTM
                    )[0].GY_NMBNSY
                  }
                </td> */}
                <td>{gycmConv("KBCSTM", row.CT_KBCSTM)}</td>
                <td>{row.CT_NMCSTM}</td>
                <td>{row.CT_NKCSTM}</td>
                <td>{row.CT_NMSIME}</td>
                <td>{row.CT_NKSIME}</td>
                <td>{row.CT_ADCST1}</td>
                <td style={{ textAlign: "right" }}>{row.CT_NOTEL1}</td>
                <td style={{ textAlign: "right" }}>
                  {row.CT_NOTEL2.toLocaleString()}
                </td>
                {/* <td>
                  {`${row.CT_DTSNGP.slice(0, 4)}/
                      ${row.CT_DTSNGP.slice(4, 6)}/
                      ${row.CT_DTSNGP.slice(6, 8)}`}
                </td> */}
                <td>
                  {row.CT_DTSNGP.trim() !== ""
                    ? moment(row.CT_DTSNGP).format("YYYY/MM/DD")
                    : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CstmListContainer;
