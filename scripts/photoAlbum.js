/* jshint esversion: 6 */
let photos = [];

let photoCounts = 15;

for(let i = 0; i < photoCounts; i++) {
    photos[i] = {
        path: `../img/photoAlbum/small/sticker${i+1}.webp`,
        title: `Фото ${i+1}`
    }
}

for(let i = 0; i < photoCounts; i++) {
    document.writeln(`<figure class="photo id="${i}" onMouseOver="interactiveImage(this, true)" onMouseOut="interactiveImage(this, false)">
                    <img src="${photos[i].path}" alt="${photos[i].title}" title="${photos[i].title}">
                    <figcaption>${photos[i].title}</figcaption>
                    </figure>`);
} 

function interactiveImage(obj, flag) {
    let img = obj.querySelector('img');
    if(flag) {
        img.style.transform = 'scale(1.2)';
        img.style.transition = 'transform 0.3s ease';
    } else {
        img.style.transform = 'scale(1)';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector('.photo-container');
    console.log(container);
    container.addEventListener('click', showBigPhoto);

    document.body.addEventListener('click', function(event) {
        if(event.target.className == 'show') {
            event.target.classList.remove('show');
        } 
    })
});

function showBigPhoto(event) {
    if(event.target.title.length != 0) {
        let photoSrc = event.target.src.replace('small', 'big');
        let bigPhotoContainer = document.getElementById('big-photo');
        bigPhotoContainer.innerHTML = '';
        bigPhotoContainer.classList.toggle('show');
        let bigImg = document.createElement('img');
        bigImg.src = photoSrc;
        bigImg.alt = event.target.alt;
        bigImg.title = event.target.title;
        bigPhotoContainer.append(bigImg);
        event.stopPropagation();
    }
}