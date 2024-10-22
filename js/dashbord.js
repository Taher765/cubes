// VARIBALES CAR
const carNumber = document.getElementById("carNumber");
const carLetters = document.getElementById("carLetters");
const widthCar = document.getElementById("widthCar");
const lengthCar = document.getElementById("lengthCar");
const korekCar = document.getElementById("korekCar");
const heightCar = document.getElementById("heightCar");
// VARIABLES TRAILER
const trailerNumber = document.getElementById("trailerNumber");
const trailerLetters = document.getElementById("trailerLetters");
const heightTrailer = document.getElementById("heightTrailer");
const widthTrailer = document.getElementById("widthTrailer");
const lengthTrailer = document.getElementById("lengthTrailer");
const korekTrailer = document.getElementById("korekTrailer");
// DATA CUBES
const engCube = document.getElementById("engCube");
const cubeCar = document.getElementById("cubeCar");
const about = document.getElementById("about");
const submit = document.getElementById("submit");
const formFile = document.getElementById("formFile");
let imageUrl = "";
// var api
const api = "http://localhost:3002/cubes";

// Upload Image
formFile.addEventListener("change", uploadPhoto);
function uploadPhoto() {
  const file = formFile.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (event) {
    const preview = document.getElementById("preview");
    preview.innerHTML = `<img src="${event.target.result}"class="rounded-circle" alt="Preview" style="width: 50px;height: 50px;">`;
    imageUrl = event.target.result;
  };
}

// FUNCTION ADD CAR TO DATABASE
submit.addEventListener("click", addCar);

async function addCar(e) {
  e.preventDefault();
  const newCube = {
    id: Math.random().toString(16).slice(2),
    car: {
      number: carNumber.value,
      letters: carLetters.value,
      height: heightCar.value,
      width: widthCar.value,
      length: lengthCar.value,
    },
    trailer: {
      number: trailerNumber.value,
      letters: trailerLetters.value,
      height: heightTrailer.value,
      width: widthTrailer.value,
      length: lengthTrailer.value,
    },
    cube: +cubeCar.value || cubingCalculation(),
    date: moment().locale("ar_SA").format("LLLL"),
    image_url: imageUrl,
    eng: engCube.value,
    about: about.value || "لا يوجد",
  };

  if (validImage()) {
    try {
      await fetch(api, {
        method: "POST",
        body: JSON.stringify(newCube),
      });
    } catch (err) {
      console.log("ERORR ===> ", err);
    }
  }
}

// START Function Cubing Calculation
function cubingCalculation() {
  // / clac Car
  let calcCar =
    Number(widthCar.value) * Number(lengthCar.value) * Number(heightCar.value);
  // clac trailer
  let calcTrailer =
    Number(widthTrailer.value) *
    Number(lengthTrailer.value) *
    Number(heightTrailer.value);
  // Korec Car Checked
  if (korekCar.checked) {
    calcCar = calcCar - 0.5;
  }
  // Korec trailer Checked
  if (korekTrailer.checked) {
    calcTrailer = calcTrailer - 0.5;
  }
  let total = calcCar + calcTrailer;
  return total;
}

const korek = document.querySelectorAll(".korek");

korek.forEach((box) => {
  box.addEventListener("change", (korekCheck) => {
    if (korekCheck.checked) {
      cubingCalculation();
    }
    if (korekCheck.checked) {
      cubingCalculation();
    }
    if (cubingCalculation() > 0) {
      cubeCar.value = cubingCalculation();
    }
  });
});

// END Function Cubing Calculation

// STRAT VALIDATION
// Car Number
carNumber.addEventListener("keyup", () => validCarNumber(carNumber));

// Trailer Number
trailerNumber.addEventListener("keyup", () => validCarNumber(trailerNumber));

function validCarNumber(inputCheck) {
  const regxCarNumber = /^\d{4}$/;

  if (regxCarNumber.test(inputCheck.value)) {
    inputCheck.classList.add("is-valid");
    inputCheck.classList.remove("is-invalid");
    return true;
  } else {
    inputCheck.classList.remove("is-valid");
    inputCheck.classList.add("is-invalid");
    return false;
  }
}

// Function Valid Letters Car & trailer
carLetters.addEventListener("keyup", () => validCarLetters(carLetters));
trailerLetters.addEventListener("keyup", () => validCarLetters(trailerLetters));
function validCarLetters(inputCheck) {
  const regxCarLetter = /^[\u0621-\u064A] [\u0621-\u064A] [\u0621-\u064A]$/;
  if (regxCarLetter.test(inputCheck.value)) {
    inputCheck.classList.add("is-valid");
    inputCheck.classList.remove("is-invalid");
    return true;
  } else {
    inputCheck.classList.remove("is-valid");
    inputCheck.classList.add("is-invalid");
    return false;
  }
}

// Function Valid Calc car
const inputsCalc = document.querySelectorAll(".input-calc");
inputsCalc.forEach((input) => {
  input.addEventListener("keyup", (inputTarget) => {
    calcCar(inputTarget.target);
  });
});

function calcCar(input) {
  if (cubingCalculation() > 0) {
    cubeCar.value = cubingCalculation();
  }
  const clacCarNumber = /^\d{1,2}(\.\d+)?$/;
  if (clacCarNumber.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}

// Function valid cubeCar
cubeCar.addEventListener("keyup", validCubeCar);
function validCubeCar() {
  const regxCubeCar = /^\d+$/;
  if (regxCubeCar.test(cubeCar.value)) {
    cubeCar.classList.add("is-valid");
    cubeCar.classList.remove("is-invalid");
    return true;
  } else {
    cubeCar.classList.remove("is-valid");
    cubeCar.classList.add("is-invalid");
    return false;
  }
}

// function valid Eng Cube

engCube.addEventListener("keyup", engCubeValid);
function engCubeValid() {
  const regxEngCube = /^[\u0621-\u064A\u0660-\u0669\s]+$/;
  if (regxEngCube.test(engCube.value)) {
    engCube.classList.add("is-valid");
    engCube.classList.remove("is-invalid");
    return true;
  } else {
    engCube.classList.remove("is-valid");
    engCube.classList.add("is-invalid");
    return false;
  }
}

// function valid image

function validImage() {
  if (formFile.files.length === 0) {
    // formFile.classList.remove("is-valid");
    // formFile.classList.add("is-invalid");
    alert("من فصلك اختار صوره");
    return false;
  } else {
    // formFile.classList.add("is-valid");
    // formFile.classList.remove("is-invalid");
    return true;
  }
}

// END VALIDTION
