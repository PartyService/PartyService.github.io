$(window).on('load', renderUsers);
var baseurl = 'https://github.com/PartyService'

const urls = [
    'https://serverstatus.bc5f39.workers.dev/',
    'https://cdn.bc5f39.workers.dev/',
    'https://jd-s3.bc5f39.workers.dev/'
];

async function getData() {
    try {
        const statusPromises = urls.map(async url => {
            const res = await fetch(url, { method: 'HEAD', mode: 'cors' });
            return { url, online: res.ok };
        });

        const statuses = await Promise.all(statusPromises);
        console.log(statuses)
        return statuses;
    } catch (error) {
        console.log(error);
        return [];
    }
}


async function renderUsers() {
    let statuses = await getData();
    const el = document.querySelector('.list');
    let html = '';
    statuses.forEach((status, index) => {
        const statusText = status.online ? 'Online' : 'Offline';
        let htmlSegment = `<li class="list-item" onclick="window.location.href='${status.url}'">
                            <div class="list-item-pictures">${index + 1}</div>
                            <div class="list-item-content">
                                <h4>${status.url}</h4>
                                <p>Status: ${statusText}</p>
                            </div>
                           </li>`;

        html += htmlSegment;
    });
    let container = document.querySelector('.list');
    container.innerHTML = html;
}
