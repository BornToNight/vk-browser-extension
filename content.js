let color = "#CCE4FF"

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        color = request
        handleDOMChange()
    }
)

// Функция, которую нужно вызывать при изменении DOM
function handleDOMChange() {

    console.log('DOM изменен')
    const messages = document.getElementsByClassName('ConvoMessageWithoutBubble')

    for (let i = 0; i < messages.length; i++) {
        const message = messages[i].querySelector('.ConvoMessageInfoWithoutBubbles__statusIcon')
        if (!messages[i].parentNode.parentNode.className.includes('messageBlockSelected')) {
            if (!message?.querySelector('svg').getAttribute('class').includes("double") && message) {
                messages[i].style.backgroundColor = color
            } else {
                messages[i].style.backgroundColor = null
            }
        }
    }
}

const observer = new MutationObserver(handleDOMChange)

// Конфигурация для наблюдателя: какие изменения отслеживать
const config = {
    childList: true, // Отслеживать добавление или удаление дочерних узлов
    subtree: true // Отслеживать изменения в поддеревьях
}

// Начинаем наблюдение за изменениями в документе
setTimeout(() => {
    observer.observe(document.querySelector('.MEApp__route'), config)

    chrome.storage.sync.get(["messageBackgroundColor"]).then((result) => {
        if (result.messageBackgroundColor) {
            color = result.messageBackgroundColor
        }
        handleDOMChange()
    })

}, 7000)

setInterval(handleDOMChange(), 5000)
