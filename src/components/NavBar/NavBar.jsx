import React from "react";
import './style.css';
import Button from "../Button";

const navTree = [
    {
        key: 'films',
        title: 'Films'
    },
    {
        key: 'spaces',
        title: 'Spaces'
    },
    {
        key: 'people',
        title: 'People'
    }
]

const NavBar = ({
    handleChangeCategory,
}) => {
    return (
        <div className="nav">
            {navTree.map(navItem => (
                <Button 
                                    //функція передана в дочірньому класі і викликана, а  state змінився в бвтьківському
                                    // key - назва категорії
                    onClick={() => handleChangeCategory(navItem.key)}
                >
                    {navItem.title}
                </Button>
            ))}
        </div>
    )
}

export default NavBar;