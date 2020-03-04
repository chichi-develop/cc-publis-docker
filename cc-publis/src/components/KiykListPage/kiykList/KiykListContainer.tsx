import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../store/actions";
import { StoreState } from "../../../store";
import { useLocation, useHistory } from "react-router-dom";

// import moment from "moment";
import _ from "lodash";

import {
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon
} from "@material-ui/icons";

import { KiykLists, KiykList, Kiyk, Kiyks, Gycms } from "../../../types/models";

import "./KiykListContainer.css";

type Props = {
  kiykLists: KiykLists;
  kiyk: Kiyk;
  kiyks: Kiyks;
  switchKiyk: typeof Actions.switchKiyk;
  gycms: Gycms;
};

const KiykListContainer: React.FC = () => {
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);
  const key = query.get("key");
  const columnName = query.get("columnName");

  const publisState = useSelector((state: StoreState) => state.publis);
  const dispatch = useDispatch();

  const kiykSearch = useCallback(
    (columnName: string, key: string) =>
      dispatch(Actions.getKiykStart(columnName, key)),
    [dispatch]
  );

  const switchKiyk = useCallback(
    (kiyks: Kiyks, cdcstm: string) =>
      dispatch(Actions.switchKiyk(kiyks, cdcstm)),
    [dispatch]
  );

  const getGycmStart = useCallback(() => dispatch(Actions.getGycmStart()), [
    dispatch
  ]);

  let kiyk = publisState.kiyk as Kiyk;
  let kiykLists = publisState.kiykLists;
  let kiyks = publisState.kiyks;
  let showListKiyk = publisState.showListKiyk;
  let gycms = publisState.gycms;
  let setGycm = publisState.setGycm;

  useEffect(() => {
    console.log("KiykListContainer render!");
    if (key !== null && columnName !== null) {
      kiykSearch(columnName, key);
      console.log("KiykListContainer render!");
    }
    if (!setGycm) {
      getGycmStart();
    }
    return () => console.log("unmounting...");
  }, [kiykSearch, columnName, key, gycms, setGycm, getGycmStart]);

  return (
    <div className="kiykList-body">
      {showListKiyk && (
        <>
          <div className="kiykList-menu">
            <p className="frame-title">契約一覧</p>
          </div>
          <KiykListTable
            kiykLists={kiykLists}
            kiyk={kiyk}
            kiyks={kiyks}
            switchKiyk={switchKiyk}
            gycms={gycms}
          />
        </>
      )}
    </div>
  );
};

