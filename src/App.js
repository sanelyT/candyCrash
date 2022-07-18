import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import CandyCrash from "./layouts/CandyCrash";

const App = () => {

  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isOyunBaslasin, setIsOyunBaslasin] = useState(true);

  const getUserInfo = () => {
    console.log("getting user info");
    setUser({
      adi: userName,
      creationTime: Date.now(),
      score: 0,
    });
    setIsOyunBaslasin(true);
  };

  const handleUserName = (lab) => {
    setUserName(lab.target.value);
  };

  useEffect(() => {
    if (userName !== null) {
      setUser({ adi: userName });
    }
  }, [userName]);

  return (
    <div>
      {!isOyunBaslasin ? (
        <div>
          <label>Oyuncu : </label>
          <input type="text" onChange={handleUserName} />
          <Button variant="primary" type="submit" onClick={getUserInfo}>
            Başla
          </Button>
        </div>
      ) : (
        <CandyCrash oyuncu={{
          adi: userName,
          creationTime: Date.now(),
          score: 0,
          movement: 0,
          ortalama: 0,
          enYuksekPuan :0
        }} />
      )}
    </div>
  );
};

export default App;
