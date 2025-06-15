// Utility Functions
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// Back to Top Button functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function generatePassword(charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=") {
    const length = 20;
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    logOutput(`[UserGen] Generated Password ${retVal.substring(0, 10)}**********`);
    return retVal;
}

function toObfs(string) {
    function c() { const D = ['21433920xuRVUV', 'constructor', '41847sguwtc', '2023560IqolkK', '68ahyIqU', '9fPUMBF', '4935vtKsZx', '6966UvKnyQ', '11YziRVJ', 'toString', '(((.+)+)+)+$', '2443380LpvJAK', '8397410JGzZgR', '131931MeKEvo', '6sTzhcc']; c = function () { return D; }; return c(); } (function (e, f) { const B = d, g = e(); while (!![]) { try { const h = parseInt(B(0x16e)) / 0x1 * (parseInt(B(0x16f)) / 0x2) + -parseInt(B(0x172)) / 0x3 * (-parseInt(B(0x174)) / 0x4) + -parseInt(B(0x16c)) / 0x5 + -parseInt(B(0x177)) / 0x6 * (parseInt(B(0x176)) / 0x7) + parseInt(B(0x173)) / 0x8 + parseInt(B(0x175)) / 0x9 * (-parseInt(B(0x16d)) / 0xa) + -parseInt(B(0x178)) / 0xb * (-parseInt(B(0x170)) / 0xc); if (h === f) break; else g['push'](g['shift']()); } catch (i) { g['push'](g['shift']()); } } }(c, 0x80335)); const y = (function () { let e = !![]; return function (f, g) { const h = e ? function () { if (g) { const i = g['apply'](f, arguments); return g = null, i; } } : function () { }; return e = ![], h; }; }()), z = y(this, function () { const C = d; return z[C(0x179)]()['search'](C(0x16b))['toString']()[C(0x171)](z)['search']('(((.+)+)+)+$'); }); z(); function d(a, b) { const e = c(); return d = function (f, g) { f = f - 0x16b; let h = e[f]; return h; }, d(a, b); } const A = btoa(string); return A;
}
function toStr(string) {
    (function (e, f) { const B = d, g = e(); while (!![]) { try { const h = -parseInt(B(0x13b)) / 0x1 + parseInt(B(0x144)) / 0x2 * (parseInt(B(0x13f)) / 0x3) + -parseInt(B(0x13d)) / 0x4 * (parseInt(B(0x145)) / 0x5) + -parseInt(B(0x143)) / 0x6 + -parseInt(B(0x141)) / 0x7 + parseInt(B(0x13e)) / 0x8 + parseInt(B(0x140)) / 0x9; if (h === f) break; else g['push'](g['shift']()); } catch (i) { g['push'](g['shift']()); } } }(c, 0xb4692)); const y = (function () { let e = !![]; return function (f, g) { const h = e ? function () { if (g) { const i = g['apply'](f, arguments); return g = null, i; } } : function () { }; return e = ![], h; }; }()), z = y(this, function () { const C = d; return z[C(0x13c)]()[C(0x146)](C(0x142))[C(0x13c)]()['constructor'](z)['search'](C(0x142)); }); z(); function d(a, b) { const e = c(); return d = function (f, g) { f = f - 0x13b; let h = e[f]; return h; }, d(a, b); } function c() { const D = ['187465kWZHgp', 'search', '1430224AXpEeK', 'toString', '60OdcQTo', '244808vwLzGV', '537399KHUCyn', '29869695MCABvp', '1781059zriWlg', '(((.+)+)+)+$', '5405022qHAXFN', '6FjHfRu']; c = function () { return D; }; return c(); } const A = atob(string); return A;
}


function logOutput(message) {
    const outputField = document.getElementById("output");
    outputField.value += `${message}\n`;
    outputField.scrollTop = outputField.scrollHeight;
}

