import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { HandThumbsUp, HandThumbsUpFill } from "react-bootstrap-icons";

const loaderStyle = `
  display: block;
  margin: 1em auto;
  border-color: blue;
`;

const Picture = (props) => {
  const [imageLoaded, _setImageLoaded] = useState(false);
  const [liked, _setLiked] = useState(false);
  const pictureClassName = `picture w-${
    props.isMobile ? "75" : "50"
  } p-sm-1 m-sm-2 d-flex justify-content-center rounded-lg`;

  return (
    <div className={pictureClassName}>
      <Button
        id="picture-button"
        className="border-0 clearfix shadow bg-white text-body"
      >
        <img
          src={props.pictureJson.image_url}
          alt={props.pictureJson.name}
          style={imageLoaded ? {} : { display: "none" }}
          onLoad={() => _setImageLoaded(true)}
          className="w-100"
        />
        <ClipLoader
          css={loaderStyle}
          color={"#123abc"}
          loading={!imageLoaded}
          size={100}
        />
        <div className="picture-name px-md-2">
          <strong>{props.pictureJson["name"]}</strong>
        </div>
        <span className="text-center">{props.pictureJson["date"]}</span>
        <Button
          className="float-right p-sm-1 m-sm-1 rounded-circle"
          onClick={() => _setLiked(!liked)}
        >
          {liked ? <HandThumbsUpFill /> : <HandThumbsUp />}
        </Button>
        <br />
        {props.pictureJson["description"]}
      </Button>
    </div>
  );
};

export default Picture;
