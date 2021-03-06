import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../../store/actions";
import { StoreState } from "../../../../store";
import { useLocation, useHistory } from "react-router-dom";
import classNames from "classnames";

import _ from "lodash";

import {
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@material-ui/icons";

import LinkList from "../common/LinkList";
import ErrorMessageFrame from "../../../Common/ErrorMessageFrame";
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
    (cdcstm: string) => dispatch(Actions.switchCstm(cdcstm)),
    [dispatch]
  );

  const getGycmStart = useCallback(() => dispatch(Actions.getGycmStart()), [
    dispatch,
  ]);

  let cstm = publisState.cstm as Cstm;
  let cstms = publisState.cstms;
  let showListCstm = publisState.showListCstm;
  let gycms = publisState.gycms;
  let setGycm = publisState.setGycm;
  let errorCode = publisState.error.code;

  useEffect(() => {
    console.log("CstmListContainer render!");
    return () => console.log("unmounting...");
  }, []);

  useEffect(() => {
    if (key !== null && columnName !== null) {
      cstmSearch(columnName, key, "cstm");
    }
  }, [columnName, key, cstmSearch]);

  useEffect(() => {
    if (!setGycm && showListCstm) {
      getGycmStart();
    }
  }, [showListCstm, setGycm, getGycmStart]);

  return (
    <div className="cstmList-body">
      {errorCode === "ECONNABORTED" && (
        <ErrorMessageFrame message="APIサーバへのリクエストで、タイムアウトしました。" />
      )}
      {errorCode === "noDataFound" && (
        <ErrorMessageFrame message="検索結果： 該当するデータはありませんでした。" />
      )}
      {showListCstm && setGycm && (
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

  const pageLimit = 100;

  const initialState = {
    ct_kbcstm: [],
    ct_kbcstm_key: "",
    sort: {
      key: "CT_CDCSTM",
      order: 0,
      icon: <span />,
    },
    filterQuery: {
      ct_kbcstm_key: "",
    },
    paginateParam: {
      offset: 0,
      currentPage: 1,
      totalRecords: cstms.length,
      totalPage: Math.ceil(cstms.length / pageLimit),
      showPageStart: 0,
    },
  };

  const [ct_kbcstms, setKbcstms] = useState<string[]>(initialState.ct_kbcstm);

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

  useEffect(() => {
    console.log("CstmList render!");
    return () => console.log("unmounting...");
  }, []);

  useEffect(() => {
    setKbcstms(_.uniq(_.map(cstms, "CT_KBCSTM"))); // TODO: 要検討、select絞り込み
    setFilterQuery({ ct_kbcstm_key: "" });
    setSort({ key: "ct_kbcstm", order: 0, icon: <span /> });
  }, [cstms]);

  const filteredCstm = useMemo(() => {
    // cnst filteredMdmm = (() => {
    let tmpCstms = cstms;
    // 入力した文字は小文字にする
    const filterTxactv: string | undefined = filterQuery.CT_ADCST1;
    tmpCstms = tmpCstms.filter((row) => {
      // フィルタ
      if (
        filterQuery.CT_ADCST1 &&
        String(row.CT_ADCST1)
          .toLowerCase()
          .indexOf(filterTxactv || "") === -1
      ) {
        return false;
      }

      // フィルタ
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

    setPaginateParam({
      offset: 0,
      currentPage: 1,
      totalRecords: tmpCstms.length,
      totalPage: Math.ceil(tmpCstms.length / pageLimit),
      showPageStart: 0,
    });

    return tmpCstms;
  }, [filterQuery, sort, cstms]);

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

  const gycmConv = (cdbnri: string, cdbnsy: string) =>
    gycms.filter((r) => r.GY_CDBNRI === cdbnri && r.GY_CDBNSY === cdbnsy)[0]
      .GY_NMBNSY;

  return (
    <>
      {paginateParam.totalPage !== 1 && (
        <div className="cstmList-pagination">
          {paginateParam.currentPage !== 1 && (
            <span onClick={() => handlePage(1)}>先頭へ</span>
          )}
          {paginateParam.currentPage !== 1 &&
            paginateParam.currentPage !== 2 && (
              <span onClick={() => handlePage(paginateParam.currentPage - 1)}>
                ＜
              </span>
            )}
          <ul className="cstmList-pagination-ul">
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
                    className={classNames("cstmList-pagination-list", {
                      "cstmList-pagination-active":
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
      <div className="cstmList-container">
        <table className="cstmList-table">
          <thead className="cstmList-table-thead">
            <tr>
              <th rowSpan={2} className="ctlist-ct_numItem-th">
                <p>項番</p>
              </th>
              <th
                rowSpan={2}
                onClick={() => handleSort("CT_CDCSTM")}
                className="ctlist-ct_cdcstm-th"
              >
                <p className="pointer">
                  読者番号{sort.key === "CT_CDCSTM" ? sort.icon : <span />}
                </p>
              </th>
              <th
                rowSpan={1}
                onClick={() => handleSort("CT_KBCSTM")}
                className="ctlist-ct_kbcstm-th"
              >
                <p className="pointer">
                  区分{sort.key === "CT_KBCSTM" ? sort.icon : <span />}
                </p>
              </th>
              <th rowSpan={2} className="ctlist-ct_nmcstm-th">
                <p>顧客名</p>
              </th>
              <th rowSpan={2} className="ctlist-ct_nmsime-th">
                <p>氏名</p>
              </th>
              <th
                rowSpan={2}
                onClick={() => handleSort("CT_NKSIME")}
                className="ctlist-ct_nksime-th"
              >
                <p>氏名カナ</p>
              </th>
              <th
                rowSpan={1}
                onClick={() => handleSort("CT_ADCST1")}
                className="ctlist-ct_adcst1-th"
              >
                <p className="pointer">
                  住所{sort.key === "CT_ADCST1" ? sort.icon : <span />}
                </p>
              </th>
              <th rowSpan={2} className="ctlist-ct_notel1-th">
                <p>TEL1</p>
              </th>
              <th rowSpan={2} className="ctlist-ct_notel2-th">
                <p>TEL2</p>
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
                        {/* {item} */}
                        {gycmConv("KBCSTM", item)}
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
            className="cstmList-table-tbody"
            style={filteredCstm.length < 12 ? { overflowY: "hidden" } : {}}
          >
            {filteredCstm
              .slice(paginateParam.offset, paginateParam.offset + pageLimit)
              .map((row, index) => {
                return (
                  <tr
                    key={row.CT_CDCSTM}
                    style={
                      row.CT_CDCSTM === cstm.CT_CDCSTM
                        ? { background: "#d9efff" }
                        : {}
                    }
                  >
                    <td className="ctlist-ct_numItem-td">
                      <button
                        className="ctlist-ct_numItem-td-button"
                        type="button"
                        onClick={() => switchCstm(row.CT_CDCSTM)}
                      >
                        {index +
                          1 +
                          (paginateParam.currentPage - 1) * pageLimit}
                      </button>
                    </td>
                    <td className="ctlist-ct_cdcstm-td">
                      <div style={{ display: "flex" }}>
                        <button
                          className="ctlist-ct_cdcstm-td-button"
                          type="button"
                          onClick={() => {
                            switchCstm(row.CT_CDCSTM);
                            history.push(
                              `/kiyk-list?columnName=ky_cdsqsk_cdshsk&key=${row.CT_CDCSTM}`
                            );
                          }}
                        >
                          {row.CT_CDCSTM}
                        </button>
                      </div>
                    </td>
                    <td className="ctlist-ct_kbcstm-td">
                      {gycmConv("KBCSTM", row.CT_KBCSTM)}
                    </td>
                    <td className="ctlist-ct_nmcstm-td">{row.CT_NMCSTM}</td>
                    <td className="ctlist-ct_nmsime-td">{row.CT_NMSIME}</td>
                    <td className="ctlist-ct_nksime-td">{row.CT_NKSIME}</td>
                    <td className="ctlist-ct_adcst1-td">{row.CT_ADCST1}</td>
                    <td className="ctlist-ct_notel1-td">{row.CT_NOTEL1}</td>
                    <td className="ctlist-ct_notel2-td">{row.CT_NOTEL2}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CstmListContainer;