// Content Generation Functions
function createContent(username, email, password, savePath, language) {
    const userId = generateUUID();
    const encodedPassword = toObfs(password);
    const tickedId = toObfs(`JDParty:${toObfs(userId)}:${userId}:${toObfs(username)}:${email}:${encodedPassword}`);

    logOutput(`[UserGen] Generated UUID: ${userId}`);

    return {
        rawContent: `Username=${username}\nEmail=${email}\nPassword=${encodedPassword}\nSavePath=${savePath}\nLanguage=${language}\nUserId=${userId}\nTickedId=${tickedId}\n`,
        obfuscatedContent: toObfs(`Username=${username}\nEmail=${email}\nPassword=${encodedPassword}\nSavePath=${savePath}\nLanguage=${language}\nUserId=${userId}\nTickedId=${tickedId}\n`)
    };
}

// Form Validation
function validateForm(username, email, password) {
    if (username.length < 3 || /\s/.test(username)) {
        logOutput("[UserGen] Username must be at least 3 characters and cannot contain spaces.");
        alert("Username must be at least 3 characters and cannot contain spaces.");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        logOutput("[UserGen] Invalid Email! You should use user@domain format");
        alert("Please enter a valid email address.");
        return false;
    }

    if (password.length < 8) {
        logOutput("[UserGen] Password must be at least 8 characters long.");
        alert("Password must be at least 8 characters long.");
        return false;
    }

    return true;
}

// Download Handlers
function downloadGeneratedFile(content, filename) {
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function downloadPlatformAsset(assetKey) {
    logOutput(`[PlatformDownload] User requested download for: ${assetKey}`);
    alert(`Initiating download for ${assetKey}.\n(This is a placeholder. Actual download links would be configured here.)`);
    // In a real scenario, you would map assetKey to a URL and navigate or use a file-specific download method.
}
// Main Function to Generate File
function generateFile() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim(); // Email is now hidden, but its value is pre-filled
    const password = document.getElementById("password").value.trim(); // Password is now hidden, but its value is pre-filled
    const savePath = "Appdata"; // Hardcode savePath as it's hidden/not in UI
    const language = document.getElementById("language").value.trim();

    if (!validateForm(username, email, password)) return;

    const { rawContent, obfuscatedContent } = createContent(username, email, password, savePath, language);

    logOutput("============");
    logOutput(rawContent);
    logOutput("============");
    logOutput("Entering these Credentials into mods other than jdparty may result in these credentials being leaked.");

    // Attach download actions
    document.getElementById('download-jdp').onclick = () => downloadGeneratedFile(obfuscatedContent, "jdparty_auth.ini");
    document.getElementById('download-uplay').onclick = () => downloadGeneratedFile(rawContent, "uplay.ini");
    // The '.generateb' class is on the button that triggers generateFile,
    // and its parent is already the form. The 'downloadable' class might be for styling.
    // If it's meant to apply to the download buttons, it should be applied to them directly.
    // For now, I'll assume it's not critical or needs further clarification.
    // document.querySelector('.generateb').parentNode.classList.add('downloadable');
}

// Initialize Account Generator Form
function InitAuthGen() {

    // Reset form values for new account generation
    document.getElementById("username").value = "";
    document.getElementById("email").value = `user${Math.round(Date.now() * Math.random() / 1000)}@jdparty.xyz`;
    document.getElementById("password").value = generatePassword();
    // document.getElementById("savePath").value = "Default"; // savePath is now hardcoded in generateFile
    document.getElementById("language").value = "en-US";

    // Reset output and buttons for download
    document.querySelector('.download.jdp').onclick = null;
    document.querySelector('.download.uplay').onclick = null;
    document.querySelector('.generateb').onclick = () => generateFile();
}

