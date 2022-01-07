import React from "react";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import "./index.scss";

const override = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Loader = (props) => {
  return (
    <div className="loader">
      <HashLoader
        color="#36D7B7"
        className="hash-loader"
        css={override}
        loading={props.loading}
        size={props.size}
      />
    </div>
  );
};

export default Loader;
