gsap.config({ nullTargetWarn: false });

function toPX(value) {
    return parseFloat(value) / 100 * (/vh/gi.test(value) ? window.innerHeight : window.innerWidth);
}

const currentLang = document.documentElement.lang;
  console.log('Current Language:', currentLang);

  // Select all language links and log them
  const langLinks = document.querySelectorAll('.lang-link');
  console.log('Language Links:', langLinks);

  // Iterate over the language links
  langLinks.forEach(link => {
    // Log the language of each link
    const linkLang = link.getAttribute('data-lang');
    console.log('Link Language:', linkLang);

    // Check if the link's language matches the current language
    if (linkLang === currentLang) {
      console.log('Matching Language Link Found:', link);
      link.classList.add('inactive');
    } else {
      link.classList.remove('inactive');
    }
  });

//Header title
const headerTitle = document.querySelector('.header-title h2');   
// Fetch the content from the meta tag with name="category"
const metaCategory = document.querySelector('meta[name="category"]').getAttribute('content');
// Update the header title with the meta category content
headerTitle.textContent = metaCategory;

//Menu overlay
const headerWrapper = document.querySelector(".header");
const menuIcon = document.getElementById('menu');
const closeIcon = document.getElementById('close');
const categories = document.querySelector('.links-categories');
const languages = document.querySelector('.links-languages');
const footer = document.querySelector('.footer');

// State flag to track expansion
let isExpanded = false;

  menuIcon.addEventListener('pointerdown', toggleMenu);
  closeIcon.addEventListener('pointerdown', toggleMenu);

    // Event handler function
    function toggleMenu() {
        if (!isExpanded) {
            headerWrapper.style.height = "101vh";
            toggleVisibility(categories);
            toggleVisibility(languages);
            toggleVisibility(footer);
            toggleIcons();
            isExpanded = true;
        } else {
            headerWrapper.style.height = "5vh";
            toggleVisibility(categories);
            toggleVisibility(languages);
            toggleVisibility(footer);
            toggleIcons();
            isExpanded = false;
        }
      }

        function toggleVisibility(element) {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
            element.classList.add('hidden');
            }
        }

        function toggleIcons() {
        if (menuIcon.classList.contains('hidden')) {
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        } else {
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            }
    
        }

