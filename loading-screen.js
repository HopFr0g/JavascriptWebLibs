const loadingScreen = document.querySelector(".loading-screen");

const displayLoadingScreen = () => {
    loadingScreen.removeAttribute("style");
}

const hideLoadingScreen = () => {
    loadingScreen.setAttribute("style", "display: none");
}

export {displayLoadingScreen, hideLoadingScreen};