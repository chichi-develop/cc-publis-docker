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
import NoData from "../common/NoData";
import { Aclgs, Aclg } from "../../../../types/models";

import "./AclgContainer.css";

type Props = {
  aclgs: Aclgs;
};

// TODO: Modal系見直し

const AclgContainer: React.FC = () => {
  const { cdcstm } = useParams();
  const aclgState = useSelector((state: StoreState) => state.aclg);
  const dispatch = useDispatch();
  const aclgSearch = useCallback(
    (cdcstm: string) => dispatch(Actions.getAclgsStart(cdcstm)),
    [dispatch]
  );

  let cm_aclgs = aclgState.cm_aclgs;
  let showListAclgs = aclgState.showListAclgs;

  useEffect(() => {
    console.log("AclgContainer render!");
    return () => console.log("unmounting...");
  }, []);

  useEffect(() => {
    aclgSearch(cdcstm || "0");
  }, [aclgSearch, cdcstm]);

  return (
    <div className="aclg-body">
      <div className="aclg-menu">
        <p className="frame-title">書籍・セミナー・大会履歴</p>
        <LinkList cdcstm={cdcstm || "0"} showLinkAclg={false} />
      </div>
      {showListAclgs ? (
        <AclgTable aclgs={cm_aclgs} />
      ) : (
        <NoData
          searchKey={cdcstm || "0"}
          message="書籍・セミナー・大会履歴データはありません。"
        />
      )}
    </div>
  );
};

const AclgTable: React.FC<Props> = ({ aclgs }) => {
  type Key = {
    al_nmactv_key: string;
  };

  type FilterQuery = Key & Partial<Aclg>;

  type Sort = {
    key: string;
    order: number;
    icon?: JSX.Element;
  };

  const initialState = {
    al_nmactv: [],
    al_nmactv_key: "",
    sort: {
      key: "al_nmactv",
      order: 0,
      icon: <span />
    },
    filterQuery: {
      al_nmactv_key: ""
    }
  };

  const [al_nmactvs, setNmactvs] = useState<string[]>(initialState.al_nmactv);

  // フィルタ
  const [filterQuery, setFilterQuery] = useState<FilterQuery>(
    initialState.filterQuery
  );

  // ソート
  const [sort, setSort] = useState<Sort>(initialState.sort);

  useEffect(() => {
    console.log("AclgTable render!");
    return () => console.log("unmounting...");
  }, []);

  useEffect(() => {
    setNmactvs(_.uniq(_.map(aclgs, "al_nmactv")));
    setSort({ key: "al_dtactv", order: -1, icon: <span /> });
  }, [aclgs]);

  const filteredAclg = useMemo(() => {
    // cnst filteredMdmm = (() => {
    let tmpAclgs = aclgs;
    // 入力した文字は小文字にする
    const filterTxactv: string | undefined = filterQuery.al_txactv;
    tmpAclgs = tmpAclgs.filter(row => {
      // フィルタ
      if (
        filterQuery.al_txactv &&
        String(row.al_txactv)
          .toLowerCase()
          .indexOf(filterTxactv || "") === -1
      ) {
        return false;
      }

      // フィルタ
      if (
        filterQuery.al_nmactv_key &&
        // row.md_nmmmbr !== parseInt(filterQuery.md_nmmmbr_key)
        // row.md_nmmmbr !== md_nmmmbrs[parseInt(filterQuery.md_nmmmbr_key)].title
        row.al_nmactv !== filterQuery.al_nmactv_key
      ) {
        return false;
      }

      return row;
    });
    // ソート
    if (sort.key) {
      tmpAclgs = tmpAclgs.sort((a: any, b: any) => {
        const A = a[sort.key];
        const B = b[sort.key];

        return (A === B ? 0 : A > B ? 1 : -1) * sort.order;
      });
    }

    return tmpAclgs;
  }, [filterQuery, sort, aclgs]);

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
      className="aclg-container"
      style={aclgs.length < 12 ? { overflowY: "hidden" } : {}}
    >
      <table className="commonTable-table">
        <thead className="commonTable-thead">
          <tr>
            <th rowSpan={2} onClick={() => handleSort("al_dtactv")}>
              <p className="pointer">
                日付
                {sort.key === "al_dtactv" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2} onClick={() => handleSort("al_noactv")}>
              <p className="pointer">
                売掛No.{sort.key === "al_noactv" ? sort.icon : <span />}
              </p>
            </th>
            <th onClick={() => handleSort("al_nmactv")}>
              <p className="pointer">
                区分{sort.key === "al_nmactv" ? sort.icon : <span />}
              </p>
            </th>
            <th onClick={() => handleSort("al_txactv")}>
              <p className="pointer">
                商品名{sort.key === "al_txactv" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2}>
              <p>送り先</p>
            </th>
            <th rowSpan={2}>
              <p>数量</p>
            </th>
            <th rowSpan={2}>
              <p>金額</p>
            </th>
          </tr>
          <tr>
            <th>
              <select
                name="al_nmactv_key"
                // value={filterQuery.md_nmmmbr_key||""}
                value={filterQuery.al_nmactv_key}
                onChange={handleFilter}
              >
                <option value="">選択</option>
                {al_nmactvs.map((item: string) => {
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
                name="al_txactv"
                placeholder="絞り込み検索"
                value={filterQuery.al_txactv || ""}
                autoComplete="off"
                onChange={handleFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody className="commonTable-tbody">
          {filteredAclg.map(aclg => {
            return (
              <tr key={aclg.al_idactv}>
                <td>{moment(aclg.al_dtactv).format("YYYY/MM/DD")}</td>
                <td style={{ textAlign: "right" }}>{aclg.al_noactv}</td>
                <td>{aclg.al_nmactv}</td>
                <td>{aclg.al_txactv}</td>
                <td>{aclg.al_nmcstm}</td>
                <td style={{ textAlign: "right" }}>{aclg.al_susury}</td>
                <td style={{ textAlign: "right" }}>
                  {aclg.al_kggoke.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AclgContainer;
