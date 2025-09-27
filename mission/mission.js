const themeSelector = document.querySelector('#theme-selector');

function changeTheme() {

    
    if (themeSelector.value === 'dark') {

        document.body.classList.add('dark');

        document.querySelector('#logo-img').src = 'public/byui-logo-white.png';
    } else {

        document.body.classList.remove('dark');

        document.querySelector('#logo-img').src = 'public/byui-logo-blue.webp';
    }
}


themeSelector.addEventListener('change', changeTheme);