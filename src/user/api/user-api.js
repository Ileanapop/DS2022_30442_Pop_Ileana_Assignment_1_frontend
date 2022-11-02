import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    user: '/api/User',
    login: '/api/Login'
};

function getUsers(callback) {
    let request = new Request(HOST.backend_api + endpoint.user, {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
        }
    });
    console.log(HOST.backend_api);
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getUserById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.user + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getUserByName(user, callback){
    let request = new Request(HOST.backend_api + endpoint.user +"byName", {
        method: 'GET',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}` 
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function login(params, callback){
    let request = new Request(HOST.backend_api + '/api/Login' + params.name + params.password, {
       method: 'GET'
    });
    console.log(HOST.backend_api);
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


function postUser(user, callback){
    let request = new Request(HOST.backend_api + endpoint.user , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

export {
    getUsers,
    getUserById,
    login,
    postUser
};
