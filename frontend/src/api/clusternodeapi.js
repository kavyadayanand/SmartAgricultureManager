const clusternodeapi = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',

};

export const fetchClustserNodeData = () =>
    fetch(`${clusternodeapi}/getdashboard`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then((res) => res.json())
        .then((data) => {
            console.log('API '+data);
            return data
                ;})
        .catch(error => {
            console.log("Error while fetching cluster and node data!!");
            return error;
        });
