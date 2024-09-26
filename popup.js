const defaultColor = "#CCE4FF"
let color = defaultColor
chrome.storage.sync.get(["messageBackgroundColor"]).then((result) => {
    color = result.messageBackgroundColor
    colorPicker.value = color
});
let colorPicker = document.getElementById("colorPicker");
let changeColor = document.getElementById("changeColor");
let resetColor = document.getElementById("resetColor");

colorPicker.value = color

// Обработчик кнопки подтверждения
changeColor.addEventListener('click', async function () {
    chrome.storage.sync.set({ messageBackgroundColor: colorPicker.value }).then(() => { });
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);
    chrome.tabs.sendMessage(tab[0].id, colorPicker.value, function (response) {
    });
});

resetColor.addEventListener('click', async function () {
    chrome.storage.sync.set({ messageBackgroundColor: defaultColor }).then(() => { });
    colorPicker.value = defaultColor
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);
    chrome.tabs.sendMessage(tab[0].id, defaultColor, function (response) {
    });
});
