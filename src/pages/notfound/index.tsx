import React from "react";
import "./index.css";
import { routes } from "../../constants/constant";

const NotfoundPage = () => {
  return (
    <div className="NotFoundPage fs-6">
      <p>
        <a href={routes.dashboard} className="fs-5">
          Go to dashboard
        </a>
      </p>
      <img src="/images/notfound.jpg" width="100%" />
    </div>
  );
};

export default NotfoundPage;
