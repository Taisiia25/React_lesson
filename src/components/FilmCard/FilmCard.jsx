import React from "react";
import './style.css';

const FilmCard = ({data, handleShowInfo,  handleDeleteFilm}) => {
    return <div className="filmcard" onClick={handleShowInfo}>
        {data.name}
        <button onClick={(e) => {
            e.stopPropagation();
            handleDeleteFilm(data.id)
        }}>Delete</button>
    </div>
}
export default FilmCard;
