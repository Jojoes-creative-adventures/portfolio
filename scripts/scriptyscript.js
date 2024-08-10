gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollToPlugin);
gsap.config({ nullTargetWarn: false });

emailjs.init({publicKey: 'OVF_ZXgXH96x2FaxA',});

function toPX(value) {
    return parseFloat(value) / 100 * (/vh/gi.test(value) ? window.innerHeight : window.innerWidth);
}

const currentLang = document.documentElement.lang;

  // Select all language links and log them
  const langLinks = document.querySelectorAll('.lang-link');

  // Iterate over the language links
  langLinks.forEach(link => {
    // Log the language of each link
    const linkLang = link.getAttribute('data-lang');

    // Check if the link's language matches the current language
    if (linkLang === currentLang) {
      link.classList.add('inactive');
    } else {
      link.classList.remove('inactive');
    }
  });

// listen to the form submission
      document
        .getElementById("contact-me")
        .addEventListener("submit", function (event) {
          event.preventDefault();

          const serviceID = "contact-portfolio";
          const templateID = "contact-form-email";
          const successMessage = document.getElementById('successMessage');
          const errorMessage = document.getElementById('errorMessage');
          const sendButton = document.getElementById('sendButton');

          // send the email here
          emailjs.sendForm(serviceID, templateID, this).then(
            (response) => {
              sendButton.style.display = 'none';
              successMessage.style.display = 'flex';
            },
            (error) => {
              errorMessage.style.display = 'flex';
            }
          );
        });



// Function to handle wide screen scripts
function handleWideScreen() {

var cursor = document.querySelector(".custom-cursor");
const links = document.querySelectorAll('a, button');
  var initCursor = false;
  var works = document.querySelector(".works-wrapper");
  let mouseTimeout;

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

// mouse event listener
document.addEventListener('mousemove', () => {
  TweenLite.to('.ball', 0.3, {
    opacity: 0
  });
  TweenLite.to(cursor, 0.3, {
    opacity : 1
  });
  initCursor = true;

  if (mouseTimeout) {
    clearTimeout(mouseTimeout);
  }
  
  mouseTimeout = setTimeout(() => {
    TweenLite.to(cursor, 0.3, {
      opacity: 0
    });
    TweenLite.to('.ball', 0.3, {
    opacity : 1
  });
    initCursor = false;
  }, 500);
});

let worksAnimation = gsap.timeline({defaults :{duration: 3}, scrollTrigger:{
                                      trigger: '.works-animation',
                                      start : 'top bottom',
                                      end : 'bottom 30%',
                                      scrub:true,
                                      // snap: {
                                      //   snapTo: 0.8,
                                      //   duration : 0.5,
                                      //   ease : "sine.inOut"
                                      // }
                                  }});
worksAnimation.to(".header", { visibility:"hidden",
    });
worksAnimation.to(".footer", { visibility:"hidden",
    },"<");

worksAnimation.fromTo("#worksTitle",{ x:toPX("20vw"),
                                y:toPX("-125vh"),
                                  scale:0.1,
                                  visibility:"hidden",
                              },
                              { ease: "sine.inOut",
                                x:toPX("0vw"),
                                y:toPX("-30vh"),
                                scale:1,
                                visibility:"visible",
                              }, "<");
worksAnimation.fromTo(".ball",{ x:toPX("-60vw"),
                                y:toPX("0vh"),
                                  scale:2,
                              },
                              { ease: "power1.inOut",
                                x:toPX("50vw"),
                                y:toPX("0vh"),
                                rotation:180,
                                scale:2,
                              },);

worksAnimation.to(".ball", { x:0,
                              y:0,
                              rotation:0,
                              scale:1,
                              ease: "power1.in",
                            },);

worksAnimation.to("#worksTitle", {   x:toPX("20vw"),
                                y:toPX("25vh"),
                                scale:0.1,
                                ease: "sine.out",
    },"<");

worksAnimation.to("#worksTitle", { visibility:"hidden",

});
worksAnimation.to(".footer", { visibility:"visible",
    },"<");
worksAnimation.to(".header", { visibility:"visible",
    },"<");

  const categoryNavLinks = document.querySelectorAll('.category-nav a');
  const header = document.querySelector('.header');
  const headerHeight = header ? header.offsetHeight : 0;

  // Object to store the target positions
  const targetPositions = {};

  // Calculate and store the target positions
  categoryNavLinks.forEach(link => {
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      targetPositions[targetId] = targetPosition;
  });

  // Add event listeners to links for scrolling
  categoryNavLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href');
      const targetPosition = targetPositions[targetId];

        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetPosition,
            autoKill: true  // Auto-adjusts scroll if interrupted
          },
          ease: 'power2.out',
        });
    });
  });

