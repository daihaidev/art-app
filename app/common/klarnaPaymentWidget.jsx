import React, { useState, useEffect } from "react";
import "./klarnaStyle.scss";

// Don't change it
const klarnaId = {
    checkoutId: "my-checkout-container",
    textareaId: "KCO"
}

const KlarnaPaymentWidget = ({
    content,
    className = '',
    onClose
}) => {

    useEffect(() => {
        setTimeout(() => {
            onLoadScript();
        }, 2000)
    }, [])

    const onLoadScript = () => {
        let checkoutContainer = document.getElementById(klarnaId.checkoutId)
		checkoutContainer.innerHTML = (content).replace(/\\"/g, "\"").replace(/\\n/g, "");
		let scriptsTags = checkoutContainer.getElementsByTagName('script');
		for (let i = 0; i < scriptsTags.length; i++) {
			let parentNode = scriptsTags[i].parentNode
			let newScriptTag = document.createElement('script')
			newScriptTag.type = 'text/javascript'
			newScriptTag.text = scriptsTags[i].text
			parentNode.removeChild(scriptsTags[i])
			parentNode.appendChild(newScriptTag)
		}
    }

    const handleClose = () => {
        onClose();
    };


    return (
        <div className={`klarna_payment_widget_cc ${className}`}>
            <div className="has_loader"><h3>Loading...</h3></div>
            <div className="klarna_payment_content">
                {
                    typeof onClose === "function" &&
                    <div onClick={handleClose} className="__close"><span>x</span></div>
                }
                <div id={klarnaId.checkoutId} />
            </div>
        </div>
    );
}

export default KlarnaPaymentWidget;