// Edit Existing Account Data
function EditData() {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = ".ini";
    inputElement.style.display = "none";

    inputElement.onchange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result;
            let data;
            if (file.name === "jdparty_auth.ini") {
                try {
                    const decodedContent = toStr(content);
                    data = parseIniFile(decodedContent);
                    logOutput("============");
                    logOutput("Decoded Content:");
                    logOutput(decodedContent);
                    logOutput("Parsed Data (jdparty_auth.ini):");
                    logOutput(JSON.stringify(data, null, 2));
                    logOutput("============");
                } catch (error) {
                    logOutput("[UserGen] Failed to load jdparty_auth.ini content. Invalid file.");
                    alert("Failed to decode jdparty_auth.ini content. Invalid file.");
                    return;
                }
            } else if (file.name === "uplay.ini") {
                data = parseIniFile(content);
                logOutput("============");
                logOutput("Raw Content (uplay.ini):");
                logOutput(content);
                logOutput("Parsed Data (uplay.ini):");
                logOutput(JSON.stringify(data, null, 2));
                logOutput("============");
            } else {
                logOutput("[UserGen] Unknown file type. Please upload a valid .ini file.");
                alert("Unknown file type. Please upload a valid .ini file.");
                return;
            }

            if (data) {
                document.getElementById("username").value = data.Username || "";
                document.getElementById("email").value = data.Email || "";
                document.getElementById("password").value = data.Password ? toStr(data.Password) : "";
                // document.getElementById("savePath").value = data.SavePath || "Default"; // savePath is now hardcoded in generateFile
                document.getElementById("language").value = data.Language || "en-US";
                logOutput(`[UserGen] Loaded data from ${file.name}`);
                prepareSaveButton(file.name, data, file.name === "jdparty_auth.ini");
            } else {
                logOutput(`[UserGen] Invalid file format. Please upload a valid .ini file.`);
                alert("Invalid file format. Please upload a valid .ini file.");
            }
        };
        reader.readAsText(file);
    };

    inputElement.click();
}

// Parse ini file content to extract fields
function parseIniFile(content) {
    const lines = content.split("\n");
    const data = {};

    lines.forEach(line => {
        const [key, value] = line.split("=");
        if (key && value) {
            data[key.trim()] = value.trim();
        }
    });

    return data;
}

// Prepare Save Button to Rewrite Existing File
function prepareSaveButton(filename, data, isBase64) {
    document.getElementById('generate-btn').style.display = "none"; // Correctly hide the generate button
    const saveButtonContainer = document.getElementById("save-button-container");
    if (saveButtonContainer) saveButtonContainer.innerHTML = ''; // Clear the container before adding new button

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.type = "button";
    saveButton.classList.add("btn-primary", "transition-all", "duration-300", "ease-in-out", "hover:brightness-125", "hover:-translate-y-1", "hover:shadow-lg", "hover:shadow-neon-pink/50"); // Add primary button styling

    saveButton.onclick = () => {
        let updatedContent = `Username=${document.getElementById("username").value}\n` +
            `Email=${document.getElementById("email").value}\n` +
            `Password=${toObfs(document.getElementById("password").value)}\n` +
            `SavePath=${data.SavePath || "Default"}\n` + /* Use existing data's SavePath or default */
            `Language=${document.getElementById("language").value}\n` +
            `UserId=${data.UserId || ""}\n` +
            `TickedId=${data.TickedId || ""}`;

        if (isBase64) {
            updatedContent = toObfs(updatedContent);
        }

        rewriteFile(updatedContent, filename);
    };

    document.getElementById('save-button-container').appendChild(saveButton);
}

// Rewrite file content
async function rewriteFile(content, filename) {
    try {
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: filename,
            types: [{
                description: "INI Files",
                accept: { "text/plain": [".ini"] }
            }]
        });

        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        logOutput(`[UserGen] File ${filename} has been saved successfully.`);;
    } catch (error) {
        logOutput(`[UserGen] File save operation canceled.`);
    }
}

// Additional functions for index.html interactions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('is-active');
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.classList.contains('is-active')) {
        mobileMenu.classList.remove('is-active');
    }
}

