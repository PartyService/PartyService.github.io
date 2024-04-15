$(window).on('load', renderUsers);
var baseurl = 'https://raw.githubusercontent.com/PartyService/database/main/web/data'

async function getDevice() {
    console.log('sek')
    let url = `${baseurl}/list/mcore.json`
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    console.log('sus')
    let users = await getDevice();
    const el = document.querySelector('.list');
    let html = '';
    users.forEach(user => {
        var pictures = `https://github.com/${user.username}.png?size=128`
        let htmlSegment = `<li class="list-item">
                            <div class="list-item-pictures">
                                <img src="${pictures}" class="list-item-image" alt="${user.name}" loading="lazy">
                            </div>
                            <div class="list-item-content">
                                <h4>${user.name}</h4>
                                <p>${user.username} - ${user.role}</p>
                            </div>
                           </li>`;

        html += htmlSegment;
    });
    let container = document.querySelector('.list');
    container.innerHTML = html;
}
