const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

//traemos clientes del localstorage

const clients = JSON.parse(localStorage.getItem("clients")) || [];

// guardamos los clientes en el localstorage
const saveToLocalStorage = () => {
    localStorage.setItem("clients", JSON.stringify(clients));
  };
  

//creamos una funcion para chequear si el campo esta vacio

const isEmptyInput = (input) => {
    return !input.value.trim().length;
  };

  
//funcion para el value del input max y min
const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max;
};

//funcion para validar el email
const isEmailValid = (input) => {
  const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;
  return re.test(input.value.trim());
};

//funcion para verificar que no haya un email repetido
const isExistingEmail = (input) => {
  return clients.some((client) => client.email === input.value.trim());
};

//funcion para determinar si el valor ingresado es un telefono valido
const isPhoneValid = (input) => {
  const re = /^[0-9]{10}$/;
  //testeamos
  return re.test(input.value.trim());
};

//funcion para mostrar el error al validar el input
const showInputError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.style.display = "block";
  error.textContent = message;
};

//funcion para mortrar el succes al validar el input
const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  const error = formField.querySelector("small");
  error.textContent = "";
};

//funcion para validar input de text
const checkTextInput = (input) => {

  let valid = false;
  const minCharacters = 3;
  const maxCharacters = 25;

  if (isEmptyInput(input)) {
    showInputError(input, "Completar este campo es obligatorio");
    return;
  }
  if (!isBetween(input, minCharacters, maxCharacters)) {
    showInputError(
      input,
      `Este Campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`
    );
    return;
  }
//si cumple todos los requisitos pasamos a mostrar la funcion del succes
  showSuccess(input);
  valid = true;
  return valid;
};


//funcion para validar el email
const checkEmail = (input) => {

  let valid = false;
  if (isEmptyInput(input)) {
    showInputError(input, "El email es obligatorio");
    return;
  }
  if (!isEmailValid(input)) {
    showInputError(input, "El email no es válido");
    return;
  }
  if (isExistingEmail(input)) {
    showInputError(input, "El email ya se encuentra registrado");
    return;
  }
//si cumple todos los requisitos pasamos a mostrar la funcion del succes
  showSuccess(input);
  valid = true;
  return valid;
};

//funcion para validar el telefono

const checkPhone = (input) => {

  let valid = false;
  if (isEmptyInput(input)) {
    showInputError(input, "Este campo es obligatorio");
    return;
  }
  if (!isPhoneValid(input)) {
    showInputError(input, "El teléfono no es válido");
    return;
  }
//si cumple todos los requisitos pasamos a mostrar la funcion del succes
  showSuccess(input);
  valid = true;
  return valid;
};

//con esta funcion validamos el form y lo almacenamos en el array de clients
const validateForm = (e) => {
  e.preventDefault();


  let isNameValid = checkTextInput(nameInput);
  let isLastNameValid = checkTextInput(lastNameInput);
  let isEmailValid = checkEmail(emailInput);
  let isPhoneValid = checkPhone(phoneInput);

  let isValidForm = 
  isNameValid &&
  isLastNameValid &&
  isEmailValid &&
  isPhoneValid;

  if (isValidForm) {
    clients.push({
      name: nameInput.value, 
      lastName: lastNameInput.value, 
      email: emailInput.value, 
      phone: phoneInput.value
    });
    saveToLocalStorage(clients);
    alert ("Tus datos fueron recibidos con exito");
    window.location.href = "index.html";
  }
};

//damos la funcion de inicio
const initForm = () => {
  contactForm.addEventListener("submit", validateForm);
  nameInput.addEventListener("input", () => checkTextInput(nameInput));
  lastNameInput.addEventListener("input", () => checkTextInput(lastNameInput));
  emailInput.addEventListener("input", () => checkEmail(emailInput));
  phoneInput.addEventListener("input", () => checkPhone(phoneInput));
};

initForm();