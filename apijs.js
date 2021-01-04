let url = "https://api.jikan.moe/v3";

//search title
function searchTitle(event){

  event.preventDefault(); 
  let myform = new FormData(this);
  let query = myform.get("search");

  fetch(`${url}/search/anime?q=${query}&page=1`) // gets url from user's input and excludes NSFW contents -> &genre=12&genre_exclude=0
  .then(res => res.json()) //converts to json 
  .then(eachTitle) //calls the eachTitle function
  .catch(err =>console.log(err.message)) //shows error message if any in console.log
}

/*Top Airing Anime API */
function topAirAnimeapi(){
  fetch(`${url}/top/anime/1/airing`)
  .then(res => res.json())
  .then(topAnimeData)
  .catch(err => console.log(err.message));
}

function topAnimeData(data){
  let topResult = document.getElementById("top-first")
  let topResult2 = document.getElementById("top-second")
  let topResult3 = document.getElementById("top-third")
  let topResult4 = document.getElementById("top-fourth")
  let topResult5 = document.getElementById("top-fifth")

  //data.top.forEach(title => { console.log(title)}); 

  
  topResult.innerHTML = data.top
  .map(topanime => {
    if (topanime.episodes == null) {
      topanime.episodes = "To be confirmed"
    }
    if (topanime.rank == 1) //takes the rank 1 show
    return `     
    <a href="${topanime.url} class="link"><img src="${topanime.image_url}"></a>
    <h5 style="color: gold;">Rank ${topanime.rank}</h5>
    <a href="${topanime.url} class="link"><h5>${topanime.title}</h5></a>
    <p style="text-align: center; font-weight: bold;">Overall Ratings: ${topanime.score}/10</p>
    
    `
}).join("");

  topResult2.innerHTML = data.top
  .map(topanime => {
    if(topanime.rank == 2)
    return `     
    <a href="${topanime.url} class="link"><img src="${topanime.image_url}"></a>
    <h5 style="color:	silver;">Rank ${topanime.rank}</h5>
    <a href="${topanime.url} class="link"><h5>${topanime.title}</h5></a>
    <p style="text-align: center; font-weight: bold;">Overall Ratings: ${topanime.score}/10</p>
    
    `
}).join("");

topResult3.innerHTML = data.top
.map(topanime => {
  if(topanime.rank == 3)
  return `     
  <a href="${topanime.url} class="link"><img src="${topanime.image_url}"></a>
  <h5 style="color:	silver;">Rank ${topanime.rank}</h5>
  <a href="${topanime.url} class="link"><h5>${topanime.title}</h5></a>
  <p style="text-align: center; font-weight: bold;">Overall Ratings: ${topanime.score}/10</p>
  
  `
}).join("");

topResult4.innerHTML = data.top
.map(topanime => {
  if(topanime.rank == 4)
  return `     
  <a href="${topanime.url} class="link"><img src="${topanime.image_url}"></a>
  <h5 style="color:	silver;">Rank ${topanime.rank}</h5>
  <a href="${topanime.url} class="link"><h5>${topanime.title}</h5></a>
  <p style="text-align: center; font-weight: bold;">Overall Ratings: ${topanime.score}/10</p>
  
  `
}).join("");

topResult5.innerHTML = data.top
.map(topanime => {
  if(topanime.rank == 5)
  return `     
  <a href="${topanime.url} class="link"><img src="${topanime.image_url}"></a>
  <h5 style="color:	silver;">Rank ${topanime.rank}</h5>
  <a href="${topanime.url} class="link"><h5>${topanime.title}</h5></a>
  <p style="text-align: center; font-weight: bold;">Overall Ratings: ${topanime.score}/10</p>
  
  `
}).join("");
  
}

/* Most Popular Anime API */
function mostPopAnimeapi(){
  fetch(`${url}/top/anime/1/bypopularity`)
  .then(res => res.json())
  .then(mostPopAnimeData)
  .catch(err => console.log(err.message));
}


