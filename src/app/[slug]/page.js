'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const jsonStringify = (text) => {
    let jsonStringed = JSON.stringify(text);
    jsonStringed = jsonStringed.replace(/['"]+/g, '');
    return jsonStringed;
}

const removeHTMLTags = (text) => {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
};
const decodeUnicode = (text) => {
    return text.replace(/\\u[\dA-F]{4}/gi, 
    (match) => String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16)));
};
const cleanText = (text) => {
    let cleanedText = removeHTMLTags(text);
    cleanedText = decodeUnicode(cleanedText);
    return cleanedText;
};

const dataDragonUrl = 'https://ddragon.leagueoflegends.com/cdn/14.13.1/data/pt_BR'; 
//Linguagem de toda aplicação pode ser alterada alterando o slug deste caminho.
//Versão de toda aplicação pode ser alterada alterando o slug deste caminho.
//https://ddragon.leagueoflegends.com/cdn/{varibleLastVersion}/data/{varibleLanguage}
//https://ddragon.leagueoflegends.com/api/versions.json --> varibleLastVersion
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

const ChampionData = ({ name, title, lore, skinsData, abilityData, passiveData}) => {
    return (
        <div className='championData '>
            <h2>{name}</h2>
            <p>{title}</p>
            <p>{lore}</p>
            <Slider {...settings} className='w-[1080px] h-[637px]'>
                {skinsData.map((skin) => (
                    <div key={skin.id}>
                        <Image
                            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${skin.num}.jpg`}
                            alt={skin.name}
                            width={1080}
                            height={637}
                        />
                        <p>{skin.name}</p>
                    </div>
                ))}
            </Slider>
            <div className='flex flex-row gap-20 mt-20'>
                <div>
                    <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/passive/${jsonStringify(passiveData.image.full)}`}
                        alt={passiveData.name}
                        width={50}
                        height={50}
                    />
                    <p>{passiveData.name}</p>
                    <p>{cleanText(passiveData.description)}</p>
                </div>
                {abilityData.map((ability) => (
                    <div>
                        <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/spell/${ability.id}.png`}
                            alt={ability.name}
                            width={50}
                            height={50}
                        />
                        <p>{ability.name}</p>
                        <p>{cleanText(ability.description)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function Page({ params }) {
    const [champion, setChampion] = useState(null);

    const formatSlug = jsonStringify(params.slug)
    useEffect(() => {
        const fetchChampion = async () => {
          try {
            const response = await axios.get(`${dataDragonUrl}/champion/${formatSlug}.json`);
            setChampion(response.data.data[formatSlug]);

          } catch (error) {
            console.error('Erro ao buscar o campeão:', error);
          }
        };

        fetchChampion();
    }, [formatSlug]);

    if (!champion) {
        return <div>Loading...</div>;
    }

    return (
        <div className='champion-detail'>
            <ChampionData
                name={champion.id}
                title={champion.title}
                lore={champion.lore}
                skinsData={champion.skins}
                abilityData={champion.spells}
                passiveData={champion.passive}
            />
        </div>
    );
}