// Function to handle wide screen scripts
function handleWideScreen() {

        var cursor = document.querySelector(".custom-cursor");
const links = document.querySelectorAll('a');
  var initCursor = false;
  var works = document.querySelector(".works-wrapper");
  let scrollTimeout;

  for (var i = 0; i < links.length; i++) {
    var selfLink = links[i];

    selfLink.addEventListener("mouseover", function() {
      cursor.classList.add("custom-cursor--link");
    });
    selfLink.addEventListener("mouseout", function() {
      cursor.classList.remove("custom-cursor--link");
    });
  }

  window.onmousemove = function(e) {
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    if (!initCursor) {
      // cursor.style.opacity = 1;
      TweenLite.to(cursor, 0.3, {
        opacity: 1
      });
      initCursor = true;
    }

    TweenLite.to(cursor, 0, {
      top: mouseY + "px",
      left: mouseX + "px"
    });
  };

 // Event listener for mouseout
window.onmouseout = function(e) {
  TweenLite.to(cursor, 0.3, {
    opacity: 0
  });
  initCursor = false;
};

// Scroll event listener
document.addEventListener('scroll', () => {
  TweenLite.to(cursor, 0.3, {
    opacity: 0
  });
  TweenLite.to('.ball', 0.3, {
    opacity : 1
  });
  initCursor = false;

  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  
  scrollTimeout = setTimeout(() => {
    TweenLite.to(cursor, 0.3, {
      opacity: 1
    });
    TweenLite.to('.ball', 0.3, {
    opacity : 0
  });
    initCursor = true;
  }, 300);
});
    
    const namesContainer = document.querySelector('.names'); // Select the container with the class 'names'
    const names = document.querySelectorAll('.name');
    const pictures = document.querySelectorAll('.images');

    // Filter pictures to match the length of names
    const filteredPictures = Array.from(pictures).slice(0, names.length);

    gsap.set(names[0], {
        color: "var(--contrast)", 
        fontFamily: "'classico-urw', sans-serif", 
        fontWeight: "700",
        fontStyle: "normal", 
        fontSize: "1.618rem"
    });
    gsap.set(filteredPictures[0], { zIndex: 1 });

    let hoveredNameIndex = null;
    let hoveredPicture = null;
    let otherPictures = null;
    let otherNames = null;

    names.forEach((name, index) => {
        name.addEventListener('mouseover', () => {
            hoveredNameIndex = index;
            hoveredPicture = filteredPictures[index];
            
            otherPictures = Array.from(filteredPictures).filter((_, i) => i !== hoveredNameIndex);
            otherNames = Array.from(names).filter((_, i) => i !== hoveredNameIndex);

            gsap.fromTo(hoveredPicture, { zIndex: 0, x: toPX("-30vw") }, { zIndex: 2, x: 0, duration: 0.5 });
            gsap.to(name, { color: "var(--contrast)", fontFamily: "'classico-urw', sans-serif", fontWeight: "700", fontStyle: "normal", fontSize: "1.618rem", duration: 0.5 });
            gsap.to(otherNames, { color: "var(--contrast-muted)", fontFamily: "'classico-urw', sans-serif", fontWeight: "400", fontStyle: "normal", fontSize: "1rem", duration: 0.5 });

            resetInactivityTimer();
        });

        name.addEventListener('pointerdown', () => {
            hoveredNameIndex = index;
            hoveredPicture = filteredPictures[index];
            
            otherPictures = Array.from(filteredPictures).filter((_, i) => i !== hoveredNameIndex);
            otherNames = Array.from(names).filter((_, i) => i !== hoveredNameIndex);

            gsap.fromTo(hoveredPicture, { zIndex: 0, x: toPX("-30vw") }, { zIndex: 2, x: 0, duration: 0.5 });
            gsap.to(name, { color: "var(--contrast)", fontFamily: "'classico-urw', sans-serif", fontWeight: "700", fontStyle: "normal", fontSize: "1.618rem", duration: 0.5 });
            gsap.to(otherNames, { color: "var(--contrast-muted)", fontFamily: "'classico-urw', sans-serif", fontWeight: "400", fontStyle: "normal", fontSize: "1rem", duration: 0.5 });

            resetInactivityTimer();
        });

        name.addEventListener('mouseout', () => {
            gsap.to(otherPictures, { zIndex: 0 });
            gsap.to(hoveredPicture, { zIndex: 1 });
        });
    });

    let inactivityTimer;
    let carouselInterval;
    let currentIndex = 0;

    function startCarousel() {
        carouselInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % filteredPictures.length;
            let currentPicture = filteredPictures[currentIndex];
            let currentName = names[currentIndex];

            otherPictures = Array.from(filteredPictures).filter((_, i) => i !== currentIndex);
            otherNames = Array.from(names).filter((_, i) => i !== currentIndex);

            gsap.fromTo(currentPicture, { zIndex: 0, x: toPX("-30vw") }, { zIndex: 2, x: 0, duration: 0.5 });
            gsap.to(currentName, { color: "var(--contrast)", fontFamily: "'classico-urw', sans-serif", fontWeight: "700", fontStyle: "normal", fontSize: "1.618rem", duration: 0.5 });
            gsap.to(otherNames, { color: "var(--contrast-muted)", fontFamily: "'classico-urw', sans-serif", fontWeight: "400", fontStyle: "normal", fontSize: "1rem", duration: 0.5 });

            gsap.to(otherPictures, { zIndex: 0 });
            gsap.to(currentPicture, { zIndex: 1 });
        }, 3000);
    }

    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        stopCarousel();
        inactivityTimer = setTimeout(startCarousel, 3000);
    }

    namesContainer.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('scroll', resetInactivityTimer);
    document.querySelector('.text').addEventListener('scroll', resetInactivityTimer);

    resetInactivityTimer();

    gsap.fromTo(".images",{ height:toPX("80vh"),
                            width:toPX("80vh"),}, 
                          { height:toPX("40vh"),
                            width:toPX("40vh"),
                            scrollTrigger: {
                            trigger: ".content-wrapper",
                            start:"top top",
                            endTrigger:".project-info",
                            end:"bottom bottom",
                            scrub:true,
                            },
                          }); 

    let currentForefrontImage = null; // Variable to keep track of the current forefront image

    // Function to bring the image to the forefront
    function bringImageToFront(imageId, triggerId, scrollerId) {
      gsap.to(imageId, {
        zIndex: 10, // Change z-index to bring it to the forefront
        duration: 1, // Animation duration
        scrollTrigger: {
          trigger: triggerId, // Element to watch
          start: "top 10%", // Trigger when the element reaches the center of the viewport
          scroller: scrollerId, // Set the scroller to the specific element
          toggleActions: "play none none reverse", // Play the animation on scroll down and reverse on scroll up
          onEnter: () => {
            if (currentForefrontImage && currentForefrontImage !== imageId) {
              // Reset the z-index of the previous forefront image
              gsap.to(currentForefrontImage, { zIndex: 0, duration: 1 });
            }
            // Update the current forefront image
            currentForefrontImage = imageId;


          }
        }
      });
    }

    // Initialize the animation for #imgIntro
    bringImageToFront("#imgIntro", "#intro", ".text");
    bringImageToFront("#imgRecord", "#record", ".text");
    bringImageToFront("#imgCards", "#cards", ".text");
    bringImageToFront("#imgVariations", "#variations", ".text");
    bringImageToFront("#imgInsta", "#insta", ".text");
    bringImageToFront("#imgBw", "#bw", ".text");

    gsap.to (".project-info", { zIndex:0,
                               scrollTrigger: {
                                trigger : ".title",
                                start: "top 50%",
                                end:"top 51%",
                                scrub:true,
                               },
                               });
}











