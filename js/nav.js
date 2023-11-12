let slideMenuPostionX;
let actual;
$(function () {
    $("#ham-menu-toggle").click(handleHamMenu);
    $('#slide-menu').on('touchstart', function(e) 
    {
        slideMenuPostionX = e.touches[0].pageX;
        actual = getTranslateX('slide-menu');

     });
    $('#slide-menu').on('touchmove', slideMenu);


    let itemsCount = $("#prim-menu-cont > div > ul > .prim-menu-item").length;


    for (let i = 0; i < itemsCount; i++) {
        let labelId = "#m-lbl-" + i;
        let checkboxId = "#m-cb-" + i;
        let listId = "#m-list-" + i;

        let lbl = $(labelId);
        let cb = $(checkboxId);
        let ul = $(listId);

        lbl.click({ label: lbl, checkbox: cb, list: ul }, handleMenuItem);
    }

});


function handleHamMenu() {
    let checkbox = $('#ham-menu-cb');
    let menuCont = $('#prim-menu-cont');
    let button = $('#ham-menu-toggle');

    if (checkbox.is(":checked")) {
        menuCont.removeClass('d-block');

        button.removeClass('cross-bg');
        button.addClass('ham-bg');

        checkbox.prop("checked", false);
        return;
    }

    menuCont.addClass('d-block');
    button.addClass('cross-bg');
    button.removeClass('ham-bg');
    checkbox.prop("checked", true);
}

function handleMenuItem(event) {

    if (event.data.checkbox.is(":checked")) {
        event.data.list.removeClass('d-block');
        event.data.label.css("color", "#ffffff");
        event.data.label.removeClass('upside-down');
        event.data.checkbox.prop("checked", false);
        return;
    }
    event.data.list.addClass('d-block');
    event.data.label.css("color", "#0095d9");
    event.data.label.addClass('upside-down');
    event.data.checkbox.prop("checked", true);
    return;
}



function slideMenu(e) {
    let posX = e.touches[0].pageX;

    let offsett = posX - slideMenuPostionX; 
    let menu = $('#slide-menu');
    
    
    let newPos = (actual + offsett);
    
    if(newPos > 0)
    newPos = 0;
    if(newPos < -300)
    newPos = -300;
    
    menu.css('transform', 'translateX(' + newPos + 'px)');
}

function getTranslateX(element) {
    const style = window.getComputedStyle(document.getElementById(element))
    const matrix = new DOMMatrixReadOnly(style.transform)
       return  matrix.m41;
}