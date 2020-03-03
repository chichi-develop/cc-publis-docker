import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../../store/actions";
import { StoreState } from "../../../../store";
import { useParams } from "react-router-dom";

import moment from "moment";
import _ from "lodash";

import {
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon
} from "@material-ui/icons";

import LinkList from "../common/LinkList";
import { Ctzhs, Ctzh } from "../../../../types/models";

import "./CstmZandakaHistoryContainer.css";

type Props = {
  ctzhs: Ctzhs;
};

const CstmZandakaHistoryContainer: React.FC = () => {
  const { cdcstm } = useParams();

  const publisState = useSelector((state: StoreState) => state.publis);
  const dispatch = useDispatch();

  const ctzhSearch = useCallback(
    (cdcstm: string) => dispatch(Actions.getCtzhStart(cdcstm)),
    [dispatch]
  );

  let showListCtzh = publisState.showListCtzh;
  let ctzhs = publisState.ctzhs;

  useEffect(() => {
    console.log("CstmZandakaHistoryContainer render!");
    ctzhSearch(cdcstm || "0");
    return () => console.log("unmounting...");
  }, [ctzhSearch, cdcstm]);
  return (
    <div className="ctzh-body">
      {showListCtzh ? (
        <>
          <div className="ctzh-menu">
            <p className="frame-title">顧客マスタメモ</p>
            <LinkList
              cdcstm={cdcstm || "0"}
              showLinkCstmZandakaHistory={false}
            />
          </div>
          <CstmZandakaHistoryTable ctzhs={ctzhs} />
        </>
      ) : (
        <LinkList cdcstm={cdcstm || "0"} showLinkCstmZandakaHistory={false} />
      )}
    </div>
  );
};

const CstmZandakaHistoryTable: React.FC<Props> = ({ ctzhs }) => {
  type Key = {
    vun_nmsyri_key: string;
  };

  type FilterQuery = Key & Partial<Ctzh>;

  type Sort = {
    key: string;
    order: number;
    icon?: JSX.Element;
  };

  const initialState = {
    ct_kbcstm: [],
    vun_nmsyri_key: "",
    sort: {
      key: "VUN_NOSYRI",
      order: 0,
      icon: <span />
    },
    filterQuery: {
      vun_nmsyri_key: ""
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
    console.log("CstmZandakaHistoryTable render!");
    // setCtzhs(publisState.ctzhs);
    setKbcstms(_.uniq(_.map(ctzhs, "VUN_NMSYRI"))); // TODO: 要検討、select絞り込み
    setFilterQuery({ vun_nmsyri_key: "" });
    setSort({ key: "ct_kbcstm", order: 0, icon: <span /> });
    // if (aclgState.clearSortFilter) {
    //   setFilterQuery({ vun_nmsyri_key: "" });
    //   setSort({ key: "ct_kbcstm", order: 0, icon: <span /> });
    // }
    // }, [aclgState.cm_aclgs, aclgState.clearSortFilter]);
  }, [ctzhs]);

  const filteredCtzh = useMemo(() => {
    // cnst filteredMdmm = (() => {
    let tmpCtzhs = ctzhs;
    // 入力した文字は小文字にする
    const filterTxctzh: string | undefined = filterQuery.VUN_KBSYRI;
    // 絞り込み検索
    tmpCtzhs = tmpCtzhs.filter(row => {
      // タイトルで絞り込み
      if (
        filterQuery.VUN_KBSYRI &&
        String(row.VUN_KBSYRI)
          .toLowerCase()
          .indexOf(filterTxctzh || "") === -1
      ) {
        return false;
      }

      // カテゴリーで絞り込み
      if (
        filterQuery.vun_nmsyri_key &&
        // row.md_nmmmbr !== parseInt(filterQuery.md_nmmmbr_key)
        // row.md_nmmmbr !== md_nmmmbrs[parseInt(filterQuery.md_nmmmbr_key)].title
        row.VUN_NMSYRI !== filterQuery.vun_nmsyri_key
      ) {
        return false;
      }

      return row;
    });
    // ソート
    if (sort.key) {
      tmpCtzhs = tmpCtzhs.sort((a: any, b: any) => {
        const A = a[sort.key];
        const B = b[sort.key];

        return (A === B ? 0 : A > B ? 1 : -1) * sort.order;
      });
    }

    return tmpCtzhs;
  }, [filterQuery, sort, ctzhs]);

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
      className="ctzh-container"
      style={ctzhs.length < 12 ? { overflowY: "hidden" } : {}}
    >
      <table className="commonTable-table">
        <thead className="commonTable-thead">
          <tr>
            <th rowSpan={2} onClick={() => handleSort("VUN_NOSQSY")}>
              <p className="pointer">
                請求書番号
                {sort.key === "VUN_NOSQSY" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2} onClick={() => handleSort("VUN_DTSYRI")}>
              <p className="pointer">
                処理日
                {sort.key === "VUN_DTSYRI" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2} onClick={() => handleSort("VUN_TMSYRI")}>
              <p className="pointer">
                処理時間
                {sort.key === "VUN_TMSYRI" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2} onClick={() => handleSort("VUN_NOSYRI")}>
              <p className="pointer">
                処理番号{sort.key === "VUN_NOSYRI" ? sort.icon : <span />}
              </p>
            </th>
            <th onClick={() => handleSort("VUN_NMSYRI")}>
              <p className="pointer">
                処理名{sort.key === "VUN_NMSYRI" ? sort.icon : <span />}
              </p>
            </th>
            <th onClick={() => handleSort("VUN_KBSYRI")}>
              <p className="pointer">
                処理区分{sort.key === "VUN_KBSYRI" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2}>
              <p>契約金額</p>
            </th>
            <th rowSpan={2}>
              <p>解除金額</p>
            </th>
            <th rowSpan={2}>
              <p>入金額</p>
            </th>
            <th rowSpan={2}>
              <p>残高</p>
            </th>
          </tr>
          <tr>
            <th>
              <select
                name="vun_nmsyri_key"
                // value={filterQuery.md_nmmmbr_key||""}
                value={filterQuery.vun_nmsyri_key}
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
                name="VUN_KBSYRI"
                placeholder="絞り込み検索"
                value={filterQuery.VUN_KBSYRI || ""}
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
          {filteredCtzh.map(row => {
            return (
              // <tr key={ctzh.VUN_NOSYRI}>
              // className={[ 'post', isPublished ? 'published' : 'unpublished' ].join(' ')}
              <tr key={row.VUN_NOSYRI}>
                <td>{row.VUN_NOSQSY}</td>
                <td>{moment(row.VUN_DTSYRI).format("YYYY/MM/DD")}</td>
                <td>{row.VUN_TMSYRI}</td>
                <td>{row.VUN_NOSYRI}</td>
                {/* <td style={{ textAlign: "right" }}>{row.VUN_NOSYRI}</td> */}
                {/* TODO: redux */}
                <td>{row.VUN_NMSYRI}</td>
                <td>{row.VUN_KBSYRI}</td>
                <td style={{ textAlign: "right" }}>{row.VUN_KGKIYK}</td>
                <td style={{ textAlign: "right" }}>{row.VUN_KGKIKJ}</td>
                <td style={{ textAlign: "right" }}>{row.VUN_KGNYKN}</td>
                <td style={{ textAlign: "right" }}>{row.VUN_KGZNDK}</td>
                {/* <td>{row.CT_NMCSTM}</td> */}
                {/* <td style={{ textAlign: "right" }}>{row.CT_NOTEL1}</td> */}
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

export default CstmZandakaHistoryContainer;
