let url ="https://striveschool-api.herokuapp.com/api/deezer/album/"
let id = ""
let image = document.getElementById("fotoA")
let imageArtist = document.getElementById("fotoArtista")
let tableBody = document.getElementById("tabellaCanzoni")
let artist = document.getElementById("artistaAlbum")
let albumName = document.getElementById("albumName")

document.addEventListener("DOMContentLoaded", async () => {
    //console.log("pagina caricata")
    let params = new URLSearchParams(location.search)
    id = params.get("id")
    // console.log(id) 
    getAlbumData(id)
    // getAlbumData2(id)
})

function convertiDurata(durata){
    let minuti = Math.floor(durata/60)
    let secondiRimanenti = durata % 60

    return { minuti, secondiRimanenti }
}

let getAlbumData = function(id){
    fetch (url + id)
    .then((response)=>{
        //console.log(response)
        response.json().then((data)=>{
        console.log(data)
        image.src = data.cover_medium
        imageArtist.src = data.artist.picture_small
        console.log(data.duration)
        let durataAlbum = convertiDurata(data.duration)
        let formattaDurataAlbum = `${durataAlbum.minuti} min ${durataAlbum.secondiRimanenti} sec`
        artist.innerHTML = data.artist.name + " · 2017 · " + formattaDurataAlbum + " · " + data.nb_tracks + " brani"
        albumName.innerHTML = data.title
        data.tracks.data.forEach((element, i) => {
            //console.log(element)
        let durataTraccia = convertiDurata(element.duration)
        let formattaDurataTraccia = `${durataTraccia.minuti}:${durataTraccia.secondiRimanenti}`
        tableBody.innerHTML += `<tr>
                    <th scope="row" class="d-md-table-cell d-none pt-3">${i+1}</th>
                    <td><div>${element.title}</div><div class="text-white" style="--bs-text-opacity: .6;">${element.artist.name}</div></td>
                    <td class="d-md-table-cell d-none pt-3 ">${element.rank}</td>
                    <td class="d-md-table-cell d-none pt-3">${formattaDurataTraccia}</td>
                  </tr>`
            // let riga = document.createElement("tr")
            // riga.innerHTML =`<tr>
            //         <th scope="row" class="d-md-table-cell d-none pt-3">${i+1}</th>
            //         <td><div>${element.title}</div><div class="text-white" style="--bs-text-opacity: .6;">${element.artist.name}</div></td>
            //         <td class="d-md-table-cell d-none pt-3 ">${element.rank}</td>
            //         <td class="d-md-table-cell d-none pt-3">${element.duration}</td>
            //       </tr>`
            // tableBody.appendChild(riga)
        });  
        })
    })
}

function getRandomColor() {// funzione per generare colore random
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function applicaRandomGradient(divId) { //funzione per applicare il colore generato randomicamente
    let color1 = getRandomColor();
    let color2 = getRandomColor();
    let gradient = `linear-gradient( ${color1}, ${color2})`;
    let div = document.getElementById(divId);
    div.style.background = gradient;

}
applicaRandomGradient("topMain"); //applico il gradiente al div con id topMain

// let ordinaRespose = function(oggetto){
//     let oggettoFormattato = {
//         nomeArtista: "",
//         idArtista: "",
//         idAlbum: "",
//         titoloAlbum: "",
//         urlCoverMedia: "",
//         durataAlbum: 0,
//         numeroTracce: 0,
//         tracce: [],
//     }
//     oggetto.map(element => {
//         oggettoFormattato.nomeArtista = element.artist["name"]
//     })
//     console.log(oggettoFormattato)
// }

// let getAlbumData2 = async function(id){
//     let response = await fetch(url + id)
//     let data = await response.json()
//     console.log(data)
// } metodo alternativo con async / await

/* artist.name
artist.id
id
titolo album
url cover_medium
duration da trasformare in ore e minuti e secondi
nb_tracks
tracks.data 
tracks.data[0].title
tracks.data[0].duration da trasformare in minuti
tracks.data[0].rank
*/

