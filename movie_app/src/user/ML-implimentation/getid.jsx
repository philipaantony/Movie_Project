import UserNavBar from '../usernavbar/usernavbar';
import Footer from '../../footer/footer';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { TMBDAPI } from "../../config/config";

function GetId() {
    const [movies, setMovies] = useState([]);
    const [movienames, setMovieNames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                if (movienames.length === 0) return; // No need to fetch if no movie names are available
                const moviePromises = movienames.map(async (name) => {
                    //console.log(name,"---")
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(name)}&language=en-US&page=1&include_adult=false`,
                        {
                            headers: {
                                accept: "application/json",
                                Authorization: TMBDAPI, 
                            },
                        }
                    );
                    return response.data.results;
                });
                const movieResults = await Promise.all(moviePromises);
                console.log(movieResults.filter(movie => movie !== null))
                setMovies(movieResults.filter(movie => movie !== null));
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchMovies();
    }, [movienames]);

    const handleClick = async () => {
        try {
            if (!searchTerm) return; // Prevent empty search
            const response = await axios.post('http://127.0.0.1:8000/recommend_movies/', { movie_input: searchTerm });
            setMovieNames(response.data.recommended_movies);
            //console.log(response.data.recommended_movies)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <UserNavBar/>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" value={searchTerm} onChange={handleChange} placeholder="Enter search term" />
                            <button className="btn btn-primary" onClick={handleClick}>Search</button>
                        </div>
                    </div>
                </div>


                
                <div className="container">
    <div className="row row-cols-1 row-cols-md-6 g-4">
        {movies.map((movieArray, arrayIndex) => (
            movieArray.slice(0, 1).map((movie, index) => (
                <div key={arrayIndex * 6 + index} className="col">


                 <div className="card mb-3">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://image.tmdb.org/t/p/w500/k3AjjlEH1Rb9YhmTTaHe9lNfECF.jpg";
                                    }}
                                    className="card-img-top"
                                    alt={movie.original_title}
                                    style={{ height: "300px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{movie.title}</h5>
                                </div>
                            </div>

                </div>
            ))
        ))}
    </div>
</div>

            
      


            </div>

            

            <Footer/>
        </div>
    );
    
                                            }    


export default GetId;
