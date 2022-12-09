import React from 'react';
import TinderCard from 'react-tinder-card';
import ChatContainer from '../components/ChatContainer';

import{ useState, useEffect  } from 'react'


const characters = [
  {
    name: 'Richard Hendricks',
    url: 'https://i.imgur.com/Q9WPlWA.jpeg'
  },
  {
    name: 'Erlich Bachman',
    url: 'https://i.imgur.com/oPj4A8u.jpeg'
  },
  {
    name: 'Monica Hall',
    url: 'https://i.imgur.com/MWAcQRM.jpeg'
  },
  {
    name: 'Jared Dunn',
    url: 'https://i.imgur.com/wDmRJPc.jpeg'
  },
  {
    name: 'Dinesh Chugtai',
    url: 'https://i.imgur.com/OckVkRo.jpeg'
  }
]



export default function Dashboard() {

  const [users, setUsers] = useState();

  const [usersData, setUsersData] = useState();
  const [Loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/admincms")
        .then((res) => res.json())
        .then((data) => {
            setUsersData(data);
            console.log('here');
            setLoading(true);
        });
    }, []);


    console.log(usersData);


  const [lastDirection, setLastDirection] = useState()


  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }
  
  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  if(Loading){
      return (
        <div className='dashboard'> 
          <ChatContainer />
          <div className='swiper-container'>
            <div className='card-container'>
                <h1>React Tinder Card</h1>
                <div className='cardContainer'>
                      {usersData.map((character) =>
                        <TinderCard className='swipe' key={character.email} onSwipe={(dir) => swiped(dir, character.email)} onCardLeftScreen={() => outOfFrame(character.email)}>
                          <div style={{ backgroundImage: 'url(' + character.imgLarge + ')' }} className='card'>
                            <h3>{character.name}</h3>
                          </div>
                        </TinderCard>
                      )}
                <div className="swipe-info">
                    {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                </div>
                </div>
            </div>
          </div>
        </div>
      )
  } else{
    return(
      <>
        <h1>Loading Page</h1>
      </>
    )
  }

}


