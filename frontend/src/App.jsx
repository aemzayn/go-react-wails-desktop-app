import { useEffect, useState } from "react";
import {
  GetBreedList,
  GetImageUrlsByBreed,
  GetRandomImageUrl,
} from "../wailsjs/go/main/App";
import "./App.css";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [photos, setPhotos] = useState([]);
  const [showRandomImg, setShowRandomImg] = useState(null);
  const [randomImgUrl, setRandomImgUrl] = useState("");

  const getRandomImageUrl = async () => {
    GetRandomImageUrl()
      .then((result) => {
        setRandomImgUrl(result);
      })
      .finally(() => {
        setShowRandomImg(true);
      });
  };

  const fetchBySelectedBreed = async () => {
    GetImageUrlsByBreed(selectedBreed).then((result) => {
      setPhotos(result);
    });
    setShowRandomImg(false);
  };

  const init = async () => {
    return await GetBreedList();
  };

  useEffect(() => {
    init().then((breedList) => {
      setBreeds(breedList);
      setSelectedBreed(breedList[0]);
    });
  }, []);

  return (
    <div id="App">
      <h3 className="title">Dog API</h3>
      <div className="container">
        <button className="random-button" onClick={getRandomImageUrl}>
          Fetch a dog randomly
        </button>
        <span>click on down arrow to select a breed</span>
        <div className="breed-selector-container">
          <select
            className="breed-select"
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >
            {breeds.map((breed) => (
              <option value={breed}>{breed}</option>
            ))}
          </select>
          <button onClick={fetchBySelectedBreed}>Fetch by this breed</button>
        </div>
      </div>

      <div className={`image-container ${!showRandomImg && "multiple"}`}>
        {showRandomImg === true ? (
          <img
            className="dog-image"
            src={randomImgUrl}
            alt="Random dog image"
          />
        ) : showRandomImg === false ? (
          photos.map((photo) => (
            <img className="dog-image" src={photo} alt="Doggie" />
          ))
        ) : null}
      </div>
    </div>
  );
}

export default App;
