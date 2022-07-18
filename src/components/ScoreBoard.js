const ScoreBoard = ({ player }) => {
  return (
    <div>
      <label
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          fontSize : 20
        }}
      >
        {`Puan : ${player.score}   Hareket : ${player.movement}   Ortalama : ${player.ortalama} EYP : ${player.enYuksekPuan}` }
      </label>
    </div>
  );
};

export default ScoreBoard;
