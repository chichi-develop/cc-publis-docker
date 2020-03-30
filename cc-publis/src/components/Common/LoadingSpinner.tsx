import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div className="common-loadingSpinner">
      <CircularProgress />
    </div>
  );
}
