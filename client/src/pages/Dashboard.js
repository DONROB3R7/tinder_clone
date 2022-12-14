import React from 'react';
import TinderCard from 'react-tinder-card';
import ChatContainer from '../components/ChatContainer';

import{ useState, useEffect  } from 'react'

export default function Dashboard() {

  // Loading and DataCollected  
  const [usersData, setUsersData] = useState();
  const [Loading, setLoading] = useState(false);



  

    useEffect(() => {
        fetch("/admincms")
        .then((res) => res.json())
        .then((data) => {
            setUsersData(data);
            setLoading(true);
        });
    }, []);

  const [lastDirection, setLastDirection] = useState();

  const [currentName, setCurrentName] = useState();


  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
  }
  

  
  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
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
                            <h3>{character.gender}</h3>
                            <h3>{character.firstName}<span>{character.age}</span></h3>
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