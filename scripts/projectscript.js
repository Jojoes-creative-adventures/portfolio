gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollToPlugin);
gsap.config({ nullTargetWarn: false });


emailjs.init({publicKey: 'OVF_ZXgXH96x2FaxA',});

function toPX(value) {
    return parseFloat(value) / 100 * (/vh/gi.test(value) ? window.innerHeight : window.innerWidth);
}
function handleNarrowScreen() {
    const hamburger = document.querySelector(".hamburger");

    if (!hamburger) {
        console.error("Hamburger element not found in the DOM.");
        return;
    }

    // Ensure the hamburger is styled to be clickable
    hamburger.style.cursor = "pointer";
    hamburger.style.zIndex = "1000"; // Ensure it appears above other elements
    hamburger.style.position = "relative"; // Adjust positioning if necessary
    const overlay = document.querySelector(".overlay");

  
    function toggleOverlayVisibility() {
        const isVisible = overlay.style.visibility === "visible";
        overlay.style.visibility = isVisible ? "hidden" : "visible";
        document.body.style.overflow = isVisible ? "" : "hidden"; // Disable scroll when overlay is visible
    }

    hamburger.addEventListener("click", toggleOverlayVisibility);

    closeButton.addEventListener("click", toggleOverlayVisibility);

    menuLinks.forEach(link => {
        link.addEventListener("click", toggleOverlayVisibility);
    });
}

function handleWideScreen() {
}

// Check the aspect ratio and apply the appropriate scripts
function applyScriptsBasedOnAspectRatio() {
    if (window.matchMedia('(min-aspect-ratio: 1/1)').matches) {
    handleWideScreen();
    } else {
        handleNarrowScreen();
    }
}

// Apply the scripts on load
window.addEventListener('load', function() {
    applyScriptsBasedOnAspectRatio();
});

// Apply the scripts on resize
window.addEventListener('resize', function() {
    applyScriptsBasedOnAspectRatio();
});
