const promoSwitches = document.querySelectorAll('.slider-switches__item');
const servicesSwitches = document.querySelectorAll('.services-switches__item');
const modalMapLink = document.querySelector('.contacts__map-link');
const modalFeedbackButton = document.querySelector('.contacts__button');


//SLIDERS

function removeSwitches (switches, enabledClass) {
  for (let i = 0; i < switches.length; i++) {
    switches[i].classList.remove(enabledClass);
  }
}

function removeSlides (slides, shownSlideClass) {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove(shownSlideClass);
  }
}

// promo slider

for (let i = 0; i < promoSwitches.length; i++) {
  promoSwitches[i].addEventListener('click', function() {
    const promoSwitchesEnabledClass = 'slider-switches__item-current';
    const promoSlides = document.querySelectorAll('.promo-slide');
    const promoSlidesShownClass = 'slide-shown';

    removeSwitches(promoSwitches, promoSwitchesEnabledClass);
    removeSlides(promoSlides, promoSlidesShownClass);
    this.classList.add(promoSwitchesEnabledClass);

    for (let j = 0; j < promoSlides.length; j++) {
      if (i === j) {
        promoSlides[j].classList.add(promoSlidesShownClass)
      }
    }
  });
}

// services slider

for (let i = 0; i < servicesSwitches.length; i++) {
  servicesSwitches[i].addEventListener('click', function() {
    const servicesSwitchesEnabledClass = 'services-switches__switch-anabled';
    const servicesDescription = document.querySelectorAll('.services__description');
    const servicesDescriptionShownClass = 'description-shown';

    removeSwitches(servicesSwitches, servicesSwitchesEnabledClass);
    removeSlides(servicesDescription, servicesDescriptionShownClass);
    this.classList.add(servicesSwitchesEnabledClass);

    for (let j = 0; j < servicesDescription.length; j++) {
      if (i === j) {
        servicesDescription[j].classList.add(servicesDescriptionShownClass)
      }
    }
  });
}

// MODALS

// modal map

modalMapLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  const map = document.querySelector('.map');
  const mapClose = document.querySelector('.map__close-button');
  map.classList.add('modal-shown');

  mapClose.addEventListener('click', function () {
    map.classList.remove('modal-shown');
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (map.classList.contains('modal-shown')) {
        map.classList.remove('modal-shown');
      }
    }
  });
});

// modal feedback

modalFeedbackButton.addEventListener('click', function (evt) {
  evt.preventDefault();

  const feedback = document.querySelector('.feedback');
  const feedbackClose = feedback.querySelector('.feedback__close-button');
  const name = feedback.querySelector('[name=name]')
  const feedbackForm = feedback.querySelector('.feedback__form')
  const feedbackInputs = feedback.querySelectorAll('.feedback__input')
  const invalidError = 'feedback__invalid';

  feedback.classList.add('modal-shown');
  name.focus();

  feedbackForm.addEventListener('submit', function (evt) {
    for (let i = 0; i < feedbackInputs.length; i++) {
      if (!feedbackInputs[i].value) {
        evt.preventDefault();
        feedbackInputs[i].classList.add(invalidError);
        setTimeout(function () {
          feedbackInputs[i].classList.remove(invalidError);
        }, 800)
      }
    }
  });

  feedbackClose.addEventListener('click', function () {
    feedback.classList.remove('modal-shown');
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (feedback.classList.contains('modal-shown')) {
        feedback.classList.remove('modal-shown');
      }
    }
  });
});