function mostPopAnimeData(data){
  //data.top.forEach(title => { console.log(title)}); 

  let popResult = document.getElementById("pop-first")
  let popResult2 = document.getElementById("pop-second")
  let popResult3 = document.getElementById("pop-third")
  let popResult4 = document.getElementById("pop-fourth")
  let popResult5 = document.getElementById("pop-fifth")

  popResult.innerHTML = data.top
  .map(popanime => {
      if(popanime.rank == 1)
      return `     
      <a href="${popanime.url} class="link"><img src="${popanime.image_url}"></a>
      <h5 style="color: gold;">Rank ${popanime.rank}</h5>
      <a href="${popanime.url} class="link"><h5>${popanime.title}</h5></a>
      <p style="text-align: center; font-weight: bold;" class="ep">Episodes: ${popanime.episodes}</p>
      
      `
  }).join("");

  popResult2.innerHTML = data.top
  .map(popanime => {
      if(popanime.rank == 2)
      return `     
      <a href="${popanime.url} class="link"><img src="${popanime.image_url}"></a>
      <h5 style="color:	silver;">Rank ${popanime.rank}</h5>
      <a href="${popanime.url} class="link"><h5>${popanime.title}</h5></a>
      <p style="text-align: center; font-weight: bold;" class="ep">Episodes: ${popanime.episodes}</p>
      
      `
  }).join("");

  popResult3.innerHTML = data.top
  .map(popanime => {
      if(popanime.rank == 3)
      return `     
      <a href="${popanime.url} class="link"><img src="${popanime.image_url}"></a>
      <h5 style="color: brown;">Rank ${popanime.rank}</h5>
      <a href="${popanime.url} class="link"><h5>${popanime.title}</h5></a>
      <p style="text-align: center; font-weight: bold; "class="ep">Episodes: ${popanime.episodes}</p>
      
      `
  }).join("");

  popResult4.innerHTML = data.top
  .map(popanime => {
      if(popanime.rank == 4)
      return `     
      <a href="${popanime.url} class="link"><img src="${popanime.image_url}"></a>
      <h5>Rank ${popanime.rank}</h5>
      <a href="${popanime.url} class="link"><h5>${popanime.title}</h5></a>
      <p style="text-align: center; font-weight: bold;" class="ep">Episodes: ${popanime.episodes}</p>
      
      `
  }).join("");

  popResult5.innerHTML = data.top
  .map(popanime => {
      if(popanime.rank == 5)
      return `     
      <a href="${popanime.url} class="link"><img src="${popanime.image_url}"></a>
      <h5>Rank ${popanime.rank}</h5>
      <a href="${popanime.url} class="link"><h5>${popanime.title}</h5></a>
      <p style="text-align: center; font-weight: bold;" class="ep">Episodes: ${popanime.episodes}</p>
      
      `
  }).join("");


}

/*Top Upcoming Anime API*/
function upcAnimeapi(){
  fetch(`${url}/top/anime/1/upcoming`)
  .then(res => res.json())
  .then(upcAnimeData)
  .catch(err => console.log(err.message));
}

function upcAnimeData(data){
  let topUpcResult = document.getElementById("upcResult")
  //data.top.forEach(title => { console.log(title)}); 


  topUpcResult.innerHTML = data.top
  .map(topUpcAnime => {
    if (topUpcAnime.episodes == null){
      topUpcAnime.episodes = "?"
    }
    if (topUpcAnime.score == 0){
      topUpcAnime.score = "N/A"
    }
    if (topUpcAnime.rank <= 5)
    return `
    <div class="topupcanime_row">
      <li class="ranking-unit">
        <span class="rank">Rank ${topUpcAnime.rank}</span>
        <p class="data-image">
          <a class="image" href="${topUpcAnime.url}">
            <img src="${topUpcAnime.image_url}">
          </a>
        </p>
        <div class="data">
          <h3 class="h3 side">
            <a class="title" href="${topUpcAnime.url}">${topUpcAnime.title}</a>
          </h3>
          <span class="info pt8">
            ${topUpcAnime.type}, ${topUpcAnime.episodes} eps, scored ${topUpcAnime.score}
          </span>
        <br>
        </div>
      </li>
    </div>

    `
  }).join("");

}



