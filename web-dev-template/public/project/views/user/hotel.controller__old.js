/**
 * Created by shrad on 3/30/2017.
 */
(function () {
    angular
        .module('MyHotelApp')
        .controller('HotelController', HotelController);

    function HotelController(HotelService) {
        var model = this;
 //       model.createMovie = createMovie;
 //       model.deleteMovie = deleteMovie;

        function init() {
            searchCity(city);
        }
        init();

        function deleteMovie(movieId) {
            movieService
                .deleteMovie(movieId)
                .then(findAllMovies);
        }
        function findAllHotels() {
            hotelService
                .findAllHotels()
                .then(renderHotels);
        }

        function renderHotels(hotels) {
            model.hotels = hotels;
        }

        function createMovie(movie) {
            movieService
                .createMovie(movie)
                .then(findAllMovies);
        }
        function searchCity(city) {
            HotelService
                .searchCity(city)
        }

        function renderHotelDetails(result) {
            vm.hotelDetails = result;
        }

    }
})();