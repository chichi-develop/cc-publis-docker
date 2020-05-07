import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../store/actions";
import { StoreState } from "../../../store";
import { useLocation, useHistory } from "react-router-dom";
import classNames from "classnames";
import LoadingSpinner from "../../Common/LoadingSpinner";

// import moment from "moment";
import _ from "lodash";

import {
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@material-ui/icons";

import { KiykLists, KiykList, Kiyk } from "../../../types/models";
// import { KiykLists, KiykList, Kiyk, Kiyks, Gycms } from "../../../types/models";

import "./KiykListContainer.css";

type Props = {
  kiykLists: KiykLists;
  kiyk: Kiyk;
  // kiyks: Kiyks;
  switchKiyk: typeof Actions.switchKiyk;
  // gycms: Gycms;
};

const KiykListContainer: React.FC = () => {
  let history = useHistory();
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
    (cdcstm: string) => dispatch(Actions.switchKiyk(cdcstm)),
    [dispatch]
  );

  // const getGycmStart = useCallback(() => dispatch(Actions.getGycmStart()), [
  //   dispatch,
  // ]);

  let kiyk = publisState.kiyk as Kiyk;
  let kiykLists = publisState.kiykLists;
  // let kiyks = publisState.kiyks;
  // let showListCstm = publisState.showListCstm;
  let showListKiyk = publisState.showListKiyk;
  // let gycms = publisState.gycms;
  // let setGycm = publisState.setGycm;
  let isLoading = publisState.isLoading;
  // let isLoadingKiyk = publisState.isLoadingKiyk;
  // let isLoadingKiykCstm = publisState.isLoadingKiykCstm;
  // let isLoadingKyzd = publisState.isLoadingKyzd;
  // let showListKiykCstm = publisState.showListKiykCstm;
  // let showListKyzd = publisState.showListKyzd;

  useEffect(() => {
    console.log("KiykListContainer render!");
    return () => console.log("unmounting...");
  }, []);

  useEffect(() => {
    if (key !== null && columnName !== null) {
      kiykSearch(columnName, key);
    }
  }, [columnName, key, kiykSearch]);

  // useEffect(() => {
  //   if (!setGycm && showListKiyk) {
  //     getGycmStart();
  //   }
  // }, [showListKiyk, setGycm, getGycmStart]);

  return (
    <div className="kiykList-body">
      {/* {isLoading && !showListKiyk && !showListKiykCstm && !showListKyzd && ( */}
      {!showListKiyk && (
        <>
          <div className="common-loadingSpinner">
            <LoadingSpinner />
          </div>
        </>
      )}
      {showListKiyk && (
        // {!isLoading && showListKiyk && showListKiykCstm && showListKyzd && (
        // !isLoadingKiykCstm && (
        // !isLoadingKyzd &&
        // !isLoadingKiyk && (
        // setGycm && (
        <>
          <div className="kiykList-menu">
            <p className="frame-title">契約一覧</p>
          </div>
          <KiykListTable
            kiykLists={kiykLists}
            kiyk={kiyk}
            // kiyks={kiyks}
            switchKiyk={switchKiyk}
            // gycms={gycms}
          />
        </>
      )}
      {!isLoading && !showListKiyk && (
        <div className="kiykList-noData">
          <p>契約はありません。（{key}）</p>
          <p
            className="kiykList-noData-goBack"
            onClick={() => history.push("/cstm")}
          >
            顧客マスタ画面に戻る
          </p>
        </div>
      )}
    </div>
  );
};