const KiykListTable: React.FC<Props> = ({
  kiykLists,
  kiyk,
  kiyks,
  switchKiyk,
  gycms
}) => {
  let history = useHistory();

  type Key = {
    kylist_kbjyot_key: string;
  };

  type FilterQuery = Key & Partial<KiykList>;

  type Sort = {
    key: string;
    order: number;
    icon?: JSX.Element;
  };

  const initialState = {
    kylist_kbjyot: [],
    kylist_kbjyot_key: "",
    sort: {
      key: "KYLIST_NOKIYK",
      order: 0,
      icon: <span />
    },
    filterQuery: {
      kylist_kbjyot_key: ""
    }
  };

  const [ky_kbjyots, setKbkiyks] = useState<string[]>(
    initialState.kylist_kbjyot
  );
  // 検索条件
  const [filterQuery, setFilterQuery] = useState<FilterQuery>(
    initialState.filterQuery
  );
  // ソート条件
  const [sort, setSort] = useState<Sort>(initialState.sort);

  useEffect(() => {
    console.log("KiykListTable render!");
    // setKiyks(publisState.kiykLists);
    setKbkiyks(_.uniq(_.map(kiykLists, "KYLIST_KBJYOT"))); // TODO: 要検討、select絞り込み
    setFilterQuery({ kylist_kbjyot_key: "" });
    setSort({ key: "KYLIST_NOKIyk", order: -1, icon: <span /> });
    // if (aclgState.clearSortFilter) {
    //   setFilterQuery({ kylist_kbjyot_key: "" });
    //   setSort({ key: "kylist_kbjyot", order: 0, icon: <span /> });
    // }
    // }, [aclgState.cm_aclgs, aclgState.clearSortFilter]);
  }, [kiykLists]);

  const filteredKiyk = useMemo(() => {
    // cnst filteredMdmm = (() => {
    let tmpKiyks = kiykLists;
    // 入力した文字は小文字にする
    const filterTxactv: string | undefined = filterQuery.KYLIST_SH_NMCSTM;
    // 絞り込み検索
    tmpKiyks = tmpKiyks.filter(row => {
      // タイトルで絞り込み
      if (
        filterQuery.KYLIST_SH_NMCSTM &&
        String(row.KYLIST_SH_NMCSTM)
          .toLowerCase()
          .indexOf(filterTxactv || "") === -1
      ) {
        return false;
      }

      // カテゴリーで絞り込み
      if (
        filterQuery.kylist_kbjyot_key &&
        // row.md_nmmmbr !== parseInt(filterQuery.md_nmmmbr_key)
        // row.md_nmmmbr !== md_nmmmbrs[parseInt(filterQuery.md_nmmmbr_key)].title
        row.KYLIST_KBJYOT !== filterQuery.kylist_kbjyot_key
      ) {
        return false;
      }

      return row;
    });
    // ソート
    if (sort.key) {
      tmpKiyks = tmpKiyks.sort((a: any, b: any) => {
        const A = a[sort.key];
        const B = b[sort.key];

        return (A === B ? 0 : A > B ? 1 : -1) * sort.order;
      });
    }

    return tmpKiyks;
  }, [filterQuery, sort, kiykLists]);

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
      className="kiykList-container"
      style={kiykLists.length < 12 ? { overflowY: "hidden" } : {}}
    >
      <table className="commonTable-table">
        <thead className="commonTable-thead">
          <tr>
            <th rowSpan={2}>
              <p></p>
            </th>
            <th rowSpan={2} onClick={() => handleSort("KYLIST_NOKIYK")}>
              <p className="pointer">
                契約番号{sort.key === "KYLIST_NOKIYK" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2} onClick={() => handleSort("KYLIST_NOSQSY")}>
              <p className="pointer">
                請求書番号{sort.key === "KYLIST_NOSQSY" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2} onClick={() => handleSort("KYLIST_CDSQSK")}>
              <p className="pointer">
                請求先番号{sort.key === "KYLIST_CDSQSK" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2} onClick={() => handleSort("KYLIST_SQ_NMCSTM")}>
              <p className="pointer">
                請求先名{sort.key === "KYLIST_SQ_NMCSTM" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2} onClick={() => handleSort("KYLIST_CDSHSK")}>
              <p className="pointer">
                送本先番号{sort.key === "KYLIST_CDSHSK" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={1} onClick={() => handleSort("KYLIST_SH_NMCSTM")}>
              <p className="pointer">
                送本先名{sort.key === "KYLIST_SH_NMCSTM" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2}>
              <p>契約PT</p>
            </th>
            <th rowSpan={2}>
              <p>部数</p>
            </th>
            <th rowSpan={2}>
              <p>開始号</p>
            </th>
            <th rowSpan={2}>
              <p>終了号</p>
            </th>
            <th rowSpan={1} onClick={() => handleSort("KYLIST_KBJYOT")}>
              <p className="pointer">
                状態{sort.key === "KYLIST_KBJYOT" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2}>
              <p>申込区分</p>
            </th>
            <th rowSpan={2}>
              <p>継続区分</p>
            </th>
            <th rowSpan={2}>
              <p>発送区分</p>
            </th>
            <th rowSpan={2}>
              <p>特別出荷区分</p>
            </th>
            <th rowSpan={2}>
              <p>売掛</p>
            </th>
          </tr>
          <tr>
            <th>
              <input
                type="text"
                name="KYLIST_SH_NMCSTM"
                placeholder="絞り込み検索"
                value={filterQuery.KYLIST_SH_NMCSTM || ""}
                autoComplete="off"
                onChange={handleFilter}
              />
            </th>
            <th>
              <select
                name="kylist_kbjyot_key"
                // value={filterQuery.md_nmmmbr_key||""}
                value={filterQuery.kylist_kbjyot_key}
                onChange={handleFilter}
              >
                <option value="">選択</option>
                {ky_kbjyots.map((item: string) => {
                  return (
                    // <option key={index} value={item}>
                    <option key={item} value={item}>
                      {/* {item} */}
                      {gycmConv("KBJYOT", item)}
                    </option>
                  );
                })}
              </select>
            </th>
          </tr>
        </thead>
        <tbody
          className="commonTable-tbody"
          style={{ scrollBehavior: "smooth", height: "300px" }}
        >
          {filteredKiyk.slice(0, 100).map((row, index) => {
            return (
              // <tr key={kiyk.KYLIST_NOKIYK}>
              // className={[ 'post', isPublished ? 'published' : 'unpublished' ].join(' ')}
              <tr
                key={row.KYLIST_NOKIYK}
                // style={
                //   row.KYLIST_NOKIYK === kiyk.KY_NOKIYK
                //     ? { background: "#ffe4e1" }
                //     : {}
                // }
                style={(() => {
                  switch (true) {
                    case row.KYLIST_NOKIYK === kiyk.KY_NOKIYK:
                      return { background: "#d9efff" };
                    case row.KYLIST_KBJYOT === "3":
                      return { background: "#ededed" };
                    case row.KYLIST_KBJYOT === "4":
                      return { background: "#ededed" };
                    case row.KYLIST_KBJYOT === "5":
                      return { background: "#ededed" };
                    case row.KYLIST_KBJYOT === "8":
                      return { background: "#ffe4e1" };
                    default:
                  }
                })()}
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
                    onClick={() =>
                      switchKiyk(kiyks, row.KYLIST_NOKIYK.toString())
                    }
                  >
                    {index + 1}
                  </button>
                </td>
                <td>
                  <button
                    style={{
                      textAlign: "right",
                      color: "#FF9265",
                      borderStyle: "none",
                      backgroundColor: "transparent"
                    }}
                    // className="commonTable-addButton"
                    type="button"
                    onClick={() => {
                      switchKiyk(kiyks, row.KYLIST_NOKIYK.toString());
                      history.push(`/kiyk-detail?&nokiyk=${row.KYLIST_NOKIYK}`);
                    }}
                  >
                    {row.KYLIST_NOKIYK}
                  </button>
                </td>
                <td style={{ textAlign: "right" }}>{row.KYLIST_NOSQSY}</td>
                <td style={{ textAlign: "center" }}>{row.KYLIST_CDSQSK}</td>
                <td>{row.KYLIST_SQ_NMCSTM}</td>
                <td>{row.KYLIST_CDSHSK}</td>
                <td>{row.KYLIST_SH_NMCSTM}</td>
                <td style={{ textAlign: "center" }}>{row.KYLIST_CDKYPT}</td>
                <td style={{ textAlign: "right" }}>{row.KYLIST_SUKIYK}</td>
                <td style={{ textAlign: "center" }}>{row.KYLIST_YMKIYK}</td>
                <td style={{ textAlign: "center" }}>{row.KYLIST_YMKIYE}</td>
                {/* <td>
                  {
                    gycms.filter(
                      r =>
                        r.GY_CDBNRI === "KBJYOT" &&
                        r.GY_CDBNSY === row.KYLIST_KBJYOT
                    )[0].GY_NMBNSY
                  }
                </td> */}
                {/* <td>{row.KYLIST_KBMSKM}</td> */}
                <td>{gycmConv("KBJYOT", row.KYLIST_KBJYOT)}</td>
                <td>{gycmConv("KBMSKM", row.KYLIST_KBMSKM)}</td>
                <td>{gycmConv("KBKIZK", row.KYLIST_KBKIZK)}</td>
                <td>{gycmConv("KBKSYB", row.KYLIST_KBKSYB)}</td>
                <td>{gycmConv("KBTKBT", row.KYLIST_KBTKBT)}</td>
                <td style={{ textAlign: "right" }}>{row.KSLIST_ZNURKK}</td>
                {/* <td>{moment(row.KYLIST_DTKIYK).format("YYYY/MM/DD")}</td> */}
                {/* <td style={{ textAlign: "right" }}>{row.KYLIST_NOKIYK}</td> */}
                {/* TODO: redux */}
                {/* <td style={{ textAlign: "right" }}>
                  {row.CT_NOTEL2.toLocaleString()}
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default KiykListContainer;
