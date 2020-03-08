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
import { Csmms, Csmm } from "../../../../types/models";

import "./CsmmContainer.css";

type Props = {
  csmms: Csmms;
};

const CsmmContainer: React.FC = () => {
  const { cdcstm } = useParams();

  const publisState = useSelector((state: StoreState) => state.publis);
  const dispatch = useDispatch();

  const csmmSearch = useCallback(
    (cdcstm: string) => dispatch(Actions.getCsmmStart(cdcstm)),
    [dispatch]
  );

  let csmms = publisState.csmms;
  let showListCsmm = publisState.showListCsmm;

  useEffect(() => {
    console.log("CstmContainer render!");
    return () => console.log("unmounting...");
  }, []);

  useEffect(() => {
    csmmSearch(cdcstm || "0");
  }, [csmmSearch, cdcstm]);

  return (
    <div className="csmm-body">
      <div className="csmm-menu">
        <p className="frame-title">顧客マスタメモ</p>
        <LinkList cdcstm={cdcstm || "0"} showLinkCsmm={false} />
      </div>
      {showListCsmm ? (
        <CsmmTable csmms={csmms} />
      ) : (
        <NoData
          searchKey={cdcstm || "0"}
          message="顧客マスタメモデータはありません。"
        />
      )}
    </div>
  );
};

const CsmmTable: React.FC<Props> = ({ csmms }) => {
  type Key = {
    cm_nmcmbr_key: string;
  };

  type FilterQuery = Key & Partial<Csmm>;

  type Sort = {
    key: string;
    order: number;
    icon?: JSX.Element;
  };

  const initialState = {
    ct_kbcstm: [],
    cm_nmcmbr_key: "",
    sort: {
      key: "CM_RBCSMM",
      order: 0,
      icon: <span />
    },
    filterQuery: {
      cm_nmcmbr_key: ""
    }
  };

  const [ct_kbcstms, setKbcstms] = useState<string[]>(initialState.ct_kbcstm);
  // フィルタ
  const [filterQuery, setFilterQuery] = useState<FilterQuery>(
    initialState.filterQuery
  );
  // フィルタ
  const [sort, setSort] = useState<Sort>(initialState.sort);

  useEffect(() => {
    console.log("Csmm render!");
    return () => console.log("unmounting...");
  }, []);

  useEffect(() => {
    setKbcstms(_.uniq(_.map(csmms, "CM_NMCMBR"))); // TODO: 要検討、select絞り込み
    setFilterQuery({ cm_nmcmbr_key: "" });
    setSort({ key: "ct_kbcstm", order: 0, icon: <span /> });
  }, [csmms]);

  const filteredCsmm = useMemo(() => {
    let tmpCsmms = csmms;
    // 入力した文字は小文字にする
    const filterTxcsmm: string | undefined = filterQuery.CM_TXCSMM;
    tmpCsmms = tmpCsmms.filter(row => {
      // フィルタ
      if (
        filterQuery.CM_TXCSMM &&
        String(row.CM_TXCSMM)
          .toLowerCase()
          .indexOf(filterTxcsmm || "") === -1
      ) {
        return false;
      }

      // フィルタ
      if (
        filterQuery.cm_nmcmbr_key &&
        // row.md_nmmmbr !== parseInt(filterQuery.md_nmmmbr_key)
        // row.md_nmmmbr !== md_nmmmbrs[parseInt(filterQuery.md_nmmmbr_key)].title
        row.CM_NMCMBR !== filterQuery.cm_nmcmbr_key
      ) {
        return false;
      }

      return row;
    });
    // ソート
    if (sort.key) {
      tmpCsmms = tmpCsmms.sort((a: any, b: any) => {
        const A = a[sort.key];
        const B = b[sort.key];

        return (A === B ? 0 : A > B ? 1 : -1) * sort.order;
      });
    }

    return tmpCsmms;
  }, [filterQuery, sort, csmms]);

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
      className="csmm-container"
      style={csmms.length < 12 ? { overflowY: "hidden" } : {}}
    >
      <table className="commonTable-table">
        <thead className="commonTable-thead">
          <tr>
            <th rowSpan={2} onClick={() => handleSort("CM_RBCSMM")}>
              <p className="pointer">
                メモ連番{sort.key === "CM_RBCSMM" ? sort.icon : <span />}
              </p>
            </th>
            <th onClick={() => handleSort("CM_NMCMBR")}>
              <p className="pointer">
                分類{sort.key === "CM_NMCMBR" ? sort.icon : <span />}
              </p>
            </th>
            <th onClick={() => handleSort("CM_TXCSMM")}>
              <p className="pointer">
                メモ{sort.key === "CM_TXCSMM" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2} onClick={() => handleSort("CM_CCDATEX")}>
              <p className="pointer">
                作成日
                {sort.key === "CM_CCDATEX" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2} onClick={() => handleSort("CM_CCDATEC")}>
              <p className="pointer">
                更新日
                {sort.key === "CM_CCDATEC" ? sort.icon : <span />}
              </p>
            </th>
            {/* <th rowSpan={2}>
              <p>顧客名</p>
            </th>
            <th rowSpan={2}>
              <p>TEL1</p>
            </th>
            <th rowSpan={2}>
              <p>TEL2</p>
            </th> */}
          </tr>
          <tr>
            <th>
              <select
                name="cm_nmcmbr_key"
                // value={filterQuery.md_nmmmbr_key||""}
                value={filterQuery.cm_nmcmbr_key}
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
                name="CM_TXCSMM"
                placeholder="絞り込み検索"
                value={filterQuery.CM_TXCSMM || ""}
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
          {filteredCsmm.map(row => {
            return (
              // <tr key={csmm.CM_RBCSMM}>
              // className={[ 'post', isPublished ? 'published' : 'unpublished' ].join(' ')}
              <tr key={row.CM_RBCSMM}>
                {/* <td style={{ textAlign: "right" }}>{row.CM_RBCSMM}</td> */}
                {/* TODO: redux */}
                <td style={{ textAlign: "right" }}>{row.CM_RBCSMM}</td>
                <td>{row.CM_NMCMBR}</td>
                <td>{row.CM_TXCSMM}</td>
                <td style={{ textAlign: "center" }}>
                  {moment(row.CM_CCDATEC).format("YYYY/MM/DD")}
                </td>
                <td style={{ textAlign: "center" }}>
                  {moment(row.CM_CCDATEX).format("YYYY/MM/DD")}
                </td>
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

export default CsmmContainer;