const KiykListTable: React.FC<Props> = ({
  kiykLists,
  kiyk,
  // kiyks,
  switchKiyk,
  // gycms,
}) => {
  let history = useHistory();

  type Key = {
    kylist_txjyot_key: string;
  };

  type FilterQuery = Key & Partial<KiykList>;

  type Sort = {
    key: string;
    order: number;
    icon?: JSX.Element;
  };

  const pageLimit = 100;

  const initialState = {
    kylist_txjyot: [],
    kylist_txjyot_key: "",
    sort: {
      key: "KYLIST_NOKIYK",
      order: 0,
      icon: <span />,
    },
    filterQuery: {
      kylist_txjyot_key: "",
    },
    paginateParam: {
      offset: 0,
      currentPage: 1,
      totalRecords: kiykLists.length,
      totalPage: Math.ceil(kiykLists.length / pageLimit),
      showPageStart: 0,
    },
  };

  const [ky_txjyots, setTxjyots] = useState<string[]>(
    initialState.kylist_txjyot
  );

  // フィルタ
  const [filterQuery, setFilterQuery] = useState<FilterQuery>(
    initialState.filterQuery
  );

  // ソート
  const [sort, setSort] = useState<Sort>(initialState.sort);

  // ページネーション
  const [paginateParam, setPaginateParam] = useState(
    initialState.paginateParam
  );

  // reducer
  type State = {
    sortParam: {
      key: string;
      order: number;
      icon?: JSX.Element;
    };
    textFilterParam: {
      key: string;
      textKey: string;
    }[];
    selectFilterParam: {
      key: string;
      selectList: string[];
      selectKey: string;
    }[];
    paginateParam: {
      offset: number;
      currentPage: number;
      totalRecords: number;
      totalPage: number;
      showPageStart: number;
    };
  };

  type Action =
    | {
        type: "handleSort";
        key: string;
        order: number;
      }
    | {
        type: "handleTextFilter";
        key: string;
        textKey: string;
      }
    | {
        type: "initSelectFilter";
        key: string;
        selectList: string[];
      }
    | {
        type: "handleSelectFilter";
        key: string;
        textKey: string;
      }
    | {
        type: "handlePaginate";
        page: number;
      };

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "handleSort":
        return {
          ...state,
          sortParam: {
            key: action.key,
            order: -state.sortParam.order,
            icon:
              -state.sortParam.order === 1 ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              ),
          },
        };
      case "handleTextFilter": {
        const current =
          state.textFilterParam.findIndex((obj) => {
            return obj.key === action.key;
          }) || state.textFilterParam.length;
        return {
          ...state,
          textFilterParam: {
            ...state.textFilterParam,
            [state.textFilterParam.findIndex((obj) => {
              return obj.key === action.key;
            })]: {
              key: action.key,
              textKey: action.textKey,
            },
          },
        };
      }
      case "initSelectFilter": {
        const current =
          state.selectFilterParam.findIndex((obj) => {
            return obj.key === action.key;
          }) || state.selectFilterParam.length;
        return {
          ...state,
          selectFilterParam: {
            selectList: action.selectList,
          },
        };
      }
      default: {
        throw new Error();
      }
    }
  };

  // const [state, dispatch] = useReducer(reducer, { flag: false });

  // 初期処理フラグ(契約詳細から戻った際に元のページに戻すために使用)
  const [initialFlag, setInitialFlag] = useState(true);

  useEffect(() => {
    // ここで初期処理フラグを立てて、filteredKiykの中で 初期処理でfindIndex(nokiykが0でない場合のみ、ページ設定を制御し、終わったら初期処理フラグをfalseにしたらできないか
    setInitialFlag(true);
    console.log("KiykListTable render!");
    // console.log(`initialFlag:${initialFlag}`);
    return () => console.log("unmounting...");
  }, []);

  useEffect(() => {
    setTxjyots(_.uniq(_.map(kiykLists, "KYLIST_TXJYOT"))); // TODO: 要検討、select絞り込み
    setFilterQuery({ kylist_txjyot_key: "" });
    setSort({ key: "KYLIST_NOKIyk", order: -1, icon: <span /> });
  }, [kiykLists]);

  const filteredKiyk = useMemo(() => {
    console.log("filteredKiyk set!");
    console.log(`filteredKiyk: initialFlag:${initialFlag}`);

    let tmpKiyks = kiykLists;
    // 入力した文字は小文字にする
    const filterTxactv: string | undefined = filterQuery.KYLIST_SH_NMCSTM;
    tmpKiyks = tmpKiyks.filter((row) => {
      // フィルタ
      if (
        filterQuery.KYLIST_SH_NMCSTM &&
        String(row.KYLIST_SH_NMCSTM)
          .toLowerCase()
          .indexOf(filterTxactv || "") === -1
      ) {
        return false;
      }

      // フィルタ
      if (
        filterQuery.kylist_txjyot_key &&
        row.KYLIST_TXJYOT !== filterQuery.kylist_txjyot_key
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

    if (
      initialFlag &&
      tmpKiyks.findIndex((obj) => {
        return obj.KYLIST_NOKIYK === kiyk.KY_NOKIYK;
      }) !== 0
    ) {
      console.log("filteredKiyk: true & nokiyk index is not 0");
      setPaginateParam({
        offset:
          (Math.ceil(
            tmpKiyks.findIndex((obj) => {
              return obj.KYLIST_NOKIYK === kiyk.KY_NOKIYK;
            }) / pageLimit
          ) -
            1) *
          pageLimit,
        currentPage: Math.ceil(
          tmpKiyks.findIndex((obj) => {
            return obj.KYLIST_NOKIYK === kiyk.KY_NOKIYK;
          }) / pageLimit
        ),
        totalRecords: tmpKiyks.length,
        totalPage: Math.ceil(tmpKiyks.length / pageLimit),
        showPageStart: 0,
      });
    } else {
      console.log("filteredKiyk: false or nokiyk index is 0");
      setPaginateParam({
        offset: 0,
        currentPage: 1,
        totalRecords: tmpKiyks.length,
        totalPage: Math.ceil(tmpKiyks.length / pageLimit),
        showPageStart: 0,
      });
    }

    setInitialFlag(false);
    return tmpKiyks;
  }, [filterQuery, sort, kiykLists]);
  // }, [filterQuery, sort, kiykLists]);

  // フィルタ
  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilterQuery({ ...filterQuery, [name]: value });
  };

  // ソート
  const handleSort = (column: string) => {
    if (sort.key === column) {
      setSort({
        ...sort,
        order: -sort.order,
        icon: -sort.order === 1 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />,
      });
    } else {
      setSort({
        key: column,
        order: 1,
        icon: <ArrowDropUpIcon />,
      });
    }
  };

  // ページ選択
  const handlePage = (page: number) => {
    let start;
    if (paginateParam.totalPage < 10 || page < 5) {
      start = 0;
    } else if (page < paginateParam.totalPage - 4) {
      start = page - 5;
    } else {
      start = paginateParam.totalPage - 10;
    }
    setPaginateParam({
      ...paginateParam,
      offset: (page - 1) * pageLimit,
      currentPage: page,
      showPageStart: start,
    });
  };

  // const gycmConv = (cdbnri: string, cdbnsy: string) =>
  //   gycms.filter((r) => r.GY_CDBNRI === cdbnri && r.GY_CDBNSY === cdbnsy)[0]
  //     .GY_NMBNSY;

  // const Paginate = () => {
  // const Paginate = useMemo(() => {
  // return (
  //   <>
  //     {paginateParam.totalPage !== 1 && (
  //       <div className="kiykList-pagination">
  //         {paginateParam.currentPage !== 1 && (
  //           <span onClick={() => handlePage(1)}>先頭へ</span>
  //         )}
  //         {paginateParam.currentPage !== 1 &&
  //           paginateParam.currentPage !== 2 && (
  //             <span onClick={() => handlePage(paginateParam.currentPage - 1)}>
  //               ＜
  //             </span>
  //           )}
  //         <ul className="kiykList-pagination-ul">
  //           {[...Array(paginateParam.totalPage)]
  //             .slice(
  //               paginateParam.showPageStart,
  //               paginateParam.showPageStart + 10
  //             )
  //             .map((_, i) => {
  //               i++;
  //               let page = i + paginateParam.showPageStart;
  //               return (
  //                 <li
  //                   className={classNames("kiykList-pagination-list", {
  //                     "kiykList-pagination-active":
  //                       page === paginateParam.currentPage,
  //                   })}
  //                   key={page}
  //                   onClick={() => handlePage(page)}
  //                 >
  //                   {page}
  //                 </li>
  //               );
  //             })}
  //         </ul>
  //         {paginateParam.currentPage !== paginateParam.totalPage &&
  //           paginateParam.currentPage !== paginateParam.totalPage - 1 && (
  //             <span onClick={() => handlePage(paginateParam.currentPage + 1)}>
  //               ＞
  //             </span>
  //           )}
  //         {paginateParam.currentPage !== paginateParam.totalPage && (
  //           <span onClick={() => handlePage(paginateParam.totalPage)}>
  //             最後へ
  //           </span>
  //         )}
  //       </div>
  //     )}
  //   </>
  // );
  // }, [paginateParam]);
  // };

  return (
    <>
      {/* {Paginate()} */}
      {/* {Paginate} */}
      {paginateParam.totalPage !== 1 && (
        <div className="kiykList-pagination">
          {paginateParam.currentPage !== 1 && (
            <span onClick={() => handlePage(1)}>先頭へ</span>
          )}
          {paginateParam.currentPage !== 1 &&
            paginateParam.currentPage !== 2 && (
              <span onClick={() => handlePage(paginateParam.currentPage - 1)}>
                ＜
              </span>
            )}
          <ul className="kiykList-pagination-ul">
            {[...Array(paginateParam.totalPage)]
              .slice(
                paginateParam.showPageStart,
                paginateParam.showPageStart + 10
              )
              .map((_, i) => {
                i++;
                let page = i + paginateParam.showPageStart;
                return (
                  <li
                    className={classNames("kiykList-pagination-list", {
                      "kiykList-pagination-active":
                        page === paginateParam.currentPage,
                    })}
                    key={page}
                    onClick={() => handlePage(page)}
                  >
                    {page}
                  </li>
                );
              })}
          </ul>
          {paginateParam.currentPage !== paginateParam.totalPage &&
            paginateParam.currentPage !== paginateParam.totalPage - 1 && (
              <span onClick={() => handlePage(paginateParam.currentPage + 1)}>
                ＞
              </span>
            )}
          {paginateParam.currentPage !== paginateParam.totalPage && (
            <span onClick={() => handlePage(paginateParam.totalPage)}>
              最後へ
            </span>
          )}
        </div>
      )}
      <div className="kiykList-container">
        <table className="kiykList-table">
          <thead className="kiykList-table-thead">
            <tr>
              <th rowSpan={2} className="kylist-kylist_numItem-th">
                <p>項番</p>
              </th>
              <th
                rowSpan={2}
                onClick={() => handleSort("KYLIST_ NOKIYK")}
                className="kylist-kylist_nokiyk-th"
              >
                <p className="pointer">
                  契約№{sort.key === "KYLIST_NOKIYK" ? sort.icon : <span />}
                </p>
              </th>
              <th
                rowSpan={2}
                onClick={() => handleSort("KYLIST_NOSQSY")}
                className="kylist-kylist_nosqsy-th"
              >
                <p className="pointer">
                  請求書№
                  {sort.key === "KYLIST_NOSQSY" ? sort.icon : <span />}
                </p>
              </th>
              <th
                rowSpan={2}
                onClick={() => handleSort("KYLIST_CDSQSK")}
                className="kylist-kylist_cdsqsk-th"
              >
                <p className="pointer">
                  請求先№
                  {sort.key === "KYLIST_CDSQSK" ? sort.icon : <span />}
                </p>
              </th>
              <th
                rowSpan={2}
                onClick={() => handleSort("KYLIST_SQ_NMCSTM")}
                className="kylist-kylist_sq_nmcstm-th"
              >
                <p className="pointer">
                  請求先名
                  {sort.key === "KYLIST_SQ_NMCSTM" ? sort.icon : <span />}
                </p>
              </th>
              <th
                rowSpan={2}
                onClick={() => handleSort("KYLIST_CDSHSK")}
                className="kylist-kylist_cdshsk-th"
              >
                <p className="pointer">
                  送本先№
                  {sort.key === "KYLIST_CDSHSK" ? sort.icon : <span />}
                </p>
              </th>
              <th
                rowSpan={1}
                onClick={() => handleSort("KYLIST_SH_NMCSTM")}
                className="kylist-kylist_sh_nmcstm-th"
              >
                <p className="pointer">
                  送本先名
                  {sort.key === "KYLIST_SH_NMCSTM" ? sort.icon : <span />}
                </p>
              </th>
              <th rowSpan={2} className="kylist-kylist_cdkypt-th">
                <p>
                  契約
                  <br />
                  PT
                </p>
              </th>
              <th rowSpan={2} className="kylist-kylist_sukiyk-th">
                <p>部数</p>
              </th>
              <th rowSpan={2} className="kylist-kylist_ymkiyk-th">
                <p>開始号</p>
              </th>
              {/* <th rowSpan={2}>
                <p>終了号</p>
              </th> */}
              <th
                rowSpan={1}
                onClick={() => handleSort("KYLIST_TXJYOT")}
                className="kylist-kylist_txjyot-th"
              >
                <p className="pointer">
                  状態{sort.key === "KYLIST_TXJYOT" ? sort.icon : <span />}
                </p>
              </th>
              {/* <th rowSpan={2}>
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
              </th> */}
              <th rowSpan={2} className="kylist-kylist_znurkk-th">
                <p>売掛</p>
              </th>
            </tr>
            <tr>
              <th>
                <input
                  type="text"
                  className="kylist-kylist_sh_nmcstm-th-input"
                  name="KYLIST_SH_NMCSTM"
                  placeholder="絞り込み検索"
                  value={filterQuery.KYLIST_SH_NMCSTM || ""}
                  autoComplete="off"
                  onChange={handleFilter}
                />
              </th>
              <th>
                <select
                  className="kylist-kylist_txjyot-th-select"
                  name="kylist_txjyot_key"
                  value={filterQuery.kylist_txjyot_key}
                  onChange={handleFilter}
                >
                  <option value="">選択</option>
                  {ky_txjyots.map((item: string) => {
                    return (
                      <option key={item} value={item}>
                        {/* {gycmConv("KBJYOT", item)} */}
                        {item}
                      </option>
                    );
                  })}
                </select>
              </th>
            </tr>
          </thead>
          <tbody
            className="kiykList-table-tbody"
            style={filteredKiyk.length < 10 ? { overflowY: "hidden" } : {}}
          >
            {filteredKiyk
              .slice(paginateParam.offset, paginateParam.offset + pageLimit)
              .map((row, index) => {
                return (
                  <tr
                    key={row.KYLIST_NOKIYK}
                    style={(() => {
                      switch (true) {
                        case row.KYLIST_NOKIYK === kiyk.KY_NOKIYK:
                          return { background: "#d9efff" };
                        case row.KYLIST_KBJYOT === "1":
                          return { background: "#FFFFE3" };
                        case row.KYLIST_KBJYOT === "3":
                          return { background: "#c5c5c5" };
                        case row.KYLIST_KBJYOT === "4" &&
                          row.KYLIST_KBCYUS === "04":
                          return { background: "#e3fce3" };
                        case row.KYLIST_KBJYOT === "4":
                          return { background: "#c5c5c5" };
                        case row.KYLIST_KBJYOT === "5" &&
                          (row.KYLIST_KBCYUS === "00" ||
                            row.KYLIST_KBCYUS === "01"):
                          return { background: "#e3fce3" };
                        case row.KYLIST_KBJYOT === "5":
                          return { background: "#c5c5c5" };
                        case row.KYLIST_KBJYOT === "8":
                          return { background: "#ffe4e1" };
                        case row.KYLIST_KBJYOT === "9":
                          return { background: "#ffe4e1" };
                        default:
                      }
                    })()}
                  >
                    <td className="kylist-kylist_numItem-td">
                      <button
                        className="kylist-kylist_numItem-td-button"
                        type="button"
                        onClick={() => switchKiyk(row.KYLIST_NOKIYK.toString())}
                      >
                        {index +
                          1 +
                          (paginateParam.currentPage - 1) * pageLimit}
                      </button>
                    </td>
                    <td className="kylist-kylist_nokiyk-td">
                      <button
                        className="kylist-kylist_nokiyk-td-button"
                        type="button"
                        onClick={() => {
                          switchKiyk(row.KYLIST_NOKIYK.toString());
                          history.push("/kiyk-list");
                          history.push(
                            `/kiyk-detail?&nokiyk=${row.KYLIST_NOKIYK}`
                          );
                        }}
                      >
                        {row.KYLIST_NOKIYK}
                      </button>
                    </td>
                    <td className="kylist-kylist_nosqsy-td">
                      {row.KYLIST_NOSQSY}
                    </td>
                    <td className="kylist-kylist_cdsqsk-td">
                      {row.KYLIST_CDSQSK}
                    </td>
                    <td className="kylist-kylist_sq_nmcstm-td">
                      {row.KYLIST_SQ_NMCSTM}
                    </td>
                    <td className="kylist-kylist_cdshsk-td">
                      {row.KYLIST_CDSHSK}
                    </td>
                    <td className="kylist-kylist_sh_nmcstm-td">
                      {row.KYLIST_SH_NMCSTM}
                    </td>
                    <td className="kylist-kylist_cdkypt-td">
                      {row.KYLIST_CDKYPT}
                    </td>
                    <td className="kylist-kylist_sukiyk-td">
                      {row.KYLIST_SUKIYK}
                    </td>
                    <td className="kylist-kylist_ymkiyk-td">
                      {row.KYLIST_YMKIYK}
                    </td>
                    <td className="kylist-kylist_txjyot-td">
                      {/* {gycmConv("KBJYOT", row.KYLIST_KBJYOT)} */}
                      {row.KYLIST_TXJYOT}
                    </td>
                    <td className="kylist-kylist_znurkk-td">
                      {row.KSLIST_ZNURKK}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default KiykListContainer;