// Function to handle narrow screen scripts
function handleNarrowScreen() {
    
    const namesContainer = document.querySelector('.names'); // Select the container with the class 'names'
    const names = document.querySelectorAll('.name');
    const pictures = document.querySelectorAll('.images');

    // Filter pictures to match the length of names
    const filteredPictures = Array.from(pictures).slice(0, names.length);

    gsap.set(names[0], {
        color: "var(--contrast)", 
        fontFamily: "'classico-urw', sans-serif", 
        fontWeight: "700",
        fontStyle: "normal", 
        fontSize: "2.617rem"
    });
    gsap.set(filteredPictures[0], { zIndex: 1 });

    let hoveredNameIndex = null;
    let hoveredPicture = null;
    let otherPictures = null;
    let otherNames = null;

    names.forEach((name, index) => {
        const handleMouseOverTouchStart = () => {
            hoveredNameIndex = index;
            hoveredPicture = filteredPictures[index];
            
            otherPictures = Array.from(filteredPictures).filter((_, i) => i !== hoveredNameIndex);
            otherNames = Array.from(names).filter((_, i) => i !== hoveredNameIndex);

            gsap.fromTo(hoveredPicture, { zIndex: 0, x: "-30vw" }, { zIndex: 2, x: 0, duration: 0.5 });
            gsap.to(name, { color: "var(--contrast)", fontFamily: "'classico-urw', sans-serif", fontWeight: "700", fontStyle: "normal", fontSize: "2.617rem", duration: 0.5 });
            gsap.to(otherNames, { color: "var(--contrast-muted)", fontFamily: "'classico-urw', sans-serif", fontWeight: "400", fontStyle: "normal", fontSize: "1.618rem", duration: 0.5 });

            resetInactivityTimer();
        };

        const handleMouseOutTouchLeave = () => {
            gsap.to(otherPictures, { zIndex: 0 });
            gsap.to(hoveredPicture, { zIndex: 1 });
        };

        name.addEventListener('touchstart', handleMouseOverTouchStart);
        name.addEventListener('touchend', handleMouseOutTouchLeave);
        
        // Handle touchstart on another name
        names.forEach(otherName => {
            if (otherName !== name) {
                otherName.addEventListener('touchstart', handleMouseOutTouchLeave);
            }
        });
    });


    let inactivityTimer;
    let carouselInterval;
    let currentIndex = 0;

    function startCarousel() {
        carouselInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % filteredPictures.length;
            let currentPicture = filteredPictures[currentIndex];
            let currentName = names[currentIndex];

            otherPictures = Array.from(filteredPictures).filter((_, i) => i !== currentIndex);
            otherNames = Array.from(names).filter((_, i) => i !== currentIndex);

            gsap.fromTo(currentPicture, { zIndex: 0, x: toPX("-30vw") }, { zIndex: 2, x: 0, duration: 0.5 });
            gsap.to(currentName, { color: "var(--contrast)", fontFamily: "'classico-urw', sans-serif", fontWeight: "700", fontStyle: "normal", fontSize: "2.617rem", duration: 0.5 });
            gsap.to(otherNames, { color: "var(--contrast-muted)", fontFamily: "'classico-urw', sans-serif", fontWeight: "400", fontStyle: "normal", fontSize: "1.618rem", duration: 0.5 });

            gsap.to(otherPictures, { zIndex: 0 });
            gsap.to(currentPicture, { zIndex: 1 });
        }, 3000);
    }

    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        stopCarousel();
        inactivityTimer = setTimeout(startCarousel, 3000);
    }

    namesContainer.addEventListener('touchstart', resetInactivityTimer);
    document.addEventListener('scroll', resetInactivityTimer);
    document.querySelector('.text').addEventListener('scroll', resetInactivityTimer);

    resetInactivityTimer();


    let currentForefrontImage = null; // Variable to keep track of the current forefront image

    // Function to bring the image to the forefront
    function bringImageToFront(imageId, triggerId, scrollerId) {
      const imageElement = document.querySelector(imageId);
      const triggerElement = document.querySelector(triggerId);
      const scrollerElement = document.querySelector(scrollerId);

      // Check if both elements exist
      if (!imageElement || !triggerElement || !scrollerElement) {
        
        return;
      }

      gsap.to(imageElement, {
        zIndex: 10, // Change z-index to bring it to the forefront
        duration: 1, // Animation duration
        scrollTrigger: {
          trigger: triggerElement, // Element to watch
          start: "top 10%", // Trigger when the element reaches the center of the viewport
          scroller: scrollerElement, // Set the scroller to the specific element
          // markers: true,
          toggleActions: "play none none reverse", // Play the animation on scroll down and reverse on scroll up
          onEnter: () => {
            if (currentForefrontImage && currentForefrontImage !== imageElement) {
              // Reset the z-index of the previous forefront image
              gsap.to(currentForefrontImage, { zIndex: 0, duration: 1 });
            }
            // Update the current forefront image
            currentForefrontImage = imageElement;
          }
        }
      });
    }

    // Function to initialize all ScrollTriggers
    function initializeScrollTriggers() {
      bringImageToFront("#imgIntro", "#intro", ".text");
    bringImageToFront("#imgRecord", "#record", ".text");
    bringImageToFront("#imgCards", "#cards", ".text");
    bringImageToFront("#imgVariations", "#variations", ".text");
    bringImageToFront("#imgInsta", "#insta", ".text");
    bringImageToFront("#imgBw", "#bw", ".text");
    }
     
        const images = document.querySelectorAll(".images");
        const projectInfo = document.querySelector(".project-info");
        const names2 = document.querySelector(".names");
        const learnMoreButton = document.querySelector(".learn-more");
        const text = document.querySelector(".text");
        const textShowHide = document.querySelectorAll(".text > p:not(#intro), .text > h5");

        // State flag to track expansion
        let isExpanded = false;

            // Event handler function
            function toggleProjectInfo() {
                if (!isExpanded) {
                    projectInfo.style.top = "110vw";
                    names2.style.display = "none";
                    text.style.overflowY = "scroll";
                    textShowHide.forEach(item => item.style.display = "block");
                    images.forEach(image => {
                        image.style.top = "5vh";
                    });

                    learnMoreButton.classList.add('learn-more-expanded');
                        
                    learnMoreButton.querySelector("h5").innerText = "Voir moins";
                    initializeScrollTriggers();
                    isExpanded = true;
                } else {
                    projectInfo.style.top = "10vh";
                    names2.style.display = "block";
                    text.style.overflowY = "clip";
                    textShowHide.forEach(item => item.style.display = "none");
                    images.forEach(image => {
                        image.style.top = "";
                        image.style.bottom = "30vh";
                    });
                    learnMoreButton.classList.remove('learn-more-expanded');
                    learnMoreButton.querySelector("h5").innerText = "Voir plus";
                    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                    isExpanded = false;
                }
            }

            // Add event listener for the 'Voir plus' button using both 'touchend' and 'click' for cross-browser support
            learnMoreButton.addEventListener("pointerdown", function(event) {
                
                event.preventDefault(); // Prevent any default behavior
                toggleProjectInfo();
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