/* Search Result API */
function eachTitle(name){
  let result = document.getElementById("searchdata"); 
  name.results.forEach(title => { console.log(title)}); //Checks for user's input result array, returns list of key value pair.

  
  //sort the animes by categories
  let animeCat = name.results
      .reduce((acc, anime) =>{
        let {type} = anime; //gets the key "type" from the array
        if (acc[type] === undefined) acc[type] = []; // if acc[type] is created, returns the array of the list of animes 
        acc[type].push(anime);
        return acc;

      }, {})

      //gets the key of the object and map it with the animelist
      result.innerHTML =  Object.keys(animeCat).map(key => { 


      let animeList = animeCat[key]
      .map(title =>{
      var date = new Date(title.start_date) //converts json time format to yy/mm/dd

      //gets the anime start & air date
      var startDate = [
        date.getUTCFullYear() , 
        ("0" + (date.getUTCMonth()+1)).slice(-2), 
        ("0" + date.getUTCDate()).slice(-2)
      ].join("-");

      var toAirDate = [
        date.getUTCFullYear() , 
        ("0" + (date.getUTCMonth()+1)).slice(-2), 
        ("0" + date.getUTCDate()).slice(-2)
      ].join("-");

      //checks if the anime is still airing or has finished airing or have yet to air
      if(title.score == "0"){
        status = "Not Aired Yet"; 
        startDate = "-";
        title.episodes = "?";
      }
      else if(title.airing == true) {
        status = "Currently Airing";
        title.episodes = "?";
        toAirDate = "-";
      }
      else{
        status= "Finished Airing";
        toAirDate = "-";
      }
      //prints the user's input result as an array in the form of HTML tags using cards
      return `
      
        <div class="card">
          <div class="card-image">
              <img src="${title.image_url}">
          </div>
          <div class="card-content">
            <span class="card-title"><strong><em>${title.title}</em></strong></span>
            <span><strong> Episode(s): ${title.episodes} </strong></span><br>  
            <span><strong> Status: ${status} </strong></span><br>
            <span><strong> Overall Ratings: ${title.score}/10 </strong></span><br>       
            <span><strong> Date Aired: ${startDate} </strong></span><br>
            <span><strong> To Air Date: ${toAirDate} </strong></span><br>
            <span class="label_warning">*Dates are in YYYY/MM/DD format</span><br><br>
            <header class="synopsis"><strong><u>Synopsis</u></strong></header>
            <p class="card-text">${title.synopsis}</p>
          </div>
          <div class="card-action">
            <a href="${title.url}" class="card-action" target="_blank">MyAnimeList Link</a>
          </div>
        </div>
        `
      }).join("");

      //prints the anime list and the category that the anime is listed in uppercase e.g. TV/OVA/Movie
      return `
      <section class="sect">
        <h4>${key.toUpperCase()}</h4>
        <div class="rowrow">${animeList}</div>
      </section>
      `

      }).join("");


}

function loadpage(){
  let form = document.getElementById("searchtitle");
  form.addEventListener("submit", searchTitle); 
}


function myFunction(){ 
  document.getElementById("search").innerHTML
}

/*Loads Search Result API */
window.addEventListener("load", loadpage)
/*Loads Top Airing Anime API */
window.addEventListener("load", topAirAnimeapi);
/*Loads Most Popular Anime API */
window.addEventListener("load", mostPopAnimeapi)
/*Loads Top Upcoming Anime API */
window.addEventListener("load", upcAnimeapi);


//navigation hamburger for mobile
$(".button-collapse").sideNav();


//carousel auto slider
$(document).ready(function(){
  $('.carousel').carousel();
  setInterval(function() {
      $('.carousel').carousel('next');
    }, 4500); 
}   );