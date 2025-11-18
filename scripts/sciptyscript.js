gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollToPlugin);
gsap.config({ nullTargetWarn: false });


emailjs.init({publicKey: 'OVF_ZXgXH96x2FaxA',});

function toPX(value) {
    return parseFloat(value) / 100 * (/vh/gi.test(value) ? window.innerHeight : window.innerWidth);
}

ScrollTrigger.create({
    trigger: ".a-propos-section p",
    start: "top center",
    onEnter: () => {
        gsap.to(".a-propos-photo", {
            filter: "blur(10px)",
            opacity: 0.1,
            duration: 0.5,
            ease: "power2.out"
        });
    },
    onLeaveBack: () => {
        gsap.to(".a-propos-photo", {
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    }
});



TweenLite.defaultEase = Linear.easeNone;

// Vérifie si c'est la première visite sur la page d'accueil
if (!sessionStorage.getItem('homepageVisited')) {
    // Marque la visite comme effectuée
    sessionStorage.setItem('homepageVisited', 'true');

    // Affiche le loader
    gsap.set(".square, .text-loader", { visibility: "visible" });
    gsap.set(".text-loader", { opacity: 1 });

    // Animation des lignes
    var tl = new TimelineLite();
    tl.fromTo(".l1", 2.5, { height: 0, backgroundImage: "var(--gradient-light)" }, { height: toPX("90vh") })
      .fromTo(".l2", 2.5, { width: 0, backgroundImage: "var(--gradient-light-90)" }, { width: toPX("100vw"), backgroundImage: "var(--gradient-light-90)" }, "+=0");

    // Animation du texte
    const textLoader = document.querySelector(".text-loader");
    const textContent = textLoader.innerHTML.replace(/&amp;/g, "&");
    textLoader.innerHTML = "";
    textContent.split(/(<br\s*\/?>)/).forEach((chunk, index) => {
        if (chunk.match(/<br\s*\/?>/)) {
            const br = document.createElement("br");
            textLoader.appendChild(br);
        } else {
            chunk.split("").forEach((letter, letterIndex) => {
                const span = document.createElement("span");
                span.textContent = letter;
                textLoader.appendChild(span);
                gsap.fromTo(span,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.1, delay: (index * 0.5) + (letterIndex * ((5 - 1) / textContent.length)), ease: "power2.out" }
                );
            });
        }
    });

    // Désactive le scroll pendant le loader
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Animation de fin du loader
    window.addEventListener("load", () => {
        const navigationTiming = performance.getEntriesByType("navigation")[0];
        const pageLoadTime = navigationTiming.domContentLoadedEventEnd - navigationTiming.startTime;
        const animationDuration = Math.max(5, pageLoadTime / 1000);

        gsap.to(".loader .child", {
            opacity: 1,
            duration: animationDuration,
            ease: "power2.out",
            onComplete: () => {
                gsap.to(".loader", {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        document.body.style.overflow = "";
                        document.documentElement.style.overflow = "";
                    }
                });
            }
        });
    });
} else {
    // Si ce n'est pas la première visite, cache immédiatement le loader
    gsap.set(".loader", { opacity: 0, visibility: "hidden" });
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
}

const boutonVoirPlus = document.querySelector('.voir-plus');

    

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
    const menuLinks = document.querySelectorAll(".overlay a");


    function toggleOverlayVisibility() {
        const isVisible = overlay.style.visibility === "visible";
        overlay.style.visibility = isVisible ? "hidden" : "visible";
        document.body.style.overflow = isVisible ? "" : "hidden"; // Disable scroll when overlay is visible
    }

    hamburger.addEventListener("click", toggleOverlayVisibility);

    menuLinks.forEach(link => {
        link.addEventListener("click", toggleOverlayVisibility);
    });

    // Ajouter un écouteur d'événement pour le clic
    boutonVoirPlus.addEventListener('click', function() {
        // Sélectionner la div "projets-plus"
        const projetsPlus = document.querySelector('.projets-plus');

        // Changer la propriété display de "projets-plus" de none à block
        projetsPlus.style.display = 'block';

        // Changer la propriété display du bouton "voir-plus" de block à none
        this.style.display = 'none';
        ScrollTrigger.refresh(true)
    });
}

function handleWideScreen() {
    let lastAngle = 0;

    document.addEventListener("mousemove", function (event) {
        const heroImage = document.querySelector(".hero-image");

        if (heroImage) {
            const style = window.getComputedStyle(heroImage);
            const transformOrigin = style.transformOrigin.split(" ");
            const rect = heroImage.getBoundingClientRect();
            const centerX = rect.left + parseFloat(transformOrigin[0]);
            const centerY = rect.top + parseFloat(transformOrigin[1]);

            const dx = event.clientX - centerX;
            const dy = event.clientY - centerY;

            let angle = Math.atan2(dy, dx) * (180 / Math.PI);

            // Shift the rotation by 15° to the right
            angle += -100;

            // Smooth out the angle transition
            const smoothedAngle = gsap.utils.interpolate(lastAngle, angle, 0.2);
            lastAngle = smoothedAngle;

            // Animate the rotation using GSAP
            gsap.to(heroImage, {
                rotation: smoothedAngle,
                duration: 0.3,
                ease: "power2.out",
            });
        }
    });

    // Ajouter un écouteur d'événement pour le clic
    boutonVoirPlus.addEventListener('click', function() {
        // Sélectionner la div "projets-plus"
        const projetsPlus = document.querySelector('.projets-plus');

        // Changer la propriété display de "projets-plus" de none à block
        projetsPlus.style.display = 'grid';

        // Changer la propriété display du bouton "voir-plus" de block à none
        this.style.display = 'none';

        ScrollTrigger.refresh(true)
    });
    

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