let edition = gsap.timeline({defaults :{duration: 10}, scrollTrigger:{
                                                              trigger: '#edition',
                                                              start : 'top 19%',
                                                              endTrigger : '#branding',
                                                              end : 'top 19%',
                                                              scrub: true, },
                                                          
                                                              });
edition.to(".ball", {x : toPX("74vh"), rotation : "180deg", ease: "sine.inOut",});
edition.to("#link-edition", {color: "var(--contrast)", fontFamily: "'classico-urw', sans-serif", fontWeight: "700", fontStyle: "normal", fontSize: "1.618rem",duration:0.01}, "<");
edition.to(".ball", {y : toPX("30vh"), ease: CustomEase.create("custom", "M0,0 C0.46,0 0.579,-0.019 0.72,0.088 0.83,0.172 0.884,0.4 1,1 ")},"<40%");
edition.to(".ball", {x : 0, rotation : "-180deg", ease: "sine.inOut",});
edition.to(".ball", {y : toPX("39vh"), ease: CustomEase.create("custom", "M0,0 C0.46,0 0.579,-0.019 0.72,0.088 0.83,0.172 0.884,0.4 1,1 ")},"<40%");
edition.to(".ball", {y : 0, ease: "sine.inOut",});
edition.to("#link-edition", {color: "var(--contrast-muted)", fontFamily: "'classico-urw', sans-serif", fontWeight: "400", fontStyle: "normal", fontSize: "1rem",duration:0.01},"<");

let branding = gsap.timeline({defaults :{duration: 10}, scrollTrigger:{
                                                              trigger: '#branding',
                                                              start : 'top 19%',
                                                              endTrigger : '#webdesign',
                                                              end : 'top 19%',
                                                              scrub: true, }
                                                              });
branding.to(".ball", {x : toPX("74vh"), rotation : "180deg", ease: "sine.inOut",});
branding.to("#link-branding", {color: "var(--contrast)", fontFamily: "'classico-urw', sans-serif", fontWeight: "700", fontStyle: "normal", fontSize: "1.618rem",duration:0.01}, "<");
branding.to(".ball", {y : toPX("30vh"), ease: CustomEase.create("custom", "M0,0 C0.46,0 0.579,-0.019 0.72,0.088 0.83,0.172 0.884,0.4 1,1 ")},"<40%");
branding.to(".ball", {x : 0, rotation : "-180deg", ease: "sine.inOut",});
branding.to(".ball", {y : toPX("39vh"), ease: CustomEase.create("custom", "M0,0 C0.46,0 0.579,-0.019 0.72,0.088 0.83,0.172 0.884,0.4 1,1 ")},"<40%");
branding.to(".ball", {y : 0, ease: "sine.inOut",});
branding.to("#link-branding", {color: "var(--contrast-muted)", fontFamily: "'classico-urw', sans-serif", fontWeight: "400", fontStyle: "normal", fontSize: "1rem",duration:0.01},"<");

let webdesign = gsap.timeline({defaults :{duration: 10}, scrollTrigger:{
                                                              trigger: '#webdesign',
                                                              start : 'top 19%',
                                                              endTrigger : '#illustration',
                                                              end : 'top 19%',
                                                              scrub: true, }
                                                              });
webdesign.to(".ball", {x : toPX("74vh"), rotation : "180deg", ease: "sine.inOut",});
webdesign.to("#link-webdesign", {color: "var(--contrast)", fontFamily: "'classico-urw', sans-serif", fontWeight: "700", fontStyle: "normal", fontSize: "1.618rem", duration:0.01}, "<");
webdesign.to(".ball", {y : toPX("30vh"), ease: CustomEase.create("custom", "M0,0 C0.46,0 0.579,-0.019 0.72,0.088 0.83,0.172 0.884,0.4 1,1 ")},"<40%");
webdesign.to(".ball", {y : 0, ease: "sine.inOut",});
webdesign.to("#link-webdesign", {color: "var(--contrast-muted)", fontFamily: "'classico-urw', sans-serif", fontWeight: "400", fontStyle: "normal", fontSize: "1rem",duration:0.01},"<");

