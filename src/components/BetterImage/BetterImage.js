import React, { useEffect, useState } from "react";

let counter = 0;

function BetterImage(props) {
  /////////////////* HOISTED VARIABLES *///////////////////////////

  const { resize, source, quality, format } = props;
  let resizedImageWidth;
  let resizedImageHeight;

  //////////////////* HELPER fUNCTIONS *///////////////////
  ////////////////////* import all images in optimized folder */////////////////////
  let images = {};
  function importAll(r) {
    r.keys().map((item) => {
      images[item.replace("./", "")] = r(item);
    });

    return images;
  }

  
  // let originalImages = importAll(
    //   require.context("../App/images", false, /\.(png|jpe?g|webp|svg)$/)
    // );
    
    // console.log("original images", originalImages);
    
    counter++;
    //////////////////////////* Extract Image Name * ////////////////////
    
    let fileName = source.split('/').pop();
    let imgType = fileName.split('.').pop();
    let imgName = fileName.split('.').shift();
    // imgName = imgName.replace(/\.(.*)\.(.*)/, "")
    
    //////////////////* MAIN fUNCTIONS *///////////////////
    /////////////////////////* Image Resize Functionality *////////////////////////
    function resizeFunc(string) {
      let foundX = false;
      let num1 = "";
      let num2 = "";
      
      for (let i = 0; i < string.length; i++) {
        if (string[i] !== "x" && foundX === false) {
          num1 = num1.concat(string[i]);
        } else if (string[i] === "x") {
          foundX = true;
        } else if (string[i] !== "x" && foundX === true) {
          num2 = num2.concat(string[i]);
        }
      }
      resizedImageHeight = Number(num1);
      resizedImageWidth = Number(num2);
      return;
    }
    
    ////////////////* Convert Image Format to WEBP Functionality */////////////////
    
    function convertImg(imgName, imgType, quality, images) {
      if (!images[`${imgName}.webp`]) {
        //changing the state once(true/false)
        // setOnce(true);
        // console.log(once);
        images[`${imgName}.webp`] = `${imgName}.webp`;
        
        fetch("/api/convert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageName: imgName,
            imgType: imgType,
            quality: quality,
          }),
        });
      }
    }
    
    ////////////////////* Chaining the APIs Together */////////////////////
    // function renderImage() {
      //   // check cache
      //   if (!images[`${imgName}.webp`]) {
        //   }
        // }
        ///////////////* Checking if optimized image exists in detination */////////////////////
        resizeFunc(resize);
        
        useEffect(() => {
          console.log("useEffect counter: ", counter);
          convertImg(imgName, imgType, quality, images);
        }, [])
        images[imgName] = require.context("./convertedImage", false, /\'${imgName}'/);
        
        ////////////////////* Render the modifed image component */////////////////////
        return (
          <div>
          {console.log("return has run: ", counter)}
          {/* {convertImg(imgName, quality, images)} */}
          {console.log(imgName, imgType)}
      <img
        src={importAll(
          require.context("./convertedImage", false, /\.(png|jpe?g|webp|svg)$/))[`${imgName}.webp`]}
        style={{
          width: `${resizedImageWidth}px`,
          height: `${resizedImageHeight}px`,
        }}
        alt="image failed to load"
        />
    </div>
  );
} // end of functional component

export default BetterImage;
