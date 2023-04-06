let entities = [{
   imagePath: "./images/image-rostov-admiral-project.png",
   city: "Rostov-on-Don<br>LCD admiral",
   area: "81 m2",
   repairTime: "3.5 months"
},
{
   imagePath: "./images/image-sochi-project.png",
   city: "Sochi<br>Thieves",
   area: "105 m2",
   repairTime: "4 months",
},
{
   imagePath: "./images/image-rostov-patriotic-project.png",
   city: "Rostov-on-Don<br>Patriotic",
   area: "93 m2",
   repairTime: "3 months",
}];

function initSlider() {
   if (!entities || !entities.length)
      return;

   let projectImages = document.querySelector(".projects__image-container");
   let leftArrow = document.querySelector(".arrows__left");
   let rightArrow = document.querySelector(".arrows__right");
   let sliderDots = document.querySelector(".arrows__dots");

   function initImages() {
      entities.forEach((entity, index) => {
         let imageDiv = `<div class="projects__image${index === 0 ? ' projects__image-active' : ''}" style="background-image:url(${entity.imagePath});" data-index="${index}"></div>`;
         projectImages.innerHTML += imageDiv;
      })
   }

   function initDots() {
      entities.forEach((entity, index) => {
         let dotDiv = `<div class="arrows__dot ${index === 0 ? 'arrows__dot_active' : 'arrows__dot_margin-left'}" data-index="${index}"></div>`;
         sliderDots.innerHTML += dotDiv;
      })

      sliderDots.querySelectorAll('.arrows__dot').forEach(item => {
         item.addEventListener("click", () => {
            const index = +item.dataset.index;
            moveSlider(index);
         })
      });
   }

   function initLeftArrow() {
      leftArrow.addEventListener("click", function () {
         const curNumber = +sliderDots.querySelector('.arrows__dot_active').dataset.index;
         const nextNumber = curNumber !== 0 ? curNumber - 1 : entities.length - 1;
         moveSlider(nextNumber);
      })
   }

   function initRightArrow() {
      rightArrow.addEventListener("click", function () {
         const curNumber = +sliderDots.querySelector('.arrows__dot_active').dataset.index;
         const nextNumber = curNumber !== entities.length - 1 ? curNumber + 1 : 0;
         moveSlider(nextNumber);
      })
   }

   function initAnchorTags() {
      const dots = document.querySelectorAll(".projects__nav-link");

      dots.forEach(item => {
         item.addEventListener("click", () => {
            const index = +item.dataset.index;
            moveSlider(index);
         })
      });
   }

   function moveSlider(newIndex) {
      const curDotElement = sliderDots.querySelector('.arrows__dot_active');
      curDotElement.classList.remove("arrows__dot_active");

      const newDotElement = sliderDots.querySelector(`[data-index="${newIndex}"]`);
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
   initDots();
   initLeftArrow();
   initRightArrow();
   initAnchorTags();
}

initSlider();