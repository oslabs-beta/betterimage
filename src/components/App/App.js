import React from "react";
import BetterImage from "../BetterImage/BetterImage.js";
import originalImage from "./images/bestPhotoEver.png";
import bigJPGImage from "./images/bigJPG.jpg";
import bigPNGImage from "./images/bigPNG.png";

function App() {
  return (
    <div>
      <BetterImage
        source={bigPNGImage}
        resize={"200x200"}
        format={"webp"}
        quality={"80"}
      />
    </div>
  );

}

export default App;
