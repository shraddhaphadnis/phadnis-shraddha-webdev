(function() {
    var app = angular
        .module("MyHotelApp")
        .controller("EditReviewController", EditReviewController)
        .controller("NewReviewController", NewReviewController);


    function NewReviewController($routeParams, $location, ReviewService) {
        var vm = this;
        vm.hotelId = $routeParams.hid;
        vm.userId = $routeParams.uid;
        vm.cityId = $routeParams.cid;
        console.log(vm.userId);
        vm.addReview = addReview;

        function addReview(userId, hotelId, hotelReview) {
            hotelReview._hotel = hotelId;
            vm.hotelId = $routeParams.hid;
            vm.userId = $routeParams.uid;
            vm.cityId = $routeParams.cid;
            console.log(hotelReview);

                var promise = ReviewService.createReview(userId, hotelReview);
                promise
                    .success(function (data) {
                        var URL = "/user/" + vm.userId +"/city/"+vm.cityId+ "/hotelDetails/"+ vm.hotelId;
                        console.log("review add success");
                        $location.url(URL);
                    })
                    .error(function () {

                    });

        }
        // function initMap() {
        //     var uluru = {lat: -25.363, lng: 131.044};
        //     var map = new google.maps.Map(document.getElementById('map'), {
        //         zoom: 4,
        //         center: uluru
        //     });
        //     var marker = new google.maps.Marker({
        //         position: uluru,
        //         map: map
        //     });
        // }

    }

    function EditReviewController($routeParams, $location, ReviewService, HotelService) {
        //console.log("Hello in hotel list controller");
        var vm = this;
        vm.hotelId = $routeParams.hid;
        vm.userId = $routeParams.uid;
        vm.reviewId = $routeParams.rid;
        vm.cityId = $routeParams.cid;

        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;

        // vm.userId = $routeParams["uid"];
        // vm.cityId = $routeParams["cityId"];
        //console.log(vm.userId);
        // var hotel_list = {
        //     "5949486072578777700": {
        //         "hotel_geo_node": {
        //             "name": "DoubleTree by Hilton Boston - Downtown",
        //             "tags": {
        //                 "property_type": [
        //                     "Hotel"
        //                 ],
        //                 "others": [
        //                     "goibibo_hotel"
        //                 ]
        //             },
        //             "raw_tags": [],
        //             "location": {
        //                 "lat": 42.34908,
        //                 "long": -71.064
        //             },
        //             "_id": "5949486072578777700",
        //             "type": 120
        //         },
        //         "hotel_data_node": {
        //             "rating": 3,
        //             "img_processed": [],
        //             "name": "DoubleTree by Hilton Boston - Downtown",
        //             "extra": {
        //                 "check_in": "1200",
        //                 "settings": {
        //                     "seo": 1,
        //                     "ta_flag": 0,
        //                     "hotel_mode": "vendor_hotel"
        //                 },
        //                 "gir_data": {},
        //                 "vendor_priority": 81,
        //                 "old_voyager_id": "5949486072578777700",
        //                 "check_out": "1200"
        //             },
        //             "ids": {
        //                 "tbo_grp": [
        //                     "169294_21317_99E714762EAA6B49E65F9D4E88B7F56D"
        //                 ],
        //                 "bkg": [
        //                     "28705"
        //                 ],
        //                 "exp": [
        //                     "169294"
        //                 ],
        //                 "tbo": "169294_21317_99E714762EAA6B49E65F9D4E88B7F56D",
        //                 "ta": "217550"
        //             },
        //             "st": "LIV",
        //             "facilities": {
        //                 "cmapped": {
        //                     "RSTRNT": {
        //                         "dn": "Restaurant/Coffee Shop"
        //                     },
        //                     "FDESK": {
        //                         "dn": "Front desk"
        //                     },
        //                     "INTRNT": {
        //                         "dn": "Internet"
        //                     }
        //                 },
        //                 "mapped": [
        //                     "Front desk",
        //                     "Restaurant/Coffee Shop",
        //                     "Internet"
        //                 ]
        //             },
        //             "img_selected": {
        //                 "fs": {
        //                     "wpl": "http://cdn1.goibibo.com/doubletree-by-hilton-boston-downtown-boston-lobby-78342171194-webp-fs.webp",
        //                     "l": "http://cdn1.goibibo.com/doubletree-by-hilton-boston-downtown-boston-lobby-78342171194-jpeg-fs.jpg"
        //                 },
        //                 "thumb": {
        //                     "wpl": "http://cdn1.goibibo.com/doubletree-by-hilton-boston-downtown-boston-lobby-78342171194-webp-srp.webp",
        //                     "l": "http://cdn1.goibibo.com/doubletree-by-hilton-boston-downtown-boston-lobby-78342171194-jpeg-srp.jpg"
        //                 },
        //                 "g": {
        //                     "wpl": "http://cdn1.goibibo.com/doubletree-by-hilton-boston-downtown-boston-lobby-78342171194-webp-g.webp",
        //                     "l": "http://cdn1.goibibo.com/doubletree-by-hilton-boston-downtown-boston-lobby-78342171194-jpeg-g.jpg"
        //                 },
        //                 "srp": {
        //                     "wpl": "http://cdn1.goibibo.com/doubletree-by-hilton-boston-downtown-boston-lobby-78342171194-webp-srp.webp",
        //                     "l": "http://cdn1.goibibo.com/doubletree-by-hilton-boston-downtown-boston-lobby-78342171194-jpeg-srp.jpg"
        //                 },
        //                 "r": {
        //                     "wpl": "http://cdn1.goibibo.com/doubletree-by-hilton-boston-downtown-boston-lobby-78342171194-webp-r.webp",
        //                     "l": "http://cdn1.goibibo.com/doubletree-by-hilton-boston-downtown-boston-lobby-78342171194-jpeg-r.jpg"
        //                 },
        //                 "th": {
        //                     "wpl": "http://cdn1.goibibo.com/doubletree-by-hilton-boston-downtown-boston-lobby-78342171194-webp-th.webp",
        //                     "l": "http://cdn1.goibibo.com/doubletree-by-hilton-boston-downtown-boston-lobby-78342171194-jpeg-th.jpg"
        //                 }
        //             },
        //             "_id": "5949486072578777700",
        //             "loc": {
        //                 "city": "Boston",
        //                 "cnt_code": "US",
        //                 "city_cids": {
        //                     "bkg": "20061717",
        //                     "tbo": "21317",
        //                     "voy": "1735253871019858688",
        //                     "exp": "BOSTON|MA|US"
        //                 },
        //                 "pin": "02111",
        //                 "country": "United States",
        //                 "long": -71.064,
        //                 "lat": 42.34908,
        //                 "nhood": [
        //                     {
        //                         "n": "Faneuil Hall Marketplace",
        //                         "_id": "735991484499203777",
        //                         "t": 20,
        //                         "crd": [
        //                             42.359871,
        //                             -71.054947
        //                         ],
        //                         "dis": 1.926
        //                     },
        //                     {
        //                         "dis": 2.095,
        //                         "_id": "3735869979582908979",
        //                         "t": 20,
        //                         "crd": [
        //                             42.359051,
        //                             -71.050797
        //                         ],
        //                         "n": "New England Aquarium"
        //                     },
        //                     {
        //                         "n": "Roxbury Crossing Station",
        //                         "_id": "3510636566565831796",
        //                         "t": 20,
        //                         "crd": [
        //                             42.331909,
        //                             -71.093819
        //                         ],
        //                         "dis": 3.372
        //                     },
        //                     {
        //                         "dis": 3.019,
        //                         "_id": "781703049034534821",
        //                         "t": 20,
        //                         "crd": [
        //                             42.366249,
        //                             -71.061188
        //                         ],
        //                         "n": "North Station"
        //                     },
        //                     {
        //                         "n": "Downtown Crossing Station",
        //                         "_id": "6351938013561066975",
        //                         "t": 20,
        //                         "crd": [
        //                             42.35511,
        //                             -71.060829
        //                         ],
        //                         "dis": 1.072
        //                     }
        //                 ]
        //             },
        //             "desc": {
        //                 "default": ""
        //             }
        //         }
        //     },
        //     "3997325532524546863": {
        //         "hotel_geo_node": {
        //             "name": "Luxury Apartments in a historic Back Bay Landmark",
        //             "tags": {
        //                 "property_type": [
        //                     "Service Apartment"
        //                 ],
        //                 "others": [
        //                     "goibibo_hotel"
        //                 ]
        //             },
        //             "raw_tags": [],
        //             "location": {
        //                 "lat": 42.3498905759,
        //                 "long": -71.0696804013
        //             },
        //             "_id": "3997325532524546863",
        //             "type": 120
        //         },
        //         "hotel_data_node": {
        //             "rating": 3,
        //             "img_processed": [],
        //             "name": "Luxury Apartments in a historic Back Bay Landmark",
        //             "extra": {
        //                 "check_in": "1200",
        //                 "tags": {
        //                     "property_type": [
        //                         "Service Apartment"
        //                     ]
        //                 },
        //                 "check_out": "1200",
        //                 "vendor_priority": 98,
        //                 "settings": {
        //                     "seo": 0,
        //                     "hotel_mode": "vendor_hotel"
        //                 }
        //             },
        //             "ids": {
        //                 "bkg": [
        //                     "1282258"
        //                 ]
        //             },
        //             "st": "LIV",
        //             "facilities": {
        //                 "cmapped": {
        //                     "FRINTRNT": {
        //                         "dn": "Free Internet"
        //                     },
        //                     "INENTMNT": {
        //                         "dn": "Indoor Entertainment"
        //                     },
        //                     "POOL": {
        //                         "dn": "Swimming Pool"
        //                     },
        //                     "RSTRNT": {
        //                         "dn": "Restaurant/Coffee Shop"
        //                     }
        //                 },
        //                 "mapped": [
        //                     "Swimming Pool",
        //                     "Free Internet",
        //                     "Restaurant/Coffee Shop",
        //                     "Indoor Entertainment"
        //                 ]
        //             },
        //             "img_selected": {
        //                 "fs": {
        //                     "l": "http://aff.bstatic.com/images/hotel/max1280x900/408/40875288.jpg"
        //                 },
        //                 "thumb": {
        //                     "l": "http://aff.bstatic.com/images/hotel/max1280x900/408/40875288.jpg"
        //                 },
        //                 "g": {
        //                     "l": "http://aff.bstatic.com/images/hotel/max1280x900/408/40875288.jpg"
        //                 },
        //                 "srp": {
        //                     "l": "http://aff.bstatic.com/images/hotel/max1280x900/408/40875288.jpg"
        //                 },
        //                 "r": {
        //                     "l": "http://aff.bstatic.com/images/hotel/max1280x900/408/40875288.jpg"
        //                 },
        //                 "th": {
        //                     "l": "http://aff.bstatic.com/images/hotel/max1280x900/408/40875288.jpg"
        //                 }
        //             },
        //             "_id": "3997325532524546863",
        //             "loc": {
        //                 "city": "Boston",
        //                 "cnt_code": "US",
        //                 "city_cids": {
        //                     "bkg": "20061717",
        //                     "voy": "1735253871019858688"
        //                 },
        //                 "pin": "02116",
        //                 "country": "USA",
        //                 "long": -71.0696804013,
        //                 "ext_nhood": [],
        //                 "lat": 42.3498905759,
        //                 "nhood": [
        //                     {
        //                         "_id": "2751240631954756096",
        //                         "t": 22,
        //                         "n": "Bay Village"
        //                     },
        //                     {
        //                         "dis": 1.642,
        //                         "_id": "735991484499203777",
        //                         "t": 20,
        //                         "crd": [
        //                             42.359871,
        //                             -71.054947
        //                         ],
        //                         "n": "Faneuil Hall Marketplace"
        //                     },
        //                     {
        //                         "dis": 1.948,
        //                         "_id": "781703049034534821",
        //                         "t": 20,
        //                         "crd": [
        //                             42.366249,
        //                             -71.061188
        //                         ],
        //                         "n": "North Station"
        //                     },
        //                     {
        //                         "n": "Fenway Park",
        //                         "_id": "4787613984641342794",
        //                         "t": 20,
        //                         "crd": [
        //                             42.3465,
        //                             -71.09697
        //                         ],
        //                         "dis": 2.274
        //                     },
        //                     {
        //                         "dis": 1.856,
        //                         "_id": "3735869979582908979",
        //                         "t": 20,
        //                         "crd": [
        //                             42.359051,
        //                             -71.050797
        //                         ],
        //                         "n": "New England Aquarium"
        //                     },
        //                     {
        //                         "n": "Roxbury Crossing Station",
        //                         "_id": "3510636566565831796",
        //                         "t": 20,
        //                         "crd": [
        //                             42.331909,
        //                             -71.093819
        //                         ],
        //                         "dis": 2.817
        //                     },
        //                     {
        //                         "n": "Downtown Crossing Station",
        //                         "_id": "6351938013561066975",
        //                         "t": 20,
        //                         "crd": [
        //                             42.35511,
        //                             -71.060829
        //                         ],
        //                         "dis": 0.931
        //                     }
        //                 ]
        //             },
        //             "desc": {
        //                 "default": ""
        //             }
        //         }
        //     },
        //     "6601325525844000164": {
        //         "hotel_geo_node": {
        //             "name": "Courtyard by Marriott Boston Logan Airport",
        //             "tags": {
        //                 "property_type": [
        //                     "Hotel"
        //                 ],
        //                 "others": [
        //                     "goibibo_hotel"
        //                 ]
        //             },
        //             "raw_tags": [],
        //             "location": {
        //                 "lat": 42.38754,
        //                 "long": -71.01782
        //             },
        //             "_id": "6601325525844000164",
        //             "type": 120
        //         },
        //         "hotel_data_node": {
        //             "rating": 3,
        //             "img_processed": [],
        //             "name": "Courtyard by Marriott Boston Logan Airport",
        //             "extra": {
        //                 "check_in": "1200",
        //                 "settings": {
        //                     "seo": 1,
        //                     "ta_flag": 0,
        //                     "hotel_mode": "vendor_hotel"
        //                 },
        //                 "gir_data": {},
        //                 "vendor_priority": 119,
        //                 "old_voyager_id": "6601325525844000164",
        //                 "check_out": "1200"
        //             },
        //             "ids": {
        //                 "tbo_grp": [
        //                     "106760_21317_0A581A1A1B3DB790E7953A765A51D56C"
        //                 ],
        //                 "tbo": "106760_21317_0A581A1A1B3DB790E7953A765A51D56C",
        //                 "exp": [
        //                     "106760"
        //                 ],
        //                 "ta": "94363"
        //             },
        //             "st": "LIV",
        //             "facilities": {
        //                 "cmapped": {
        //                     "RSTRNT": {
        //                         "dn": "Restaurant/Coffee Shop"
        //                     },
        //                     "LNDRY": {
        //                         "dn": "Laundry Service"
        //                     },
        //                     "GYM": {
        //                         "dn": "Health-Spa"
        //                     },
        //                     "INTRNT": {
        //                         "dn": "Internet"
        //                     },
        //                     "FRINTRNT": {
        //                         "dn": "Free Internet"
        //                     },
        //                     "FDESK": {
        //                         "dn": "Front desk"
        //                     },
        //                     "POOL": {
        //                         "dn": "Swimming Pool"
        //                     }
        //                 },
        //                 "mapped": [
        //                     "Front desk",
        //                     "Free Internet",
        //                     "Laundry Service",
        //                     "Restaurant/Coffee Shop",
        //                     "Health-Spa",
        //                     "Swimming Pool",
        //                     "Internet"
        //                 ]
        //             },
        //             "img_selected": {
        //                 "fs": {
        //                     "wpl": "http://cdn1.goibibo.com/courtyard-by-marriott-boston-logan-airport-boston-lobby-78304115560-webp-fs.webp",
        //                     "l": "http://cdn1.goibibo.com/courtyard-by-marriott-boston-logan-airport-boston-lobby-78304115560-jpeg-fs.jpg"
        //                 },
        //                 "thumb": {
        //                     "wpl": "http://cdn1.goibibo.com/courtyard-by-marriott-boston-logan-airport-boston-lobby-78304115560-webp-srp.webp",
        //                     "l": "http://cdn1.goibibo.com/courtyard-by-marriott-boston-logan-airport-boston-lobby-78304115560-jpeg-srp.jpg"
        //                 },
        //                 "g": {
        //                     "wpl": "http://cdn1.goibibo.com/courtyard-by-marriott-boston-logan-airport-boston-lobby-78304115560-webp-g.webp",
        //                     "l": "http://cdn1.goibibo.com/courtyard-by-marriott-boston-logan-airport-boston-lobby-78304115560-jpeg-g.jpg"
        //                 },
        //                 "srp": {
        //                     "wpl": "http://cdn1.goibibo.com/courtyard-by-marriott-boston-logan-airport-boston-lobby-78304115560-webp-srp.webp",
        //                     "l": "http://cdn1.goibibo.com/courtyard-by-marriott-boston-logan-airport-boston-lobby-78304115560-jpeg-srp.jpg"
        //                 },
        //                 "r": {
        //                     "wpl": "http://cdn1.goibibo.com/courtyard-by-marriott-boston-logan-airport-boston-lobby-78304115560-webp-r.webp",
        //                     "l": "http://cdn1.goibibo.com/courtyard-by-marriott-boston-logan-airport-boston-lobby-78304115560-jpeg-r.jpg"
        //                 },
        //                 "th": {
        //                     "wpl": "http://cdn1.goibibo.com/courtyard-by-marriott-boston-logan-airport-boston-lobby-78304115560-webp-th.webp",
        //                     "l": "http://cdn1.goibibo.com/courtyard-by-marriott-boston-logan-airport-boston-lobby-78304115560-jpeg-th.jpg"
        //                 }
        //             },
        //             "_id": "6601325525844000164",
        //             "loc": {
        //                 "city": "Boston",
        //                 "cnt_code": "US",
        //                 "city_cids": {
        //                     "exp": "BOSTON|MA|US",
        //                     "voy": "1735253871019858688",
        //                     "tbo": "21317"
        //                 },
        //                 "pin": "02128",
        //                 "country": "United States",
        //                 "long": -71.01782,
        //                 "ext_nhood": [],
        //                 "lat": 42.38754,
        //                 "nhood": []
        //             },
        //             "desc": {
        //                 "default": ""
        //             }
        //         }
        //     },
        //     "8840381631574757448": {
        //         "hotel_geo_node": {
        //             "name": "Studio 3 Luxury Studio in Brownstone by Spare Suite",
        //             "tags": {
        //                 "property_type": [
        //                     "Service Apartment"
        //                 ],
        //                 "others": [
        //                     "goibibo_hotel"
        //                 ]
        //             },
        //             "raw_tags": [],
        //             "location": {
        //                 "lat": 42.3428041678,
        //                 "long": -71.0803158581
        //             },
        //             "_id": "8840381631574757448",
        //             "type": 120
        //         },
        //         "hotel_data_node": {
        //             "rating": 2,
        //             "img_processed": [],
        //             "name": "Studio 3 Luxury Studio in Brownstone by Spare Suite",
        //             "extra": {
        //                 "check_in": "1200",
        //                 "settings": {
        //                     "seo": 0,
        //                     "hotel_mode": "vendor_hotel"
        //                 },
        //                 "check_out": "1200",
        //                 "vendor_priority": 144,
        //                 "tags": {
        //                     "property_type": [
        //                         "Service Apartment"
        //                     ]
        //                 }
        //             },
        //             "ids": {
        //                 "bkg": [
        //                     "651398"
        //                 ]
        //             },
        //             "st": "LIV",
        //             "facilities": {
        //                 "cmapped": {
        //                     "FRINTRNT": {
        //                         "dn": "Free Internet"
        //                     },
        //                     "POOL": {
        //                         "dn": "Swimming Pool"
        //                     }
        //                 },
        //                 "mapped": [
        //                     "Swimming Pool",
        //                     "Free Internet"
        //                 ]
        //             },
        //             "img_selected": {
        //                 "fs": {
        //                     "wpl": "https://gos3.ibcdn.com/studio-3-luxury-studio-in-brownstone-by-spare-suite-boston-hotel-information-67873656374fs.webp",
        //                     "l": "https://gos3.ibcdn.com/studio-3-luxury-studio-in-brownstone-by-spare-suite-boston-hotel-information-67873656374fs.jpg"
        //                 },
        //                 "thumb": {
        //                     "wpl": "https://gos3.ibcdn.com/studio-3-luxury-studio-in-brownstone-by-spare-suite-boston-hotel-information-67873656374srp.webp",
        //                     "l": "https://gos3.ibcdn.com/studio-3-luxury-studio-in-brownstone-by-spare-suite-boston-hotel-information-67873656374srp.jpg"
        //                 },
        //                 "g": {
        //                     "wpl": "https://gos3.ibcdn.com/studio-3-luxury-studio-in-brownstone-by-spare-suite-boston-hotel-information-67873656374g.webp",
        //                     "l": "https://gos3.ibcdn.com/studio-3-luxury-studio-in-brownstone-by-spare-suite-boston-hotel-information-67873656374g.jpg"
        //                 },
        //                 "srp": {
        //                     "wpl": "https://gos3.ibcdn.com/studio-3-luxury-studio-in-brownstone-by-spare-suite-boston-hotel-information-67873656374srp.webp",
        //                     "l": "https://gos3.ibcdn.com/studio-3-luxury-studio-in-brownstone-by-spare-suite-boston-hotel-information-67873656374srp.jpg"
        //                 },
        //                 "r": {
        //                     "wpl": "https://gos3.ibcdn.com/studio-3-luxury-studio-in-brownstone-by-spare-suite-boston-hotel-information-67873656374r.webp",
        //                     "l": "https://gos3.ibcdn.com/studio-3-luxury-studio-in-brownstone-by-spare-suite-boston-hotel-information-67873656374r.jpg"
        //                 },
        //                 "th": {
        //                     "wpl": "https://gos3.ibcdn.com/studio-3-luxury-studio-in-brownstone-by-spare-suite-boston-hotel-information-67873656374th.webp",
        //                     "l": "https://gos3.ibcdn.com/studio-3-luxury-studio-in-brownstone-by-spare-suite-boston-hotel-information-67873656374th.jpg"
        //                 }
        //             },
        //             "_id": "8840381631574757448",
        //             "loc": {
        //                 "city": "Boston",
        //                 "cnt_code": "US",
        //                 "city_cids": {
        //                     "bkg": "20061717",
        //                     "voy": "1735253871019858688"
        //                 },
        //                 "pin": "02118",
        //                 "country": "USA",
        //                 "long": -71.0803158581,
        //                 "lat": 42.3428041678,
        //                 "nhood": [
        //                     {
        //                         "dis": 1.429,
        //                         "_id": "4787613984641342794",
        //                         "t": 20,
        //                         "crd": [
        //                             42.3465,
        //                             -71.09697
        //                         ],
        //                         "n": "Fenway Park"
        //                     },
        //                     {
        //                         "_id": "7492998443663336846",
        //                         "t": 22,
        //                         "n": "South End"
        //                     },
        //                     {
        //                         "n": "Boston University",
        //                         "_id": "5925955222497673137",
        //                         "t": 20,
        //                         "crd": [
        //                             42.350559,
        //                             -71.108307
        //                         ],
        //                         "dis": 2.457
        //                     },
        //                     {
        //                         "n": "Roxbury Crossing Station",
        //                         "_id": "3510636566565831796",
        //                         "t": 20,
        //                         "crd": [
        //                             42.331909,
        //                             -71.093819
        //                         ],
        //                         "dis": 1.643
        //                     },
        //                     {
        //                         "_id": "4125637182865419320",
        //                         "t": 22,
        //                         "n": "Symphony"
        //                     },
        //                     {
        //                         "_id": "1369101611937636735",
        //                         "t": 22,
        //                         "n": "Prudential"
        //                     }
        //                 ]
        //             },
        //             "desc": {
        //                 "default": ""
        //             }
        //         }
        //     },
        //     "6392909916989948919": {
        //         "hotel_geo_node": {
        //             "raw_tags": [],
        //             "_id": "6392909916989948919",
        //             "type": 120,
        //             "name": "The Westin Boston Waterfront",
        //             "tags": {
        //                 "others": [
        //                     "goibibo_hotel"
        //                 ]
        //             }
        //         },
        //         "hotel_data_node": {
        //             "rating": 0,
        //             "img_processed": [],
        //             "name": "The Westin Boston Waterfront",
        //             "extra": {
        //                 "check_in": "1200",
        //                 "settings": {
        //                     "seo": 1,
        //                     "hotel_mode": "vendor_hotel"
        //                 },
        //                 "gir_data": {},
        //                 "vendor_priority": 262,
        //                 "old_voyager_id": "6392909916989948919",
        //                 "check_out": "1200"
        //             },
        //             "ids": {
        //                 "tbo_grp": [
        //                     "242136_21317_11443E3445CB883E54F6BC801A1644F8"
        //                 ],
        //                 "tbo": "242136_21317_11443E3445CB883E54F6BC801A1644F8"
        //             },
        //             "st": "LIV",
        //             "facilities": {
        //                 "cmapped": {},
        //                 "mapped": []
        //             },
        //             "_id": "6392909916989948919",
        //             "loc": {
        //                 "city": "Boston",
        //                 "cnt_code": "US",
        //                 "city_cids": {
        //                     "voy": "1735253871019858688",
        //                     "tbo": "21317"
        //                 },
        //                 "country": "United States",
        //                 "ext_nhood": [],
        //                 "nhood": []
        //             },
        //             "desc": {
        //                 "default": ""
        //             }
        //         }
        //     }
        // };

        function updateReview(newReview) {
            vm.hotelId = $routeParams.hid;
            vm.userId = $routeParams.uid;
            vm.reviewId = $routeParams.rid;
            vm.cityId = $routeParams.cid;
            var promise = ReviewService.updateReview(vm.reviewId, newReview);
            promise.success(function (data) {
                //console.log(data);
                $location.url("/user/" + vm.userId +"/city/"+vm.cityId+ "/hotelDetails/"+ vm.hotelId);

            })
        }

        function deleteReview(reviewId) {
            vm.hotelId = $routeParams.hid;
            vm.userId = $routeParams.uid;
            vm.reviewId = $routeParams.rid;
            vm.cityId = $routeParams.cid;
            var promise = ReviewService.deleteReview(reviewId);
            promise.success(function (data) {
                $location.url("/user/" + vm.userId +"/city/"+vm.cityId+ "/hotelDetails/"+ vm.hotelId);

            })
        }

        function init() {
            //console.log("Hi");
            var promise = ReviewService.findReviewById(vm.reviewId);
            promise
                .success(function (review) {

                    vm.review = review;

                })
                .error(function () {

                });
            // vm.hotels_list = hotel_list;
            // console.log(vm.hotels_list);
        }

        init();


//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
//
//         app.filter('startFrom', function() {
//             return function (input, start) {
//                 start = +start; //parse to int
//                 return input.slice(start);
//             }
//         });


    }

})();