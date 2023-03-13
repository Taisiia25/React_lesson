import React, { useEffect, useState } from "react";
import './style.css'
import FilmCard from "../../components/FilmCard";
import api from '../../services/api';

//рендеримо список item
const List = ({list, handleShowInfo}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

    useEffect(() => {
        const callback = () => {
            setIsMobile(window.innerWidth <= 500);
            console.log('is mobile', window.innerWidth <= 500)
        }

        // підписка на  подію resize
        window.addEventListener('resize', callback);

        // коли  компонент List розмаунтиться - потрібно буде відписатися події resize від callback 
        return () =>  window.removeEventListener('resize', callback)
    }, [])

    const containerClass = `list_container ${isMobile ? 'list_container--mob' : ''}`

    if(!list.length) {
        return <h1>No items</h1>
    }

    // карточки з фільмами потрібно було заімпортити
    return (
        <div className={containerClass}>
            {list.map(item => <FilmCard data={item} handleShowInfo={() => handleShowInfo(item)}/>)}
        </div>
    )
}

const Details = ({data, handleBack}) => {
    return (
        <div className="details">
            <button onClick={handleBack}>{"<Back to films"}</button>
            <div>
                <img src={`https://starwars-visualguide.com/assets/img/films/${data.episodeId}.jpg`} alt="" />
            </div>
            <h1>Name: {data.name}</h1>
            <p>Director: {data.director}</p>
            <p>Opening crawl: {data.openingCrawl}</p>
        </div>
    )
}

const Films = () => {
    const [list, setList] = useState([]);
    const [viewType, setViewType] = useState({
        type: 'list', //info or list
        data: null,
    })
    const [isLoading, setIsLoading] = useState(true);

        //викликаємо useEffect один раз  на маунті, щоб взяти всі фільми з бекенду
        // коли отримає - виклече setList
    useEffect(() => {
        // виклик сервісу, взято getFilm, отримуємо  та записуємо у стейт setList
        api.getFilms().then(films => setList(films)).finally(() => setIsLoading(false));
    }, []);

    const handleShowInfo = (data) => {
        setViewType({
            type: 'info',
            data,
        })
    }

    const handleBack = (data) => {
        setViewType({
            type: 'list',
            data: null,
        })
    }

    if (isLoading) return <h1>Loading...</h1>

    return (
        <div className="container">
            {
                viewType.type === 'list' ? 
                <List list={list} handleShowInfo={handleShowInfo}/> : 
                <Details data={viewType.data} handleBack={handleBack}/>}
        </div>
    )
}

export default Films;