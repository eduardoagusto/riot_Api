'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const dataDragonUrl = 'https://ddragon.leagueoflegends.com/cdn/14.13.1/data/pt_BR';

const Champion = ({ name, img, title }) => {
  return (
    <div className="champion">
      <h2>{name}</h2>
      <img src={img} alt={name} />
      <p>{title}</p>
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
    <div className="champions-list">
      {Object.keys(champions).map(key => (
        <Champion
          key={key}
          name={champions[key].id}
          img={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${champions[key].id}.png`}
          title={champions[key].title}
        />
      ))}
    </div>
  );
};

export default ChampionsList;