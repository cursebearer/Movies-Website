'use client';

import { useEffect, useState } from 'react';
import './index.scss'
import axios from 'axios';
import MovieCard from '../MovieCard';
import { Movie } from '@/types';
import ReactLoading from 'react-loading';

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
        await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: process.env.NEXT_PUBLIC_API_KEY,
                language: 'pt-BR'
            }
        }).then(response => {
            setMovies(response.data.results)
            //console.log(response.data.results)
        });

        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <div className="loading-container">
                <ReactLoading type="spin" color="#6646ff" height={'5%'} width={'5%'} />
            </div>
        )
    }

    return (
        <ul className="movie-list">
            {movies.map((movie) => 
                <MovieCard 
                    key={movie.id}
                    movie={movie}
                />
            )}
        </ul>
    );
}