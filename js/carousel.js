function init() {

    $('#c-carousel-next').on('click',function () { move(next) });
    $('#c-carousel-prev').on('click', function () { move(prev) });

    let imgWrappers = $('.c-carousel__img-wrapper');

    imgWrappers.each(function (index) {
        imgWrappers[index].style.transform = `translateX(${index * 100}%)`;
    });
}

let currentImg = 0;

function move(directionFunc) {

    directionFunc();
    let imgWrappers = $('.c-carousel__img-wrapper');

    imgWrappers.each(function (index) {
        imgWrappers[index].style.transform = `translateX(${100 * (index - currentImg)}%)`;
    });
}

function prev() {
    if (currentImg === 0) {
        currentImg = 4;
        return;
    }

    currentImg--;
}

function next() {
    if (currentImg === 4) {
        currentImg = 0;
        return;
    }

    currentImg++;
}


$(init);