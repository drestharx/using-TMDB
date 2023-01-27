window.addEventListener('hashchange', navigator, false);
window.addEventListener('DOMContentLoaded', navigator, false);

function navigator() {
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
}

function homePage() {
    console.log('Estas en HOME');
    getTrendingMoviesPreview();
    getCategoriesMoviesPreview();
}
function trendsPage() {
    console.log('Estas en Trends');
}
function searchPage() {
    console.log('Estas en search');
}
function moviePage() {
    console.log('Estas en Movies Details');
}
function categoriesPage() {
    console.log('Estas en categories');
}