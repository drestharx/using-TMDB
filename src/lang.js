//LANGUAGE OF USER NAVIGATOR
let lang = navigator.language;

//nodes of languages to change
const htmlTitle = document.querySelector('title');
const inputSearch = document.getElementById('searchForm__input');
const trendingPreviewTitle = document.querySelector('.trendingPreview-title');
const favoritesTitle = document.querySelector('.favorites__title');
const relationedTitle = document.querySelector('.relatedMovies-container .relatedMovies-title');

//TRANSLATES

const languages = {
    'en': {
        title: 'Using TMDB',
        header_title: "Let's see Movies",
        placeHolder: 'Search',
        trendingsPreviewsTitle: 'Popular',
        categoriesTit: 'Categories',
        trendingButton: 'Discover',
        favouritesTitle: 'Your favorites',
        relatedTitle: 'Related movies',
    },
    'en-US': {
        title: 'Using TMDB',
        header_title: "Let's see Movies",
        placeHolder: 'Search',
        trendingsPreviewsTitle: 'Popular',
        categoriesTit: 'Categories',
        trendingButton: 'Discover',
        favouritesTitle: 'Your favorites',
        relatedTitle: 'Related movies',
    },
    'es': {
        title: 'Consumiendo TMDB',
        header_title: "Veamos peliculas",
        placeHolder: 'Buscar',
        trendingsPreviewsTitle: 'Tendencias',
        categoriesTit: 'Categorías',
        trendingButton: 'Ver más',
        favouritesTitle: 'Tus favoritos',
        relatedTitle: 'Peliculas relacionadas',
    },
    'es-US': {
        title: 'Consumiendo TMDB',
        header_title: "Veamos peliculas",
        placeHolder: 'Buscar',
        trendingsPreviewsTitle: 'Tendencias',
        categoriesTit: 'Categorías',
        trendingButton: 'Ver más',
        favouritesTitle: 'Tus favoritos',
        relatedTitle: 'Peliculas relacionadas',
    },
    'pt': {
        title: 'Consumindo TMDB',
        header_title: 'Vamos ver filmes',
        placeHolder: 'Buscar',
        trendingsPreviewsTitle: 'Tendência',
        categoriesTit: 'Categorias',
        trendingButton: 'Ver mais',
        favouritesTitle: 'Seus favoritos',
        relatedTitle: 'Filmes semelhantes',
    },
};