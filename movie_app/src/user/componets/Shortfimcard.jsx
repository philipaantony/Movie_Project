import React from 'react';
import { Link } from 'react-router-dom';


function ShortFilmCard() {
 return (
    <div className="container-fluid"> {/* Use a container-fluid for full width */}

      <div className="row"> {/* Bootstrap row for the cards */}
        <div className="col-md-6"> {/* Bootstrap column, half width on medium and up */}
        <Link to="/my-films">
          <div className="card111" style={{ backgroundImage: `url('assets/cardbackground/a3.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="card__overlay"></div>
            <div className="card__content">
              <span className="card__title">The Force Awakens</span>
              <span className="card__description">Han Solo and his young allies face a new threat from the evil First Order.</span>
              <button className="card__btn">Play Movie</button>
            </div>
            <span className="card__number">New</span>
          </div>
          </Link>
        </div>
       

        <div className="col-md-6"> {/* Bootstrap column, half width on medium and up */}
        <Link to="/my-films">
          <div className="card111" style={{ backgroundImage: `url('assets/cardbackground/a2.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="card__overlay"></div>
            <div className="card__content">
              <span className="card__title">The Force Awakens</span>
              <span className="card__description">Han Solo and his young allies face a new threat from the evil First Order.</span>
              <button className="card__btn">Play Movie</button>
            </div>
            <span className="card__number">01</span>
          </div>
          </Link>
        </div>


        
      </div>
    </div>
 );
}

export default ShortFilmCard;
