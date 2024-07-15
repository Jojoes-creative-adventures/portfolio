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

    gsap.fromTo(".images",{ height:toPX("80vh"),
                            width:toPX("120vh"),}, 
                          { height:toPX("40vh"),
                            width:toPX("60vh"),
                            scrollTrigger: {
                            trigger: ".content-wrapper",
                            start:"top top",
                            endTrigger:".project-info",
                            end:"bottom bottom",
                            scrub:true,
                            },
                          }); 

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