let illustration = gsap.timeline({defaults :{duration: 10}, scrollTrigger:{
                                                              trigger: '#illustration',
                                                              start : 'top 19%',
                                                              endTrigger : '#artistic',
                                                              end : 'top 19%',
                                                              scrub: true, }
                                                              });
illustration.to(".ball", {x : 0, rotation : "-180deg", ease: "sine.inOut",});
illustration.to("#link-illustration", {color: "var(--contrast)", fontFamily: "'classico-urw', sans-serif", fontWeight: "700", fontStyle: "normal", fontSize: "1.618rem",duration:0.01}, "<");
illustration.to(".ball", {y : toPX("39vh"), ease: CustomEase.create("custom", "M0,0 C0.46,0 0.579,-0.019 0.72,0.088 0.83,0.172 0.884,0.4 1,1 ")},"<40%");
illustration.to(".ball", {y : 0, ease: "sine.inOut",});
illustration.to("#link-illustration", {color: "var(--contrast-muted)", fontFamily: "'classico-urw', sans-serif", fontWeight: "400", fontStyle: "normal", fontSize: "1rem",duration:0.01},"<");

let artistic = gsap.timeline({defaults :{duration: 10}, scrollTrigger:{
                                                              trigger: '#artistic',
                                                              start : 'top 19%',
                                                              end : 'bottom bottom',
                                                              scrub: true,
                                                               }
                                                              });

artistic.to(".ball", {x : toPX("74vh"), rotation : "180deg", ease: "sine.inOut",});
artistic.to("#link-artistic", {color: "var(--contrast)", fontFamily: "'classico-urw', sans-serif", fontWeight: "700", fontStyle: "normal", fontSize: "1.618rem",duration:0.01}, "<");
artistic.to(".ball", {y : toPX("-40vh")},"<40%");
artistic.to(".ball", {scale : 0, ease : "sine.out"},"<");
artistic.to("#link-artistic", {color: "var(--contrast-muted)", fontFamily: "'classico-urw', sans-serif", fontWeight: "400", fontStyle: "normal", fontSize: "1rem",duration:0.01},">");


let aboutAnimation = gsap.timeline({defaults :{duration: 3}, scrollTrigger:{
                                      trigger: '.about-animation',
                                      start : 'top bottom',
                                      end : 'bottom top',
                                      scrub:true,
                                      }});
aboutAnimation.to(".header", { visibility:"hidden",
    });
aboutAnimation.to(".footer", { visibility:"hidden",
    },"<");

aboutAnimation.fromTo("#aboutTitle",{ x:toPX("-5vw"),
                                y:toPX("-145vh"),
                                  scale:0.2,
                                  visibility:"hidden",
                              },
                              { ease: "sine.inOut",
                                x:toPX("0vw"),
                                y:toPX("-30vh"),
                                scale:1,
                                visibility:"visible",
                              }, "<");

aboutAnimation.fromTo(".photo",{ x:toPX("-60vw"),
                                y:toPX("-110vh"),
                                  scale:0.5,
                              },
                              { ease: "power1.inOut",
                                x:toPX("50vw"),
                                y:toPX("-110vh"),
                                rotation:180,
                                scale:0.5,
                              },);

aboutAnimation.to(".photo", { x:0,
                              y:0,
                              rotation:0,
                              scale:1,
                              ease: "power1.in",
                            },);

aboutAnimation.to("#aboutTitle", {   x:toPX("-4vw"),
                                y:toPX("5vh"),
                                scale:0.2,
                                ease: "sine.out",
    },"<");

aboutAnimation.to("#aboutTitle", { visibility:"hidden",

});
aboutAnimation.to(".footer", { visibility:"visible",
    },"<");
aboutAnimation.to(".header", { visibility:"visible",
    },"<");

gsap.fromTo(".photo", {filter:"blur(0)", opacity:"1"}, {filter:"blur(50px)", 
                                            opacity:0.4,
                                            ease: "sine.in", 
                                            scrollTrigger: {
                                              trigger:".about-text",
                                              start:"top 80%",
                                              end: "top 40%",
                                              scrub:true,
                                            }
                                          });

