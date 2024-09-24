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
                        <span class="title">Up-To-Date</span>
                        <span class="subtitle">Always Use New Security Patch</span>
                    </div>
`;

$(window).on('load', function () {
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
});