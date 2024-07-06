import React from 'react';
// import { useRouter } from 'next/router';
import axios from 'axios';
// import { useEffect, useState } from 'react';

export default function Page({params}){
  return (
    <div>My slug is: {params.slug}</div>
  )
}
// const dataDragonUrl = 'https://ddragon.leagueoflegends.com/cdn/14.13.1/data/pt_BR';

// const ChampionData = ({name, title}) => {
//     return (
//         <div className='championData'>
//             <h2>{name}</h2>
//             <p>{title}</p>
//         </div>

//     )
// }

// const ChampionDetail = () => {
//     const router = useRouter();
//     const { slug } = router.query;
//     const [champion, setChampion] = useState(null);

//     useEffect(() => {
//         // if (slug) {
//         const fetchChampion = async () => {
//           try {
//             const response = await axios.get(`${dataDragonUrl}/champion/${slug}.json`);
//             if (response.data.data && response.data.data[slug]) {
//               setChampion(response.data.data[slug]);
//             } else {
//               console.error('Campeão não encontrado');
//             }
//           } catch (error) {
//             console.error('Erro ao buscar o campeão:', error);
//           }
//         };
    
//         if (slug) {
//           fetchChampion();
//         }
//       }, [slug]);
//     //         setChampion(response.data[slug]);
//     //       } catch (error) {
//     //         console.error('Erro ao buscar os campeão:', error);
//     //       }
//     //     };
  
//     //     fetchChampion();
//     //   }
//     // }, [slug]);

//     if (!champion) {
//       return <div>Loading...</div>;
//     }
  
//     return (
//       <div className='champion-detail'>
//             <ChampionData
//               name={champion.id}
//               title={champion.title}
//             />
//       </div>
//     );
//   };

// export default ChampionDetail;