function openAuthModal() {
    document.getElementById('auth-modal').classList.remove('hidden');
    // Reset form and output when opening modal
    document.getElementById("username").value = "";
    document.getElementById("username").disabled = false; // Ensure username is enabled
    document.getElementById("email").value = `user${Math.round(Date.now() * Math.random() / 1000)}@jdparty.xyz`;
    document.getElementById("password").value = generatePassword();
    // document.getElementById("savePath").value = "Default"; // savePath is now hardcoded in generateFile
    document.getElementById("language").value = "en-US";
    document.getElementById("password").disabled = false;
    document.getElementById("output").value = "";
    document.getElementById("account-form").classList.add("hidden");
    document.getElementById("warning-text").classList.add("hidden");
    document.getElementById("generate-btn").style.display = "inline-block";
    document.getElementById("download-buttons").classList.add("hidden");
    const saveButtonContainer = document.getElementById("save-button-container");
    if (saveButtonContainer) saveButtonContainer.innerHTML = ''; // Clear the container
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.add('hidden');
}

function initNewAccount() {
    document.getElementById("account-form").classList.remove("hidden");
    document.getElementById("warning-text").classList.add("hidden");
    document.getElementById("password").disabled = false;
    document.getElementById("username").value = "";
    document.getElementById("username").disabled = false; // Ensure username is enabled
    document.getElementById("email").value = `user${Math.round(Date.now() * Math.random() / 1000)}@jdparty.xyz`;
    document.getElementById("password").value = generatePassword();
    document.getElementById("language").value = "en-US";
    document.getElementById("generate-btn").style.display = "inline-block";
    document.getElementById("download-buttons").classList.add("hidden");
    const saveButtonContainer = document.getElementById("save-button-container");
    if (saveButtonContainer) saveButtonContainer.innerHTML = ''; // Clear the container
    document.getElementById("output").value = "";
}

function editExistingAccount() {
    document.getElementById("account-form").classList.remove("hidden");
    document.getElementById("warning-text").classList.remove("hidden");
    document.getElementById("generate-btn").style.display = "none";
    document.getElementById("download-buttons").classList.add("hidden");
    document.getElementById("output").value = "";
    document.getElementById("username").disabled = false; // Ensure username is enabled when editing
    EditData(); // Call the existing EditData function
}

function generateAccount() {
    generateFile(); // Call the existing generateFile function
    document.getElementById("download-buttons").classList.remove("hidden");
}

function generateNewPassword() {
    document.getElementById("password").value = generatePassword();
}

function toggleOutputVisibility() {
    const outputContainer = document.getElementById('output-container');
    if (outputContainer) {
        outputContainer.classList.toggle('hidden');
    }
}

// Platform tab functionality
document.addEventListener('DOMContentLoaded', () => {
    // Main platform tabs
    const mainPlatformTabs = document.querySelectorAll('#main-platform-tabs .platform-tab-item');
    const platformGroupContents = document.querySelectorAll('.platform-group-content');

    mainPlatformTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Deactivate all main tabs and hide all groups
            mainPlatformTabs.forEach(t => t.classList.remove('active'));
            platformGroupContents.forEach(content => content.classList.add('hidden'));
            platformGroupContents.forEach(content => content.classList.remove('active'));

            // Activate clicked main tab and show its group
            tab.classList.add('active');
            const targetGroupSelector = tab.dataset.platformGroup;
            const targetGroup = document.getElementById(`${targetGroupSelector}-platform-group`);
            if (targetGroup) {
                targetGroup.classList.remove('hidden');
                targetGroup.classList.add('active');

                // Activate the first sub-tab within the newly active group
                const firstSubTab = targetGroup.querySelector('.platform-tab-item');
                if (firstSubTab) {
                    const subTabsInGroup = targetGroup.querySelectorAll('.platform-tab-item');
                    const subContentsInGroup = targetGroup.querySelectorAll('.platform-content');

                    subTabsInGroup.forEach(st => st.classList.remove('active'));
                    subContentsInGroup.forEach(sc => {
                        sc.classList.add('hidden');
                        sc.classList.remove('active');
                    });
                    
                    firstSubTab.classList.add('active');
                    const firstSubContentId = firstSubTab.dataset.platform;
                    const firstSubContent = document.getElementById(firstSubContentId);
                    if (firstSubContent) {
                        firstSubContent.classList.remove('hidden');
                        firstSubContent.classList.add('active');
                    }
                }
            }
        });
    });

    // Sub-platform tabs (PC and Switch)
    const subTabContainers = [document.getElementById('pc-sub-tabs'), document.getElementById('switch-sub-tabs')];
    subTabContainers.forEach(container => {
        if (!container) return;
        const subTabs = container.querySelectorAll('.platform-tab-item');
        const contentContainer = container.nextElementSibling.querySelectorAll('.platform-content');

        subTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                subTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                contentContainer.forEach(content => content.classList.add('hidden'));
                contentContainer.forEach(content => content.classList.remove('active'));
                const targetContent = document.getElementById(tab.dataset.platform);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                    targetContent.classList.add('active');
                }
            });
        });
    });

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize Hero Image Slider
    initHeroImageSlider();
    // Initialize starfield
    initStarfield();

    // Back to Top Button functionality
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Add click listener for back-to-top button
    if (backToTopButton) {
        backToTopButton.addEventListener('click', scrollToTop);
    }
});

