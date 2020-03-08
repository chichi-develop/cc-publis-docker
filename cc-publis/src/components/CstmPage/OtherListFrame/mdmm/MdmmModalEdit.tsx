import React from "react";
import { withFormik, Form, Field, InjectedFormikProps } from "formik";
import * as Yup from "yup";
import moment from "moment";
import * as actions from "../../../../store/mdmm/actions";

// import { Mdmm } from '../../redux/actions/models';

import "./MdmmModal.css";

type MdmmEditValues = {
  md_idmdmm: number;
  md_cdcstm: string;
  md_nommrb: number;
  md_nmmmbr: string;
  md_txmdmm: string;
  md_fganch: number | null;
  md_clmdmm: string | null;
  md_ccadip: string;
  md_ccmodu: string;
  createdAt: string;
  // updatedAt?: Date;
};

type MdmmEditProps = {
  md_idmdmm?: number;
  md_cdcstm?: string;
  md_nommrb?: number;
  md_nmmmbr?: string;
  md_txmdmm?: string | null;
  md_fganch?: number | null;
  md_clmdmm?: string;
  md_ccadip?: string;
  md_ccmodu?: string;
  createdAt?: string;
  // updatedAt: Date;
  mdmm: MdmmEditValues;
  mdmmEdit: typeof actions.editMdmmsStart;
  handleCloseModal: Function;
};

const MyForm: React.FC<InjectedFormikProps<MdmmEditProps, MdmmEditValues>> = ({
  touched,
  errors,
  isSubmitting
}) => (
  <div className="mdmmModal-formContainer">
    <Form className="mdmmModal-form">
      <div className="mdmmModal-form-data">
        <div>
          {/* <label htmlFor="md_cdcstm" className="mdmmModal-form-label"> md_cdcstm </label> */}
          <span className="mdmmModal-form-label">md_cdcstm</span>
          <Field
            name="md_cdcstm"
            type="text"
            placeholder="Enter
            md_cdcstm"
            autoComplete="off"
            className={errors.md_cdcstm && touched.md_cdcstm ? "error" : ""}
          />
          {touched.md_cdcstm && errors.md_cdcstm && (
            <p className="input-feedback">{errors.md_cdcstm}</p>
          )}
        </div>
        <div>
          <span className="mdmmModal-form-label">md_idmdmm</span>
          <Field
            name="md_idmdmm"
            type="text"
            placeholder="Enter md_idmdmm"
            autoComplete="off"
            className={errors.md_idmdmm && touched.md_idmdmm ? "error" : ""}
          />
          {touched.md_idmdmm && errors.md_idmdmm && (
            <p className="input-feedback">{errors.md_idmdmm}</p>
          )}
        </div>

        <div>
          <span className="mdmmModal-form-label">md_nommrb</span>
          <Field
            name="md_nommrb"
            type="text"
            placeholder="Enter md_nommrb"
            autoComplete="off"
            className={errors.md_nommrb && touched.md_nommrb ? "error" : ""}
          />
          {touched.md_nommrb && errors.md_nommrb && (
            <p className="input-feedback">{errors.md_nommrb}</p>
          )}
        </div>
        <div>
          <span className="mdmmModal-form-label">md_nmmmbr</span>
          <Field
            name="md_nmmmbr"
            type="text"
            placeholder="Enter md_nmmmbr"
            autoComplete="off"
            className={errors.md_nmmmbr && touched.md_nmmmbr ? "error" : ""}
          />
          {touched.md_nmmmbr && errors.md_nmmmbr && (
            <p className="input-feedback">{errors.md_nmmmbr}</p>
          )}
        </div>

        <div>
          <span className="mdmmModal-form-label">md_txmdmm</span>
          <Field
            name="md_txmdmm"
            component="textarea"
            rows="2"
            placeholder="Enter md_txmdmm"
            autoComplete="off"
            className={errors.md_txmdmm && touched.md_txmdmm ? "error" : ""}
          />
          {touched.md_txmdmm && errors.md_txmdmm && (
            <p className="input-feedback">{errors.md_txmdmm}</p>
          )}
        </div>
        <div>
          <span className="mdmmModal-form-label">md_fganch</span>
          <Field
            name="md_fganch"
            type="text"
            placeholder="Enter md_fganch"
            autoComplete="off"
            className={errors.md_fganch && touched.md_fganch ? "error" : ""}
          />
          {touched.md_fganch && errors.md_fganch && (
            <p className="input-feedback">{errors.md_fganch}</p>
          )}
        </div>
        <div>
          <span className="mdmmModal-form-label">md_clmdmm</span>
          <Field
            name="md_clmdmm"
            type="text"
            placeholder="Enter md_clmdmm"
            autoComplete="off"
            className={errors.md_clmdmm && touched.md_clmdmm ? "error" : ""}
          />
          {touched.md_clmdmm && errors.md_clmdmm && (
            <p className="input-feedback">{errors.md_clmdmm}</p>
          )}
        </div>
        <div>
          <span className="mdmmModal-form-label">md_ccadip</span>
          <Field
            name="md_ccadip"
            type="text"
            placeholder="Enter md_ccadip"
            autoComplete="off"
            className={errors.md_ccadip && touched.md_ccadip ? "error" : ""}
          />
          {touched.md_ccadip && errors.md_ccadip && (
            <p className="input-feedback">{errors.md_ccadip}</p>
          )}
        </div>
        <div>
          <span className="mdmmModal-form-label">md_ccmodu</span>
          <Field
            name="md_ccmodu"
            type="text"
            placeholder="Enter md_ccmodu"
            autoComplete="off"
            className={errors.md_ccmodu && touched.md_ccmodu ? "error" : ""}
          />
          {touched.md_ccmodu && errors.md_ccmodu && (
            <p className="input-feedback">{errors.md_ccmodu}</p>
          )}
        </div>
      </div>
      <div className="mdmmModal-form-footer">
        <div className="mdmmModal-form-submit">
          {/* <input className="mdmmModal-form-submitButton" type="submit" disabled={isSubmitting} value="登録する" /> */}
          <button
            className="mdmmModal-form-submitButton"
            type="submit"
            disabled={isSubmitting}
          >
            更新する
          </button>
        </div>
      </div>
    </Form>
  </div>
);
// )

