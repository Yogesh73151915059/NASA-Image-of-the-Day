const apiKey = "xCehs9YvJVkxEOZ5pq2PKwsG1hjggkj6MlgAILRE";
const form = document.getElementById('search-form');
const submitBtn = document.getElementById('submitBtn');
const prevImgList = document.getElementById('search-history');
let prevImg = undefined;
window.addEventListener('load',()=>{
     const currentDate = new Date();
     const year = currentDate.getFullYear();
     const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
     const day = String(currentDate.getDate()).padStart(2, '0');
     const formattedDate = `${year}-${month}-${day}`;
     getCurrentImageOfTheDay(formattedDate);
})
form.addEventListener('submit', function(event){
     event.preventDefault();
     const searchDate = document.getElementById('search-input').value;
     getCurrentImageOfTheDay(searchDate);
})

async function getCurrentImageOfTheDay(searchDate){
    if(searchDate==prevImg || searchDate=="") return;
    if(prevImg!=undefined){
           addSearchToHistory(prevImg);
    }
    const imgUrl = `https://api.nasa.gov/planetary/apod?date=${searchDate}&api_key=${apiKey}`;
    try{
        const imgData =  await fetch(imgUrl);
        const imgDetails = await imgData.json();
        prevImg = imgDetails.date;
        saveSearch(imgDetails);
        getImageOfTheDay(searchDate);
    }
    catch(error){
           console.log("error in fetching data", error);
    }
   
}

function getImageOfTheDay(currentDate){
    const currentImage = document.getElementById('current-image');
    const imgHeading = document.getElementById('currentImageDateHeading');
    const imgTitle = document.getElementById('imageTitle');
    const imgDescription = document.getElementById('imgDescription');
    imgDetails = JSON.parse(localStorage.getItem(currentDate));
    currentImage.src = imgDetails.url;
    imgHeading.innerText = `Picture On ${imgDetails.date}`;
    imgTitle.innerText = imgDetails.title;
    imgDescription.innerText = imgDetails.explanation;
    console.log(imgDetails);
}

function saveSearch(imgDetails){
    localStorage.setItem(imgDetails.date, JSON.stringify(imgDetails));
}

function addSearchToHistory(prevImage){
    const listItem = document.createElement('li');
    const prevImgLink = document.createElement('a');
    prevImgLink.href = "#";
    console.log(prevImage);
    prevImgLink.innerText=prevImg;
    listItem.appendChild(prevImgLink);
    listItem.addEventListener('click',() => getImageOfTheDay(prevImage));
    prevImgList.insertBefore(listItem, prevImgList.firstChild);
}