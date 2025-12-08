const API_KEY = "d56503f503bb4bb0bce5b5760df206e0";    
const url = "https://newsapi.org/v2/everything?q="; 


window.addEventListener("load", ()=> {
    fetchNews("India");  // no return just calling the function 
})


function fillDataInCard(cardClone, curEle){
    const newImg = cardClone.querySelector("#news-img"); 
    const newsTitle = cardClone.querySelector("#news-title"); 
    const newsSource = cardClone.querySelector("#news-source"); 
    const newsDesc = cardClone.querySelector("#news-desc");
    
    newImg.src = curEle.urlToImage  ; 
    newsTitle.innerHTML = curEle.title ;
    newsDesc.innerHTML = curEle.description ;  
    
    const date = new Date(curEle.publishedAt).toLocaleString(); 

    newsSource.innerHTML = `${curEle.source.name} : ${date}`; 

    cardClone.firstElementChild.addEventListener("click", ()=> {
        window.open(curEle.url, "_blank" ); 
    })
}


function bindData(articles){
    const cardContainer = document.getElementById("cards-container"); 
    const templateNewsCard = document.getElementById("template-news-card"); 

    cardContainer.innerHTML = ""; 

    articles.forEach( curEle => {
        if(!curEle.urlToImage){
            return
        }
        const cardClone = templateNewsCard.content.cloneNode(true);
        fillDataInCard(cardClone, curEle);         
        cardContainer.appendChild(cardClone); 
    });
    
}


async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`) ; 
    const result = await response.json(); 
    console.log(result);
    console.log(result.articles);
       
    bindData(result.articles); 
}

let curSelectedNav = null ; 
function onNavItemClick(id){
    fetchNews(id) ; 
     let navItem = document.getElementById(id); 
    curSelectedNav?.classList.remove("active");// is this bydefault active ?
    //curSelectedNav? this is ternary operator ?  can u simplify this above^ line
   
    curSelectedNav = navItem ; 

    curSelectedNav.classList.add("active"); 

}


const searchButton = document.getElementById("search-button"); 
const searchText = document.getElementById("search-text"); 

searchButton.addEventListener("click", () => {
    const query = searchText.value  ;
    if(!query){
        return ;
    } 
    fetchNews(query); 
    curSelectedNav?.classList.remove("active"); 
    curSelectedNav = null ; 
})

function reload(){
    window.location.reload(); 
}