gsap.to(".steps", {x : toPX("-260vw"), scrollTrigger : {
                                                trigger: ".steps",
                                                start : "top -20vh",
                                                end : "bottom -800%",
                                                scrub:true,
                                                pin:true,
                                                
        }});

let contactAnimation = gsap.timeline({defaults :{duration: 3}, scrollTrigger:{
                                      trigger: '.contact-animation',
                                      start : 'top 35%',
                                      end : 'bottom top',
                                      scrub:true,
                                    }});
contactAnimation.to(".header", { visibility:"hidden",
    });
contactAnimation.to(".footer", { visibility:"hidden",
    },"<");

contactAnimation.fromTo("#contactTitle",{ x:toPX("10vw"),
                                y:toPX("-80vh"),
                                  scale:0.15,
                                  visibility:"hidden",
                              },
                              { ease: "sine.inOut",
                                x:toPX("0vw"),
                                y:toPX("0vh"),
                                scale:1,
                                visibility:"visible",
                              }, "<");

contactAnimation.fromTo(".ball",{ x:toPX("-60vw"),
                                y:toPX("-10vh"),
                                  scale:2,
                              },
                              { ease: "power1.inOut",
                                x:toPX("50vw"),
                                y:toPX("-10vh"),
                                rotation:180,
                                scale:2,
                              },);

contactAnimation.to(".ball", { x:toPX("-100vw"),
                              y:0,
                              rotation:0,
                              scale:1,
                              ease: "power1.in",
                            },);

contactAnimation.to("#contactTitle", {   x:toPX("7vw"),
                                y:toPX("20vh"),
                                scale:0.15,
                                ease: "sine.out",
    },"<");

contactAnimation.to("#contactTitle", { visibility:"hidden",

});
contactAnimation.to(".footer", { visibility:"visible",
    },"<");
contactAnimation.to(".header", { visibility:"visible",
    },"<");

}



 // Function to handle narrow screen scripts
function handleNarrowScreen() {
    ScrollTrigger.config({
  syncInterval: 999999999,
  ignoreMobileResize: true,
});
  window.onload = ScrollTrigger.refresh();

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
  document.querySelectorAll('.links-categories a, .links-languages a').forEach(link => {
    link.addEventListener('click', linkClickHandler);
});

// Event handler function for links
function linkClickHandler(event) {
    if (isExpanded) {
        toggleMenu();
    }
}

    // Event handler function
    function toggleMenu() {
        if (!isExpanded) {
            headerWrapper.style.height = "101vh";
            toggleVisibility(categories);
            toggleVisibility(languages);
            toggleVisibility(footer);
            toggleIcons();
            document.body.style.overflowY = "hidden";
            isExpanded = true;
        } else {
            headerWrapper.style.height = "5vh";
            toggleVisibility(categories);
            toggleVisibility(languages);
            toggleVisibility(footer);
            toggleIcons();
            document.body.style.overflowY = "scroll";
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

ScrollTrigger.normalizeScroll(true);

let worksAnimation = gsap.timeline({defaults :{duration: 1}, scrollTrigger:{
                                      trigger: '.works-animation',
                                      start : 'top bottom',
                                      end : 'bottom center',
                                      scrub:true,
                                  } });
worksAnimation.fromTo("#worksTitle",{ x:toPX("-70vw"),y:toPX("-20vh"),scale:1,},{ x:toPX("60vw"),y:toPX("-20vh"),scale:2,});
worksAnimation.fromTo(".ball", {x:toPX("-50vw"),y:toPX("2vh")},{x:toPX("70vw"),y:toPX("2vh"), rotation:"180deg"});
worksAnimation.to(".ball", {x:0,y:0, rotation:0});
worksAnimation.to("#worksTitle",{ x:toPX("100vw"),y:toPX("-20vh"),scale:1,});


  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      const categoryNav = document.querySelector('.category-nav');

      if (entry.isIntersecting) {
        categoryNav.classList.remove('hidden');
        categoryNav.classList.add('visible');
      } else {
        categoryNav.classList.remove('visible');
        categoryNav.classList.add('hidden');
      }
    });
  };

  // Define the observer options
  const observerOptions = {
    root: null, // Defaults to the browser viewport
    rootMargin: '0px 0px 50% 0px',
    threshold: 0.05 // Callback is invoked when 10% of the target is visible
  };

  // Create the IntersectionObserver instance
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Select the target element and start observing
  const worksWrapper = document.querySelector('.works-wrapper');
    observer.observe(worksWrapper);
  


