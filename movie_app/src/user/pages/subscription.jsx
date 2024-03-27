import React from "react";
import Footer from "../../footer/footer";
import UserNavBar from "../usernavbar/usernavbar";
import axios from "axios";

function Subscription() {

  const userId = localStorage.getItem("userId");


  async function displayRazorpay(totalPrice) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axios.post("http://localhost:5000/payment/orders", {
      totalPrice,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_vwFYRANZsk49Qu", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Movie Verse.",
      description: "Test Transaction",
      image: {},
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:5000/payment/success",
          data
        );
        if (result.data.msg === "success") {
          alert("Payment done successfully!. Your Subscription is processing");
        }
        const orderId = result.data.orderId;
        const paymentId = result.data.paymentId;
        if (result.data.msg === "success") {
          PurchasePlan(orderId, paymentId, amount.toString());
        }
      },
      prefill: {
        name: "Movie Verse",
        email: "movieverse@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Movie verse Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const PurchasePlan = (orderId, paymentId, amount) => {
    console.log("my data to be passed...")
    console.log(orderId);
    console.log(paymentId);
    console.log(amount);
    
  }


  return (
    <div>
      <UserNavBar />
      <section className="section">
        <br />
        <br />
        <center>
          <h4 className="card-title">Choose Your Movie Subscription Plan</h4>
        </center>

        <div className="col-12 col-md-8 offset-md-2">
          <div className="pricing">
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="card">
                  <Basic />
                  <div className="card-footer">
                    <button className="btn btn-success btn-block">
                      {" "}
                      <i className="bi bi-check-circle" /> Current Plan
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card card-highlighted">
                  <Standard />
                  <div className="card-footer">
                    <button 
                    onClick={() => displayRazorpay('499')}
                    className="btn btn-outline-white btn-block">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <Premium />
                  <div className="card-footer">
                    <button 
                      onClick={() => displayRazorpay('999')}
                    className="btn btn-primary btn-block">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />

      <Footer />
    </div>
  );
}

export default Subscription;



















function Basic() {
  return (
    <>
      <div className="card-header text-center">
        <h4 className="card-title">Basic</h4>
        <p className="text-center">Access to limited movies</p>
      </div>
      <h1 className="price">Free</h1>
      <ul>
        <li>
          <i className="bi bi-check-circle" />
          Access to 10 movies per month
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Limited movie genres
        </li>
        <li>
          <i className="bi bi-check-circle" />
          No HD streaming
        </li>
      </ul>
    </>
  );
}

function Premium() {
  return (
    <>
      <div className="card-header text-center">
        <h4 className="card-title">Premium</h4>
        <p className="text-center">Exclusive access and features</p>
      </div>

      <h1 className="price">₹999</h1>
      <ul>
        <li>
          <i className="bi bi-check-circle" />1 Year Plan
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Access to unlimited movies
        </li>
        <li>
          <i className="bi bi-check-circle" />
          All movie genres available
        </li>
        <li>
          <i className="bi bi-check-circle" />
          4K UHD streaming available
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Early access to new releases
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Offline viewing option
        </li>
      </ul>
    </>
  );
}

function Standard() {
  return (
    <>
      <div className="card-header text-center">
        <h4 className="card-title">Standard</h4>
        <p />
      </div>
      <h1 className="price text-white">₹499</h1>
      <ul>
        <li>
          <i className="bi bi-check-circle" />1 Year Plan
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Access to unlimited movies
        </li>
        <li>
          <i className="bi bi-check-circle" />
          Expanded movie genres
        </li>
        <li>
          <i className="bi bi-check-circle" />
          HD streaming available
        </li>
      </ul>
    </>
  );
}
