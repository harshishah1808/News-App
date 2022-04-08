console.log("This is my index js file");

let source = 'bbc-news';
let apiKey = '8b5273413ee3447eae0e88872ed86560'

//grab the news container
let newsAccordion = document.getElementById('newsAccordion');
const xhr = new XMLHttpRequest();

//create an ajax get request
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function(element, index) {
            // console.log(element, index)
            let news = `<div class="accordion" id="newsAccordion">
            <div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                    <p> <b>Breaking News ${index+1}:</b> ${element["title"]}</p>
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}"
                data-bs-parent="#newsAccordian">
                <div class="accordion-body"> ${element["content"]}.<a href="${element["url"]}" target="_blank">Read more here</a></div>
            </div>
            </div>
            </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }
}
xhr.send();

let search=document.getElementById('searchTxt');
search.addEventListener("input",function(){

    let inputVal=search.value;

    let accordian=document.getElementsByClassName('accordion-item');
    Array.from(accordian).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
});