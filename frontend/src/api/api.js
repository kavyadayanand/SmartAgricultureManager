const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',

};

export const fetchSensorData = () =>
    fetch(`${api}/sensorsimulation`, {
        method: 'POST',
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
            console.log("This is error in fetch sensors");
            return error;
        });

  export const addSensor = (sensorDetails) =>
    fetch(`${api}/addSensor`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(sensorDetails)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });


  export const addNode = (nodeDetails) =>
          fetch(`${api}/addNode`, {
              method: 'POST',
              headers: {
                  ...headers,
                  'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify(nodeDetails)
          }).then((res) => res.json())
              .then((data) => {return data;
              console.log("-----add Node api called here.-----")})
              .catch(error => {
                  console.log("This is error");
                  return error;
              });



export const addCluster = (clusterDetails) =>
                fetch(`${api}/addCluster`, {
                    method: 'POST',
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(clusterDetails)
                }).then((res) => res.json())
                    .then((data) => {return data;})
                    .catch(error => {
                        console.log("This is error");
                        return error;
                    });

  export const searchSensor = (sensorID) =>
                        fetch(`${api}/searchSensor`, {
                            method: 'POST',
                            headers: {
                                ...headers,
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include',
                            body: JSON.stringify(sensorID)
                        }).then((res) => res.json())
                            .then((data) => {
                                console.log('API '+data);
                                return data
                                    ;})
                            .catch(error => {
                                console.log("This is error in searching sensor.");
                                return error;
                            });



export const simulateData = (sensorDataFoSimulation) =>
    fetch(`${api}/simulateData`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(sensorDataFoSimulation)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const getSensor = (sensorID) =>
    fetch(`${api}/getSensor`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(sensorID)
    }).then((res) => res.json())
        .then((data) => {
            console.log('API '+data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in fetch sensors by id");
            return error;
        });

export const getNode = (nodeID) =>
            fetch(`${api}/getNode`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(nodeID)
            }).then((res) => res.json())
                .then((data) => {
                    console.log('Search Node API '+data);
                    return data
                        ;})
                .catch(error => {
                    console.log("This is error in fetch node by id");
                    return error;
                });

  export const getCluster = (uclusterID) =>
                            fetch(`${api}/getCluster`, {
                                method: 'POST',
                                headers: {
                                    ...headers,
                                    'Content-Type': 'application/json'
                                },
                                credentials: 'include',
                                body: JSON.stringify(uclusterID)
                            }).then((res) => res.json())
                                .then((data) => {
                                    console.log('Search cluster API '+data);
                                    return data
                                        ;})
                                .catch(error => {
                                    console.log("This is error in fetch cluster by id for  ID: ", uclusterID);
                                    return error;
                                });

export const getDelCluster = (delclusterID) =>
                          fetch(`${api}/getDelCluster`, {
                              method: 'POST',
                              headers: {
                                  ...headers,
                                  'Content-Type': 'application/json'
                              },
                              credentials: 'include',
                              body: JSON.stringify(delclusterID)
                          }).then((res) => res.json())
                              .then((data) => {
                                  console.log('Search cluster API '+data);
                                  return data
                                      ;})
                              .catch(error => {
                                  console.log("This is error in fetch cluster by id for  ID: ", delclusterID);
                                  return error;
                              });

export const deleteSensor = (sensorID) =>
    fetch(`${api}/deleteSensor`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(sensorID)
    }).then((res) => res.json())
        .then((data) => {
            //console.log('API '+data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in delete sensors by id");
            return error;
        });

export const deleteNode = (delnodeID) =>
            fetch(`${api}/deleteNode`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(delnodeID)
            }).then((res) => res.json())
                .then((data) => {
                    //console.log('API '+data);
                    return data
                        ;})
                .catch(error => {
                    console.log("This is error in delete node by id");
                    return error;
                });


export const updateSensor = (sensorData) =>
    fetch(`${api}/updateSensor`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(sensorData)
    }).then((res) => res.json())
        .then((data) => {
            //console.log('API '+data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in Update sensors by id");
            return error;
        });

export const updateNode = (updateData) =>
            fetch(`${api}/updateNode`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(updateData)
            }).then((res) => res.json())
                .then((data) => {
                    //console.log('API '+data);
                    return data
                        ;})
                .catch(error => {
                    console.log("This is error in Update node by id : ", updateData);
                    return error;
                });

export const updateCluster = (updateClusterData) =>
            fetch(`${api}/updateCluster`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(updateClusterData)
            }).then((res) => res.json())
                .then((data) => {
                    //console.log('API '+data);
                    return data
                        ;})
                .catch(error => {
                    console.log("This is error in Update cluster by id : ", updateClusterData);
                    return error;
                });
