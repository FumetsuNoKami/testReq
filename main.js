fetch('http://localhost:5249/directors')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    });