window.onload = function() {
    assignGalleryClasses();
};

function getCurrentPosition(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top
  };
}

function assignGalleryClasses() {
  // Select all gallery elements
  const galleries = document.querySelectorAll('.gallery');
  const ball = document.querySelector('.ball');

  // Iterate through each gallery
  galleries.forEach((gallery) => {
    if (gallery.id === 'artistic') return;
    // Get all <a> elements inside the current gallery
    const links = Array.from(gallery.querySelectorAll('a'));

    // Iterate through each link and assign classes based on the index
    links.forEach((link, index) => {
      if (index % 2 === 0) {
        // Even index - add .wrapper-right
        link.classList.add('wrapper-right');
      } else {
        // Odd index - add .wrapper-left
        link.classList.add('wrapper-left');
      }

      // GSAP timelines
      if (link.classList.contains('wrapper-left')) {
        let rightImage = gsap.timeline({
          defaults: { duration: 10 },
          scrollTrigger: {
            trigger: link,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          }
        });

        rightImage.to(ball, { x: toPX("60vw"), y: 0 });
        rightImage.to(ball, { x: 0, rotation: "0", ease: "sine.inOut" });
        rightImage.to(ball, { y: toPX("-10vw"), duration: 5, ease: "power2.out" }, "<");
        rightImage.to(ball, { y: 0, duration: 5, ease: "power2.in" }, ">");
      } else if (link.classList.contains('wrapper-right')) {
        let leftImage = gsap.timeline({
          defaults: { duration: 10 },
          scrollTrigger: {
            trigger: link,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          }
        });
        leftImage.to(ball, {x:0, y:0, rotation:0});
        leftImage.to(ball, { x: toPX("60vw"), rotation: "360deg", ease: "sine.inOut" });
        leftImage.to(ball, { y: toPX("-10vw"), duration: 5, ease: "power2.out" }, "<");
        leftImage.to(ball, { y: 0, duration: 5, ease: "power2.in" }, ">");
      }
    });

    // Additional GSAP ScrollTrigger animations for each gallery
    gsap.to(ball, {
      scrollTrigger: {
        trigger: gallery,
        start: 'bottom 80%',
        end: 'bottom 55%',
        onEnter: () => {
          const { x, y } = getCurrentPosition(ball);

          gsap.to(ball, {
            x: 0,
            y: 0,
            scrollTrigger: {
              trigger: gallery,
              start: 'bottom 80%',
              end: 'bottom 55%',
              scrub: true
            }
          });
        },
        once: true // Ensure it only triggers once to set the position
      }
    });
  });
}

// Call the function directly to ensure it runs
assignGalleryClasses();


const handleAnchorClick = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = targetPosition - (window.innerHeight / 2);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Attach event listeners to all anchor links in .category-nav
  const anchorLinks = document.querySelectorAll('.category-nav a');
  anchorLinks.forEach(link => {
    link.addEventListener('click', handleAnchorClick);
  });

gsap.to("#link-edition", {color:"var(--contrast)", fontSize : "1.618rem", y:toPX('-1vh'), scrollTrigger : {trigger : "#edition", start : "top center", end : "bottom center"}});

let linkBrandingAnim = gsap.timeline({defaults: { duration: 1 },
                scrollTrigger: {
                    trigger: "#branding",
                    start: 'top 60%',
                    end: 'top center',
                    scrub: true,
                }});
linkBrandingAnim.to("#link-edition", {color:"var(--contrast-muted)", fontSize : "1rem",y:0});
linkBrandingAnim.to("#link-branding", {color:"var(--contrast)", fontSize : "1.618rem", y:toPX('-1vh')},"<");

let linkWebdesignAnim = gsap.timeline({defaults: { duration: 1 },
                scrollTrigger: {
                    trigger: "#webdesign",
                    start: 'top 60%',
                    end: 'top center',
                    scrub: true,
                }});
linkWebdesignAnim.to("#link-branding", {color:"var(--contrast-muted)", fontSize : "1rem",y:0});
linkWebdesignAnim.to("#link-webdesign", {color:"var(--contrast)", fontSize : "1.618rem", y:toPX('-1vh')},"<");

