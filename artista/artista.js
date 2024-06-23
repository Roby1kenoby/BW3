const searchUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
let id = "";

document.addEventListener("DOMContentLoaded", async () => {
    let params = new URLSearchParams(location.search);
    id = params.get("id");
    if (id) {
        await fetchArtistAndSongs(id);
    } else {
        console.error('ID non trovato nell\'URL');
    }
});

async function fetchArtistAndSongs(artistId) {
    try {
        const artistResponse = await fetch(`${artistUrl}${artistId}`);
        const artistData = await artistResponse.json();

        const songsResponse = await fetch(`${searchUrl}${artistData.name}`);
        const songsData = await songsResponse.json();

        const artist = artistData;
        const songs = songsData.data;

        document.querySelector('.artist-header').style.backgroundImage = `url('${artist.picture_big}')`;
        document.getElementById('artist-name').textContent = artist.name;
        document.getElementById('monthly-listeners').textContent = `1.265.238 ascoltatori mensili`;

        document.getElementById('artist-photo').src = artist.picture_medium;
        document.getElementById('liked-count').textContent = `Hai messo mi piace a 11 brani`;
        document.getElementById('artist-name-liked').textContent = `di ${artist.name}`;

        renderSongs(songs.slice(0, 5));

        if (songs.length > 5) {
            const showMoreButton = document.createElement('div');
            showMoreButton.classList.add('show-more');
            showMoreButton.textContent = 'VISUALIZZA ALTRO';
            showMoreButton.addEventListener('click', () => {
                renderSongs(songs);
                showMoreButton.style.display = 'none';
            });
            document.getElementById('song-list').appendChild(showMoreButton);
        }
    } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
    }
}

function renderSongs(songs) {
    const songList = document.getElementById('song-list');
    songList.innerHTML = '';
    
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.classList.add('song-item');

        const songOrder = document.createElement('span');
        songOrder.classList.add('song-order', 'me-2');
        songOrder.textContent = index + 1;
        li.appendChild(songOrder);

        const songCover = document.createElement('img');
        songCover.src = song.album.cover;
        songCover.alt = `${song.title} cover`;
        songCover.classList.add('song-cover');
        li.appendChild(songCover);

        const songDetails = document.createElement('div');
        songDetails.classList.add('song-details');

        const songTitleRank = document.createElement('div');
        songTitleRank.classList.add('song-title-rank');

        const songTitle = document.createElement('span');
        songTitle.classList.add('song-title');
        songTitle.textContent = song.title;
        songTitleRank.appendChild(songTitle);

        const songRank = document.createElement('div');
        songRank.classList.add('song-rank');
        songRank.textContent = ` ${song.rank}`;
        songTitleRank.appendChild(songRank);

        songDetails.appendChild(songTitleRank);

        const songDuration = document.createElement('span');
        songDuration.classList.add('song-duration');
        songDuration.textContent = formatDuration(song.duration);
        songDetails.appendChild(songDuration);

        const dotsIcon = document.createElement('i');
        dotsIcon.classList.add('bi', 'bi-three-dots-vertical');
        songDetails.appendChild(dotsIcon);

        li.appendChild(songDetails);
        songList.appendChild(li);
    });
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
}

document.getElementById('search-link').addEventListener('click', () => {
    const artistName = document.getElementById('search-input').value.trim();
    if (artistName) fetchArtistAndSongsByName(artistName);
});

document.getElementById('search-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const artistName = document.getElementById('search-input').value.trim();
        if (artistName) fetchArtistAndSongsByName(artistName);
    }
});

async function fetchArtistAndSongsByName(artistName) {
    try {
        const searchResponse = await fetch(`${searchUrl}${artistName}`);
        const searchData = await searchResponse.json();
        
        const artist = searchData.data[0].artist;
        await fetchArtistAndSongs(artist.id);
    } catch (error) {
        console.error('Errore nel recupero dei dati di ricerca:', error);
    }
}

const likedSongs = [
    {
        author: "Nome Autore",
        likedCount: 11,
        coverUrl: "url-della-foto.jpg"
    }
];

function renderLikedSongs() {
    const likedSongsContainer = document.getElementById('liked-songs-container');
    likedSongsContainer.innerHTML = '';

    likedSongs.forEach(song => {
        const songItem = document.createElement('div');
        songItem.className = 'liked-song-item';

        const songCover = document.createElement('img');
        songCover.src = song.coverUrl;
        songCover.alt = song.author;
        songCover.className = 'liked-song-cover';

        const songDetails = document.createElement('div');
        songDetails.className = 'liked-song-details';

        const songTitle = document.createElement('p');
        songTitle.className = 'liked-song-title';
        songTitle.textContent = `Hai messo mi piace a ${song.likedCount} brani`;

        const songAuthor = document.createElement('p');
        songAuthor.className = 'liked-song-author';
        songAuthor.textContent = song.author;

        songDetails.appendChild(songTitle);
        songDetails.appendChild(songAuthor);

        songItem.appendChild(songCover);
        songItem.appendChild(songDetails);

        likedSongsContainer.appendChild(songItem);
    });
}

window.onload = renderLikedSongs;
