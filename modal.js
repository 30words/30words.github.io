document.addEventListener("DOMContentLoaded", function () {
  let previousScrollPosition = 0; // Store the previous scroll position

  const modalContainer = document.getElementById("modal-container");
  const modalImage = document.getElementById("modal-image");
  const closeModalBtn = document.getElementById("close-modal");

  const imageSections = document.querySelectorAll(".image-section");

  imageSections.forEach((section) => {
    section.addEventListener("click", function () {
      previousScrollPosition = window.scrollY; // Store the current scroll position

      const backgroundImage = window.getComputedStyle(section).getPropertyValue("background-image");
      const imageUrl = backgroundImage.replace(/^url\(['"]?/,'').replace(/['"]?\)$/,'');
      
      modalImage.src = imageUrl;
      
      modalContainer.style.display = "flex";

      document.documentElement.style.position = "fixed";
      document.documentElement.style.overflow = "hidden";
      document.body.style.paddingRight = getScrollbarWidth() + "px"; 

      document.addEventListener("keydown", handleEscKeyPress);
      modalContainer.addEventListener("click", handleOutsideModalClick);
    });
  });


  function closeModal() {
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.position = "relative";
    document.body.style.paddingRight = "0";
    window.scrollTo(0, previousScrollPosition); // Restore the previous scroll position

    modalContainer.style.display = "none";
    document.removeEventListener("keydown", handleEscKeyPress);
    modalContainer.removeEventListener("click", handleOutsideModalClick);
  }

  closeModalBtn.addEventListener("click", closeModal);
  
  function handleOutsideModalClick(event) {
   if (event.target === modalContainer || event.target === modalImage) {
      closeModal();
    }
  }
  
  function handleEscKeyPress(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }

});



function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.msOverflowStyle = "scrollbar"; // For Microsoft Edge
  document.body.appendChild(outer);
  
  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = "scroll";
  
  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);    
  const widthWithScroll = inner.offsetWidth;
  
  outer.remove();
  
  return widthNoScroll - widthWithScroll;
}