let linkIllustrationAnim = gsap.timeline({defaults: { duration: 1 },
                scrollTrigger: {
                    trigger: "#illustration",
                    start: 'top 60%',
                    end: 'top center',
                    scrub: true,
                }});
linkIllustrationAnim.to("#link-webdesign", {color:"var(--contrast-muted)", fontSize : "1rem",y:0});
linkIllustrationAnim.to("#link-illustration", {color:"var(--contrast)", fontSize : "1.618rem", y:toPX('-1vh')},"<");

let linkArtisticAnim = gsap.timeline({defaults: { duration: 1 },
                scrollTrigger: {
                    trigger: "#artistic",
                    start: 'top 60%',
                    end: 'top center',
                    scrub: true,
                }});
linkArtisticAnim.to("#link-illustration", {color:"var(--contrast-muted)", fontSize : "1rem",y:0});
linkArtisticAnim.to("#link-artistic", {color:"var(--contrast)", fontSize : "1.618rem", y:toPX('-1vh')},"<");

gsap.to("#link-artistic", {color:"var(--contrast-muted)", fontSize : "1rem",y:0, scrollTrigger:{trigger:"#artistic", start:"bottom bottom", end:"bottom 90%"}});
gsap.fromTo(".ball", {scale:1},{ease:"power2.out",scale : 0, scrollTrigger: { trigger: "#artistic", start: 'bottom 80%', end: 'bottom 60%',scrub: true}});

let aboutAnimation = gsap.timeline({defaults :{duration: 1}, scrollTrigger:{
                                      trigger: '.about-animation',
                                      start : 'top bottom',
                                      end : 'bottom center',
                                      scrub:true,
                                  } });
aboutAnimation.fromTo("#aboutTitle",{ x:toPX("-80vw"),y:toPX("-20vh"),scale:1,},{ x:toPX("60vw"),y:toPX("-20vh"),scale:2,});
aboutAnimation.fromTo(".photo", {scale:0.5, x:toPX("-60vw"),y:toPX("-35vh")},{scale:1, x:toPX("70vw"),y:toPX("-35vh"), rotation:"180deg"});
aboutAnimation.to(".photo", {x:0,y:0, rotation:0});
aboutAnimation.to("#aboutTitle",{ x:toPX("100vw"),y:toPX("-20vh"),scale:1,});

let aboutTextAnimation = gsap.timeline({defaults :{duration: 1}, scrollTrigger:{
                                      trigger: '.about',
                                      start : 'top 40%',
                                      end : 'bottom center',
                                      pin:true,
                                      scrub:true,
                                  } });
aboutTextAnimation.fromTo(".photo", {filter: "blur(0px)", opacity:1} ,{filter: "blur(20px)", opacity:0.5, duration:5});
aboutTextAnimation.fromTo(".about-text", {y:toPX("50vh")}, {y:0, duration:5}, "<");

/*gsap.to(".anim-wrapper", {x:toPX("-505vw"), scrollTrigger : {
                                                trigger:'.steps',
                                                start : 'top 20%',
                                                end:'bottom center',
                                                pin:true,
                                                scrub:true,
                                              }});*/

let contactAnimation = gsap.timeline({defaults :{duration: 1}, scrollTrigger:{
                                      trigger: '.contact-animation',
                                      start : 'top bottom',
                                      end : 'bottom center',
                                      scrub:true,
                                      snap: {
                                        snapTo: 0.8,
                                        duration : 0.5,
                                        ease : "sine.inOut"
                                      }
                                  } });
contactAnimation.fromTo("#contactTitle",{ x:toPX("-80vw"),y:toPX("0vh"),scale:1,},{ x:toPX("45vw"),y:toPX("0vh"),scale:1.8,});
contactAnimation.fromTo(".ball", {x:toPX("-50vw"),y:toPX("25vh"),scale:1},{x:toPX("70vw"),y:toPX("25vh"), rotation:"180deg"});
contactAnimation.to(".ball", {x:toPX("-50vw"),y:toPX("25vh"), rotation:0,});
contactAnimation.to(".ball", {scale:0});
contactAnimation.to("#contactTitle",{ x:toPX("100vw"),y:toPX("0vh"),scale:1,});

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
