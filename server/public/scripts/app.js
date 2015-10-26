var arrayOfPeers = [];
var indexTracker = 0;


$(document).ready(function(){


    $.ajax({
        type: "GET",
        url: "/data",
        success: function(data){
            appendDom(data);
            createNameDisplay();
            updateIndexPoints();
        }
    });

});


function appendDom(data) {
    arrayOfPeers = data.zeta;

    //for(var i = 0; i < arrayOfPeers.length; i++) {
    //    var classmate = arrayOfPeers[i];
    //    var el = "<div class='classmate'>" +
    //        "<div class='text'>" + classmate.github + "</div>" +
    //        "<div class='text'>" + classmate.name + "</div>" +
    //        "<div class='text'>" + classmate.shoutout + "</div>" +
    //        "</div>";
    //}

    createCarousel(arrayOfPeers);
    $("#next").on('click', nextSlide);
    $("#prev").on('click', prevSlide);
}


function createCarousel(array){
    $(".indexList").append("<div class='main'></div>");
    var $el = $(".indexList").children().last();

    createIndexPoints(array, $el);
    createNavButtons($el);
}



function createNavButtons($el) {
    $el.prepend("<div id='prev' class='nav-button'>Prev</div>");
    $el.append("<div id='next' class='nav-button'>Next</div>");
}



function createIndexPoints(array, $el){
    //create something visual, Divs will work
    for(var i = 0; i < array.length; i++){
        //we need i, 1 for each element
        $el.append("<div class='index-point' id='index" + i + "'></div>")

    }
}


function nextSlide(){
    incrementTracker();
    //indexTracker++;
    createNameDisplay(arrayOfPeers,indexTracker);
    //if(indexTracker >= peopleArray.length){
    //    indexTracker = 0;
    //}

    updateIndexPoints();
}


function prevSlide(){
    //indexTracker--;
    decrementTracker();
    createNameDisplay(arrayOfPeers,indexTracker);
    //if(indexTracker < 0){
    //    indexTracker = peopleArray.length - 1;
    //}

    updateIndexPoints();
}


function updateIndexPoints(){
    for(var i = 0; i < arrayOfPeers.length; i++){
        $("#index" + i).removeClass("index-point-active");

        if(i == indexTracker){
            $("#index" + i).addClass("index-point-active");
        }
    }
}


function createNameDisplay(){
    var i = indexTracker;
    var currentName = arrayOfPeers[i];

    $('.peers').children().fadeOut();
    $("<h1>" + currentName.name + "</h1>").hide().appendTo('.peers').delay(500).fadeIn(1000);
    $("<h3>" + currentName.github + "</h3>").hide().appendTo('.peers').delay(500).fadeIn(1000);
    $("<h5><em>" + currentName.shoutout + "</em></h5>").hide().appendTo('.peers').delay(500).fadeIn(1000);

}


function incrementTracker(){
//TODO: fix for empty peopleArray
    var isNullOrUndefined = arrayOfPeers == null;
    if (isNullOrUndefined) {
        throw new Error ('people array is null');
    }

    var sliderCount = arrayOfPeers.length;
    var newTracker = (indexTracker +1) % sliderCount;
    indexTracker = newTracker;
}

function decrementTracker(){
    var isNullOrUndefined = arrayOfPeers == null;
    if (isNullOrUndefined) {
        throw new Error ('people array is null');
    }
    var sliderCount = arrayOfPeers.length;
    var newTracker = (indexTracker -1) % sliderCount;

    if (newTracker < 0 ){
        newTracker = sliderCount-1;
    }
    indexTracker = newTracker;
}



