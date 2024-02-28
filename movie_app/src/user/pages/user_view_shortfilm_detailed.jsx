import React from 'react';
import Footer from '../../footer/footer';
import UserNavBar from '../usernavbar/usernavbar';
import { useLocation } from 'react-router-dom';

function UserMyFilm() {
    const location = useLocation();
    console.log(location.state.movie.director);
    const movieData = location.state ? location.state.movie : null;

    if (!movieData) {
        // Handle case when movieData is not available
        return (
            <div>
                <UserNavBar />
                <p>No movie data available.</p>
                <Footer />
            </div>
        );
    }

    return (
        <>
            <UserNavBar />
            <div className="container mt-5">
                <h2>{movieData.shortfilm_title}</h2>
                <p>Genre: {movieData.genre}</p>
                <p>Director: {movieData.director}</p>
                <p>Duration: {movieData.duration}</p>
                <p>Language: {movieData.language}</p>
                <p>Description: {movieData.description}</p>
                <p>Release Date: {new Date(movieData.release_date).toLocaleDateString()}</p>
                {/* Add more details as needed */}
               
            </div>
            <Footer />
        </>
    );
}

export default UserMyFilm;
