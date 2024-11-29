// Start Variables
const tbody = document.querySelector("#tbody");
const search = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");

// var api
// const apiRender = "http://localhost:3000/cubes";
const apiRender = "https://tset-19uo.onrender.com/cubes";

// Start Loading Page

addEventListener("load", () => {
  // getCubes(1);
});
//////////////////////////////////////;
/////////// START SPINAER LOADER
/////////////////////////////////////;
function spinerLoader(status) {
  document.querySelector(".overlay").classList.remove(status);
  document.querySelector(".overlay").classList.add(status);
  console.log(status);
}

//////////////////////////////////////;
/// START FETCH DATA FROM THE SERVER
/////////////////////////////////////;
async function getCubes(page, limit) {
  // Spiner Loader // Loading
  spinerLoader("load");
  try {
    const res = await fetch(`${apiRender}?_page=${page}&_limit=${limit}`);
    const data = await res.json();
    const totalItems = res.headers.get("X-Total-Count"); // 41;
    displayCubes(data);
    // lodaing = false;
    return totalItems;
  } catch (err) {
    console.log("Error Api =====>", err);
    // lodaing = false;
  } finally {
    // Spiner Loader // Loading
    spinerLoader("hidden");
  }
}

//////////////////////////////////////;
/////////// START PAGINATION
/////////////////////////////////////;

dataPagination();
async function dataPagination() {
  const data = await getCubes();
  const limit = 15;

  $("#pagination").pagination({
    dataSource: new Array(+data), // تحديد مصدر البيانات
    pageSize: limit, // عدد العناصر في كل صفحة
    pageRange: 3, // عدد الروابط حول الصفحة الحالية
    showPageNumbers: true, // إظهار أرقام الصفحات
    showPrevious: true, // إظهار زر "السابق"
    showNext: true, // إظهار زر "التالي"
    callback: (data, pagination) => {
      // تحديث المحتوى بناءً على الصفحة الحالية
      getCubes(pagination.pageNumber, limit);
    },
  });
}

//////////////////////////////////////;
/////////// START Display DATA
/////////////////////////////////////;
function displayCubes(cubes) {
  let content = "";
  cubes.forEach((cube, index) => {
    content += `
                    <tr>
                        <th>${index + 1}</th>
                        <td>${cube.car.number}</td>
                        <td>${cube.car.letters}</td>
                        <td>${cube.trailer.number}</td>
                        <td>${cube.trailer.letters}</td>
                        <td>${cube.cube.toFixed(2)}</td>
                        <td>${cube.eng.split(" ")[0]}</td>
                        <td class="d-flex justify-content-center align-items-center gap-2" >
                          <a class="btn btn-sm btn-warning" href="details.html?id=${
                            cube.id
                          }"><i class="text-light fa-solid fa-circle-info"></i></a>
                          <button id="deleteCar" data-car="${
                            cube.id
                          }" class="btn btn-sm btn-danger position-relative ${
      true && "disabled "
    }"><i class="fa-solid fa-trash-can"></i></button>

                          <a href="dashbord.html?id=${
                            cube.id
                          }" id="updateCar"  class="btn btn-sm btn-success position-relative ${
      true && "disabled "
    }"><i class="fa-regular fa-pen-to-square"></i></a>
                        </td>
                    </tr>
                `;
  });
  tbody.innerHTML = content;
}

//////////////////////////////////////;
/////////// START SEARCH FUNCTION
/////////////////////////////////////;
searchBtn.addEventListener("click", searchCar);
async function searchCar() {
  try {
    if (search.value == "") {
      getCubes();
    } else {
      const res = await fetch(apiRender + `?car.number=${search.value}`);
      const data = await res.json();
      displayCubes(data);
    }
  } catch (err) {
    console.log(err);
  }
}

/////////////////////////////////
//////////DELETE CAR
/////////////////////////////////
document.addEventListener("click", (e) => {
  if (e.target.id == "deleteCar") {
    deletedCar(e.target);
  }
});

async function deletedCar(info) {
  const id = info.getAttribute("data-car");
  try {
    info.parentElement.parentElement.remove();
    const res = await fetch(`${apiRender}/${id}`, {
      method: "DELETE",
    });
    getCubes();
  } catch (err) {
    console.log(err);
  }
}
/////////////////////////////////
///////////// Edit CAR
/////////////////////////////////

// document.addEventListener("click", (e) => {
//   if (e.target.id == "updateCar") {
//     editCar(e.target);
//   }
// });

// async function editCar(info) {
//   const id = info.getAttribute("data-car");
//   try {
//     const res = await fetch(`${apiRender}/${id}`, {
//       method: "PUT",
//     });
//     getCubes();
//   } catch (err) {
//     console.log(err);
//   }
// }
