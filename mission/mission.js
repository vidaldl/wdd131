const themeSelector = document.querySelector('#theme-selector');

function changeTheme() {

    
    if (themeSelector.value === 'dark') {
        // add the dark class to the body
        document.body.classList.add('dark');
        // change the source of the logo img to point to the white logo.
        document.querySelector('#logo-img').src = 'public/byui-logo-white.png';
    } else {
        // remove the dark class
        document.body.classList.remove('dark');
        // make sure the logo src is the blue logo.
        document.querySelector('#logo-img').src = 'public/byui-logo-blue.webp';
    }
}

// add an event listener to the themeSelector element here.
// Use the changeTheme function as the event handler function.
themeSelector.addEventListener('change', changeTheme);