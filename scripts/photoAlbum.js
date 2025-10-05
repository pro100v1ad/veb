/* jshint esversion: 6 */
let fotos = {};
let titles = {};

let photoCounts = 15;

for(let i = 0; i < photoCounts; i++) {
    fotos[i] = `../img/sticker${i+1}.webp`;
    titles[i] = `Фото ${i+1}`;
}

for(let i = 0; i < photoCounts; i++) {
    document.writeln(`<figure class="photo">
                    <img src="${fotos[i]}" alt="${titles[i]}" title="${titles[i]}">
                    <figcaption>${titles[i]}</figcaption>
                    </figure>`);
}