import React, { useContext, useState, useEffect } from "react";
import DotLoader from "react-spinners/DotLoader";
import debounce from "lodash.debounce";
import { v4 as uuidv4 } from "uuid";
import Picture from "./Picture";

import { SearchContext } from "../../contexts/SearchContext";

import "../css/Pictures.css";

const loaderStyle = `
  display: block;
  margin: 1em auto;
  border-color: red;
`;

const Pictures = () => {
  const isMobile = window.screen.width < 768;
  const numPictureIncrement = isMobile ? 5 : 12;
  const [numPictures, _setNumPictures] = useState(numPictureIncrement);
  const [availablePictures, _setAvailablePictures] = useState([]);

  useEffect(() => {
    fetch("https://images-api.nasa.gov/search?media_type=image&q=planet")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        return Array.from(
          responseJson.collection.items.map((item) => {
            return {
              name: item.data[0].title,
              date: item.data[0].date_created.substring(0, 10),
              id: uuidv4(),
              image_url: item.links[0].href,
            };
          })
        )
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
      })
      .then((pictures) => {
        _setAvailablePictures(pictures);
      });
  }, []);

  const [loading, _setLoading] = useState(false);
  useEffect(
    () => _setLoading(numPictures < availablePictures.length),
    [numPictures, availablePictures]
  );
  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      if (numPictures < availablePictures.length)
        _setNumPictures(numPictures + numPictureIncrement);
    }
  }, 100);

  const { query } = useContext(SearchContext);
  const [displayPictures, _setDisplayPictures] = useState(
    availablePictures
      .slice(0, numPictures)
      .filter((picture) =>
        picture["name"].toLowerCase().includes(query.toLowerCase())
      )
      .map((picture) => (
        <Picture
          pictureJson={picture}
          key={picture["id"]}
          isMobile={isMobile}
        />
      ))
  );
  useEffect(
    () =>
      _setDisplayPictures(
        availablePictures
          .slice(0, numPictures)
          .filter((picture) =>
            picture["name"].toLowerCase().includes(query.toLowerCase())
          )
          .map((picture) => (
            <Picture
              pictureJson={picture}
              key={picture["id"]}
              isMobile={isMobile}
            />
          ))
      ),
    [availablePictures, numPictures, isMobile, query]
  );

  return (
    <div className="mt-sm-3">
      <div
        id="picture-list"
        className="d-flex flex-column align-items-center mx-sm-3"
      >
        {displayPictures}
      </div>
      <DotLoader css={loaderStyle} color={"#123abc"} loading={loading} />
    </div>
  );
};

export default Pictures;
