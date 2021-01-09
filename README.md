# MyAnimeList(MAL) Replica (ID Assignment-2)
Done by: Poh Jia Yong, S10202579J

MAL Replica allows users to view the "Top Upcoming Anime", "Most Popular Anime of All Time" and shows that are currently airing for each day(monday-friday) based on the API.

Each of the anime that is shown in the site includes:
1. Category of Anime
2. Anime Title
3. Anime Genre
4. Number of Episodes
5. Overall Ratings out of 10 by users who uses the actual MAL to rate the anime
6. Date aired/To air date

# Design Process
This webpage is cater to teenager/adults who watches anime and would like to find out more about a certain anime.
I tried to make it as similar to the actual MyAnimeList webpage as possible, as the aim of my webpage is to serve the MyAnimeList experience to the user using my webpage.

I also designed it to look plain similar to the MyAnimeList webpage so that the experience can feel similar to the actual MyAnimeList. The color scheme of the container "Top Upcoming Anime" is also based off on MyAnimeList design. The reason why i put the "Yin and Yang" as my logo is because just like in an anime plot, there is always both good and evil character within each anime's story line and i felt that it suited the webpage I was working on.

My webpage also shows updated version of the animes! 
Let's say if there are new animes coming out in March, the "Top Upcoming Anime" list would update based on the API from MyAnimeList to the top upcoming animes!

From a user's perspective, viewing my webpage would be similar to viewing it from the MyAnimeList in terms of looks and content, it is user-friendly and looks almost the same as the actual MyAnimeList!

I specifically chose this API because I felt that it would be useful to me in the future as I love watching animes and reading the synopsis for each interesting title. So to actually create them for my own use, it is something that I had always wanted to do.

### Wireframe Links
1. Desktop Wireframe: https://xd.adobe.com/view/173eb18d-3893-4757-826c-ca579574cec0-426d/grid
2. Mobile Wireframe: https://xd.adobe.com/view/b2ed8325-d811-4a98-8666-4b94c2099131-e7be/grid
   
*scroll down upon clicking into the wireframe to view it completely!

*design made in wireframe is intentional to make it feel like my webpage.
# Features

## Existing Features
Feature
1. Visually appealing carousel that rotates every 4.5seconds to display top ranking animes
2. Search bar and button, allows users to type in an anime name/title and it filters to what you have searched e.g. One Piece, upon click the button, it will automatically scroll down to the results.
3. Every of the anime titles are clickable and it links to the respective MyAnimeList listing of the anime.
4. Images for "Top Upcoming Anime", "Most Popular Anime Of All Time" and "Top Airing Anime" are clickable and it links to the respective MyAnimeList listing of the anime.
5. Clicking on the "Yin and Yang" Logo sends the user back to the Home Page.
6. Animes from the search result and "Daily Airing Animes" are scroll-able to left and right.
7. Navigation Bar turns into a "Hamburger Menu" when screen size is reduced.
8. Contents are resized to fit the screen size.
9. Daily Airing Animes cards are expanded upon being hovered over, as some anime's synopsis are too long and could not fit to the normal card size. Also used "text-overflow: ellipsis;" in the CSS to make the pre-hovered cards to have "..." when it does not fit into the card. *note that this feature is exclusive to only the "Daily Airing Animes" cards.
   
## Features Left to Implement
1. Countdown Timer to the next episode for each currently airing anime.
2. Add anime to a list to track episode progress of animes.
3. Give recommendations based on user's preference genres.
   
# Technologies Used
1. HTML5 - Used to display data and assign classes to multiple HTML tags
2. CSS3 - Used to structure the alignment for the webpage like making it a Flex Box and shifting the content to my liking by using Margin or Padding. Styled the webpage for certain elements to make it have colors and font size/style.
3. JavaScript & API - Used to Fetch data from the API and do various functions such as making my carousel automatically move and making the search button responsive such that when it is clicked upon, it will shift the page down to the search result.
   
# Testing
## Testing - Desktop version
1. Checked that logo is clickable and will bring to the Home Page ✔
2. Checked that navigation bar items like "Home" and "Airing Animes" are working and will link to respective pages ✔
3. Checked that titles for every anime are clickable and it links to the respective MyAnimeList listing of the anime except for search result's titles ✔
4. Checked that carousel is working ✔
5. Checked that the search function will refresh and display new data based on user's input after it has already been keyed in once ✔
6. Checked that all clickable items are send to a new tab instead of displaying it in the same page, by using target="_blank" ✔
## Testing - Mobile version
1. Checked that "Hamburger Menu" is clickable and opens a pane that appears on the left side of the screen ✔
2. Checked that the items in "Hamburger Menu" is clickable and sends the users to the respective pages ✔
3. Checked that user can press anywhere but the left pane to exit the "Hamburger Menu" ✔
4. Checked that carousel will resize based on the screen resolution ✔
5. Checked that titles for every anime are clickable and it links to the respective MyAnimeList listing of the anime except for search result's titles ✔
6. Checked that carousel is working ✔
7. Checked that the search function will refresh and display new data based on user's input after it has already been keyed in once ✔
8. Checked that all clickable items are send to a new tab instead of displaying it in the same page, by using target="_blank" ✔

## Bugs and Problems
1. Search result were initially viewed vertically for mobile which can be a problem because there are multi animes for one category, which means it will lead to endless scrolling if it is vertical ! -Fixed to make it scroll horizontally for each category.
2. Searching of anime MAY be slow due to the API fetch, when it is searching for data. -Fix base on user's input.
3. Due to framework issue, "Hamburger Menu" icon might not pop out but instead be replaced with a text called "menu".

# Credits

## Content
Anime contents are all sourced from Jikan API

Jikan URL: https://jikan.moe/

Jikan API URL: https://api.jikan.moe/v3

Framework used: https://materializecss.com/
## Media
Logo used: https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Yin_yang.svg/220px-Yin_yang.svg.png
Anime images used: https://api.jikan.moe/v3

*all anime images are all provided by the API data

## Acknowledgements
I received inspiration mainly from 

https://myanimelist.net/ for my "Home" page 

https://myanimelist.net/anime/season/schedule for my "Airing Animes" page

# Github Link
Repository Link: https://github.com/JiaYongg/ID_S10202579_PohJiaYong_Assg2

Site Link: https://jiayongg.github.io/ID_S10202579_PohJiaYong_Assg2/