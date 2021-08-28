import React from "react";

const SearchStatus = ({ numberUsers }) => {
  const renderPhrase = number => {
    if (number === 0)
      return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
    return (
      <span className="badge bg-primary">
        {number}{" "}
        {number <= 4 && number !== 1 ? "человекa тусанет " : "человек тусанут "}{" "}
        с тобой сегодня
      </span>
    );
  };
  return (
    <>
      <h2>{renderPhrase(numberUsers)}</h2>
    </>
  );
};

export default SearchStatus;
