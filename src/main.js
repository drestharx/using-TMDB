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

    trendingMoviesPreviewList.innerText = '';

    movies.forEach(movie => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        div.classList.add('movie-container');
        img.classList.add('movie-img');
        img.setAttribute('alt', movie.title);
        img.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

        div.appendChild(img);
        trendingMoviesPreviewList.appendChild(div);
    });
}

//CATEGORIES SECTION

async function getCategoriesMoviesPreview() {

    categoriesPreviewList.innerText = '';

    const { data } = await api(`/genre/movie/list`);
    const categories = data.genres;

    console.log('categories', categories);

    categories.forEach(category => {
        const div = document.createElement('div');
        const h3 = document.createElement('h3');

        div.classList.add('category-container');
        div.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        h3.setAttribute('id', 'id' + category.id);
        h3.classList.add('category-title');
        h3.textContent = `${category.name}`;

        div.appendChild(h3);
        categoriesPreviewList.appendChild(div);
    });
}

//GET CATEGORIES BY ID

async function getMoviesByCategories(id, name) {

    genericSection.innerText = '';

    const { data } = await api(`/discover/movie`, {
        params: {
            with_genres: id,
        },
    });

    console.log('filtered categories', data.results);

    const movies = data.results;

    headerCategoryTitle.textContent = name;

    movies.forEach(movie => {
        const div = document.createElement('div');
        const img = document.createElement('img');

        div.classList.add('movie-container');
        img.setAttribute('alt', movie.original_title);
        img.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
        img.classList.add('movie-img');

        div.appendChild(img);
        genericSection.appendChild(div);
    });
}
