document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.getElementById('wrapper');
  const burger = document.getElementById('burger');
  const navContainer = document.getElementById("nav-container");
  const navContent = document.getElementById("nav-content");
  const closeNavBtn = document.getElementById("close-nav-btn");;
  let isOpening = false;

  burger.addEventListener("click", openNav);
  closeNavBtn.addEventListener("click", closeNav);

  function openNav() {
    if (!isOpening) { // Prevent overlapping animations
      isOpening = true;
      closeNavBtn.style.display = "block";
      burger.style.display = "none";
      navContainer.style.display = "flex";
      if(window.innerWidth > 3400){
        burger.classList.add("comp");
        wrapper.classList.add("comp");
      }
      navContainer.classList.add("open");
      document.addEventListener("keydown", handleEscKeyPress);
      navContainer.addEventListener("click", handleOutsideNavClick);

      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.position = "fixed";

      document.body.style.paddingRight = getScrollbarWidth() + "px";
          
      // Remove the isOpening flag after the animation duration
      setTimeout(function () {
        isOpening = false;
      }, 500); // Use the same duration as your animation
    }
  }


  function closeNav() {
    navContainer.classList.add("close");
    
    // prevent close icons disappearing before page re-appears
    setTimeout(() => {
      closeNavBtn.style.display = "none";
      burger.style.display = "block";
    }, 400);
    // prevent content/scrollbar shift (500ms === css animation duration)
    setTimeout(() => {
      document.documentElement.style.overflow = "auto";
      document.documentElement.style.position = "relative";
      document.body.style.paddingRight = "0";
    }, 500);

    // Wait for the animation to complete before hiding the nav
    setTimeout(function () {
      navContainer.style.display = "none";
      if(window.innerWidth > 3400){
        burger.classList.remove("comp");
        wrapper.classList.remove("comp");
      }
      navContainer.classList.remove("open");
      navContainer.classList.remove("close");
      document.removeEventListener("keydown", handleEscKeyPress);
      navContainer.removeEventListener("click", handleOutsideNavClick);
    }, 500); // Use the same duration as your animation
  }

  function handleEscKeyPress(event) {
    if (event.key === "Escape") {
      closeNav();
    }
  }

  function handleOutsideNavClick(event) {
   if (event.target === navContainer || event.target === navContent) {
      closeNav();
    }
  }
});


