const searchUrl = 'https://striveschool-api.herokuapp.com/api/deezer/search?q='
const albumUrl = 'https://striveschool-api.herokuapp.com/api/deezer/album/'
const sectionsContainer = document.getElementById('sections')
const heroTitle = document.getElementById('heroTitle')
const heroArtist = document.getElementById('heroArtist')
const heroImg = document.getElementById('heroImg')
let albumsArray = []

const sectionsArray = [
    'Creato per te',
    'Album interessanti',
    'Continua ad ascoltare',
    'Popolare tra i tuoi amici',
    'Nuove uscite per te',
    'Consigliate per oggi',
    'In base a cosa hai ascoltato di recente',
]

const artistsArray = [
    'queen',
    'static-x',
    'disturbed',
    'katy-perry',
    'metallica',
    'vinicio-capossela',
    'tesseract',
    'klangphonics',
    'iron-maiden'
]


// function to fetch for albums via keyword 
let f_getAlbum = async function(keyword){
    let resp = await fetch(searchUrl+keyword)
    let respData = await resp.json()
    let tempAlbumArray = mapArray(respData.data)
    albumsArray = albumsArray.concat(tempAlbumArray)
}

// function to extract data from the array of objects received from the fetch
let mapArray = function(dataArray){
    let tempArray = []
    dataArray.map(d =>{
        let tempObj = {
            albumTitle: '',
            albumId: 0,
            albumPicture: '',
            artistName: '',
            artistId: 0
        }

        tempObj.albumTitle = d.album.title
        tempObj.albumId = d.album.id
        tempObj.albumPicture = d.album.cover_medium
        tempObj.artistName = d.artist.name
        tempObj.artistId = d.artist.id
        
        // if the album isn't already in the tempArray, i push it
        if(!tempArray.find(a => a.albumId === tempObj.albumId)){
            tempArray.push(tempObj)
        }
    })
    return tempArray
}

// function to create a section
let createSection = function(sectionTitle){
    let sect = document.createElement('section')
    sect.classList.add('authorSection')
    sect.innerHTML = 
    `
        <div class="titleWrapper">
            <h3 class="title col-lg-10 col-md-8 col-6">${sectionTitle}</h3>
            <h6 class="vt">Visualizza Tutto</h6>
        </div>
        <div class="cardContainer row">
        </div>
    `
    return sect
}

// function to create a card
let createCard = function(album){
    let card = document.createElement('div')
    card.classList.add("cardSpacer", "col-lg-2", "col-md-4", "col-sm-6", "col-12")
    card.innerHTML = 
    `
        <div class="cardWrapper">
            <div class="card">
                <div class="imgWrapper"><img src="${album.albumPicture}" class="img-fluid" alt="${album.albumTitle}"></div>
                <div class="card-body">
                <a href="../Album/dettagliAlbum.html?id=${album.albumId}" class="albumName">${album.albumTitle}</a>
                <a href="../artista/artista.html?id=${album.artistId}" class="author">${album.artistName}</a>
                </div>
            </div>
        </div>
    `
    return card
}

// function to get random album from albums array
let getRandomAlbum = function(){
    let idx = Math.floor(Math.random() * albumsArray.length)
    return albumsArray[idx]
}

// function to download all the artists albums data
let getAlbumsData = async function(artArr){
    const promisesArray = artArr.map(a => f_getAlbum(a))
    await Promise.all(promisesArray)
}

// function to generate a section with cards and apply it to the dom
let composeSection = function(sectionTitle){
    let tempSect = createSection(sectionTitle)
    let cardContainer = tempSect.querySelector('.cardContainer')
    for (let i = 1; i <=5; i++){
        let tempCard = createCard(getRandomAlbum())
        i == 4 || i == 5 ? tempCard.classList.add('d-md-none', 'd-lg-block') : tempCard
        cardContainer.appendChild(tempCard)
    }
    sectionsContainer.appendChild(tempSect)
}

// function to cycle through sections array and create them
let composePage = function(secArr){
    secArr.forEach(sec => {
        composeSection(sec)
    });
}

// function to complete the hero section
let composeHero = function(){
    let album = getRandomAlbum()
    heroTitle.innerHTML = 
    `
    <a href="../Album/dettagliAlbum.html?id=${album.albumId}">${album.albumTitle}</a>
    `
    heroArtist.innerHTML = 
    `
    <a href="../artista/artista.html?id=${album.artistId}">${album.artistName}</a>
    `
    
    heroImg.src = album.albumPicture
}
// fastLoad
onload = async (e) => {
    await getAlbumsData(artistsArray)
    composeHero()
    composePage(sectionsArray)
    
}



