const API_URL = 'https://ajax.test-danit.com/api/swapi';

class Api {
    constructor(){
        this.API_URL = API_URL;
    }

    get(path){
        return fetch(this.API_URL+path)
        .then(response => response.json())
    }

    post(path, body){
        return fetch(this.API_URL+path, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
    }

    getFilms(){
        return this.get('/films');
    }

    getFilmsById(id){
        return this.get(`/films/${id}`);
    }
}

export default new Api();