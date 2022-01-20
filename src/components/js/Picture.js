import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ClipLoader from "react-spinners/ClipLoader";

const loaderStyle = `
  display: block;
  margin: 1em auto;
  border-color: blue;
`;

const Picture = (props) => {
  const onClick = () => {};

  const [imageLoaded, _setImageLoaded] = useState(false);
  const pictureClassName = `picture w-${
    props.isMobile ? "100" : "25"
  } p-sm-1 m-0 d-inline-block rounded-lg`;

  return (
    <div className={pictureClassName}>
      <Button className="border-0 shadow bg-white text-body" onClick={onClick}>
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
        <div className="picture-name p-md-2">
          <strong>{props.pictureJson["name"]}</strong>
        </div>
        {props.pictureJson["date"]}
      </Button>
    </div>
  );
};

export default Picture;
