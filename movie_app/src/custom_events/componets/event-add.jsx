import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function AddNewEvent() {
    const [file, setFile] = useState(null);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const onSubmit = (data) => {
      const formData = new FormData();
  
      formData.append("event_name", data.event_name);
      formData.append("event_type", data.event_type);
      formData.append("location", data.location);
      formData.append("event_date", data.event_date);
      formData.append("ticket_price", data.ticket_price);
      formData.append("ticket_availability", data.ticket_availability);
      formData.append("organizer", data.organizer);
      formData.append("description", data.description);
  
      if (file) {
        formData.append("poster_url", file);
      }
      
      if (!formData.get("poster_url")) {
        alert("Poster URL is required");
        return; // Stop execution if poster_url is empty
      }
      else{
        for (var pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }
      }
  
    //   axios
    //     .post("http://localhost:5000/api/addevents", formData) // Update endpoint
    //     .then((response) => {
    //       console.log("Success:", response);
    //       alert(response.data.message);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //       alert("Error");
    //     });
    };
  
    //console.log(errors);
  
    const validationRules = {
      event_name: {
        required: "Event name is required",
        minLength: {
          value: 3,
          message: "Event name must have at least 3 characters",
        },
      },
      event_type: {
        required: "Event type is required",
      },
      location: {
        required: "Location is required",
      },
      event_date: {
        required: "Event date is required",
      },
      ticket_price: {
        required: "Ticket price is required",
      },
      ticket_availability: {
        required: "Ticket availability is required",
      },
      organizer: {
        required: "Organizer is required",
      },
      description: {
        required: "Description is required",
      },
      poster_url: {
        required: "**Poster URL is required",
      },
    };


  return (
    <div style={{ backgroundColor: "#f2f7ff" }}>
    <div id="main">
      <header className="mb-3">
        <p className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3"></i>
        </p>
      </header>
      <div className="page-heading">
        <div>
          <h3>Host New Event</h3>
        </div>
      </div>
      <div className="page-content">
        <section id="basic-horizontal-layouts">
          <div className="row match-height">
            <div className="col-md-6 col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-eventname">
                    Add new Event using below form
                  </h4>
                </div>
                <div className="card-content">
                  <div className="card-body">
                    <form
                      className="form form-horizontal"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="form-body">
                        <div className="row">
                          <div className="col-md-4">
                            <label>Event Name</label>
                          </div>
                          <div className="col-md-8 form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="event_name"
                              {...register("event_name", validationRules.event_name)}
                              placeholder="Event Name"
                            />
                            <p className="text-danger">
                              {errors?.event_name && errors.event_name.message}
                            </p>
                          </div>

                          <div className="col-md-4">
                            <label>Event Type</label>
                          </div>
                          <div className="col-md-8 form-group">
                            <select
                              className="btn  dropdown-toggle dropdown-toggle-split"
                              name="event_type"
                              defaultValue=""
                              {...register("event_type", validationRules.event_type)}
                            >
                              <option value="">Select Event Type</option>
                              <option value="music">Music Show</option>
                              <option value="dance">Dance Show</option>
                              <option value="promotion">Promotion Event</option>
                              {/* Add more event types here */}
                            </select>
                            <p className="text-danger">
                              {errors?.event_type && errors.event_type.message}
                            </p>
                          </div>

                          <div className="col-md-4">
                            <label>Event Date</label>
                          </div>
                          <div className="col-md-8 form-group">
                            <input
                              type="datetime-local"
                              className="form-control"
                              name="event_date"
                              {...register("event_date", validationRules.event_date)}
                            />
                            <p className="text-danger">
                              {errors?.event_date && errors.event_date.message}
                            </p>
                          </div>

                          <div className="col-md-4">
                            <label>Location</label>
                          </div>
                          <div className="col-md-8 form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="location"
                              {...register("location", validationRules.location)}
                              placeholder="Event Location"
                            />
                            <p className="text-danger">
                              {errors?.location && errors.location.message}
                            </p>
                          </div>

                          <div className="col-md-4">
                            <label>Ticket Price</label>
                          </div>
                          <div className="col-md-8 form-group">
                            <input
                              type="number"
                              className="form-control"
                              name="ticket_price"
                              {...register("ticket_price", validationRules.ticket_price)}
                              placeholder="Ticket Price"
                            />
                            <p className="text-danger">
                              {errors?.ticket_price && errors.ticket_price.message}
                            </p>
                          </div>


                          <div className="col-md-4">
                            <label>Ticket Count</label>
                          </div>
                          <div className="col-md-8 form-group">
                            <input
                              type="number"
                              className="form-control"
                              name="ticket_availability"
                              {...register("ticket_availability", validationRules.ticket_availability)}
                              placeholder="ticket_availability"
                            />
                            <p className="text-danger">
                              {errors?.ticket_availability && errors.ticket_availability.message}
                            </p>
                          </div>

                          <div className="col-md-4">
                            <label>organizer</label>
                          </div>
                          <div className="col-md-8 form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="organizer"
                              {...register("organizer", validationRules.organizer)}
                              placeholder="organizer"
                            />
                            <p className="text-danger">
                              {errors?.organizer && errors.organizer.message}
                            </p>
                          </div>


                          <div className="col-md-4">
  <label>Description</label>
</div>
<div className="col-md-8 form-group">
  <textarea
    className="form-control"
    name="description"
    {...register("description", validationRules.description)}
    placeholder="Event description"
  ></textarea>
  <p className="text-danger">
    {errors?.description && errors.description.message}
  </p>
</div>








<div className="col-md-4">
                              <label>Poster URL</label>
                            </div>
                            <div className="col-md-8 form-group">
                              <input
                                type="file"
                                className="form-control"
                                name="poster_url"
                                onChange={(e) => setFile(e.target.files[0])}
                              />
                              <p className="text-danger">
                                {errors?.poster_url &&
                                  errors.poster_url.message}
                              </p>
                            </div>

                          {/* Include the rest of your form inputs similarly */}
                          
                          <div className="col-sm-12 d-flex justify-content-end">
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mb-1"
                            >
                              Submit
                            </button>
                            <button
                              type="reset"
                              className="btn btn-light-secondary me-1 mb-1"
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  );
}

export default AddNewEvent;
