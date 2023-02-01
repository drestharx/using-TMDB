let maxPage;
let pagination = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', () => {
    const inputValue = searchFormInput.value.trim();
    location.hash = `#search=${inputValue}`;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
    window.history.back();
});


window.addEventListener('hashchange', navigator, false);
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);


function navigator() {

    pagination = 1;
    
    if(infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, { passive: false });
        infiniteScroll = undefined;
    }

    console.log({ location });

    if(location.hash.startsWith('#trends')) {
        trendsPage();
    } else if(location.hash.startsWith('#search=')) {
        searchPage();
    } else if(location.hash.startsWith('#movie=')) {
        moviePage();
    } else if(location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }

    smoothscroll();

    if(infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false });
    }
}

function homePage() {
    console.log('Estas en HOME');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesMoviesPreview();
}

function trendsPage() {
    console.log('Estas en Trends');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerText = 'Trends';

    getTrendingMovies();

    infiniteScroll = getPaginatedTrendingMovies;
}

function searchPage() {
    console.log('Estas en search');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [, query0] = location.hash.split('=');

    console.log(query0);

    const query = query0.split('%20').join(' ');

    console.log('query mandado', query)

    getMoviesBySearch(query);

    infiniteScroll = getPaginatedMoviesBySearch(query);
}

function moviePage() {
    console.log('Estas en Movies Details');

    headerSection.classList.add('header-container--long');
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [, movieId] = location.hash.split('=');

    console.log(movieId);

    getMovieById(movieId);
    getSimilarMovies(movieId);
}

function categoriesPage() {
    console.log('Estas en categories');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    //GET MOVIES BY CATEGORIES

    const [, categoryData] = location.hash.split('=');

    const [id, name] = categoryData.split('-');
    
    const movieName = name.split('%20').join(' ');

    const categoryId = parseInt(id);

    getMoviesByCategories(categoryId, movieName);

    infiniteScroll = getPaginatedMoviesById(categoryId);
}