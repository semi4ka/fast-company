import React from "react";

const Qualitie = ({ color, name }) => {
  return (
    <>
      <span key={color} className={"me-2 badge bg-" + color}>
        {name}
      </span>
    </>
  );
};

export default Qualitie;
