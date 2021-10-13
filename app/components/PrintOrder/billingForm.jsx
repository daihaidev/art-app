import React, { useRef, useEffect, useState } from "react";
import PaymentButton from "./paymentButton";

const FormFieldContent = {
  FIRSTNAME: {
    title: 'FIRST NAME',
    field: 'firstName',
  },
  LASTNAME: {
    title: 'LAST NAME',
    field: 'lastName',
  },
  EPOST: {
    title: 'EPOST',
    field: 'epost',
  },
  ADDRESS1: {
    title: 'ADDRESS1',
    field: 'address1',
  },
  ADDRESS2: {
    title: 'ADDRESS2',
    field: 'address2',
  },
  POSTNUMBER: {
    title: 'POSTNUMBER',
    field: 'postNumber',
  },
  STAD: {
    title: 'STAD',
    field: 'stad',
  },
  TELEFONUMER: {
    title: 'TELEFONUMER',
    field: 'telefonummer',
  },
  NOTERA: {
    title: 'NOTERA',
    field: 'notera',
  },
};

const requiredItem = {
  [FormFieldContent.FIRSTNAME.field]: true,
  [FormFieldContent.LASTNAME.field]: true,
  [FormFieldContent.ADDRESS1.field]: true,
  [FormFieldContent.POSTNUMBER.field]: true,
  [FormFieldContent.STAD.field]: true,
  [FormFieldContent.TELEFONUMER.field]: true,
  [FormFieldContent.EPOST.field]: true
};

const BillingForm = (props = {}) => {
  const {
    onChange,
    onSubmit,

    firstName,
    lastName,
    address1,
    address2,
    postNumber,
    stad,
    telefonummer,
    epost,
    notera,

    totallier,
    swishLink,
    device,
    isPaymentLoader,
    paymentUrl,
    paymentType
  } = props;

  const formRef = useRef(null);
  const [isDirty, setDirty] = useState(false);

  useEffect(() => {
    setDirty(false);
    if (formRef && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({
          behavior: 'smooth'
        });
      }, 150);
    } else {
      setTimeout(() => {
        window.scrollTo({
          top: 950,
          left: 0,
          behavior: 'smooth'
        });
      }, 150);
    }
  }, []);

  const isValidForm = () => {
    return !Object.keys(requiredItem).some(key => !props[key] || !`${props[key]}`.trim());
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isValid = isValidForm();
    console.log(">>>ASD>ASD>ASD>ASD", isValid);
    setDirty(!isValid);

    if (isValid) {
      await onSubmit();
    }
  }

  const numberValidateChange = (event) => {
    let value = event.target.value;
    const name = event.target.name;
    let numRegex = /^[0-9\b]+$/;
    if (name === FormFieldContent.POSTNUMBER.field) {
      numRegex = /^[0-9\b\s]+$/;
    }

    if (value === '' || numRegex.test(value)) {
      const target = {
        name,
        value
      };
      onChange({ target });
    }
  }

  return (
    <div ref={formRef}>
      <h2 className="mb-0 block_title">
        Leveransadress
      </h2>
      <div className="row">
        <div className="col-md-2"></div>
        <div id="collapseTwo" className="col-md-8" aria-labelledby="headingTwo">
          <div className="card-body">
            <form onSubmit={handleFormSubmit} id="swish_billing_form">
              <div className="row mt-4">

                <div className="form-group col-md-6">
                  <label>Förnamn</label>
                  <input
                    type="text"
                    name={FormFieldContent.FIRSTNAME.field}
                    value={firstName}
                    className="form-control no-border"
                    placeholder=""
                    required={isDirty && !firstName}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group col-md-6">

                  <label>Efternamn</label>
                  <input
                    type="text"
                    name={FormFieldContent.LASTNAME.field}
                    value={lastName}
                    className="form-control no-border"
                    placeholder=""
                    required={isDirty && !lastName}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group col-md-6">

                  <label>Adressrad 1</label>
                  <input
                    type="text"
                    name={FormFieldContent.ADDRESS1.field}
                    value={address1}
                    className="form-control no-border"
                    placeholder=""
                    required={isDirty && !address1}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group col-md-6">

                  <label>Adressrad 2</label>
                  <input
                    type="text"
                    name={FormFieldContent.ADDRESS2.field}
                    value={address2}
                    className="form-control no-border"
                    placeholder=""
                    onChange={onChange} />
               </div>
                <div className="form-group col-md-6">

                  <label>Postnummer</label>
                  <input
                    type="text"
                    name={FormFieldContent.POSTNUMBER.field}
                    value={postNumber}
                    className="form-control no-border"
                    placeholder=""
                    required={isDirty && !postNumber}
                    onChange={numberValidateChange}
                  />
                </div>
                <div className="form-group col-md-6">

                  <label>Stad</label>
                  <input
                    type="text"
                    name={FormFieldContent.STAD.field}
                    value={stad}
                    className="form-control no-border"
                    placeholder=""
                    required={isDirty && !stad}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group col-md-6">

                  <label>Telefonummer</label>
                  <input
                    type="text"
                    name={FormFieldContent.TELEFONUMER.field}
                    value={telefonummer}
                    className="form-control no-border"
                    placeholder=""
                    required={isDirty && !telefonummer}
                    onChange={numberValidateChange}
                  />
                </div>
                <div className="form-group col-md-6">

                  <label>E-post</label>
                  <input
                    type="email"
                    name={FormFieldContent.EPOST.field}
                    value={epost}
                    className="form-control no-border"
                    placeholder=""
                    required={isDirty && !epost}
                    onChange={onChange}
                  />
                </div>
                {/* <div className="form-group col-md-12">
                  <label>Notera</label>
                  <textarea name={FormFieldContent.NOTERA.field} value={notera} className="form-control no-border" placeholder="" onChange={onChange} />
                </div> */}
              </div>

              <PaymentButton
                totallier={totallier}
                swishLink={swishLink}
                device={device}
                isPaymentLoader={isPaymentLoader}
                paymentUrl={paymentUrl}
                buttonType="submit"
                isShow={paymentType === "swish"}
              />

            </form>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  )
}

export default BillingForm;
