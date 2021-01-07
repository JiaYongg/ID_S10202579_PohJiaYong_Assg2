let url = "https://api.jikan.moe/v3";

//Search title API
function searchTitle(event){

  event.preventDefault(); 
  let myform = new FormData(this);
  let query = myform.get("search");

  fetch(`${url}/search/anime?q=${query}&page=1`) // gets url from user's input and excludes NSFW contents -> &genre=12&genre_exclude=0
  .then(res => res.json()) //converts to json 
  .then(eachTitle) //calls the eachTitle function
  .then(myFunction)//upon clicking the "Search" button, it scrolls downs to the result
  .catch(err =>console.log(err.message)) //shows error message if any in console.log
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
      //console.log(animeCat)
      
      //loop through the animeCat array and gets the key of the object and map it with the animelist
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

        //prints the user's input result as a string in the form of HTML tags using cards
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
              <header class="synopsiss"><strong><u>Synopsis</u></strong></header>
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
          <h4 style="text-align: center;">${key.toUpperCase()}</h4>
          <div class="rowrow" id="section2">${animeList}</div>
        </section>
        `
        }).join("");

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
    <a href="${topanime.url} class="link" target="_blank"><img src="${topanime.image_url}"></a>
    <h5 style="color: gold;">Rank ${topanime.rank}</h5>
    <a href="${topanime.url} class="link" target="_blank"><h5>${topanime.title}</h5></a>
    <p style="text-align: center; font-weight: bold;">Overall Ratings: ${topanime.score}/10</p>
    `
}).join("");

  topResult2.innerHTML = data.top
  .map(topanime => {
    if(topanime.rank == 2)
    return `     
    <a href="${topanime.url} class="link" target="_blank"><img src="${topanime.image_url}"></a>
    <h5 style="color:	silver;">Rank ${topanime.rank}</h5>
    <a href="${topanime.url} class="link" target="_blank"><h5>${topanime.title}</h5></a>
    <p style="text-align: center; font-weight: bold;">Overall Ratings: ${topanime.score}/10</p>
    `
}).join("");

topResult3.innerHTML = data.top
.map(topanime => {
  if(topanime.rank == 3)
  return `     
  <a href="${topanime.url} class="link" target="_blank"><img src="${topanime.image_url}"></a>
  <h5 style="color:	brown;">Rank ${topanime.rank}</h5>
  <a href="${topanime.url} class="link" target="_blank"><h5>${topanime.title}</h5></a>
  <p style="text-align: center; font-weight: bold;">Overall Ratings: ${topanime.score}/10</p>
  `
}).join("");

topResult4.innerHTML = data.top
.map(topanime => {
  if(topanime.rank == 4)
  return `     
  <a href="${topanime.url} class="link" target="_blank"><img src="${topanime.image_url}"></a>
  <h5>Rank ${topanime.rank}</h5>
  <a href="${topanime.url} class="link" target="_blank"><h5>${topanime.title}</h5></a>
  <p style="text-align: center; font-weight: bold;">Overall Ratings: ${topanime.score}/10</p>
  `
}).join("");

