/* eslint-disable css-modules/no-unused-class */
import React, { useState } from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';

const TypeaheadFeild = ({
  label,
  errors,
  touched,
  name,
  id,
  defaultVal,
  list,
  errorIcon,
  val,
  setFieldValue,
  setFieldTouched,
}) => {
  const [multiple] = useState(false);
  const [selected, setSelected] = useState(
    list.filter(l => l.id === defaultVal),
  );

  // eslint-disable-next-line no-shadow
  const changeHandler = selected => {
    setSelected(selected);
    setFieldValue(selected);
  };
  return <h1>formik feild and error message</h1>;
};

TypeaheadFeild.defaultProps = {
  errors: {},
  touched: false,
  id: '',
  defaultVal: '',
  list: [],
  errorIcon: '',
  val: '',
};

TypeaheadFeild.propTypes = {
  label: PropTypes.string.isRequired,
  errors: PropTypes.any,
  touched: PropTypes.any,
  name: PropTypes.string.isRequired,
  id: PropTypes.any,
  defaultVal: PropTypes.any,
  list: PropTypes.arrayOf(PropTypes.any),
  errorIcon: PropTypes.any,
  val: PropTypes.any,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

TypeaheadFeild.defaultProps = {};

const InputField = ({
  label,
  type,
  errors,
  touched,
  name,
  placeholder,
  readOnly,
}) => (
  <>
    <h1>formik Field and error html</h1>
    {/* <div
      className={`${commonStyle['form-group']} form-group ${errors[name] &&
        touched[name] &&
        commonStyle.required}`}
    >
      <label htmlFor="email">{label}</label>
      <Field
        type={type}
        className={`${commonStyle['form-control']} form-control`}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
      />

      <div className={`${commonStyle['form-error']}`}>
        <small className="text-danger">{errors[name]}</small>
      </div>
    </div> */}
  </>
);
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  errors: PropTypes.any,
  touched: PropTypes.any,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
};

InputField.defaultProps = {
  type: 'text',
  placeholder: '',
  readOnly: false,
  errors: {},
  touched: false,
};

const CheckBoxInput = ({ label, type, name }) => (
  <h1>formik field and html error</h1>
  //   <div
  //     className={`${commonStyle['form-group']} ${
  //       commonStyle['form-check']
  //     } form-group form-check`}
  //   >
  //     <Field type={type} className="form-check-input" name={name} />
  //     <label className="form-check-label" htmlFor={name}>
  //       {label}
  //     </label>
  //   </div>
);
CheckBoxInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
};

CheckBoxInput.defaultProps = {
  type: 'checkbox',
};
const SelectField = ({
  label,
  errors,
  touched,
  name,
  id,
  defaultVal,
  list,
  allowOptionNull,
  errorIcon,
  val,
}) => (
  <>
    <div className="main-content-form-headers">
      <span>{label}</span>
    </div>
    <div
      style={{ position: 'relative', width: '100%' }}
      className={`frg-select-container color-light input-container ${
        errors[name] && touched[name] ? 'error' : ''
      }`}
    >
      <Field
        as="select"
        id={id}
        name={name}
        className="select-style"
        defaultValue={defaultVal}
      >
        ${allowOptionNull && <option value={null} />}
        {list.map(l => (
          <option key={l.id} value={l.id}>
            {l[val]}
          </option>
        ))}
      </Field>
      <>
        <div className="error_messages">
          <span className="frg-body-font-14px">{errors[name]}</span>
        </div>
        <div id="username_error_icon" className="error_messages_icon">
          <img src={errorIcon} alt="error_icon" />
        </div>
      </>
    </div>
  </>
);
SelectField.defaultProps = {
  errors: {},
  touched: false,
  id: '',
  defaultVal: '',
  errorIcon: '',
};
SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  errors: PropTypes.any,
  touched: PropTypes.any,
  name: PropTypes.string.isRequired,
  id: PropTypes.any,
  defaultVal: PropTypes.any,
  errorIcon: PropTypes.any,
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  allowOptionNull: PropTypes.bool,
  val: PropTypes.string.isRequired,
};

SelectField.defaultProps = {
  allowOptionNull: true,
};

const CustomFeild = ({
  feild,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
}) => {
  if (feild.type === 'select')
    return (
      <SelectField
        label={feild.label}
        errors={errors}
        touched={touched}
        name={feild.name}
        id={feild.id}
        defaultVal={feild.defaultVal}
        list={feild.list}
        allowOptionNull={feild.allowOptionNull}
        val={feild.val}
      />
    );
  if (feild.type === 'checkbox')
    return (
      <CheckBoxInput
        label={feild.label}
        errors={errors}
        touched={touched}
        name={feild.name}
        readOnly={feild.readOnly}
        type={feild.type}
      />
    );
  if (feild.type === 'typeahead')
    return (
      <TypeaheadFeild
        label={feild.label}
        errors={errors}
        touched={touched}
        name={feild.name}
        id={feild.id}
        defaultVal={feild.defaultVal}
        list={feild.list}
        val={feild.val}
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
      />
    );
  return (
    <InputField
      label={feild.label}
      errors={errors}
      touched={touched}
      name={feild.name}
      placeholder={feild.placeholder}
      readOnly={feild.readOnly}
      type={feild.type}
    />
  );
};

CustomFeild.defaultProps = {
  errors: {},
  touched: false,
};

CustomFeild.propTypes = {
  feild: PropTypes.objectOf(
    PropTypes.oneOfType[(PropTypes.string, PropTypes.number, PropTypes.any)],
  ).isRequired,
  errors: PropTypes.object,
  touched: PropTypes.bool,

  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};
export default CustomFeild;
