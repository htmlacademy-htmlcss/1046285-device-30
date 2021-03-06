const promoSwitches = document.querySelectorAll('.slider-switches__item');
const promoSlides = document.querySelectorAll('.promo-slide');
const servicesSwitches = document.querySelectorAll('.services-switches__item');
const servicesDescription = document.querySelectorAll('.services__description');
const modals = document.querySelectorAll('.modal');
const modalMapLink = document.querySelector('.contacts__map-link');
const modalMap = document.querySelector('.map');
const modalFeedbackButton = document.querySelector('.contacts__button');
const modalFeedback = document.querySelector('.feedback');
const modalFeedbackName = document.querySelector('.feedback__input-name');
const storageFeedbackName = localStorage.getItem('userName');
const modalFeedbackEmail = document.querySelector('.feedback__input-email');
const storageFeedbackEmail = localStorage.getItem('userEmail');
const messageSentPopup = document.querySelector('.message-sent-popup');

//SLIDERS

function removeSwitches (switches, enabledClass) {
  switches.forEach(function (switchItem) {
    switchItem.classList.remove(enabledClass);
  });
}

function removeSlides (slides, shownSlideClass) {
  slides.forEach(function (slide) {
    slide.classList.remove(shownSlideClass);
  });
}

// Promo slider

if (promoSwitches.length) {
  promoSwitches.forEach(function (promoSwitch, i, promoSwitches) {

    promoSwitch.addEventListener('click', function() {
      const promoSwitchesEnabledClass = 'slider-switches__item-current';
      const promoSlidesShownClass = 'slide-shown';

      removeSwitches(promoSwitches, promoSwitchesEnabledClass);
      removeSlides(promoSlides, promoSlidesShownClass);
      this.classList.add(promoSwitchesEnabledClass);

      promoSlides[i].classList.add(promoSlidesShownClass);
    });
  });

}

// services slider

if (servicesSwitches.length) {
  servicesSwitches.forEach(function (servicesSwitch, i, servicesSwitches) {
    servicesSwitch.addEventListener('click', function() {
      const servicesSwitchesEnabledClass = 'services-switches__switch-anabled';
      const servicesDescriptionShownClass = 'description-shown';

      removeSwitches(servicesSwitches, servicesSwitchesEnabledClass);
      removeSlides(servicesDescription, servicesDescriptionShownClass);
      this.classList.add(servicesSwitchesEnabledClass);

      servicesDescription.forEach(function (descriptionCard, j, servicesDescription) {
        if (i === j) {
          descriptionCard.classList.add(servicesDescriptionShownClass)
        }
      });
    });
  });
}

// MODALS

function escListener(elem) {
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        if (elem.classList.contains('modal-shown')) {
          elem.classList.remove('modal-shown');
        }
      }
    });
}

// modal map

if (modalMapLink) {

  modalMapLink.addEventListener('click', function (evt) {
    const modalMapClose = modalMap.querySelector('.map__close-button');
    evt.preventDefault();
    escListener(modalMap);
    modalMap.classList.add('modal-shown');

    modalMapClose.addEventListener('click', function () {
      modalMap.classList.remove('modal-shown');
    });

  });
}

// modal feedback

if (modalFeedbackButton) {
  modalFeedbackButton.addEventListener('click', function (evt) {

    const modalFeedbackClose = modalFeedback.querySelector('.feedback__close-button');
    const name = modalFeedback.querySelector('[name=name]')
    const message = modalFeedback.querySelector('[name=message]');
    const modalFeedbackForm = modalFeedback.querySelector('.feedback__form')
    const modalFeedbackInputs = modalFeedback.querySelectorAll('.feedback__input')
    const invalidError = 'feedback__invalid';

    evt.preventDefault();
    escListener(modalFeedback);
    modalFeedbackEmail.value = storageFeedbackEmail;
    modalFeedbackName.value = storageFeedbackName;

    modalFeedbackInputs.forEach (function (modalFeedbackInput) {
      modalFeedbackInput.removeAttribute('required')
    });

    console.log(storageFeedbackEmail);
    console.log(storageFeedbackName);

    modalFeedback.classList.add('modal-shown');

    if (!localStorage) {
      name.focus();
    } else {
      message.focus();
    }


    function formValidate() {
      let invalidCount = 0;

      modalFeedbackInputs.forEach (function (modalFeedbackInput) {
        if (!modalFeedbackInput.value) {
          modalFeedbackInput.classList.add(invalidError);
          setTimeout(function() {
            modalFeedbackInput.classList.remove(invalidError);
          }, 800);
          invalidCount++;
        }
      });

      if (invalidCount > 0) {
        return false;
      }

      return true;
    }

    modalFeedbackForm.onsubmit = function(evt) {
      localStorage.setItem('userName', modalFeedbackName.value);
      localStorage.setItem('userEmail', modalFeedbackEmail.value);

      if (!formValidate()) {
        evt.preventDefault();
      } else if (window.FormData) {
          evt.preventDefault();

          let data = new FormData(modalFeedbackForm);
          let xhr = new XMLHttpRequest();
          let url = modalFeedbackForm.getAttribute('action') + '?time=' + (new Date()).getTime();

          xhr.open('post', url);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              // server response: xhr.responseText
            }
          };
          xhr.send(data);



          modalFeedback.classList.remove('modal-shown');
          messageSentPopup.classList.add('modal-shown');
          setTimeout(function() {
            messageSentPopup.classList.remove('modal-shown');
          }, 1400);

          modalFeedbackInputs.forEach (function(modalFeedbackInput) {
            modalFeedbackInput.value = '';
          });
        }
    }

    modalFeedbackClose.addEventListener('click', function () {
      modalFeedback.classList.remove('modal-shown');
    });
  });
}
