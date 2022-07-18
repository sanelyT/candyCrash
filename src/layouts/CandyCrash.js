import React, { useState, useEffect } from "react";
import blank from "../images/blank.png";
import blueCandy from "../images/blue-candy.png";
import greenCandy from "../images/green-candy.png";
import orangeCandy from "../images/orange-candy.png";
import purpleCandy from "../images/purple-candy.png";
import redCandy from "../images/red-candy.png";
import yellowCandy from "../images/yellow-candy.png";
import ScoreBoard from "../components/ScoreBoard";

const width = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
];

export default function CandyCrash(props) {
  const oyuncu = props.oyuncu;

  const [currentColorArrangment, setCurrentColorArrangment] = useState([]);

  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);

  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [movement, setMovement] = useState(0);
  const [acilisPuani, setAcilisPuani] = useState(0);
  const [hareketBasinaEnYuksekPuan, setHareketBasinaEnYuksekPuan] = useState(0);
  const [hareketOncesiPuan, setHareketOncesiPuan] = useState(0);

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangment[i];
      const isBlank = currentColorArrangment[i] === blank;

      if (
        columnOfFour.every(
          (square) =>
            currentColorArrangment[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(
          (square) => (currentColorArrangment[square] = blank)
        );
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangment[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArrangment[i] === blank;

      if (notValid.includes(i)) {
        continue;
      }

      if (
        rowOfFour.every(
          (square) =>
            currentColorArrangment[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach((square) => (currentColorArrangment[square] = blank));
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangment[i];
      const isBlank = currentColorArrangment[i] === blank;

      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangment[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currentColorArrangment[square] = blank)
        );
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangment[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArrangment[i] === blank;

      if (notValid.includes(i)) {
        continue;
      }

      if (
        rowOfThree.every(
          (square) =>
            currentColorArrangment[square] === decidedColor && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(
          (square) => (currentColorArrangment[square] = blank)
        );
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangment[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangment[i] = candyColors[randomNumber];
      }

      if (currentColorArrangment[i + width] === blank) {
        currentColorArrangment[i + width] = currentColorArrangment[i];
        currentColorArrangment[i] = blank;
      }
    }
  };

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = () => {
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    if (validMove) {
      //currentColorArrangment[squareBeingReplacedId] = squareBeingDragged.style.backgroundColor
      //currentColorArrangment[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor
      currentColorArrangment[squareBeingReplacedId] =
        squareBeingDragged.getAttribute("src");
      currentColorArrangment[squareBeingDraggedId] =
        squareBeingReplaced.getAttribute("src");

      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
      setMovement(movement + 1);
      setHareketOncesiPuan(props.oyuncu.score);
    }
  };

  const createBoards = () => {
    const randomColorArrangment = [];

    for (let i = 0; i < width * width; i++) {
      const randomColorFrom0to5 = Math.floor(
        Math.random() * candyColors.length
      );
      const randomColor = candyColors[randomColorFrom0to5];
      randomColorArrangment.push(randomColor);
    }
    setCurrentColorArrangment(randomColorArrangment);
  };

  useEffect(() => {
    createBoards();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangment([...currentColorArrangment]);
    }, 100);

    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    currentColorArrangment,
  ]);

  useEffect(() => {
    props.oyuncu.score = scoreDisplay;
    props.oyuncu.movement = movement;

    if (movement === 0) {
      setAcilisPuani(scoreDisplay);
    } else {
      let kazanilanPuan = props.oyuncu.score - hareketOncesiPuan;
      if (kazanilanPuan > hareketBasinaEnYuksekPuan) {
        setHareketBasinaEnYuksekPuan(kazanilanPuan);
        props.oyuncu.enYuksekPuan = kazanilanPuan;
      }
    }

    if (props.oyuncu.score !== 0 && props.oyuncu.movement !== 0) {
      props.oyuncu.ortalama = (
        (props.oyuncu.score - acilisPuani) /
        props.oyuncu.movement
      ).toFixed(2);
      //props.oyuncu.ortalama = (props.oyuncu.score / props.oyuncu.movement)
    }
  }, [scoreDisplay, movement]);

  return (
    <div className="app">
      <div>
        <ScoreBoard player={oyuncu} />
      </div>
      <div className="game">
        {currentColorArrangment.map((candyColor, index) => (
          <DraggableItem
           /* onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDragStart={onDragStart}*/
          >
            <img
              key={index}
              //style={{ backgroundColor: candyColor }}
              src={candyColor}
              alt={candyColor}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          </DraggableItem>
        ))}
      </div>
    </div>
  );
}

function DraggableItem(props) {
  const { children, ...otherProps } = props;
  return (
    <div className="item" draggable {...otherProps}>
      {children}
    </div>
  );
}
