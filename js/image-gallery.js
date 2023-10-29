let imageCount = 100;
let columnsCount = 3;


$(function () {
});

function init() {



    let gallery = $('#awesome-image-gallery');
    let columns = gallery.children('.col');

    for (let i = 1; i <= imageCount; i++)
    {
        let colIndex = i % columnsCount;

        let col = columns[colIndex];
        let imageTag = '<img src="images/gal/image' + i +'.jpeg" id="image' + i + '">'
        // let imageTag = '<b>Ahoj </b> '
        col.append(imageTag);
    }


}