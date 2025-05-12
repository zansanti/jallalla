(function() {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('es')) window.location.replace('/esp/');
    else if (userLang.startsWith('pt')) window.location.replace('/pt/');
    else window.location.replace('/eng/');
})();