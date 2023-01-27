//AXIOS
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': apiKey,
    },
});

const url = 'https://api.themoviedb.org/3';
const mediaType = 'movie';
const timeWindow = 'day';

//TRENDING SECTION

async function getTrendingMoviesPreview() {
    const { data } = await api(`/trending/${mediaType}/${timeWindow}`);
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


//CATEGORIES SECTION

async function getCategoriesMoviesPreview() {
    const { data } = await api(`/genre/movie/list`);
    const categories = data.genres;

    console.log('categories', categories);

    categories.forEach(category => {
        const categorySection = document.querySelector('#categoriesPreview .categoriesPreview-list');
        const div = document.createElement('div');
        const h3 = document.createElement('h3');

        div.classList.add('category-container');
        h3.setAttribute('id', 'id' + category.id);
        h3.classList.add('category-title');
        h3.textContent = `${category.name}`;

        div.appendChild(h3);
        categorySection.appendChild(div);
    });
}
