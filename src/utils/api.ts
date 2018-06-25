function fetchAllIcons() {
    return fetch("/nav-frontend-ikoner-backend/api/test").then(res => res.json().catch(error => console.log(error)));
}


const api = {
    fetchAllIcons,
};

export default api;
