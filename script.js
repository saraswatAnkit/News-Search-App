const apiKey = 'd00896b92418443a81a24223ba24602f'

const blogContainer = document.getElementById('blog-container')
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');


async function fetchRandomNews(){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2024-05-01&to=2024-05-01&sortBy=popularity&pageSize=20&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error in fetching the Random News",error)
        return[]
    }
}

searchButton.addEventListener("click", async () =>{
    const query = searchField.value.trim();
    if(query !==""){
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("Erro fetching news by query",error)
        }
    }
})

async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error in fetching the Random News",error)
        return[]
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach(article =>{
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDes = article.title.length > 120 ? article.description.slice(0, 120) + "...." : article.description;
        description.textContent = truncatedDes;
    

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
        console.log(articles);
        } catch (error) {
            console.error("Error in fetching the Random News",error)
        
    }
})();