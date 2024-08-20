import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import paymentAnimationData from "./creditcard.json";
import "./PaymentPage.css";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dataId, repaymentAmount, username } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState(username || "");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    const formattedValue = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formattedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      navigate("/receipt", {
        state: { dataId, cardHolderName, repaymentAmount },
      });
    }, 1500);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: paymentAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="payment-container">
      {paymentSuccess ? (
        <div className="lottie-container1">
          <div>
            <Lottie options={defaultOptions} height={700} width={700} />
          </div>
        </div>
      ) : (
        <>
          <div className="lottie-container2">
            <Lottie options={defaultOptions} height={700} width={600} />
          </div>
          <div className="credit-card-container">
            <div className="credit-card">
              <div className="card-front">
                <div className="card-logo">VISA</div>
                <div className="card-number">{cardNumber}</div>
                <div className="card-holder">
                  <label>Card Holder</label>
                  <div className="hold-name">{cardHolderName}</div>
                </div>
                <div className="card-expiry">
                  <label>Expires</label>
                  <div>{expiryDate}</div>
                </div>
              </div>
            </div>
            <form className="credit-card-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleChange}
                  placeholder="Ex: 1234 5678 9012 3456"
                  maxLength={19}
                  className="card-text-area"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cardHolder">Card Holder Name</label>
                <input
                  type="text"
                  id="cardHolder"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                  placeholder="Card Holder Name"
                  className="card-text-area"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="month"
                  id="expiryDate"
                  placeholder="MM/YY"
                  className="card-text-area"
                  required
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="password"
                  id="cvv"
                  placeholder="123"
                  maxLength={3}
                  className="card-text-area"
                  required
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  className="card-text-area"
                  value={repaymentAmount}
                  readOnly
                />
              </div>
              <button type="submit" className="pay-btn">
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;
