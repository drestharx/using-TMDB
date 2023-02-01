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

const mediaType = 'movie';
const timeWindow = 'day';

//UTILS
function createMovies(movies, container, { lazyLoad = false, clean = true } = {}) {
    if(clean) {
        container.innerText = '';
    }

    movies.forEach(movie => {
        const div = document.createElement('div');
        const img = document.createElement('img');

        div.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });

        div.classList.add('movie-container');
        img.classList.add('movie-img');
        img.setAttribute('alt', movie.title);
        //se modifica el atributo src para el lazy loading
        img.setAttribute(
            lazyLoad ? 'data' : 'src',
            `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        );

        img.addEventListener('error', () => {
            img.setAttribute('src', 'https://img.freepik.com/vector-gratis/ups-error-404-ilustracion-concepto-robot-roto_114360-5529.jpg?w=2000');
        });


        if(lazyLoad) {
            lazyLoading.observe(img);
        }

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

//INTERSECTION OBSERVER (LAZY LOADER)
const lazyLoading = new IntersectionObserver((entries) => {
    console.log('entries obervados', {entries})
    entries.forEach((entry) => {
        //cada entry hace referencia a cada elemento que ya este siendo observado, porlo tanto deben ser activados

        //LAZY LOADING
        if(entry.isIntersecting) {
            const url = entry.target.getAttribute('data');
            entry.target.setAttribute('src', url);
            lazyLoading.unobserve(entry.target);
        }
    });
});


//scroll top function
function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
};

//TRENDING SECTION

async function getTrendingMoviesPreview() {
    const { data } = await api(`/trending/${mediaType}/${timeWindow}`);
    const movies = data.results;

    console.log('movies', movies);

    createMovies(movies, trendingMoviesPreviewList, true);
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

    createMovies(movies, genericSection, true);
}

//SEARCH MOVIES BY SEARCH

async function getMoviesBySearch(query) {

    const { data } = await api(`/search/movie`, {
        params: {
            query: query,
        },
    });

    const movies = data.results;

    console.log('movies by search', movies);

    createMovies(movies, genericSection);
}

//TRENDING MOVIES SECTION

async function getTrendingMovies() {
    const { data } = await api(`/trending/${mediaType}/${timeWindow}`);
    const movies = data.results;

    maxPage = data.total_pages;
    console.log('pages', maxPage);

    createMovies(movies, genericSection, {lazyLoad: true, clean: true});

    // const getMoreButton = document.createElement('button');
    // getMoreButton.textContent = 'Cargar mas videos';
    // getMoreButton.addEventListener('click', getPaginatedTrendingMovies)
    // genericSection.appendChild(getMoreButton);
}

//PAGINATED MOVIES

async function getPaginatedTrendingMovies() {

    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    const isScrollEnd = (scrollTop + clientHeight) >= (scrollHeight - 15);

    const isMaxPage = pagination <= maxPage;

    if(isScrollEnd && isMaxPage) {

        console.log('llegaste al final de la pagina');

        pagination += 1;

        const { data } = await api(`/trending/${mediaType}/${timeWindow}`, {
            params: {
                page: pagination,
            },
        });

        console.log(data);
    
        createMovies(data.results, genericSection, {lazyLoad: true, clean: false});
    }

    // const getMoreButton = document.createElement('button');
    // getMoreButton.textContent = 'Cargar mas videos';
    // getMoreButton.addEventListener('click', getPaginatedTrendingMovies)
    // genericSection.appendChild(getMoreButton);
}

//GET MOVIE + DETAILS

async function getMovieById(id) {
    const { data: movie } = await api(`/movie/${id}`);

    console.log('details of movie', movie);

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average.toFixed(1);

    const posterImg = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

    headerSection.style.background = `
    linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
        ),
        url(${posterImg})
    `;

    createCategories(movie.genres, movieDetailCategoriesList, true);

}

//GET SIMILAR MOVIES
async function getSimilarMovies(id) {
    const { data } = await api(`/movie/${id}/similar`);

    const similarMovies = data.results;

    createMovies(similarMovies, relatedMoviesContainer);

    relatedMoviesContainer.scrollLeft = 0;
}