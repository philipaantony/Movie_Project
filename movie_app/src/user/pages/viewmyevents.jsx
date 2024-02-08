import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import UserNavBar from "../usernavbar/usernavbar";
import Footer from "../../footer/footer";
import GoBackButton from "../../public/gobackButton";

function ViewMyEvents() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract event details from location.state
  const {
    event_id,
    event_name,
    event_type,
    eventlocation,
    event_date,
    event_time,
    ticket_price,
    organizer,
    description,
    ticket_availability,
    seat_arrangement,
    poster_url,
    status,
    rows,
    cols,
  } = location.state || {};

  // Format date to DDMMYYYY
  const formattedDate =
    event_date &&
    new Date(event_date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <div>
      <UserNavBar activehome="active" />

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            {/* Display event details in a card */}
            <div className="card">
            <GoBackButton/>
              <div className="card-body">
                <h5 className="card-title">{event_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{event_type}</h6>
                <p className="card-text">
                  <strong>
                    <i class="bi bi-geo-alt-fill"></i>
                  </strong>{" "}
                  {eventlocation} <i className="fas fa-map-marker-alt"></i>
                  <br />
                  <strong>
                    <i class="bi bi-calendar-date"></i>
                  </strong>{" "}
                  {formattedDate} <i className="far fa-calendar-alt"></i>
                  <br />
                  <strong>
                    <i class="bi bi-clock-history"></i>
                  </strong>{" "}
                  {event_time} <i className="far fa-clock"></i>
                  <br />
                  <strong>Ticket Price:</strong> {ticket_price}{" "}
                  <i className="fas fa-dollar-sign"></i>
                  <br />
                  {/* Add other details as needed */}
                </p>
                <p className="mt-3">
                  <strong>Description:</strong> {description}
                </p>
                <p className="mt-3">
                  <strong>Organizer:</strong> {organizer}
                </p>

                {seat_arrangement === "no" ? (
                  <button className="btn btn-danger mt-3"
                  
                  onClick={() => {
                    const data = {
                      event_id,
                      ticket_availability,
                      ticket_price,
                    };
                    navigate("/book-event", { state: data });
                  }}
                  >
                    Book My Event
                  </button>
                ) : (
                  <button
                    className="btn btn-danger mt-3"
                    onClick={() => {
                      const data = {
                        event_id,
                        ticket_availability,
                        ticket_price,
                        rows,
                        cols,
                        seat_arrangement,
                      };
                      navigate("/book-event", { state: data });
                    }}
                  >
                    Book Tickets
                  </button>
                )}

                <p className="mt-3">
                  <strong>Privacy Note:</strong> Your information is secure and
                  will not be shared with third parties.
                </p>
                <p>
                  <strong>Terms and Conditions:</strong> Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Nulla consequat eros et
                  justo rhoncus.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            {poster_url && (
              <img
                src={`http://localhost:5000/event_poster/${poster_url}`}
                alt={event_name}
                className="img-fluid rounded"
                style={{ height: "400px" }} // Set the maximum height as per your requirement
              />
            )}
          </div>
        </div>
      </div>
      <br />

      <Footer />
    </div>
  );
}

export default ViewMyEvents;
