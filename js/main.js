// Start Variables
const tbody = document.querySelector("#tbody");
const search = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
// var Pagination
let paginationUl = document.querySelector(".pagination-ul");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let current_page = 1;
let total_page;
let active_page = "";

// var api
const api = "http://localhost:3002/cubes";

// Start Loading Page

addEventListener("load", () => {
  getCubes();
});

// Start Fetch data from the server
async function getCubes(current_page) {
  try {
    const res = await fetch(api);
    const cubes = await res.json();
    total_page = cubes.length;
    console.log(cubes.length);

    displayCubes(cubes);
  } catch (err) {
    alert("Error =====>", err);
  }
}

// Start Function Display Data
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

// START SEARCH FUNCTION
searchBtn.addEventListener("click", searchCar);
async function searchCar() {
  const res = await fetch(api + `?car.number=${search.value}`);
  const data = await res.json();
  displayCubes(data);
}
// END SEARCH FUNCTION

// START DISPLAY SEARCH

// END DISPLAY SEARCH

//////////////////////////////////////;
/////////// START PAGINATION
/////////////////////////////////////;

function create_pages(current_page) {
  paginationUl.innerHTML = "";

  let before_page = current_page - 1;
  let after_page = current_page + 1;

  if (current_page == 2) {
    before_page = current_page - 1;
  }
  if (current_page == 1) {
    before_page = current_page;
  }

  if (current_page == total_page - 1) {
    after_page = current_page + 1;
  }
  if (current_page == total_page) {
    after_page = current_page;
  }

  for (let i = before_page; i <= after_page; i++) {
    if (current_page == i) {
      active_page = "active";
    } else {
      active_page = "";
    }
    paginationUl.innerHTML += `<li onclick="create_pages(${i})" class="page-item"><a class="page-link ${active_page}">${i}</a></li>`;
  }

  // Next and Previous Button Functionality.

  prev.onclick = function () {
    current_page--;
    create_pages(current_page);
  };
  if (current_page <= 1) {
    prev.disabled = true;
    prev.classList.add("disabled");
  } else {
    prev.disabled = false;
    prev.classList.remove("disabled");
  }

  next.onclick = function () {
    current_page++;
    create_pages(current_page);
  };
  if (current_page >= total_page) {
    next.disabled = true;
    next.classList.add("disabled");
  } else {
    next.disabled = false;
    next.classList.remove("disabled");
  }
}

create_pages(current_page);
/////////////////////////////////
//////////// END PAGINATION
/////////////////////////////////
