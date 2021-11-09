console.log("JS Loaded");

const baseQueryUrl = "https://api.tvmaze.com/search/shows/?q=";
const baseMovieUrl = "https://api.tvmaze.com/shows/";

const searchField = document.getElementById("show-search");
const select = document.getElementById("show-select");
const details = document.getElementById("show-details");
const searchForm = document.getElementById("search");

function addSelectOptions(keyWord, listOfShows) {
  let options = `<option value="">Shows matching ${keyWord}...</option>`;

  for (const element of listOfShows) {
    const show = element.show;
    options += `<option value="${show.id}">${show.name}</option>`;
    select.innerHTML = options;
    select.style.display = "block";
  }
}

async function handleSearch(event) {
  event.preventDefault();
  const keyWord = searchField.value;
  const searchQuery = baseQueryUrl + keyWord;
  searchField.value = "";

  try {
    const queryResponse = await fetch(searchQuery);
    const listOfShows = await queryResponse.json();
    addSelectOptions(keyWord, listOfShows); // sync function, so we don't need the await
    // .then(response => response.json())
    // .then( listOfShows => addSelectOptions(keyWord, listOfShows))
  } catch (error) {
    console.log("Error", console.log(error));
    details.innerHTML = `
    <h2 class='fail'> Sorry, we had issues retrieving data for ${keyWord}. Please try again.</h2>
    <p>${error}</p>`;
  }
}

async function handleShowDetails(event) {
  const showId = select.value;
  if (!showId) return;

  const oneMovieQuery = baseMovieUrl + showId; // This will end up as http://api.tvmaze.com/shows/32413134131
  try {
    const apiResponse = await fetch(oneMovieQuery);
    const show = await apiResponse.json();
    const detailsHTML = `<h2>${show.name}</h2>
        <img src=${show.image ? show.image.original : ""} />
        <p>${show.summary}</p>`;
    details.innerHTML = detailsHTML;
  } catch (error) {
    console.log(error);
  }
}

searchForm.addEventListener("submit", handleSearch);
select.addEventListener("change", handleShowDetails);
