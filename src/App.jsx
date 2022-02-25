import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">Meme Generator</header>
      <body>
        <form action="">
          <label for="text1">Text 1:</label>
          <input type="text" id="text1" name="text1" />
          <label for="text2">Text 2:</label>
          <input type="text" id="text2" name="text2" />
          <input type="submit" value="Submit" />
        </form>
        <image></image>
      </body>
    </div>
  );
}

export default App;
