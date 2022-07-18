const ScoreBoard = ({ player }) => {
  return (
    <div>
      <label
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          fontSize : 20,
          width:'400px',
        }}
      >
        {`Puan : ${player.score}   Hareket : ${player.movement}` }
      </label>
      <label
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          fontSize : 20,
          width:'400px',
        }}
      >
        {`Ortalama : ${player.ortalama} EYP : ${player.enYuksekPuan}` }
      </label>
  
    </div>
  );
};

export default ScoreBoard;