const MdmmEdit = withFormik<MdmmEditProps, MdmmEditValues>({
  // mapPropsToValues: () => ({ email: '', password: '', newsletter: true }),

  mapPropsToValues: ({
    mdmm,
    mdmmEdit,
    handleCloseModal,

    md_idmdmm,
    md_cdcstm,
    md_nommrb,
    md_nmmmbr,
    md_txmdmm,
    md_fganch,
    md_clmdmm,
    md_ccadip,
    md_ccmodu,
    createdAt
  }) => ({
    md_idmdmm: md_idmdmm || mdmm.md_idmdmm,
    md_cdcstm: md_cdcstm || mdmm.md_cdcstm,
    md_nommrb: md_nommrb || mdmm.md_nommrb,
    md_nmmmbr: md_nmmmbr || mdmm.md_nmmmbr,
    md_txmdmm: md_txmdmm || mdmm.md_txmdmm,
    md_fganch: md_fganch || mdmm.md_fganch,
    md_clmdmm: md_clmdmm || mdmm.md_clmdmm,
    md_ccadip: md_ccadip || mdmm.md_ccadip,
    md_ccmodu: md_ccmodu || mdmm.md_ccmodu,
    createdAt: createdAt || mdmm.createdAt,
    mdmmEdit,
    handleCloseModal
  }),

  validationSchema: Yup.object().shape({
    md_idmdmm: Yup.number().required("Enter a md_idmdmm"),
    md_cdcstm: Yup.string()
      // .matches(/^[0-9]{8}/,('md_cdcstm is 8-digit number'))
      // .matches(/^2[0-9]{7}/, "8-digit number starting from 2 [2XXXXXXX]")
      .length(8, "md_cdcstm is 8 characters")
      .required("Enter a md_cdcstm"),
    md_nommrb: Yup.string().required("Enter a md_nmmmbr"),
    md_nmmmbr: Yup.string().required("Enter a md_nmmmbr"),
    md_txmdmm: Yup.string().required("Enter a md_txmdmm"),
    md_fganch: Yup.string().required("Enter a md_fganch"),
    md_clmdmm: Yup.string().required("Enter a md_clmdmm"),
    md_ccadip: Yup.string().required("Enter a md_ccadip"),
    md_ccmodu: Yup.string().required("Enter a md_ccmodu")
  }),
  // handleSubmit: (values, { props, setSubmitting, resetForm, setErrors }) => {
  handleSubmit: (values, { props, setSubmitting }) => {
    setTimeout(async () => {
      await props.mdmmEdit(values.md_cdcstm, values.md_nommrb, {
        md_idmdmm: values.md_idmdmm,
        md_cdcstm: values.md_cdcstm,
        md_nommrb: values.md_nommrb,
        md_nmmmbr: values.md_nmmmbr,
        md_txmdmm: values.md_txmdmm,
        md_fganch: values.md_fganch,
        md_clmdmm: values.md_clmdmm,
        md_ccadip: values.md_ccadip,
        md_ccmodu: values.md_ccmodu,
        createdAt: moment(props.createdAt).format("YYYY-MM-DD"),
        updatedAt: moment().format("YYYY-MM-DD")
      });
      // alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      props.handleCloseModal();
    }, 1000);
  },

  displayName: "BasicForm" // helps with React DevTools
})(MyForm);

export default MdmmEdit;
