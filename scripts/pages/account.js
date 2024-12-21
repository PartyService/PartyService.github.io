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
function downloadFile(content, filename) {
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Main Function to Generate File
function generateFile() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const savePath = document.getElementById("savePath").value.trim();
    const language = document.getElementById("language").value.trim();

    if (!validateForm(username, email, password)) return;

    const { rawContent, obfuscatedContent } = createContent(username, email, password, savePath, language);

    logOutput("============");
    logOutput(rawContent);
    logOutput("============");
    logOutput("Entering these Credentials into mods other than jdparty may result in these credentials being leaked.");

    // Attach download actions
    document.querySelector('.download.jdp').onclick = () => downloadFile(obfuscatedContent, "jdparty_auth.ini");
    document.querySelector('.download.uplay').onclick = () => downloadFile(rawContent, "uplay.ini");
    document.querySelector('.generateb').parentNode.classList.add('downloadable')
}

// Initialize Account Generator Form
function InitAuthGen() {
    document.querySelector('.banner.authgen').style.display = "block";
    document.querySelector('.banner.banner1').style.display = "none";

    // Reset form values for new account generation
    document.getElementById("username").value = "";
    document.getElementById("email").value = `user${Math.round(Date.now() * Math.random() / 1000)}@jdparty.xyz`;
    document.getElementById("password").value = generatePassword();
    document.getElementById("savePath").value = "Default";
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
                    logOutput(decodedContent);
                    logOutput("============");
                } catch (error) {
                    logOutput("[UserGen] Failed to load jdparty_auth.ini content. Invalid file.");
                    alert("Failed to decode jdparty_auth.ini content. Invalid file.");
                    return;
                }
            } else if (file.name === "uplay.ini") {
                data = parseIniFile(content);
                logOutput("============");
                logOutput(content);
                logOutput("============");
            } else {
                logOutput("[UserGen] Unknown file type. Please upload a valid .ini file.");
                alert("Unknown file type. Please upload a valid .ini file.");
                return;
            }

            if (data) {
                document.querySelector('.banner.authgen').style.display = "block";
                document.querySelector('.banner.banner1').style.display = "none";
                document.querySelector('.banner.banner1').style.display = "none";
                document.querySelector('.warning').innerText = 'Changing UUID can delete all SaveFiles!';
                document.getElementById("username").value = data.Username || "";
                document.getElementById("email").value = data.Email || "";
                document.getElementById("password").value = data.Password ? toStr(data.Password) : "";
                document.getElementById("savePath").value = data.SavePath || "Default";
                document.getElementById("language").value = data.Language || "en-US";
                document.getElementById("password").disabled = true

                logOutput(`[UserGen] Loaded data from ${file.name}`);
                logOutput(`[UserGen] Password are disabled. it's your unique passcode`);
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
    document.querySelector('.generateb').style.display = "none";
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.type = "button";

    saveButton.onclick = () => {
        let updatedContent = `Username=${document.getElementById("username").value}\n` +
            `Email=${document.getElementById("email").value}\n` +
            `Password=${toObfs(document.getElementById("password").value)}\n` +
            `SavePath=${document.getElementById("savePath").value}\n` +
            `Language=${document.getElementById("language").value}\n` +
            `UserId=${data.UserId || ""}\n` +
            `TickedId=${data.TickedId || ""}`;

        if (isBase64) {
            updatedContent = toObfs(updatedContent);
        }

        rewriteFile(updatedContent, filename);
    };

    document.querySelector('.authgen form').appendChild(saveButton);
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

