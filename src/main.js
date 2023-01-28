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

//Utils
function createMovies(movies, container) {
    container.innerText = '';

    movies.forEach(movie => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        div.classList.add('movie-container');
        img.classList.add('movie-img');
        img.setAttribute('alt', movie.title);
        img.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

        div.appendChild(img);
        container.appendChild(div);
    });
}

function createCategories(categories, container) {

    container.innerText = '';

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
        container.appendChild(div);
    });
}

//scroll top function
function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0,currentScroll - (currentScroll/5));
    }
};


//TRENDING SECTION

async function getTrendingMoviesPreview() {
    const { data } = await api(`/trending/${mediaType}/${timeWindow}`);
    const movies = data.results;

    console.log('movies', movies);

    createMovies(movies, trendingMoviesPreviewList);
}

//CATEGORIES SECTION

async function getCategoriesMoviesPreview() {

    const { data } = await api(`/genre/movie/list`);
    const categories = data.genres;

    console.log('categories', categories);

    createCategories(categories, categoriesPreviewList);
}

//GET CATEGORIES BY ID

async function getMoviesByCategories(id, name) {

    const { data } = await api(`/discover/movie`, {
        params: {
            with_genres: id,
        },
    });

    const movies = data.results;

    headerCategoryTitle.textContent = name;

    createMovies(movies, genericSection);
}
