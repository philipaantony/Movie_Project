import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserNavBar from '../usernavbar/usernavbar';
import Footer from '../../footer/footer';
import GoBackButton from "../../public/gobackButton";

function UserBookEvents() {
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const myorientation = location.state.seat_arrangement;
  const rows = location.state.rows;
  const columns = location.state.cols;
  const seatPrice = location.state.ticket_price;
  
  
  const ticket_availability = location.state.ticket_availability;
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState("");
  const [totalPrice, settotalPrice] = useState(seatPrice);
  const totalPrice2 = selectedSeats.length * seatPrice;


  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const unavailable = myorientation ? myorientation.split(",") : [];
  const myBooking = bookedSeats ? bookedSeats.split(",") : [];

  const isBooked = (seatNumber) => myBooking.includes(seatNumber);

  const handleClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats((prevSeats) =>
        prevSeats.filter((seat) => seat !== seatNumber)
      );
    } else {
      setSelectedSeats((prevSeats) => [...prevSeats, seatNumber]);
    }
  };
  

  const handleIncrease = () => {
    setTicketQuantity(ticketQuantity + 1);
    settotalPrice(seatPrice * (ticketQuantity + 1)); // Use the updated ticketQuantity
  };
  
  const handleDecrease = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity(ticketQuantity - 1);
      settotalPrice(seatPrice * (ticketQuantity - 1)); // Use the updated ticketQuantity
    }
  };
  const handlePayment = () => {
    // Add your logic for handling the payment
    console.log(`Proceed to payment for ${ticketQuantity} ticket(s).`);
  };

  return (
    <div>
     
      <UserNavBar activehome="active" />
    
      {ticket_availability === 0 ? (
        <>
          {myorientation ? (
            <>
              <div>
              <GoBackButton/>
                <center>
                  
                  <h2>Select Your Seats</h2>
                </center>
                <div
                  className="seat-grid"
                  style={{ margin: "80px", padding: "90px" }}
                >
                  {(() => {
                    const seatRow = [];
                    for (let i = 0; i < rows; i++) {
                      const seatCols = [];
                      for (let j = 1; j <= columns; j++) {
                        const seatNumber = alphabet[i] + "-" + j;
                        const seatNo = alphabet[i] + "-" + j;
                        const isSelected = selectedSeats.includes(seatNumber);
                        const isUnavailable = unavailable.includes(seatNo);
                        const isBookedSeat = isBooked(seatNumber);
                        const backgroundColor = isSelected
                          ? "#25CA00"
                          : isBookedSeat
                          ? "#e33545"
                          : "";

                        seatCols.push(
                          <div className="seat" key={seatNumber}>
                            {isUnavailable ? (
                              <div className="seat unavailable"></div>
                            ) : (
                              <div>
                                {isBookedSeat ? (
                                  <button
                                    className="btn btn-outline-dark btn-sm"
                                    style={{
                                      fontSize: "12px",
                                      backgroundColor: backgroundColor,
                                      height: "38px",
                                      width: "38px",
                                      cursor: "not-allowed",
                                    }}
                                  >
                                    {alphabet[i] + "" + j}
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-outline-dark btn-sm"
                                    style={{
                                      fontSize: "12px",
                                      backgroundColor: backgroundColor,
                                      height: "38px",
                                      width: "38px",
                                    }}
                                    onClick={() => handleClick(seatNumber)}
                                  >
                                    {alphabet[i] + "" + j}
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }
                      seatRow.push(
                        <div className="myrow" key={i}>
                          {seatCols}
                        </div>
                      );
                    }
                    return seatRow;
                  })()}
                </div>
              </div>
              <div
                className="card"
                style={{ marginLeft: "200px", marginRight: "200px" }}
              >
                <div className="card-body">
                  <div className="card mb-3"></div>

                  <h5 className="card-title">Selected Seats:</h5>
                  <div className="billing-container">
                    <div className="selected-seats">
                      {selectedSeats.map((seat, index) => (
                        <span
                          className="badge rounded-pill bg-success"
                          style={{ marginLeft: "5px" }}
                          key={index}
                        >
                          {seat}{" "}
                        </span>
                      ))}
                    </div>
                    <div className="billing-info">
                      <p>Total Price: ₹{totalPrice2}</p>
                      <p>Buy Now!</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          // Perform your action on button click
                        }}
                      >
                         Pay {totalPrice2}
                      </button>
                      <button
                        style={{ marginLeft: "20px" }}
                        className="btn btn-primary"
                        onClick={() => {
                          setSelectedSeats([]);
                        }}
                      >
                        Clear Selection
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </>
      ) : (
        <>
         



         <GoBackButton/>

         <div className="card text-center">
       
      <div className="card-body">
        <h5 className="card-title">Event Ticket Booking</h5>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <button
            className="btn btn-danger"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="quantity mx-3">{ticketQuantity}</span>
          <button
            className="btn btn-danger"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <p className="card-text">
          <strong>Total Tickets:</strong> {ticketQuantity}
          <br />
          <strong>Total Amount:</strong> {totalPrice}
        </p>
        <p className="card-text">
          By booking tickets, you agree to our{' '}
          <a href="">Privacy Policy</a>.
        </p>
        <button className="btn btn-primary" onClick={handlePayment}>
          Proceed to Payment
        </button>
      </div>
    </div>


        </>
      )}
      <Footer />
    </div>
  );
}

export default UserBookEvents;
