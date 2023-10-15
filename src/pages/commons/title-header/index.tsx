import React from "react";
import { IpropTitleHeader } from "../../../interfaces/common.interface";
import "./index.css";

const TitleHeaderPage = (props: IpropTitleHeader) => {
  const { title } = props;

  return (
    <div className="HeaderTitlePage">
      <div className="InnerHeaderTitlePage FlexHeaderTitlePage">
        <h5 className="TextHeaderTitle">{title}</h5>
      </div>
      <div>
        <svg
          className="WavesHeaderTitlePage"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="ParallaxHeaderTitlePage">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default TitleHeaderPage;
