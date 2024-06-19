let url ="https://striveschool-api.herokuapp.com/api/deezer/album/"
let id = ""
let image = document.getElementById("fotoA")
let imageArtist = document.getElementById("fotoArtista")
let tableBody = document.getElementById("tabellaCanzoni")

document.addEventListener("DOMContentLoaded", async () => {
    //console.log("pagina caricata")
    let params = new URLSearchParams(location.search)
    id = params.get("id")
    // console.log(id) 
    getAlbumData(id)
    // getAlbumData2(id)
})

let getAlbumData = function(id){
    fetch (url + id)
    .then((response)=>{
        //console.log(response)
        response.json().then((data)=>{
        console.log(data)
        image.src = data.cover_medium
        imageArtist.src = data.artist.picture_small
        data.tracks.data.forEach((element, i) => {
            //console.log(element)
        // tableBody.innerHTML += `<tr>
        //             <th scope="row" class="d-md-table-cell d-none pt-3">${i+1}</th>
        //             <td><div>${element.title}</div><div class="text-white" style="--bs-text-opacity: .6;">${element.artist.name}</div></td>
        //             <td class="d-md-table-cell d-none pt-3 ">${element.rank}</td>
        //             <td class="d-md-table-cell d-none pt-3">${element.duration}</td>
        //           </tr>`
            let riga = document.createElement("tr")
            riga.innerHTML =`<tr>
                    <th scope="row" class="d-md-table-cell d-none pt-3">${i+1}</th>
                    <td><div>${element.title}</div><div class="text-white" style="--bs-text-opacity: .6;">${element.artist.name}</div></td>
                    <td class="d-md-table-cell d-none pt-3 ">${element.rank}</td>
                    <td class="d-md-table-cell d-none pt-3">${element.duration}</td>
                  </tr>`
            tableBody.appendChild(riga)
        });  
        })
    })
}



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

