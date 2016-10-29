'use strict';

var body = document.getElementsByTagName('body');

var modal = document.getElementById('modal');
var modal_close = document.getElementById('modal-close');
var modal_wrapper = document.getElementById('modal-wrapper');
var modal_inner = document.getElementById('modal-inner');

var consultationForm = document.getElementById('form-consultation');

var consultation_name = document.getElementById('consultation_name');
var consultation_phone = document.getElementById('consultation_phone');

var consultation_name_var;
var consultation_phone_var;

var modal_name = document.getElementById('modal_name');
var modal_phone = document.getElementById('modal_phone');

var modal_name_var;
var modal_phone_var;

var inputError = 'inset 0 0 0 1px red';

var thank_you_consultation = document.getElementById('thank-you-consultation');
var thank_you_modal = document.getElementById('thank-you-modal');

consultation_name.addEventListener('click', function (e) {
  consultation_name.style.boxShadow = 'none';
});
consultation_name.addEventListener('change', function (e) {
  consultation_name.style.boxShadow = 'none';
  consultation_name_var = consultation_name.value;
  console.log(consultation_name_var);
});
consultation_phone.addEventListener('click', function (e) {
  consultation_phone.style.boxShadow = 'none';
});
consultation_phone.addEventListener('change', function (e) {
  consultation_phone_var = consultation_phone.value;
  console.log(consultation_phone_var);
});

modal_name.addEventListener('click', function (e) {
  modal_name.style.boxShadow = 'none';
});
modal_name.addEventListener('change', function (e) {
  modal_name.style.boxShadow = 'none';
  modal_name_var = modal_name.value;
  console.log(modal_name_var);
});
modal_phone.addEventListener('click', function (e) {
  modal_phone.style.boxShadow = 'none';
});
modal_phone.addEventListener('change', function (e) {
  modal_phone_var = modal_phone.value;
  console.log(modal_phone_var);
});

var buttonSend = document.getElementById('submit');

// Send data
var requestConsultation = new XMLHttpRequest();
requestConsultation.open('POST', './send.php', true);
requestConsultation.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

buttonSend.addEventListener('click', function (e) {
  if (consultation_name.value != '' && consultation_phone.value != '') {
    // requestConsultation.send('name=' + consultation_name_var + '&phone=' + consultation_phone_var + '&category=' + this.getAttribute('data-name'));

    consultationForm.style.display = 'none';
    thank_you_consultation.style.display = 'block';

    var timer = setTimeout(function () {
      consultationForm.style.display = 'block';
      thank_you_consultation.style.display = 'none';
      // clearTimeout(timer);
    }, 2000);
  } else if (consultation_name.value == '' && consultation_phone.value != '') {
    consultation_name.style.boxShadow = inputError;
  } else if (consultation_name.value != '' && consultation_phone.value == '') {
    consultation_phone.style.boxShadow = inputError;
  } else {
    consultation_name.style.boxShadow = inputError;
    consultation_phone.style.boxShadow = inputError;
  }
});

var submit = document.getElementsByClassName('submit');
var modalSend = document.getElementById('modal_submit');
var dataServices;

for (var i = 0; i < submit.length; i++) {
  submit[i].addEventListener('click', function (e) {
    modal.style.opacity = '1';
    modal.style.zIndex = '9999';
    modal_wrapper.style.opacity = '1';

    dataServices = this.getAttribute('data-service');
  });
}

modalSend.addEventListener('click', function (e) {
  if (modal_name.value != '' && modal_phone.value != '') {
    requestConsultation.send('name=' + modal_name_var + '&phone=' + modal_phone_var + '&category=' + this.getAttribute('data-name') + '&service=' + dataServices);
    // consultationForm.innerHTML = "<h2>Спасибо! Ваша заявка принята</h2>";
    // modal_wrapper.innerHTML = "<h2>Спасибо! Ваша заявка принята</h2>";

    modal_inner.style.display = 'none';
    thank_you_modal.style.display = 'block';

    var timer = setTimeout(function () {
      modal_inner.style.display = 'flex';
      thank_you_modal.style.display = 'none';
    }, 4500);

    setInterval(function () {
      modal.style.opacity = '0';
      modal.style.zIndex = '-1000';
      modal_wrapper.style.opacity = '0';
    }, 4000);
  } else if (modal_name.value == '' && modal_phone.value != '') {
    modal_name.style.boxShadow = inputError;
  } else if (modal_name.value != '' && modal_phone.value == '') {
    modal_phone.style.boxShadow = inputError;
  } else {
    modal_name.style.boxShadow = inputError;
    modal_phone.style.boxShadow = inputError;
  }
});

modal_close.addEventListener('click', function (e) {
  modal.style.opacity = '0';
  modal.style.zIndex = '-1000';
  modal_wrapper.style.opacity = '0';
});

function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  var regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}