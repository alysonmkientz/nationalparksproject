var apiKey = 'rgsAqsFxMxT9w41rIuv5Jt4Uk7Z3Z8rPaNqEUzll';
const searchUrl = 'https://api.nps.gov/api/v1/'

function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson, maxResults){
    $('.results').empty();
    console.log(responseJson);
    for (let i = 0; i < responseJson.data.length; i++){
        $('.results').append(
            `<li>
            <h2><a href='${responseJson.data[i].url}'>${responseJson.data[i].fullName}</a></h2>
            </li>
            <li>
            <p>${responseJson.data[i].description}</p>
            </li>
        `);
    }
    $('.results').removeClass('hidden');
}

function getParks(query, maxResults){
    const params = {
        stateCode: query,
        limit: maxResults,
    };

    const queryString = formatQueryParams(params);
    const url = searchUrl + 'parks?' + queryString + '&api_Key=' + apiKey;
    console.log(url);
    
    fetch(url)
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
        const stateCode = $('#stateSelect').val();
        const maxResults = $('#maxResults').val() - 1;
        console.log(maxResults);
        getParks(stateCode, maxResults);
    });
}

$(function(){
  console.log('ready!');
  listenForSubmit();
});