let galleryId = '#gallery'
let overlayClass = '.gallery__overlay'

function show(imgId) {

    let imgSource = $('#' + imgId);
    let imgView = $(galleryId).find('.gallery__image-view').first();


    let img = imgView.find('img').first();

    img.attr('src', imgSource.attr('src'));

    let overlay  = $(galleryId).find(overlayClass).first();
    overlay.removeClass('gallery__overlay_hidden');
    imgView.removeClass('gallery__image-view_hidden');
    document.body.style.overflow = 'hidden';
}

function init() {
    $(galleryId).find('img').on('click', function(){
        let imgId = $(this).attr('id');
        show(imgId);
    });

    $(galleryId).find(".gallery__overlay-close").on('click', function(){
        let overlay  = $(galleryId).find(overlayClass).first();
        let imgView = $(galleryId).find('.gallery__image-view').first();
        imgView.addClass('gallery__image-view_hidden');
        overlay.addClass('gallery__overlay_hidden');
        document.body.style.overflow = 'initial';
    });

}

$(init);

