import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [currentMemeIdx, setCurrentMemeIdx] = useState(0);
  const [memeData, setMemeData] = useState([]);

  const getMemeData = () => {
    Axios.get(`https://api.imgflip.com/get_memes`).then((resp) => {
      setMemeData(resp.data.data.memes);
    });
  };

  useEffect(() => {
    getMemeData();
  }, []);

  const onPrev = () => {
    if (currentMemeIdx === 0) return;
    setCurrentMemeIdx((prev) => prev - 1);
  };

  const onNext = () => {
    if (currentMemeIdx >= memeData.count - 1) return;
    setCurrentMemeIdx((prev) => prev + 1);
  };

  const currentImgPath = () => {
    const imgData = memeData[currentMemeIdx];
    console.log(imgData);
    if (imgData) return imgData.url;
    else return "";
  };

  return (
    <div className="App">
      <header className="App-header">Meme Generator</header>
      <div className="App">
        <form action="">
          <label for="text1">Text 1</label>
          <input type="text" id="text1" name="text1" />
          <label for="text2">Text 2</label>
          <input type="text" id="text2" name="text2" />
          <input type="submit" value="Submit" />
        </form>
        <div className="navigation">
          <button onClick={onPrev}>Previous</button>
          <button onClick={onNext}>Next</button>
        </div>
        <img src={currentImgPath()} alt="Meme" />
      </div>
    </div>
  );
}

export default App;
