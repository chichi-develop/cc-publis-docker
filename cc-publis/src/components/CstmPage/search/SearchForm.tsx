import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zen2han } from "../../../common";

import "./SearchForm.css";

export const SearchForm: React.FC = () => {
  const { register, setValue, handleSubmit, errors } = useForm();
  let history = useHistory();
  const onSubmitCdcstm = (data: Record<string, any>) => {
    if (data.cdcstm !== "") {
      console.log(`onSubmitCdcstm: switchSearch=${switchSearch}`);
      let cdcstm = zen2han(data.cdcstm);
      setValue("cdcstm", cdcstm);
      switch (switchSearch) {
        case "kiyk":
          console.log(
            `case kiyk: switchSearch=${switchSearch}, cdcstm=${cdcstm}`
          );
          history.push(`/kiyk-list?columnName=ky_cdsqsk_cdshsk&key=${cdcstm}`);
          break;
        default:
          history.push(`/cstm?columnName=ct_cdcstm&key=${cdcstm}%`);
      }
    }
  };
  const onSubmitNkcstm = (data: Record<string, any>) => {
    if (data.nkcstm !== "") {
      let nkcstm = zen2han(data.nkcstm);
      setValue("nkcstm", nkcstm);
      history.push(`/cstm?columnName=ct_nkcstm&key=%${nkcstm}%`);
    }
  };
  const onSubmitNksime = (data: Record<string, any>) => {
    if (data.nksime !== "") {
      let nksime = zen2han(data.nksime);
      setValue("nksime", nksime);
      history.push(`/cstm?columnName=ct_nksime&key=%${nksime}%`);
    }
  };
  const onSubmitAddress = (data: Record<string, any>) => {
    if (data.address !== "") {
      history.push(`/cstm?columnName=ct_adcst1&key=${data.address}%`);
    }
  };
  const onSubmitNokiyk = (data: Record<string, any>) => {
    if (data.nokiyk !== "") {
      let nokiyk = zen2han(data.nokiyk);
      setValue("nokiyk", nokiyk);
      history.push(`/kiyk-detail?&nokiyk=${nokiyk}`);
    }
  };
  const onSubmitTel = (data: Record<string, any>) => {
    if (data.tel !== "") {
      history.push(`/cstm?columnName=ct_notel1&key=${data.tel}%`);
    }
  };
  const onSubmitNmcstm = (data: Record<string, any>) => {
    if (data.nmcstm !== "") {
      history.push(`/cstm?columnName=ct_nmcstm&key=%${data.nmcstm}%`);
    }
  };
  const onSubmitNmsime = (data: Record<string, any>) => {
    if (data.nmsime !== "") {
      history.push(`/cstm?columnName=ct_nmsime&key=${data.nmsime}%`);
    }
  };
  const onSubmitMail = (data: Record<string, any>) => {
    if (data.mail !== "") {
      history.push(`/cstm?columnName=ct_admail&key=${data.mail}%`);
    }
  };
  const onSubmitNosqsy = (data: Record<string, any>) => {
    if (data.nosqsy !== "") {
      let nosqsy = zen2han(data.nosqsy);
      setValue("nosqsy", nosqsy);
      history.push(`/kiyk-list?columnName=ky_nosqsy&key=${nosqsy}`);
    }
  };

  useEffect(() => {
    console.log("SearchForm render!");
    return () => console.log("unmounting...");
  }, []);

  const [switchSearch, setSwitchSearch] = useState<string>("cstm");

  return (
    <>
      <div className="searchForm-body">
        <div className="searchForm-container">
          <form
            className="searchForm"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitCdcstm)}
          >
            <p>読者番号</p>
            <div className="searchFormInputBox">
              <input
                type="text"
                name="cdcstm"
                placeholder="Search.."
                // ref={register({ pattern: /^2[0-9]{7}/ })}
                ref={register({ minLength: 6, maxLength: 8 })}
              />
              <button type="submit">
                <i className="material-icons">search</i>
              </button>
              <button
                type="submit"
                onClick={e => {
                  setSwitchSearch("kiyk");
                }}
                style={{ backgroundColor: "#FF9265" }}
              >
                <i className="material-icons">search</i>
              </button>
            </div>
            {errors.cdcstm && <p>cdcstm is 8 characters starting with 2</p>}
          </form>

          <form
            className="searchForm"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitNkcstm)}
          >
            <p>顧客名カナ</p>
            <div className="searchFormInputBox">
              <input
                type="text"
                name="nkcstm"
                placeholder="Search.."
                ref={register({ minLength: 2, maxLength: 50 })}
                // onChange={e => {
                //   console.log("顧客名カナ：onchange");
                //   setValue("nkcstm", zen2han(e.target.value));
                //   console.log(zen2han(e.target.value));
                //   // setValue("nkcstm", "テスト");
                // }}
              />
              <button type="submit">
                <i className="material-icons">search</i>
              </button>
            </div>
            {errors.nkcstm && <p>nkcstm is Strings from 2 to 50 characters</p>}
          </form>

          <form
            className="searchForm"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitNksime)}
          >
            <p>氏名カナ</p>
            <div className="searchFormInputBox">
              <input
                type="text"
                name="nksime"
                placeholder="Search.."
                ref={register({ minLength: 2, maxLength: 50 })}
              />
              <button type="submit">
                <i className="material-icons">search</i>
              </button>
            </div>
            {errors.nksime && <p>nksime is Strings from 2 to 50 characters</p>}
          </form>

          <form
            className="searchForm"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitAddress)}
          >
            <p>住所</p>
            <div className="searchFormInputBox">
              <input
                type="text"
                name="address"
                placeholder="Search.."
                ref={register({ minLength: 2, maxLength: 50 })}
              />
              <button type="submit">
                <i className="material-icons">search</i>
              </button>
            </div>
            {errors.address && (
              <p>address is Strings from 2 to 50 characters</p>
            )}
          </form>

          <form
            className="searchForm"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitNokiyk)}
          >
            <p>契約番号</p>
            <div className="searchFormInputBox">
              <input
                type="text"
                name="nokiyk"
                placeholder="Search.."
                ref={register({ minLength: 6, maxLength: 10 })}
              />
              <button type="submit" style={{ backgroundColor: "#FF9265" }}>
                <i className="material-icons">search</i>
              </button>
            </div>
            {errors.nokiyk && <p>nokiyk is Strings from 6 to 10 characters</p>}
          </form>

          <form
            className="searchForm"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitTel)}
          >
            <p>電話番号</p>
            <div className="searchFormInputBox">
              <input
                type="text"
                name="tel"
                placeholder="Search.."
                ref={register({ pattern: /^[0-9]{6,20}/ })}
              />
              <button type="submit">
                <i className="material-icons">search</i>
              </button>
            </div>
            {errors.tel && <p>tel is Numbers from 6 to 20 characters</p>}
          </form>

          <form
            className="searchForm"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitNmcstm)}
          >
            <p>顧客名</p>
            <div className="searchFormInputBox">
              <input
                type="text"
                name="nmcstm"
                placeholder="Search.."
                ref={register({ minLength: 2, maxLength: 50 })}
              />
              <button type="submit">
                <i className="material-icons">search</i>
              </button>
            </div>
            {errors.nmcstm && <p>nmcstm is Strings from 2 to 50 characters</p>}
          </form>

          <form
            className="searchForm"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitNmsime)}
          >
            <p>氏名</p>
            <div className="searchFormInputBox">
              <input
                type="text"
                name="nmsime"
                placeholder="Search.."
                ref={register({ minLength: 2, maxLength: 50 })}
              />
              <button type="submit">
                <i className="material-icons">search</i>
              </button>
            </div>
            {errors.nmsime && <p>nmsime is Strings from 2 to 50 characters</p>}
          </form>

          <form
            className="searchForm"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitMail)}
          >
            <p>Mail</p>
            <div className="searchFormInputBox">
              <input
                type="text"
                name="mail"
                placeholder="Search.."
                ref={register({ minLength: 2, maxLength: 50 })}
              />
              <button type="submit">
                <i className="material-icons">search</i>
              </button>
            </div>
            {errors.mail && <p>mail is Strings from 2 to 50 characters</p>}
          </form>

          <form
            className="searchForm"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitNosqsy)}
          >
            <p>請求書番号</p>
            <div className="searchFormInputBox">
              <input
                type="text"
                name="nosqsy"
                placeholder="Search.."
                ref={register({ minLength: 6, maxLength: 10 })}
              />
              <button type="submit" style={{ backgroundColor: "#FF9265" }}>
                <i className="material-icons">search</i>
              </button>
            </div>
            {errors.nosqsy && <p>nosqsy is Strings from 6 to 10 characters</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchForm;
