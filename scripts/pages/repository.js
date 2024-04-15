$(window).on('load', renderUsers);
var baseurl = 'https://github.com/PartyService'

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

async function getDevice() {
    let url = `https://api.github.com/orgs/PartyService/repos?per_page=100&page=1&sort=updated&direction=asc`
    if(params.list == 'pushed'){
    url = `https://api.github.com/orgs/PartyService/repos?per_page=100&page=1&sort=pushed&direction=desc`
   }
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    let users = await getDevice();
    const el = document.querySelector('.list');
    let html = '';
    var numb = 0;
    users.forEach(user => {
        numb++;
        let htmlSegment = `<li class="list-item" onclick="window.location.href='${baseurl}/${user.name}'">
                            <div class="list-item-pictures ${user.language}">${numb}</div>
                            <div class="list-item-content">
                                <h4>${user.name}</h4>
                                <p>${user.language} - ${user.description}</p>
                            </div>
                           </li>`;

        html += htmlSegment;
    });
    let container = document.querySelector('.list');
    container.innerHTML = html;
}
