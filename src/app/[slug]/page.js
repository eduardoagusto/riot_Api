'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image'

let skinNumber = 0

const dataDragonUrl = 'https://ddragon.leagueoflegends.com/cdn/14.13.1/data/pt_BR';

const ChampionData = ({ name, title, lore, splashImage}) => {
    return (
        <div className='championData'>
            <h2 style={{ color: 'white' }}>{name}</h2>
            <p>{title}</p>
            <p>{lore}</p>
            <Image
              src={splashImage}
              alt={`${name} splash art`}
              width={1215}  // Largura da imagem original
              height={717}  // Altura da imagem original
            />
        </div>
    )
}

export default function Page({ params }) {
    const [champion, setChampion] = useState(null);
    const [splashImage, setSplashImage] = useState(null);
    const stringSlug = JSON.stringify(params.slug)
    const formatSlug = stringSlug.replace(/['"]+/g, '')

    useEffect(() => {
        const fetchChampion = async () => {
          try {
            const response = await axios.get(`${dataDragonUrl}/champion/${formatSlug}.json`);
            setChampion(response.data.data[formatSlug]);
            const splashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${formatSlug}_1.jpg`;
            setSplashImage(splashUrl);
          } catch (error) {
            console.error('Erro ao buscar o campeão:', error);
          }
        };

        fetchChampion();
    }, [formatSlug]); // Use formatSlug como dependência para fazer a requisição correta ao recarregar a página

    if (!champion) {
        return <div>Loading...</div>;
    }

    return (
        <div className='champion-detail'>
            <ChampionData
                name={champion.id}
                title={champion.title}
                splashImage={splashImage}
            />
        </div>
    );
}