$(window).on('load', startup);
var baseurl = 'https://raw.githubusercontent.com/PartyService/database/main/web/data/'
//Load Pages Styles
$('head').append('<link rel="stylesheet" href="ui/pages/download.css" />');
//Start Add Pages
let devicejson;
const devicetitle = '.device .banner-title';
const devicecodename = '.device .banner-subtitle';
function startup() {
    const el = document.querySelector('#page');
    el.classList.add("fetched");

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    setTimeout(function () {
        let value = params.device;
        const el = document.querySelector('#page');
        if (value !== null) {
            var jsonurl = `${baseurl}/device/${value}/${value}.json`;
            el.classList.add("devicedl");
            $('.device .banner-subtitle').text(value)
            fetchDeviceData(jsonurl)
            el.classList.remove("fetched");
        } else {
            renderUsers();
            el.classList.remove("fetched");
            var input = document.querySelector('.banner-search');
            input.addEventListener("input", filter);
        }
    }, 100);
}

function opengrid() {
    var codename = $(this).attr('class').split(' ')[1];
    window.location.href = 'download?device=' + codename;
}
async function fetchDeviceData(file) {
    let x = await fetch(file, { cache: "no-store", cors: "no-cors" });
    let y = await x.text();
    try {
        if (y !== undefined) {
            const obj = JSON.parse(y);
            $('.device .banner-title').text(obj.name)
            $('.device .banner-subtitle').text(obj.codename)
            $('.device .banner-maintainer').text(obj.maintainer)
            $('.device .banner-availiabilty').text(obj.availability)
            var pictures = `${baseurl}/${obj.pictures}`
            document.querySelector('.phone').src = pictures;
            var isAvailable = `${obj.isAvailable}`
            if (isAvailable == "false") {
                const el = document.querySelector('.dlrom');
                el.classList.add("offline");
                el.innerHTML = 'Not Available'
            }
            if (isAvailable == "true") {
                const el = document.querySelector('.dlrom');
                el.classList.add("online");
                el.onclick = function(){
                    window.open(obj.downloadUrl)
                }
                el.innerHTML = 'Download'
            }
            const el = document.querySelector('#page');
            el.classList.add("fetched");
        }
    } catch (err) {

    }
}

async function fetchDeviceList(file) {
    let x = await fetch(file, { cache: "no-store" });
    let y = await x.text();
    if (y !== undefined) {
        const obj = JSON.parse(y);
        $('.device .banner-title').text(obj.name)
        $('.device .banner-subtitle').text(obj.codename)
        $('.device .banner-maintainer').text(obj.maintainer)
        var pictures = `${baseurl}/${obj.pictures}`
        document.querySelector('.phone').src = pictures;
        const el = document.querySelector('#page');
        el.classList.add("fetched");
    }
}
async function getDevice() {
    let url = `${baseurl}/list/devices-jdp.json`
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
async function renderUsers() {
    let users = await getDevice();
    const el = document.querySelector('#page');
    let html = '';
    users.forEach(device => {
        var pictures = `${baseurl}${device.pictures}`
        let htmlSegment = `<div class="grid ${device.codename}" onmousedown="ripple('.${device.codename}')">
                            <img class="phone" src="${pictures}" alt="${device.name}" loading="lazy">
                             <span class="title">${device.name}</span>
                             <span class="subtitle">${device.codename}</span>
                           </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container-grid');
    container.innerHTML = html;
    $('.grid').click(opengrid);
    el.classList.add("fetched");
}

function filter(e) {
    var filter = e.target.value.toUpperCase();
    var divs = document.querySelectorAll(".grid");
    for (var i = 0; i < divs.length; i++) {
        var a = divs[i].getElementsByClassName("title")[0];
        var b = divs[i].getElementsByClassName("subtitle")[0];
        var aif = a.innerHTML.toUpperCase().indexOf(filter) > -1
        var bif = b.innerHTML.toUpperCase().indexOf(filter) > -1
        if (aif || bif) {
            divs[i].style.display = "";
        } else {
            divs[i].style.display = "none";
        }
    }

}

