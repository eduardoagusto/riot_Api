'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const dataDragonUrl = 'https://ddragon.leagueoflegends.com/cdn/14.13.1/data/pt_BR';

const Champion = ({ name, img, title }) => {
  return (
    <div className="champion">
      <Link href={`${name}`}>
        <img src={img} alt={name}/>
      </Link>
      <h2>{name}</h2>
      {/* <p>{title}</p> */}
    </div>
  );
};

// Componente Pai
const ChampionsList = () => {
  const [champions, setChampions] = useState(0);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await axios.get(`${dataDragonUrl}/champion.json`);
        setChampions(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar os campeões:', error);
      }
    };

    fetchChampions();
  }, []);

  return (
    <div className='flex flex-wrap justify-center w-4/5'>
      <div className="champions-list flex flex-wrap justify-start min-h-screen">
        {Object.keys(champions).map(key => (
          <Champion
            key={key}
            img={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${champions[key].id}.png`}
            name={champions[key].id}
            // title={champions[key].title}
          />
        ))}
      </div>
    </div>
  );
};

export default ChampionsList;