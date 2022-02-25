import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [currentMemeIdx, setCurrentMemeIdx] = useState(0);
  const [memeData, setMemeData] = useState([]);
  const [textList, setTextList] = useState(["Sample text 1", "Sample text 2"]);

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

  const handleTextChange = (value, idx) => {
    setTextList((prev) => [
      ...prev.slice(0, idx),
      value,
      ...prev.slice(idx + 1),
    ]);
  };

  const currentImgPath = () => {
    const imgData = memeData[currentMemeIdx];
    if (imgData) return imgData.url;
    else return "";
  };

  return (
    <div className="App">
      <header className="App-header">Meme Generator</header>
      <div className="App">
        <form>
          <label className="input-label" for="text1">
            Text 1
          </label>
          <input
            type="text"
            onChange={(e) => handleTextChange(e.target.value, 0)}
          />
          <label className="input-label" for="text2">
            Text 2
          </label>
          <input
            type="text"
            onChange={(e) => handleTextChange(e.target.value, 1)}
          />
        </form>
        <div className="navigation">
          <button onClick={onPrev}>Previous</button>
          <button onClick={onNext}>Next</button>
        </div>
        <div className="imgContainer">
          <label className="meme-text text1">{textList[0]}</label>
          <label className="meme-text text2">{textList[1]}</label>
          <img src={currentImgPath()} alt="Meme" />
        </div>
      </div>
    </div>
  );
}

export default App;
