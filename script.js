// Global Variables
var publicKey = 'b31650de71b09d0754200e72e576c942';
var privateKey = 'da316a2601f557bcdff401ccd1d4533788505498';
var timestamp = Date.now().toString();
var hash = generateHash(timestamp, privateKey, publicKey);
var apiUrl = 'https://gateway.marvel.com:443/v1/public/characters';

var searchForm = document.getElementById('search-form');
var searchInput = document.getElementById('search-input');
var searchResultsContainer = document.getElementById('search-results');
var favoriteSuperheroesContainer = document.getElementById(
  'favorite-superheroes'
);

var favoriteSuperheroes = [];

// Generate hash using CryptoJS library
function generateHash(timestamp, privateKey, publicKey) {
  var input = timestamp + privateKey + publicKey;
  return CryptoJS.MD5(input).toString();
}

// Perform API request to search for superheroes
function searchSuperheroes(searchQuery) {
  var url = `${apiUrl}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${searchQuery}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displaySearchResults(data.data.results);
    })
    .catch(function (error) {
      console.log('An error occurred:', error);
    });
}

// Display search results
function displaySearchResults(results) {
  searchResultsContainer.innerHTML = '';

  if (results.length === 0) {
    var emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No superheroes found.';
    searchResultsContainer.appendChild(emptyMessage);
  } else {
    results.forEach(function (superhero) {
      var superheroCard = createSuperheroCard(superhero, false);
      searchResultsContainer.appendChild(superheroCard);
    });
  }
}

// Function to create superhero card
function createSuperheroCard(superhero, isFavoriteList) {
  var superheroCard = document.createElement('div');
  superheroCard.classList.add('superhero-card');

  var name = document.createElement('h2');
  name.textContent = superhero.name;
  superheroCard.appendChild(name);

  var image = document.createElement('img');
  image.src = `${superhero.thumbnail.path}/standard_fantastic.${superhero.thumbnail.extension}`;
  image.alt = superhero.name;
  superheroCard.appendChild(image);

  if (isFavoriteList) {
    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remove from Favorites';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', function () {
      removeFromFavorites(superhero);
    });
    superheroCard.appendChild(removeButton);
  } else {
    var favoriteButton = document.createElement('button');
    favoriteButton.textContent = 'Add to Favorites';
    favoriteButton.classList.add('favorite-button');
    favoriteButton.addEventListener('click', function () {
      addToFavorites(superhero);
    });
    superheroCard.appendChild(favoriteButton);
  }

  return superheroCard;
}

// Function to update favorite superheroes
function updateFavoriteSuperheroes() {
  favoriteSuperheroesContainer.innerHTML = '';

  if (favoriteSuperheroes.length === 0) {
    var emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No favorite superheroes yet.';
    favoriteSuperheroesContainer.appendChild(emptyMessage);
  } else {
    favoriteSuperheroes.forEach(function (superhero) {
      var superheroCard = createSuperheroCard(superhero, true);
      favoriteSuperheroesContainer.appendChild(superheroCard);
    });
  }
}

// Function to add superhero to favorites
function addToFavorites(superhero) {
  favoriteSuperheroes.push(superhero);
  updateFavoriteSuperheroes();
}

// Function to remove superhero from favorites
function removeFromFavorites(superhero) {
  var index = favoriteSuperheroes.indexOf(superhero);
  if (index !== -1) {
    favoriteSuperheroes.splice(index, 1);
    updateFavoriteSuperheroes();
  }
}

// Event listener for search form submission
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var searchQuery = searchInput.value.trim();
  if (searchQuery !== '') {
    searchSuperheroes(searchQuery);
  }
});

// Initial display of favorite superheroes
updateFavoriteSuperheroes();

// Function to create superhero details card
function createSuperheroDetailsCard(superhero) {
  var superheroDetailsCard = document.createElement('div');
  superheroDetailsCard.classList.add('superhero-details-card');

  var name = document.createElement('h2');
  name.textContent = superhero.name;
  superheroDetailsCard.appendChild(name);

  var image = document.createElement('img');
  image.src = `${superhero.thumbnail.path}/standard_fantastic.${superhero.thumbnail.extension}`;
  image.alt = superhero.name;
  superheroDetailsCard.appendChild(image);

  var description = document.createElement('p');
  description.textContent = superhero.description;
  superheroDetailsCard.appendChild(description);

  var comics = document.createElement('p');
  comics.textContent = `Comics: ${superhero.comics.available}`;
  superheroDetailsCard.appendChild(comics);

  var events = document.createElement('p');
  events.textContent = `Events: ${superhero.events.available}`;
  superheroDetailsCard.appendChild(events);

  var series = document.createElement('p');
  series.textContent = `Series: ${superhero.series.available}`;
  superheroDetailsCard.appendChild(series);

  var stories = document.createElement('p');
  stories.textContent = `Stories: ${superhero.stories.available}`;
  superheroDetailsCard.appendChild(stories);

  return superheroDetailsCard;
}

// Function to display superhero details
function displaySuperheroDetails(superhero) {
  var superheroDetailsContainer = document.getElementById('superhero-details');
  superheroDetailsContainer.innerHTML = '';

  var superheroDetailsCard = createSuperheroDetailsCard(superhero);
  superheroDetailsContainer.appendChild(superheroDetailsCard);
}

// Event listener for clicking on superhero card
function handleSuperheroCardClick(superhero) {
  displaySuperheroDetails(superhero);
}

// Display search results
function displaySearchResults(results) {
  searchResultsContainer.innerHTML = '';

  if (results.length === 0) {
    // ...existing code...
  } else {
    results.forEach(function (superhero) {
      var superheroCard = createSuperheroCard(superhero, false);
      superheroCard.addEventListener('click', function () {
        handleSuperheroCardClick(superhero);
      });
      searchResultsContainer.appendChild(superheroCard);
    });
  }
}
