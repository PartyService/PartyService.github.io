//Load Pages Styles
$('head').append('<link rel="stylesheet" href="ui/pages/index.css" />');
//Start Add Pages
var sourcechecker = `

`;
var advantages = `
                    <div class="grid light" onmouseover="ripple('.light')">
                        <span class="material-symbols-rounded" translate="no">celebration</span>
                        <span class="title">World Dance Floor</span>
                        <span class="subtitle">Beat Another Player!</span>
                    </div>
                    <div class="grid goodui" onmouseover="ripple('.goodui')">
                        <span class="material-symbols-rounded" translate="no">auto_awesome</span>
                        <span class="title">Exclusive Maps</span>
                        <span class="subtitle">It has bunch of non-jdu maps!</span>
                    </div>
                    <div class="grid privacy" onmouseover="ripple('.privacy')">
                        <span class="material-symbols-rounded" translate="no">security</span>
                        <span class="title">Privacy</span>
                        <span class="subtitle">With Enchanced Security</span>
                    </div>
                    <div class="grid uptodate" onmouseover="ripple('.uptodate')">
                        <span class="material-symbols-rounded" translate="no">system_update</span>
                        <span class="title">OpenParty Based</span>
                        <span class="subtitle">Open source and free!</span>
                    </div>
`;

$(window).on('load', async function () {
    $('.advantages .container-grid').append(advantages)
    $('.sourcechecker').append(sourcechecker)
     
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.querySelector('.phone').src = "assets/drawable/phone_dark.png";
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        if (newColorScheme == 'light') {
            document.querySelector('.phone').src = "assets/drawable/phone_dark.png";
        }
        if (newColorScheme == 'dark') {
            document.querySelector('.phone').src = "assets/drawable/phone_dark.png";
        }
    });
    await updateServerStats()
});

async function updateServerStats() {
    const serverStatusElement = document.querySelector('.panel.left .serverstats');
    const onlinePlayersElement = document.querySelector('.panel.right .OnlinePlayers');
    const deployTimeElement = document.querySelector('.panel.bottom .deployTime');

    try {
        const response = await fetch('https://justdanceservices.prjktla.online/status/v1/serverstats');
        
        if (response.ok) {
            // Jika server merespons dengan status 200, berarti server online
            serverStatusElement.textContent = "• Online";
            serverStatusElement.className = "serverstats online";
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        try {
            const data = await response.json();

            // Jika data berhasil diambil, perbarui elemen
            onlinePlayersElement.textContent = data.onlineUser || "N/A";
            const deployDate = new Date(data.deployTime);
            deployTimeElement.textContent = deployDate.toLocaleString();
        } catch (error) {
            // Jika terjadi kesalahan parsing JSON (kemungkinan masalah CORS), tampilkan pesan default
            console.warn("Error parsing JSON data:", error);
            onlinePlayersElement.textContent = "N/A";
            deployTimeElement.textContent = "N/A";
        }
    } catch (error) {
        console.error("Error fetching server stats:", error);

        // Set status sebagai Offline jika ada masalah
        serverStatusElement.textContent = "• Offline";
        serverStatusElement.className = "serverstats offline";
        
        // Reset data lainnya
        onlinePlayersElement.textContent = "N/A";
        deployTimeElement.textContent = "N/A";
    }
}


