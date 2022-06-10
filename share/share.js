"use strict";

const isMobile = () => {
    return /Android/i.test(navigator.userAgent);
}

const setTitle = title => {
    const windowTitle = document.querySelector(".share__window-title");
    windowTitle.innerHTML = title;
}

const setDescription = description => {
    const windowDescription = document.querySelector(".share__window-description");
    windowDescription.innerHTML = description;
}

const setWhatsappSettings = settings => {
    const whatsappButton = document.querySelector(".whatsapp-button");
    if (!settings || !settings["text"]) {
        whatsappButton.setAttribute("style", "display: none");
        console.error("WhatsApp settings not provided.");
        return;
    }
    
    whatsappButton.addEventListener("click", () => {
        if (isMobile())
            location.href = "whatsapp://send?text=" + encodeURIComponent(settings["text"]);
        else
            window.open("https://wa.me?text=" + encodeURIComponent(settings["text"]), '_blank').focus();
    });
}

const setTelegramSettings = settings => {
    const telegramButton = document.querySelector(".telegram-button");
    if (!settings || !settings["url"] || !settings["text"]) {
        telegramButton.setAttribute("style", "display: none");
        console.error("Telegram settings not provided.");
        return;
    }
    
    telegramButton.addEventListener("click", () => {
        window.open("https://t.me/share/url?url=" + encodeURIComponent(settings["url"]) + "&text=" + encodeURIComponent(settings["text"]), '_blank').focus();
    });
}

const setClipboardSettings = settings => {
    const clipboardButton = document.querySelector(".clipboard-button");
    if (!settings || !settings["text"]) {
        clipboardButton.setAttribute("style", "display: none");
        console.error("Clipboard settings not provided.");
        return;
    }
    
    let copiedNotification = settings["copiedNotification"];
    if (!copiedNotification)
        copiedNotification = "Text copied to your clipboard!";
        
    clipboardButton.addEventListener("click", () => {
        var tmp = document.createElement("INPUT");
        tmp.value = settings["text"];
        document.body.appendChild(tmp);
        
        tmp.select();
        document.execCommand("copy");
        
        document.body.removeChild(tmp);
        alert(copiedNotification);
    });
}

const setAlternativeButtonSettings = alternativeButtonSettings => {
    const alternativeButton = document.querySelector(".alternative-button");
    if (!alternativeButtonSettings || !alternativeButtonSettings["text"] || (typeof alternativeButtonSettings["redirect"] != "string" && typeof alternativeButtonSettings["callback"] != "function")) {
        if (typeof alternativeButtonSettings["text"] == "string")
            alternativeButton.innerHTML = alternativeButtonSettings["text"];
        else
            alternativeButton.innerHTML = "Cerrar";
        alternativeButton.addEventListener("click", () => {
            hide();
        });
        return;
    }
    alternativeButton.innerHTML = alternativeButtonSettings["text"];
    if (typeof alternativeButtonSettings["redirect"] == "string") {
        alternativeButton.addEventListener("click", () => {
            location.href = alternativeButtonSettings["redirect"];
        });
        return;
    }
    if (typeof alternativeButtonSettings["callback"] == "function") {
        alternativeButton.addEventListener("click", () => {
            alternativeButtonSettings["callback"]();
        });
    }
}

const display = () => {
    const shareArea = document.querySelector(".share");
    shareArea.removeAttribute("style");
}

const hide = () => {
    const shareArea = document.querySelector(".share");
    shareArea.setAttribute("style", "display: none")
}

const displayShareScreen = (title, description, whatsappSettings, telegramSettings, clipboardSettings, alternativeButtonSettings) => {
    // whatsappSettings format: {text: string}
    // telegramSettings format: {url: string, text: string}
    // clipboardSettings format: {text: string, copiedNotification: string [optional]}
    // alternativeButtonSettings format: {text: string, redirect: url [optional], callback: function [optional]}
    setTitle(title);
    setDescription(description);
    setWhatsappSettings(whatsappSettings);
    setTelegramSettings(telegramSettings);
    setClipboardSettings(clipboardSettings);
    setAlternativeButtonSettings(alternativeButtonSettings);
    display();
}

export {displayShareScreen};