topResult5.innerHTML = data.top
.map(topanime => {
  if(topanime.rank == 5)
  return `     
  <a href="${topanime.url} class="link" target="_blank"><img src="${topanime.image_url}"></a>
  <h5>Rank ${topanime.rank}</h5>
  <a href="${topanime.url} class="link" target="_blank"><h5>${topanime.title}</h5></a>
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
      <a href="${popanime.url} class="link" target="_blank"><img src="${popanime.image_url}"></a>
      <h5 style="color: gold;">Rank ${popanime.rank}</h5>
      <a href="${popanime.url} class="link" target="_blank"><h5>${popanime.title}</h5></a>
      <p style="text-align: center; font-weight: bold;" class="ep">Episodes: ${popanime.episodes}</p>
      `
  }).join("");

  popResult2.innerHTML = data.top
  .map(popanime => {
      if(popanime.rank == 2)
      return `     
      <a href="${popanime.url} class="link" target="_blank"><img src="${popanime.image_url}"></a>
      <h5 style="color:	silver;">Rank ${popanime.rank}</h5>
      <a href="${popanime.url} class="link" target="_blank"><h5>${popanime.title}</h5></a>
      <p style="text-align: center; font-weight: bold;" class="ep">Episodes: ${popanime.episodes}</p>
      `
  }).join("");

  popResult3.innerHTML = data.top
  .map(popanime => {
      if(popanime.rank == 3)
      return `     
      <a href="${popanime.url} class="link" target="_blank"><img src="${popanime.image_url}"></a>
      <h5 style="color: brown;">Rank ${popanime.rank}</h5>
      <a href="${popanime.url} class="link" target="_blank"><h5>${popanime.title}</h5></a>
      <p style="text-align: center; font-weight: bold; "class="ep">Episodes: ${popanime.episodes}</p>
      `
  }).join("");

  popResult4.innerHTML = data.top
  .map(popanime => {
      if(popanime.rank == 4)
      return `     
      <a href="${popanime.url} class="link" target="_blank"><img src="${popanime.image_url}"></a>
      <h5>Rank ${popanime.rank}</h5>
      <a href="${popanime.url} class="link" target="_blank"><h5>${popanime.title}</h5></a>
      <p style="text-align: center; font-weight: bold;" class="ep">Episodes: ${popanime.episodes}</p>
      `
  }).join("");

  popResult5.innerHTML = data.top
  .map(popanime => {
      if(popanime.rank == 5)
      return `     
      <a href="${popanime.url} class="link" target="_blank"><img src="${popanime.image_url}"></a>
      <h5>Rank ${popanime.rank}</h5>
      <a href="${popanime.url} class="link" target="_blank"><h5>${popanime.title}</h5></a>
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
          <a class="image" href="${topUpcAnime.url}" target="_blank">
            <img src="${topUpcAnime.image_url}">
          </a>
        </p>
        <div class="data">
          <h3 class="h3 side">
            <a class="title" href="${topUpcAnime.url}" target="_blank">${topUpcAnime.title}</a>
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


/*Daily Anime Schedule API */

/*Monday Anime API*/
function monScheduleapi(){
  fetch(`${url}/schedule`)
  .then(res => res.json())
  .then(monScheduleData)
  .catch(err => console.log(err.message));
}

function monScheduleData(data){

  let schedule = document.getElementById("monAnimeSchedule")
  //console.log(data)
  //data.monday.forEach(title => { console.log(title)}); 
  schedule.innerHTML = data.monday
  .map(mondaySchedule => {

    //set genres as a string and loops the sundaySchedule genres array and append each object's "name" to genres and 
    //when it hits the 4th iteration of genre tags, it will send a <br> tag to seperate the rest of the genres to the next line
    let genres = "";
    var i;
    for (i = 0; i < (mondaySchedule.genres).length; i++) {
      if(i == 4){
        genres += "<br>"
      }
      genres += ('<span class="genretype">' + mondaySchedule.genres[i].name + '</span>')
    }
    
    // console.log(genres)
    var date = new Date(mondaySchedule.airing_start)

    if(mondaySchedule.episodes == null){
      mondaySchedule.episodes = "?";
    }
    if(mondaySchedule.score == null){
      mondaySchedule.score = "N/A"
    }
    else{
      mondaySchedule.score = `${mondaySchedule.score}/10`
    }

    return `
    <div class="card">
      <div class="card-image">
          <img src="${mondaySchedule.image_url}">
      </div>
      <span class="genre">${genres}</span>
      <div class="card-content">
        <span class="card-title"><strong><a class="title" href="${mondaySchedule.url}" target="_blank"><em>${mondaySchedule.title}</em></a></strong></span>
        <span><strong> Episode(s): ${mondaySchedule.episodes} </strong></span><br>  
        <span><strong>Air Date: ${date.toLocaleString()} </strong></span><br>  
        <span><strong> Overall Ratings: ${mondaySchedule.score} </strong></span>   
      </div>    
      <p class="synopsis">${mondaySchedule.synopsis}</p>
      <div class="card-action">
        <a href="${mondaySchedule.url}" class="card-action" target="_blank">MyAnimeList Link</a>
      </div>
    </div>
    `
  }).join("");
  
}

/*Tuesday Anime API*/
function tuesScheduleapi(){
  fetch(`${url}/schedule`)
  .then(res => res.json())
  .then(tuesScheduleData)
  .catch(err => console.log(err.message));
}

function tuesScheduleData(data){

  let schedule = document.getElementById("tuesAnimeSchedule")
  schedule.innerHTML = data.tuesday
  .map(tuesdaySchedule => {

    //set genres as a string and loops the sundaySchedule genres array and append each object's "name" to genres and 
    //when it hits the 4th iteration of genre tags, it will send a <br> tag to seperate the rest of the genres to the next line
    let genres = "";
    var i;
    for (i = 0; i < (tuesdaySchedule.genres).length; i++) {
      if(i == 4){
        genres += "<br>"
      }
      genres += ('<span class="genretype">' + tuesdaySchedule.genres[i].name + '</span>')
    }
      
    var date = new Date(tuesdaySchedule.airing_start)
    
    if(tuesdaySchedule.episodes == null){
      tuesdaySchedule.episodes = "?";
    }
    if(tuesdaySchedule.score == null){
      tuesdaySchedule.score = "N/A"
    }
    else{
      tuesdaySchedule.score = `${tuesdaySchedule.score}/10`
    }
    
    return `
    <div class="card">
      <div class="card-image">
          <img src="${tuesdaySchedule.image_url}">
      </div>
      <span class="genre">${genres}</span>
      <div class="card-content">
        <span class="card-title"><strong><a class="title" href="${tuesdaySchedule.url}" target="_blank"><em>${tuesdaySchedule.title}</em></a></strong></span>
        <span><strong> Episode(s): ${tuesdaySchedule.episodes} </strong></span><br>  
        <span><strong>Air Date: ${date.toLocaleString()} </strong></span><br>  
        <span><strong> Overall Ratings: ${tuesdaySchedule.score} </strong></span>   
      </div>    
      <p class="synopsis">${tuesdaySchedule.synopsis}</p>
      <div class="card-action">
        <a href="${tuesdaySchedule.url}" class="card-action" target="_blank">MyAnimeList Link</a>
      </div>
    </div>
    `
  }).join("");
  
}


/*Wednesday Anime API*/
function wedScheduleapi(){
  fetch(`${url}/schedule`)
  .then(res => res.json())
  .then(wedScheduleData)
  .catch(err => console.log(err.message));
}

function wedScheduleData(data){

  let schedule = document.getElementById("wedAnimeSchedule")
  schedule.innerHTML = data.wednesday
  .map(wednesdaySchedule => {

    //set genres as a string and loops the sundaySchedule genres array and append each object's "name" to genres and 
    //when it hits the 4th iteration of genre tags, it will send a <br> tag to seperate the rest of the genres to the next line
    let genres = "";
    var i;
    for (i = 0; i < (wednesdaySchedule.genres).length; i++) {
      if(i == 4){
        genres += "<br>"
      }
      genres += ('<span class="genretype">' + wednesdaySchedule.genres[i].name + '</span>')
    }
      
    var date = new Date(wednesdaySchedule.airing_start)
    
    if(wednesdaySchedule.episodes == null){
      wednesdaySchedule.episodes = "?";
    }
    if(wednesdaySchedule.score == null){
      wednesdaySchedule.score = "N/A"
    }
    else{
      wednesdaySchedule.score = `${wednesdaySchedule.score}/10`
    }
      
    return `
    <div class="card">
      <div class="card-image">
          <img src="${wednesdaySchedule.image_url}">
      </div>
      <span class="genre">${genres}</span>
      <div class="card-content">
        <span class="card-title"><strong><a class="title" href="${wednesdaySchedule.url}" target="_blank"><em>${wednesdaySchedule.title}</em></a></strong></span>
        <span><strong> Episode(s): ${wednesdaySchedule.episodes} </strong></span><br>  
        <span><strong>Air Date: ${date.toLocaleString()} </strong></span><br>  
        <span><strong> Overall Ratings: ${wednesdaySchedule.score} </strong></span>   
      </div>    
      <p class="synopsis">${wednesdaySchedule.synopsis}</p>
      <div class="card-action">
        <a href="${wednesdaySchedule.url}" class="card-action" target="_blank">MyAnimeList Link</a>
      </div>
    </div>
    `
}).join("");
  
}


/*Thursday Anime API*/
function thursScheduleapi(){
  fetch(`${url}/schedule`)
  .then(res => res.json())
  .then(thursScheduleData)
  .catch(err => console.log(err.message));
}

function thursScheduleData(data){

  let schedule = document.getElementById("thursAnimeSchedule")
  schedule.innerHTML = data.thursday
  .map(thursdaySchedule => {

    //set genres as a string and loops the sundaySchedule genres array and append each object's "name" to genres and 
    //when it hits the 4th iteration of genre tags, it will send a <br> tag to seperate the rest of the genres to the next line
    let genres = "";
    var i;
    for (i = 0; i < (thursdaySchedule.genres).length; i++) {
      if(i == 4){
        genres += "<br>"
      }
      genres += ('<span class="genretype">' + thursdaySchedule.genres[i].name + '</span>')
    }
      
    var date = new Date(thursdaySchedule.airing_start)
    
    if(thursdaySchedule.episodes == null){
      thursdaySchedule.episodes = "?";
    }
    if(thursdaySchedule.score == null){
      thursdaySchedule.score = "N/A"
    }
    else{
      thursdaySchedule.score = `${thursdaySchedule.score}/10`
    }
    
    return `
    <div class="card">
      <div class="card-image">
          <img src="${thursdaySchedule.image_url}">
      </div>
      <span class="genre">${genres}</span>
      <div class="card-content">
        <span class="card-title"><strong><a class="title" href="${thursdaySchedule.url}" target="_blank"><em>${thursdaySchedule.title}</em></a></strong></span>
        <span><strong> Episode(s): ${thursdaySchedule.episodes} </strong></span><br>  
        <span><strong>Air Date: ${date.toLocaleString()} </strong></span><br>  
        <span><strong> Overall Ratings: ${thursdaySchedule.score} </strong></span>   
      </div>    
      <p class="synopsis">${thursdaySchedule.synopsis}</p>
      <div class="card-action">
        <a href="${thursdaySchedule.url}" class="card-action" target="_blank">MyAnimeList Link</a>
      </div>
    </div>
    `
  }).join("");
  
}


/*Friday Anime API*/
function friScheduleapi(){
  fetch(`${url}/schedule`)
  .then(res => res.json())
  .then(friScheduleData)
  .catch(err => console.log(err.message));
}

function friScheduleData(data){

  let schedule = document.getElementById("friAnimeSchedule")
  schedule.innerHTML = data.friday
  .map(fridaySchedule => {

    //set genres as a string and loops the sundaySchedule genres array and append each object's "name" to genres and 
    //when it hits the 4th iteration of genre tags, it will send a <br> tag to seperate the rest of the genres to the next line
    let genres = "";
    var i;
    for (i = 0; i < (fridaySchedule.genres).length; i++) {
      if(i == 4){
        genres += "<br>"
      }
      genres += ('<span class="genretype">' + fridaySchedule.genres[i].name + '</span>')
    }
      
    var date = new Date(fridaySchedule.airing_start)
    
    if(fridaySchedule.episodes == null){
      fridaySchedule.episodes = "?";
    }
    if(fridaySchedule.score == null){
      fridaySchedule.score = "N/A"
    }
    else{
      fridaySchedule.score = `${fridaySchedule.score}/10`
    }
    
    return `
    <div class="card">
      <div class="card-image">
          <img src="${fridaySchedule.image_url}">
      </div>
      <span class="genre">${genres}</span>
      <div class="card-content">
        <span class="card-title"><strong><a class="title" href="${fridaySchedule.url}" target="_blank"><em>${fridaySchedule.title}</em></a></strong></span>
        <span><strong> Episode(s): ${fridaySchedule.episodes} </strong></span><br>  
        <span><strong>Air Date: ${date.toLocaleString()} </strong></span><br>  
        <span><strong> Overall Ratings: ${fridaySchedule.score} </strong></span>   
      </div>    
      <p class="synopsis">${fridaySchedule.synopsis}</p>
      <div class="card-action">
        <a href="${fridaySchedule.url}" class="card-action" target="_blank">MyAnimeList Link</a>
      </div>
    </div>
    `
  }).join("");

}


/*Saturday Anime API*/
function satScheduleapi(){
  fetch(`${url}/schedule`)
  .then(res => res.json())
  .then(satScheduleData)
  .catch(err => console.log(err.message));
}

function satScheduleData(data){

  let schedule = document.getElementById("satAnimeSchedule")
  schedule.innerHTML = data.saturday
  .map(saturdaySchedule => {

    //set genres as a string and loops the sundaySchedule genres array and append each object's "name" to genres and 
    //when it hits the 4th iteration of genre tags, it will send a <br> tag to seperate the rest of the genres to the next line
    let genres = "";
    var i;
    for (i = 0; i < (saturdaySchedule.genres).length; i++) {
      if(i == 4){
        genres += "<br>"
      }
      genres += ('<span class="genretype">' + saturdaySchedule.genres[i].name + '</span>')
    }     
    var date = new Date(saturdaySchedule.airing_start)
    
    if(saturdaySchedule.episodes == null){
      saturdaySchedule.episodes = "?";
    }
    if(saturdaySchedule.score == null){
      saturdaySchedule.score = "N/A"
    }
    else{
      saturdaySchedule.score = `${saturdaySchedule.score}/10`
    }
    
    return `
    <div class="card">
      <div class="card-image">
          <img src="${saturdaySchedule.image_url}">
      </div>
      <span class="genre">${genres}</span>
      <div class="card-content">
        <span class="card-title"><strong><a class="title" href="${saturdaySchedule.url}" target="_blank"><em>${saturdaySchedule.title}</em></a></strong></span>
        <span><strong> Episode(s): ${saturdaySchedule.episodes} </strong></span><br>  
        <span><strong>Air Date: ${date.toLocaleString()} </strong></span><br>  
        <span><strong> Overall Ratings: ${saturdaySchedule.score} </strong></span>   
      </div>    
      <p class="synopsis">${saturdaySchedule.synopsis}</p>
      <div class="card-action">
        <a href="${saturdaySchedule.url}" class="card-action" target="_blank">MyAnimeList Link</a>
      </div>
    </div>
    `
  }).join("");
  
}


/*Sunday Anime API*/
function sunScheduleapi(){
  fetch(`${url}/schedule`)
  .then(res => res.json())
  .then(sunScheduleData)
  .catch(err => console.log(err.message));
}

function sunScheduleData(data){

  let schedule = document.getElementById("sunAnimeSchedule")
  schedule.innerHTML = data.sunday
  .map(sundaySchedule => {


    //set genres as a string and loops the sundaySchedule genres array and append each object's "name" to genres and 
    //when it hits the 4th iteration of genre tags, it will send a <br> tag to seperate the rest of the genres to the next line
    let genres = "";
    var i;
    for (i = 0; i < (sundaySchedule.genres).length; i++) {
      if(i == 4){
        genres += "<br>"
      }
      genres += ('<span class="genretype">' + sundaySchedule.genres[i].name + '</span>')
    }

  
    var date = new Date(sundaySchedule.airing_start)
    
    if(sundaySchedule.episodes == null){
      sundaySchedule.episodes = "?";
    }
    if(sundaySchedule.score == null){
      sundaySchedule.score = "N/A"
    }
    else{
      sundaySchedule.score = `${sundaySchedule.score}/10`
    }
    
    return `
    <div class="card">
      <div class="card-image">
          <img src="${sundaySchedule.image_url}">
      </div>
      <span class="genre">${genres}</span>
      <div class="card-content">
        <span class="card-title"><strong><a class="title" href="${sundaySchedule.url}" target="_blank"><em>${sundaySchedule.title}</em></a></strong></span>
        <span><strong> Episode(s): ${sundaySchedule.episodes} </strong></span><br>  
        <span><strong>Air Date: ${date.toLocaleString()} </strong></span><br>  
        <span><strong> Overall Ratings: ${sundaySchedule.score} </strong></span>   
      </div>    
      <p class="synopsis">${sundaySchedule.synopsis}</p>
      <div class="card-action">
        <a href="${sundaySchedule.url}" class="card-action" target="_blank">MyAnimeList Link</a>
      </div>
    </div>
    `
  }).join("");
  
}


/*Functions to run the webpage*/
function loadpage(){
  let form = document.getElementById("searchtitle");
  form.addEventListener("submit", searchTitle); 
}


function myFunction(){ 
  $('html,body').animate({
    scrollTop: $(".sect").offset().top},
    'slow');
}


/*Loads Search Result API */
window.addEventListener("load", loadpage)
/*Loads Top Airing Anime API */
window.addEventListener("load", topAirAnimeapi);
/*Loads Most Popular Anime API */
window.addEventListener("load", mostPopAnimeapi)
/*Loads Top Upcoming Anime API */
window.addEventListener("load", upcAnimeapi);
/*Loads Monday Schedule Anime API */
window.addEventListener("load", monScheduleapi)
/*Loads Tuesday Schedule Anime API */
window.addEventListener("load", tuesScheduleapi)
/*Loads Wednesday Schedule Anime API */
window.addEventListener("load", wedScheduleapi)
/*Loads Thursday Schedule Anime API */
window.addEventListener("load", thursScheduleapi)
/*Loads Friday Schedule Anime API */
window.addEventListener("load", friScheduleapi)
/*Loads Saturday Schedule Anime API */
window.addEventListener("load", satScheduleapi)
/*Loads Sunday Schedule Anime API */
window.addEventListener("load", sunScheduleapi)


//sidebar navigation for mobile
$(".button-collapse").sideNav();


//carousel auto slider
$(document).ready(function(){
  $('.carousel').carousel();
  setInterval(function() {
      $('.carousel').carousel('next');
    }, 4500); 
}   );


$('#search').keypress(function(e){
  if(e.keyCode == 13){
    myFunction;
  }
});

