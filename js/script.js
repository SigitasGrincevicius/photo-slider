// git push -u https://github.com/SigitasGrincevicius/photo-slider main

let entities = [{
   imagePath: "../images/image-rostov-admiral-project.png",
   city: "Rostov-on-Don<br>LCD admiral",
   area: "81 m2",
   repairTime: "3.5 months"
},
{
   imagePath: "../images/image-sochi-project.png",
   city: "Sochi<br>Thieves",
   area: "105 m2",
   repairTime: "4 months",
},
{
   imagePath: "../images/image-rostov-patriotic-project.png",
   city: "Rostov-on-Don<br>Patriotic",
   area: "93 m2",
   repairTime: "3 months",
}
]

function initSlider() {
   if (!entities || !entities.length)
      return;

   let projectImages = document.querySelector(".projects__image-container");
   let leftArrow = document.querySelector(".arrows__left");
   let rightArrow = document.querySelector(".arrows__right");
   let dots = document.querySelectorAll(".arrows__dot");

   function getElementByClass(nodelist, className) {
      for (let i = 0; i < nodelist.length; i++) {
         const element = nodelist[i];
         if (element.classList.contains(className)) {
            return element;
         }
      }

      return null;
   }

   function initImages() {
      entities.forEach((entity, index) => {
         let imageDiv = `<div class="projects__image${index === 0 ? ' projects__image-active' : ''}" style="background-image:url(${entity.imagePath});" data-index="${index}"></div>`;
         projectImages.innerHTML += imageDiv;
      })
   }

   function initLeftArrow() {
      leftArrow.addEventListener("click", function () {
         const curNumber = +getElementByClass(dots, "arrows__dot_active").dataset.index;
         let nextNumber = curNumber !== 0 ? curNumber - 1 : dots.length - 1;
         moveEntity(nextNumber);
      })
   }

   function initRightArrow() {
      rightArrow.addEventListener("click", function () {
         const curNumber = +getElementByClass(dots, "arrows__dot_active").dataset.index;
         let nextNumber = curNumber !== dots.length - 1 ? curNumber + 1 : 0;
         moveEntity(nextNumber);
      })
   }

   function initDots() {
      const dots = document.querySelectorAll(".arrows__dot");

      dots.forEach(item => {
         item.addEventListener("click", () => {
            const index = +item.dataset.index;

            moveEntity(index);
         })
      });
   }

   function initAnchorTags() {
      const dots = document.querySelectorAll(".projects__nav-link");

      dots.forEach(item => {
         item.addEventListener("click", () => {
            const index = +item.dataset.index;

            moveEntity(index);
         })
      });
   }

   function moveEntity(newIndex) {
      const curDotElement = getElementByClass(dots, "arrows__dot_active");
      curDotElement.classList.remove("arrows__dot_active");

      const newDotElement = document.querySelector(`[data-index="${newIndex}"]`);
      newDotElement.classList.add("arrows__dot_active");

      projectImages.querySelector(".projects__image-active").classList.remove("projects__image-active");
      projectImages.querySelector(`[data-index="${newIndex}"]`).classList.add("projects__image-active");

      document.querySelector(".projects__nav-link_active").classList.remove("projects__nav-link_active");
      document.querySelector(`.projects__nav-link[data-index="${newIndex}"]`).classList.add("projects__nav-link_active");

      setDescriptionElementValues(newIndex);
   }

   function setDescriptionElementValues(newIndex) {
      document.querySelector(".project-details__desc-city").innerHTML = entities[newIndex].city;
      document.querySelector(".project-details__desc-area").innerHTML = entities[newIndex].area;
      document.querySelector(".project-details__desc-time").innerHTML = entities[newIndex].repairTime;
   }

   initImages();
   initLeftArrow();
   initRightArrow();
   initDots();
   initAnchorTags();
}

initSlider();