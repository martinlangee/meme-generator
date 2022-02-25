import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Axios from "axios";
import "./App.css";

function App() {
  const [currentMemeIdx, setCurrentMemeIdx] = useState(0);
  const [memeData, setMemeData] = useState([]);
  const [textList, setTextList] = useState(["Sample text 1", "Sample text 2"]);
  const [ownImageSrc, setOwnImageSrc] = useState("");

  const getMemeData = () => {
    Axios.get(`https://api.imgflip.com/get_memes`).then((resp) => {
      setMemeData(resp.data.data.memes);
    });
  };

  useEffect(() => {
    getMemeData();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      setOwnImageSrc(() => reader.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onPrev = () => {
    if (currentMemeIdx === 0) return;
    setOwnImageSrc(() => "");
    setCurrentMemeIdx((prev) => prev - 1);
  };

  const onRandom = () => {
    const newIdx = Math.floor(Math.random() * memeData.length);
    setCurrentMemeIdx((prev) => newIdx);
  };

  const onNext = () => {
    if (currentMemeIdx >= memeData.count - 1) return;
    setOwnImageSrc(() => "");
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
    if (ownImageSrc) return ownImageSrc;
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
          <button onClick={onPrev}>&lt;&lt; Previous</button>
          <button onClick={onRandom}>Random</button>
          <button onClick={onNext}>Next &gt;&gt;</button>
        </div>
        <div className="imgContainer" {...getRootProps()}>
          <input {...getInputProps()} />
          <label className="meme-text text1">{textList[0]}</label>
          <label className="meme-text text2">{textList[1]}</label>
          <img src={currentImgPath()} alt="Meme" />
        </div>
        Drag 'n' drop own image file over the picture.
      </div>
    </div>
  );
}

export default App;
