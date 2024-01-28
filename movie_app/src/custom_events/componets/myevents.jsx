import React from "react";
import { baseUrl } from "../../config/config";
import GoBackButton from "../../public/gobackButton";

function AdminViewPostedMovies() {
  const events = [
    {
      eventName: 'Event 1',
      description: 'Description for Event 1',
      location: 'Location 1',
      capacity: 100,
      type: 'Type 1',
      time: '10:00 AM',
      date: '2024-01-25',
      status: 'Active',
      hostedBy: 'Host 1',
      posterImg: "assets/images/customevents/b1.png",
      _id: '1',
    },
    {
        eventName: 'Event 1',
        description: 'Description for Event 1',
        location: 'Location 1',
        capacity: 100,
        type: 'Type 1',
        time: '10:00 AM',
        date: '2024-01-25',
        status: 'Active',
        hostedBy: 'Host 1',
        posterImg: "assets/images/customevents/b2.png",
        _id: '1',
      },
    // Add more events as needed
  ];

  return (
    <div id="main">
      <div className="container mt-5">
        <h2>My Events</h2>
        <GoBackButton />
        {events.map((event, index) => {
          // Format the Release Date to show in MM/DD/YYYY format
          const releaseDate = new Date(event.date).toLocaleDateString();

          return (
            <div className="card mb-3" key={index}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={event.posterImg}
                    alt={event.eventName}
                    style={{
                        height:"290px",
                      maxWidth: "200px",
                      margin: "30px",
                      borderRadius: "10px",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.14)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h2 className="card-title">{event.eventName}</h2>
                    <div className="row">
                      <div className="col">
                        <p className="card-text">
                          <strong>Type:</strong> {event.type}
                        </p>
                        <p className="card-text">
                          <strong>Duration:</strong> {event.duration} Hr
                        </p>
                        <p className="card-text">
                          <strong>Status:</strong> {event.status}
                        </p>
                      </div>
                      <div className="col">
                        <p className="card-text">
                          <strong>Date:</strong> {releaseDate}
                        </p>
                        <p className="card-text">
                          <strong>Time:</strong> {event.time}
                        </p>
                      </div>
                    </div>
                    <p className="card-text">
                      <strong>Description:</strong> {event.description}
                    </p>
                    <p className="card-text">
                      <strong>Location:</strong> {event.location}
                    </p>
                    <p className="card-text">
                      <strong>Hosted By:</strong> {event.hostedBy}
                    </p>

                    <div className="row">
                      <div className="col align-self-start">
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{ marginRight: "20px" }}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminViewPostedMovies;
