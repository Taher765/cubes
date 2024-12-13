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
const formSelect = document.getElementById("form-select");
const engCube = document.getElementById("engCube");
const cubeCar = document.getElementById("cubeCar");
const about = document.getElementById("about");
const submit = document.getElementById("submit");
const formFile = document.getElementById("formFile");
const preview = document.getElementById("preview");
// GET SINGEL CAR
const searchParams = new URLSearchParams(window.location.search);
let _id = searchParams.get("id");

// vaarrs
let create = true;
let imageUrl = "";
let calcCarCube = null;
let calcTrailer = null;

// var api
const apiRender = "http://localhost:3000/cubes";
// const apiRender = "https://tset-19uo.onrender.com/cubes";

//////////////////////////////////////;
///////////// Upload Image
/////////////////////////////////////;
formFile.addEventListener("change", uploadPhoto);
function uploadPhoto() {
  const file = formFile.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (event) {
    preview.innerHTML = `<img src="${event.target.result}"class="rounded-circle" alt="Preview" style="width: 50px;height: 50px;">`;
    imageUrl = event.target.result;
  };
}

//////////////////////////////////////;
///////////// ADD CAR TO DATABASE
/////////////////////////////////////;
submit.addEventListener("click", (e) => {
  if (create) {
    addCar(e);
  } else {
    editCar(e);
  }
});

async function addCar(e) {
  e.preventDefault();
  console.log(formSelect.value);

  const newCube = {
    id: Math.random().toString(16).slice(2),
    car: {
      number: carNumber.value,
      letters: carLetters.value,
      height: heightCar.value,
      width: widthCar.value,
      length: lengthCar.value,
      korek: korekCar.checked ? true : false,
      cubes: 0,
    },
    trailer: {
      number: trailerNumber.value,
      letters: trailerLetters.value,
      height: heightTrailer.value,
      width: widthTrailer.value,
      length: lengthTrailer.value,
      korek: korekTrailer.checked ? true : false,
      cubes: 0,
    },
    cube: +cubeCar.value || cubingCalculation(),
    date: moment().locale("ar_SA").format("LLLL"),
    image_url: imageUrl,
    eng: engCube.value,
    position: formSelect.value,
    about: about.value || "لا يوجد",
  };

  if (true) {
    try {
      await fetch(apiRender, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCube),
      });

      window.location = "index.html";
    } catch (err) {
      console.log("ERORR ===> ", err);
    }
  }
}

//////////////////////////////////////;
///////////// Cubing Calculation
/////////////////////////////////////;
function cubingCalculation() {
  // / clac Car
  calcCarCube =
    Number(widthCar.value) * Number(lengthCar.value) * Number(heightCar.value);
  // clac trailer
  calcTrailer =
    Number(widthTrailer.value) *
    Number(lengthTrailer.value) *
    Number(heightTrailer.value);
  // Korec Car Checked
  if (korekCar.checked) {
    calcCarCube = calcCarCube - 0.5;
  }
  // Korec trailer Checked
  if (korekTrailer.checked) {
    calcTrailer = calcTrailer - 0.5;
  }
  let total = calcCarCube + calcTrailer;
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

//////////////////////////////////////;
///////////// STRAT VALIDATION
/////////////////////////////////////;
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

/////////////////////////////////
//////////// Edit Car
////////////////////////////////

// Get Single Car

if (_id != null) {
  gitSingleCar(_id);
}

async function gitSingleCar(_id) {
  try {
    const res = await fetch(`${apiRender}/${_id}`);
    const data = await res.json();
    displayDataInForm(data);
  } catch (err) {
    console.log("err =>", err);
  }
}

// Dispaly Data in Form

function displayDataInForm(car) {
  create = false;
  submit.innerHTML = "تعديل التكعيب";
  // Car
  carNumber.value = car.car.number;
  carLetters.value = car.car.letters;
  heightCar.value = car.car.height;
  widthCar.value = car.car.width;
  lengthCar.value = car.car.length;
  korekCar.checked = car.car.korek;
  // trailer
  trailerNumber.value = car.trailer.number;
  trailerLetters.value = car.trailer.letters;
  heightTrailer.value = car.trailer.height;
  widthTrailer.value = car.trailer.width;
  lengthTrailer.value = car.trailer.length;
  korekTrailer.checked = car.trailer.korek;

  // global
  formSelect.value = car.position;
  engCube.value = car.eng;
  cubeCar.value = car.cube;
  about.value = car.about;
  preview.innerHTML =
    car.image_url &&
    `<img src="${car.image_url}" class="rounded-circle" alt="Preview" style="width: 50px;height: 50px;">`;
}

//////////////////////////////////
/////////// Edit Car
//////////////////////////////////
async function editCar(e) {
  e.preventDefault();
  const newCube = {
    car: {
      number: carNumber.value,
      letters: carLetters.value,
      height: heightCar.value,
      width: widthCar.value,
      length: lengthCar.value,
      korek: korekCar.checked ? true : false,
      cubes: 0,
    },
    trailer: {
      number: trailerNumber.value,
      letters: trailerLetters.value,
      height: heightTrailer.value,
      width: widthTrailer.value,
      length: lengthTrailer.value,
      korek: korekTrailer.checked ? true : false,
      cubes: 0,
    },
    cube: +cubeCar.value || cubingCalculation(),
    createdAt: moment().locale("ar_SA").format("LLLL"),
    image_url: imageUrl,
    eng: engCube.value,
    position: formSelect.value,
    about: about.value || "لا يوجد",
  };

  // validation empty inputs
  if (true) {
    try {
      const res = await fetch(`${apiRender}/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCube),
      });

      const data = await res.json();
      console.log(data);

      window.location = "index.html";
    } catch (err) {
      console.log("ERORR ===> ", err);
    }
  }
  create = true;
}
