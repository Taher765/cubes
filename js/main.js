// Start Variables
const tbody = document.querySelector("#tbody");
const search = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");

// var api
const api = "http://localhost:3000/cubes";
const apiRender = "https://tset-19uo.onrender.com/cubes";

// Start Loading Page

addEventListener("load", () => {
  // getCubes(1);
});
//////////////////////////////////////;
/////////// START SPINAER LOADER
/////////////////////////////////////;
function spinerLoader(status) {
  document.querySelector(".overlay").classList.add(status);
}

//////////////////////////////////////;
/// START FETCH DATA FROM THE SERVER
/////////////////////////////////////;
async function getCubes(page, limit) {
  // Spiner Loader // Loading
  spinerLoader("load");
  try {
    const res = await fetch(`${api}?_page=${page}&_limit=${limit}`);
    const data = await res.json();
    const totalItems = res.headers.get("X-Total-Count"); // 41;
    displayCubes(data);
    lodaing = false;
    return totalItems;
  } catch (err) {
    console.log("Error Api =====>", err);
    lodaing = false;
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
  const limit = 20;

  $("#pagination").pagination({
    dataSource: new Array(+data), // تحديد مصدر البيانات
    pageSize: limit, // عدد العناصر في كل صفحة
    pageRange: 3, // عدد الروابط حول الصفحة الحالية
    showPageNumbers: true, // إظهار أرقام الصفحات
    showPrevious: true, // إظهار زر "السابق"
    showNext: true, // إظهار زر "التالي"
    callback: (data, pagination) => {
      console.log(pagination);

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
                        <td>${cube.cube}</td>
                        <td>${cube.eng}</td>
                        <td>${cube.date}</td>
                        <td>${cube.about}</td>
                        <td><a href="details.html?id=${cube.id}">المزيد</a></td>
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
      const res = await fetch(api + `?car.number=${search.value}`);
      const data = await res.json();
      displayCubes(data);
    }
  } catch (err) {
    console.log(err);
  }
}
