'use client';

import { useEffect, useState } from 'react';
import './index.scss'
import axios from 'axios';
import SerieCard from '../SerieCard';
import { Serie } from '@/types';
import ReactLoading from 'react-loading';

export default function SerieList() {
    const [series, setSeries] = useState<Serie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getSeries();
    }, []);

    const getSeries = async () => {
        await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/tv?&page=1',
            params: {
                api_key: process.env.NEXT_PUBLIC_API_KEY,
                language: 'pt-BR'
            }
        }).then(response => {
            setSeries(response.data.results)
            console.log(response.data.results)
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
        <ul className="serie-list">
            {series.map((serie) => 
                <SerieCard 
                    key={serie.id}
                    serie={serie}
                />
            )}
        </ul>
    );
}