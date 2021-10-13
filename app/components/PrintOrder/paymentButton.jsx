import React from "react";

const PaymentButton = ({
  totallier,
  swishLink,
  device,
  isPaymentLoader,
  onSubmit,
  isShow,
  buttonType = "button"
}) => {

  if (!isShow) {
    return "";
  }

  return (
    <div className="row mt-3 text-center">
      <div className="col-md-12">
        <button
          type={buttonType}
          className="btn btn-success"
          onClick={onSubmit}
          disabled={isPaymentLoader}
        >
          {
            isPaymentLoader ?
              <span>Loading...</span> :
              <span>Slutfor order pa <strong>{totallier} kr</strong></span>
          }
        </button>
        {
          swishLink && device !== "desktop" && device !== null &&
          <div style={{ marginTop: "20px" }}>
            <a href={swishLink} target="_blank">
              Open & pay with Swish
            </a>
          </div>
        }

        <p className="mt-2 text-success">Leverans 3-5 arbetsdagar</p>
      </div>
    </div>
  );
}

export default PaymentButton;
