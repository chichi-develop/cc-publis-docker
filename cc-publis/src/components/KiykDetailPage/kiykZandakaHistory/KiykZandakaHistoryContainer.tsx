import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../store/actions";
import { StoreState } from "../../../store";
import { useLocation } from "react-router-dom";

import moment from "moment";
import _ from "lodash";

import {
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon
} from "@material-ui/icons";

import { Kyzhs, Kyzh } from "../../../types/models";

import "./KiykZandakaHistoryContainer.css";

type Props = {
  kyzhs: Kyzhs;
};

const KiykZandakaHistoryContainer: React.FC = () => {
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);
  const nokiyk = query.get("nokiyk");

  const publisState = useSelector((state: StoreState) => state.publis);
  const dispatch = useDispatch();

  const kyzhSearch = useCallback(
    (nokiyk: string) => dispatch(Actions.getKyzhStart(nokiyk)),
    [dispatch]
  );

  let kyzhs = publisState.kyzhs as Kyzhs;
  let showListKyzh = publisState.showListKyzh;

  useEffect(() => {
    console.log("KiykZandakaHistoryContainer render!");
    if (nokiyk !== null) {
      kyzhSearch(nokiyk);
      console.log("KiykZandakaHistoryContainer render!");
    }
    return () => console.log("unmounting...");
  }, [kyzhSearch, nokiyk]);

  return (
    <div className="kiykZandakaHistory-body">
      {showListKyzh && (
        <>
          <div className="kiykZandakaHistory-menu">
            <p className="frame-title">契約一覧</p>
          </div>
          <KiykZandakaHistory kyzhs={kyzhs} />
        </>
      )}
    </div>
  );
};

const KiykZandakaHistory: React.FC<Props> = ({ kyzhs }) => {
  type Key = {
    vkm_nmsyri_key: string;
  };

  type FilterQuery = Key & Partial<Kyzh>;

  type Sort = {
    key: string;
    order: number;
    icon?: JSX.Element;
  };

  const initialState = {
    vkm_nmsyri: [],
    vkm_nmsyri_key: "",
    sort: {
      key: "VKM_NOSYRI",
      order: 0,
      icon: <span />
    },
    filterQuery: {
      vkm_nmsyri_key: ""
    }
  };

  const [vkm_nmsyris, setNmsyris] = useState<string[]>(initialState.vkm_nmsyri);
  // 検索条件
  const [filterQuery, setFilterQuery] = useState<FilterQuery>(
    initialState.filterQuery
  );
  // ソート条件
  const [sort, setSort] = useState<Sort>(initialState.sort);

  useEffect(() => {
    console.log("KiykZandakaHistory render!");
    // setKiyks(publisState.kiyks);
    setNmsyris(_.uniq(_.map(kyzhs, "VKM_NMSYRI"))); // TODO: 要検討、select絞り込み
    setFilterQuery({ vkm_nmsyri_key: "" });
    setSort({ key: "VKM_DTSYRI", order: -1, icon: <span /> });
    // if (aclgState.clearSortFilter) {
    //   setFilterQuery({ vkm_nmsyri_key: "" });
    //   setSort({ key: "vkm_nmsyri", order: 0, icon: <span /> });
    // }
    // }, [aclgState.cm_aclgs, aclgState.clearSortFilter]);
  }, [kyzhs]);

  const filteredKyzh = useMemo(() => {
    // cnst filteredMdmm = (() => {
    let tmpKyzhs = kyzhs;
    // 入力した文字は小文字にする
    const filterTxactv: string | undefined = filterQuery.VKM_NMSRSY;
    // 絞り込み検索
    tmpKyzhs = tmpKyzhs.filter(row => {
      // タイトルで絞り込み
      if (
        filterQuery.VKM_NMSRSY &&
        String(row.VKM_NMSRSY)
          .toLowerCase()
          .indexOf(filterTxactv || "") === -1
      ) {
        return false;
      }

      // カテゴリーで絞り込み
      if (
        filterQuery.vkm_nmsyri_key &&
        // row.md_nmmmbr !== parseInt(filterQuery.md_nmmmbr_key)
        // row.md_nmmmbr !== md_nmmmbrs[parseInt(filterQuery.md_nmmmbr_key)].title
        row.VKM_NMSYRI !== filterQuery.vkm_nmsyri_key
      ) {
        return false;
      }

      return row;
    });
    // ソート
    if (sort.key) {
      tmpKyzhs = tmpKyzhs.sort((a: any, b: any) => {
        const A = a[sort.key];
        const B = b[sort.key];

        return (A === B ? 0 : A > B ? 1 : -1) * sort.order;
      });
    }

    return tmpKyzhs;
  }, [filterQuery, sort, kyzhs]);

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
      className="kiykZandakaHistory-container"
      style={kyzhs.length < 12 ? { overflowY: "hidden" } : {}}
    >
      <table className="commonTable-table">
        <thead className="commonTable-thead">
          <tr>
            <th rowSpan={2} onClick={() => handleSort("VKM_DTSYRI")}>
              <p>
                処理日
                {sort.key === "VKM_DTSYRI" ? sort.icon : <span />}
              </p>
            </th>
            <th rowSpan={2} onClick={() => handleSort("VKM_NOSYRI")}>
              <p>処理番号{sort.key === "VKM_NOSYRI" ? sort.icon : <span />}</p>
            </th>
            <th onClick={() => handleSort("VKM_NMSYRI")}>
              <p>処理名{sort.key === "VKM_NMSYRI" ? sort.icon : <span />}</p>
            </th>
            <th onClick={() => handleSort("VKM_NMSRSY")}>
              <p>処理詳細{sort.key === "VKM_NMSRSY" ? sort.icon : <span />}</p>
            </th>
            <th rowSpan={2}>
              <p>処理金額</p>
            </th>
            <th rowSpan={2}>
              <p>処理数量</p>
            </th>
            <th rowSpan={2}>
              <p>処理誌代</p>
            </th>
            <th rowSpan={2}>
              <p>処理送料</p>
            </th>
          </tr>
          <tr>
            <th>
              <select
                name="vkm_nmsyri_key"
                // value={filterQuery.md_nmmmbr_key||""}
                value={filterQuery.vkm_nmsyri_key}
                onChange={handleFilter}
              >
                <option value="">選択</option>
                {vkm_nmsyris.map((item: string) => {
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
                name="VKM_NMSRSY"
                placeholder="絞り込み検索"
                value={filterQuery.VKM_NMSRSY || ""}
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
          {filteredKyzh.map(row => {
            return (
              // <tr key={kyzhs.VKM_NOSYRI}>
              // className={[ 'post', isPublished ? 'published' : 'unpublished' ].join(' ')}
              <tr key={row.VKM_NOSYRI}>
                <td>{moment(row.VKM_DTSYRI).format("YYYY/MM/DD")}</td>
                {/* <td style={{ textAlign: "right" }}>{row.VKM_NOSYRI}</td> */}
                {/* TODO: redux */}
                <td style={{ textAlign: "right" }}>{row.VKM_NOSYRI}</td>
                <td style={{ textAlign: "right" }}>{row.VKM_NMSYRI}</td>
                <td style={{ textAlign: "right" }}>{row.VKM_NMSRSY}</td>
                <td style={{ textAlign: "right" }}>{row.VKM_KGSYRI}</td>
                <td style={{ textAlign: "right" }}>{row.VKM_SUSURY}</td>
                <td style={{ textAlign: "right" }}>{row.VKM_KGSRSZ}</td>
                <td style={{ textAlign: "right" }}>{row.VKM_KGSRSR}</td>
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

export default KiykZandakaHistoryContainer;
