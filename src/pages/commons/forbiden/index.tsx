import React from "react";
import "./index.css";
import { routes } from "../../../constants/constant";

const ForbidenPage = () => {
  return (
    <div className="ForbidenPage">
      <p>
        <a href={routes.dashboard} className="fs-5">
          Go to dashboard page
        </a>
        <img src="/images/forbiden.jpg" width="100%" />
      </p>
    </div>
  );
};

export default ForbidenPage;
