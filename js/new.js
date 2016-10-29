'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getSelector = function getSelector(selector) {
  return document.getElementById(selector);
};

var INPUT_ERROR = '1px solid red';

var modal = getSelector('modal');
var modalClose = getSelector('modal-close');
var modalWrapper = getSelector('modal-wrapper');
var modalInner = getSelector('modal-inner');

var consultationForm = document.getElementById('form-consultation');
var prototypeForm = document.getElementById('send-prototype');

var thankYouConsultation = document.getElementById('thank-you-consultation');
var thankYouPrototype = document.getElementById('thank-you-prototype');
var thankYouModal = document.getElementById('thank-you-modal');

var xhr = new XMLHttpRequest();

var date = document.getElementById('pasteDate');
var today = new Date().getDay();

if (today == 6 || today == 0) {
  date.innerHTML = 'Заполните форму и мы свяжемся<br>с вами в понедельник';
} else {
  date.innerHTML = 'Заполните форму и мы свяжемся<br>с Вами в течение 24 часов';
}

var Input = function Input(selector) {
  _classCallCheck(this, Input);

  var result = '';
  this.element = document.getElementById(selector);
  this.element.addEventListener('keyup', function () {
    result = this.value;
    this.style.border = '1px solid white';
    // console.log(this.value);
    return result;
  });

  this.val = result;
};

var inputs = {
  prototype: {
    name: 'prototype_name',
    phone: 'prototype_phone'
  },
  consultation: {
    name: 'consultation_name',
    phone: 'consultation_phone'
  },
  modal: {
    name: 'modal_name',
    phone: 'modal_phone'
  }
};

var inputModalName = new Input(inputs.modal.name);
var inputModalPhone = new Input(inputs.modal.phone);

var inputPrototypeName = new Input(inputs.prototype.name);
var inputPrototypePhone = new Input(inputs.prototype.phone);

var inputConsultationName = new Input(inputs.consultation.name);
var inputConsultationPhone = new Input(inputs.consultation.phone);

var Button = function Button(selector) {
  var _this = this;

  _classCallCheck(this, Button);

  var element = document.getElementById(selector);
  this.element = element;
  this.section = element.getAttribute('data-section');
  this.name = element.getAttribute('data-name');
  element.addEventListener('click', function (event) {
    modal.style.opacity = '1';
    modal.style.zIndex = '9999';
    modalWrapper.style.opacity = '1';
    modal.setAttribute('data-service', _this.name);
  });

  // return modalInfo;
};

modalClose.addEventListener('click', function () {
  modal.style.opacity = '0';
  modal.style.zIndex = '-1000';
  modalWrapper.style.opacity = '0';
});

var Submit = function () {
  function Submit(selector, input1, input2) {
    var _this2 = this;

    _classCallCheck(this, Submit);

    var element = document.getElementById(selector);
    this.input1 = input1;
    this.input2 = input2;
    this.element = element;
    this.section = element.getAttribute('data-section');
    this.name = element.getAttribute('data-name');
    element.addEventListener('click', function (event) {
      if (input1.value == '' || input2.value == '') {
        if (input1.value == '') {
          input1.style.border = INPUT_ERROR;
        }

        if (input2.value == '') {
          input2.style.border = INPUT_ERROR;
        }
      } else {
        xhr.open('POST', './send.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.send('&name=' + input1.value + '&phone=' + input2.value + '&category=' + _this2.section + '&service=' + modal.getAttribute('data-service'));
        input1.value = '';
        input2.value = '';

        if (element.parentNode.parentNode.id == 'form-consultation') {
          consultationForm.style.display = 'none';
          thankYouConsultation.style.display = 'block';
          var timer = setTimeout(function () {
            consultationForm.style.display = 'block';
            thankYouConsultation.style.display = 'none';
          }, 4500);
        }

        if (element.parentNode.parentNode.className == 'prototype-wrapper-right-inner') {
          prototypeForm.style.display = 'none';
          thankYouPrototype.style.display = 'block';
          var _timer = setTimeout(function () {
            prototypeForm.style.display = 'flex';
            thankYouPrototype.style.display = 'none';
          }, 4500);
        }

        if (element.parentNode.parentNode.id == 'modal-wrapper') {
          modalInner.style.display = 'none';
          thankYouModal.style.display = 'block';
          var _timer2 = setTimeout(function () {
            modal.style.opacity = '0';
            modal.style.zIndex = '-1000';
            modalWrapper.style.opacity = '0';
            var timerClose = setTimeout(function () {
              modalInner.style.display = 'flex';
              thankYouModal.style.display = 'none';
            }, 500);
          }, 4500);
        }
      }
    });
  }

  _createClass(Submit, [{
    key: 'setName',
    value: function setName() {
      this.element.addEventListener('click', function () {
        modal.setAttribute('data-service', this.dataset.name);
      });
    }
  }]);

  return Submit;
}();

var buttonWelcome = new Button('button-welcome');
var buttonServiceCorporate = new Button('button-service-corporate');
var buttonServiceShop = new Button('button-service-shop');
var buttonServiceLanding = new Button('button-service-landing');
var buttonServiceCatalog = new Button('button-service-catalog');

var modalSubmit = new Submit('modal_submit', inputModalName.element, inputModalPhone.element);
modalSubmit.setName();
var prototypeSubmit = new Submit('prototype_submit', inputPrototypeName.element, inputPrototypePhone.element);
var consultationSubmit = new Submit('consultation_submit', inputConsultationName.element, inputConsultationPhone.element);

var FaqItem = function () {
  function FaqItem(id) {
    _classCallCheck(this, FaqItem);

    this.id = document.querySelector(id);
    this.faqHeader = this.id.querySelector('.faq-item-question-header').innerHTML;
    this.question = this.id.querySelector('.faq-item-question');
  }

  _createClass(FaqItem, [{
    key: 'info',
    value: function info() {
      console.log(this);
    }
  }, {
    key: 'spoiler',
    value: function spoiler() {
      var toogleStatus = false;
      this.question.addEventListener('click', function () {
        if (!toogleStatus) {
          toogleStatus = true;
          this.parentNode.querySelector('.faq-item-answer').style.display = 'block';
          this.parentNode.querySelector('.faq-item-question-arrow').querySelector('img').style.transform = 'rotate(180deg)';
        } else {
          toogleStatus = false;
          this.parentNode.querySelector('.faq-item-answer').style.display = 'none';
          this.parentNode.querySelector('.faq-item-question-arrow').querySelector('img').style.transform = 'rotate(0deg)';
        }
      });
    }
  }]);

  return FaqItem;
}();

var faq1 = new FaqItem('#faq-item-1');
var faq2 = new FaqItem('#faq-item-2');
var faq3 = new FaqItem('#faq-item-3');
var faq4 = new FaqItem('#faq-item-4');
var faq5 = new FaqItem('#faq-item-5');
var faq6 = new FaqItem('#faq-item-6');

faq1.spoiler();
faq2.spoiler();
faq3.spoiler();
faq4.spoiler();
faq5.spoiler();
faq6.spoiler();

var validate = function validate(e) {
  var evt = e || window.event;
  var key = evt.keyCode || evt.which;
  key = String.fromCharCode(key);
  var regexp = /[0-9\+]/;
  if (!regexp.test(key)) {
    evt.returnValue = false;
    if (evt.preventDefault) {
      evt.preventDefault();
    }
  }
};