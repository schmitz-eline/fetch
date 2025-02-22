const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const suggestions = document.querySelector('.suggestions');
const searchForm = document.querySelector('.search-form');

if (window.fetch) {
    // Exécuter ma requête fetch ici
    fetch(endpoint).then(response => {
        if (response.status === 200) {
            response.json().then(responseJSON => {
                cities.push(...responseJSON);
                console.log(cities);
            });
        } else {
            console.error(`Oups ! ${response.status}`);
        }
    }).catch(error => {
        console.log(`Aïe !! ${error}`);
    });
} else {
    // Faire quelque chose avec XMLHttpRequest ?
}

function findMatches(wordToMatch) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

function displayMatches(wordToMatch) {
    suggestions.innerHTML = findMatches(wordToMatch).map(item => {
        const regex = new RegExp(wordToMatch, 'gi');
        return `<li>
                    <span class="name">
                        ${item.city.replace(regex, `<span class="hl">${wordToMatch}</span>`)}, ${item.state.replace(regex, `<span class="hl">${wordToMatch}</span>`)}
                    </span>
                    <span class="population">
                        ${numberWithSpace(item.population)}
                    </span>
                </li>`;
    }).join('');
}

function numberWithSpace(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

searchForm.querySelector('#search').addEventListener('keyup', (event) => {
    displayMatches(event.currentTarget.value);
});