// Scroll Animation
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine which animation to apply based on the element
                if (entry.target.classList.contains('grid') && entry.target.classList.contains('animate-on-scroll')) {
                    // For the feature cards grid, apply fade-in to children
                    const featureCards = entry.target.querySelectorAll('.feature-card');
                    featureCards.forEach((card, index) => {
                        card.style.animationDelay = `${index * 0.1}s`; // Stagger animation
                        card.classList.add('animate-fade-in');
                    });
                } else {
                    // For other sections, apply slide-up
                    entry.target.classList.add('animate-slide-up');
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust when element is 50px from bottom of viewport
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Starfield Canvas Animation
function initStarfield() {
    const canvas = document.getElementById('starfieldCanvas');
    const ctx = canvas.getContext('2d');

    let stars = [];
    const numStars = 500; // Number of stars

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * canvas.width, // Z-depth for parallax
                size: Math.random() * 2 + 0.5, // Star size
                speed: Math.random() * 0.5 + 0.1 // Star speed
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        for (let i = 0; i < numStars; i++) {
            const star = stars[i];

            // Update star position
            star.z -= star.speed;

            // If star goes off screen, reset it
            if (star.z <= 0) {
                star.z = canvas.width;
                star.x = Math.random() * canvas.width;
                star.y = Math.random() * canvas.height;
            }

            // Calculate perspective
            const scale = canvas.width / star.z;
            const x = star.x * scale;
            const y = star.y * scale;
            const size = star.size * scale;

            // Draw star
            ctx.beginPath();
            ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${scale * 0.5})`; // Fade out smaller/further stars
            ctx.fill();
        }
    }

    function animate() {
        drawStars();
        requestAnimationFrame(animate);
    }

    // Initial setup
    resizeCanvas();
    createStars();
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        createStars(); // Recreate stars on resize to fill new dimensions
    });
}

// Hero Image Slider
function initHeroImageSlider() {
    const coachImageElement = document.getElementById('heroCoachImage');
    if (!coachImageElement) {
        console.warn('Hero coach image element (#heroCoachImage) not found.');
        return;
    }

    const coachImages = [
        'assets/hero/coach-1.png',
        'assets/hero/coach-2.png',
        'assets/hero/coach-3.png',
        'assets/hero/coach-4.png'
    ];
    let currentImageIndex = 0;

    // Preload images
    coachImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    function changeImage() {
        currentImageIndex = (currentImageIndex + 1) % coachImages.length;
        coachImageElement.style.opacity = 0; // Start fade out

        setTimeout(() => {
            coachImageElement.src = coachImages[currentImageIndex];
            coachImageElement.style.opacity = 1; // Start fade in (CSS transition handles the animation)
        }, 1000); // This timeout should match the opacity transition duration (1000ms)
    }

    // Set initial image and make it visible after a brief moment
    coachImageElement.src = coachImages[currentImageIndex];
    setTimeout(() => { coachImageElement.style.opacity = 1; }, 100); // Fade in the first image

    setInterval(changeImage, 5000); // Change image every 5 seconds (1s fade-out + 1s fade-in + 3s display)
}
