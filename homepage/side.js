
//Nascondo e mostro il campo di ricerca
document.getElementById('search-link').addEventListener('click', function () {
    var searchField = document.getElementById('search-field');
    if (searchField.style.display === 'none' || searchField.style.display === '') {
      searchField.style.display = 'block';
    } else {
      searchField.style.display = 'none';
    }
  });


  //Ricavo gli album e li mostro nella sidebar
  async function populateAlbums() {
    try {
      const response = await fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=italo', {

      })

      if (!response.ok) {
        throw new Error('Errore nella richiesta');
      }

      const data = await response.json();
      const albums = data.data;

      const sidebarList = document.getElementById('album-list');
      sidebarList.innerHTML = ''; 

      albums.forEach(album => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.innerHTML = `
        <img src="${album.album.cover}" alt="${album.album.title}" width="30" height="30" class="me-2">
        <span class="text-white">${album.album.title}</span>
      `;
        sidebarList.appendChild(li);
      });

    } catch (error) {
      console.error('Errore durante il recupero degli album:', error);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    populateAlbums();
  });


  //Ricavo i risultati e li mostro nella main
  document.getElementById('search-input').addEventListener('input', function () {
    var query = document.getElementById('search-input').value;
    if (query.length > 3) {
      fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
          var resultsDiv = document.getElementById('results');
          resultsDiv.innerHTML = '';
          data.data.forEach(track => {
            var card = `
              <div class="col-md-4">
                <div class="h-50 card mb-6">
                  <img src="${track.album.cover_medium}" class="card-img-top" alt="Album cover">
                  <div class="card-body">
                    <h5 class="card-title">${track.title}</h5>
                    <p class="card-text">${track.artist.name}</p>
                  </div>
                </div>
              </div>
            `;
            resultsDiv.innerHTML += card;
          });
        })
        .catch(error => console.error('Error fetching data:', error));
    } else {
      document.getElementById('results').innerHTML = '';
    }
  });