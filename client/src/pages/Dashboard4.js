import React, { useState, useMemo } from "react";
import TinderCard from "react-tinder-card";
const db = [
  {
    name: "Richard Hendricks",
    url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Song_Joong-ki_at_Style_Icon_Asia_2016.jpg/230px-Song_Joong-ki_at_Style_Icon_Asia_2016.jpg"
  },
  {
    name: "Erlich Bachman",
    url: "https://dimg.donga.com/wps/SPORTS/IMAGE/2021/03/12/105835799.2.jpg"
  },
  {
    name: "Monica Hall",
    url: "https://cdn.mhns.co.kr/news/photo/202101/425258_559227_5854.jpg"
  },
  {
    name: "Jared Dunn",
    url:
      "https://images.chosun.com/resizer/w05aWnWZx_sGIE0JEj-XdPxJHQw=/574x749/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/A4DFLJYL6CZUUXKVZ74D24KIYA.jpg"
  },
  {
    name: "Dinesh Chugtai",
    url: "https://photo.jtbc.joins.com/news/2017/07/20/20170720092407814.jpg"
  }
];

const alreadyRemoved = [];
let charactersState = db;

export default function Dashboard() {
  const [characters, setCharacters] = useState(db);
  const [lastDirection, setLastDirection] = useState();
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );
  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  };
  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    charactersState = charactersState.filter(
      (character) => character.name !== name
    );
    setCharacters(charactersState);
  };

  const swipe = (dir) => {
    const cardsLeft = characters.filter(
      (person) => !alreadyRemoved.includes(person.name)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
      const index = db.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
      console.log(index);
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };
  return (
    <div className="App">
      <div>
        <link
          href="https://fonts.googleapis.com/css?family=Damion&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
          rel="stylesheet"
        />
        <h1>React Tinder Card</h1>
        <div className="cardContainer">
          {characters.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div>
                <img
                  style={{
                    width: 50,
                    top: 50,
                    position: "absolute",
                    zIndex: 99
                  }}
                  alt="test"
                  src="https://www.pngfind.com/pngs/m/6-62455_instagram-heart-emoji-free-download-transparent-heart-symbol.png"
                />
              </div>
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
        <div className="buttons">
          <button onClick={() => swipe("left")}>Swipe left!</button>
          <button onClick={() => swipe("right")}>Swipe right!</button>
        </div>
        {lastDirection ? (
          <h2 key={lastDirection} className="infoText">
            You swiped {lastDirection}
          </h2>
        ) : (
          <h2 className="infoText">
            Swipe a card or press a button to get started!
          </h2>
        )}
      </div>
    </div>
  );
}
