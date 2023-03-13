import React from "react";
import './style.css';

const FilmCard = ({data, handleShowInfo}) => {
    return <p className="filmcard" onClick={handleShowInfo}>{data.name}</p>
}
export default FilmCard;
