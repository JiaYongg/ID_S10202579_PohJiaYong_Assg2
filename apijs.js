let url = "https://api.jikan.moe/v3";

function searchTitle(event){

  event.preventDefault(); 
  let myform = new FormData(this);
  let query = myform.get("search");

  fetch(`${url}/search/anime?q=${query}&page=1`) // gets url from user's input
  .then(res => res.json()) //converts to json 
  .then(eachTitle) //calls the eachTitle function
  .catch(err =>console.log(err.message)) //shows error message if any in console.log
}

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

      //gets the anime/manga air date
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

      //checks if the anime is still airing or has finished airing
      if(title.score == "0"){
        status = "Not Aired Yet"; 
        startDate = "-";
      }
      else if(title.airing == true) {
        status = "Currently Airing";
        title.episodes = "-";
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
      <section>
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

window.addEventListener("load", loadpage)