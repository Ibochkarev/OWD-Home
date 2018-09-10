$(function() {

    var controls = document.querySelectorAll('.controls');
    for(var i=0; i<controls.length; i++){
        controls[i].style.display = 'inline-block';
    }

    var slides = document.querySelectorAll('#slides .slide');
    var currentSlide = 0;
    var slideInterval = setInterval(nextSlide,2000);

    function nextSlide(){
        goToSlide(currentSlide+1);
    }

    function previousSlide(){
        goToSlide(currentSlide-1);
    }

    function goToSlide(n){
        slides[currentSlide].className = 'slide';
        currentSlide = (n+slides.length)%slides.length;
        slides[currentSlide].className = 'slide active';
    }


    var playing = true;
    var pauseButton = document.getElementById('pause');

    function pauseSlideshow(){
        playing = false;
        playing = setInterval(nextSlide,2000);
    }

    var next = document.getElementById('next');
    var previous = document.getElementById('previous');

    next.onclick = function(){
        pauseSlideshow();
        nextSlide();
    };
    previous.onclick = function(){
        pauseSlideshow();
        previousSlide();
    };

});
