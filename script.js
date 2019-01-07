var apiKey = 'rgsAqsFxMxT9w41rIuv5Jt4Uk7Z3Z8rPaNqEUzll';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson, maxResults){
    $('.results').empty();
    console.log(responseJson);
    for (let i = 0; i < responseJson.length; i++){
        $('.results').append(
            `<li>
            <h2><a href='${responseJson[i].url}'>${responseJson[i].fullName}</a></h2>
            </li>
            <li>
            <p>${responseJson[i].description}</p>
            </li>
        `);
    }
    $('.results').removeClass('hidden');
}

function getParks(query, maxResults=10){
    const params = {
        stateCode: query,
        limit: max,
    };

    const queryString = formatQueryParams(params);
    const url = searchUrl + 'parks?' + queryString;
    console.log(url);

    const options = {
        headers: new Headers({
            "X-Api-Key": apiKey
        })
    };
    
    fetch(url, options)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, maxResults))
        .catch(error => {
            $('body').append(`Error placeholder text`);
        });
}

function listenForSubmit(){
    $('#stateCodes').submit(event => {
        event.preventDefault();
        console.log('Retrieving...');
        const stateCode = ('#stateSelect').val();
        const maxResults = ('#maxResults').val();
        getParks(stateCode, maxResults);
    });
}

$(function(){
  console.log('ready!');
  listenForSubmit();
});