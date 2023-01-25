const url = 'https://api.themoviedb.org/3';
const mediaType = 'movie';
const timeWindow = 'week';

async function getTrendingMoviesPreview() {
    const response = await fetch(`${url}/trending/${mediaType}/${timeWindow}?api_key=${apiKey}`);
    const data = await response.json();
    const movies = data.results;

    console.log('movies', movies);

    movies.forEach(movie => {
        const article = document.querySelector('#trendingPreview .trendingPreview-movieList');
        const div = document.createElement('div');
        const img = document.createElement('img');
        div.classList.add('movie-container');
        img.classList.add('movie-img');
        img.setAttribute('alt', movie.title);
        img.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

        div.appendChild(img);
        article.appendChild(div);
    });
}

getTrendingMoviesPreview();