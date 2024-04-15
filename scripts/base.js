//App Start Up
try {
    $(window).on('load', startup);
    $('head').append('<link rel="stylesheet" type="text/css" href="ui/material.css">');
    $('head').append('<link rel="stylesheet" type="text/css" href="ui/light.css" media="(prefers-color-scheme: light)">');
    $('head').append('<link rel="stylesheet" type="text/css" href="ui/animation.css">');
    $('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0&display=swap" />');
    $('head').append('<link rel="stylesheet" type="text/css" href="ui/smalldevice.css">');
    $('head').append('<link rel="stylesheet" type="text/css" href="ui/loading.css">');
} catch (err) {
    console.log('Failed To Load JQuery')
}
function startup() {
    setTimeout(function () {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, 100);
    setTimeout(function () {
        const el = document.querySelector('#page');
        el.classList.remove("loading2");
        window.scrollTo(0, 0);
    }, 500);
    setTimeout(function () {
        const el = document.querySelector('#page');
        el.classList.remove("loading");
    }, 600);
}

function ripple(target) {
    const td = document.querySelector(target);
    var tag = document.createElement("span");
    tag.classList.add("ripple");
    td.appendChild(tag);
    setTimeout(removeelement, 600, tag);
}
function removeelement(target) {
    target.remove()
}