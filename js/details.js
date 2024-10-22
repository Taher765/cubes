const details = document.querySelector(".details");

const searchParams = new URLSearchParams(window.location.search);

let _id = searchParams.get("id");

async function getSingleCar() {
  const res = await fetch(`http://localhost:3002/cubes/${_id}`);
  const data = await res.json();
  displaySingleCar(data);
}

function displaySingleCar(car) {
  console.log(car);

  let image = null;
  if (car.image_url) {
    image = car.image_url;
  } else {
    image = "";
  }
  details.innerHTML = `<div class="card mb-3">
            <div class="image-card">
              <img
                src="${image}"
                class="card-img-top"
                alt="image hare"
              />
            </div>
            <div class="card-body">
              <div class="card-details row">
                <div class="col-md-6">
                  <h5 class="card-title">بيانات السياره</h5>

                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      رقم السياره : <span>${car.car.number}</span>
                    </li>
                    <li class="list-group-item">
                      حروف السياره : <span>${car.car.letters}</span>
                    </li>
                    <li class="list-group-item">طول الوش : <span>${
                      car.car.length ? car.car.length : "لا يوجد"
                    }م</span></li>
                    <li class="list-group-item">عرض الوش : <span>${
                      car.car.width ? car.car.width : "لا يوجد"
                    }م</span></li>
                    <li class="list-group-item">
                      ارتفاع الوش : <span>${
                        car.car.height ? car.car.height : "لا يوجد"
                      } </span>
                    </li>
                    <li class="list-group-item">
                      كوريك : <span>${
                        car.car.korek ? "يوجد كوريك" : "لا يوجد كوريك"
                      } </span>
                    </li>

                    <li class="list-group-item">
                      تكعيب الوش : <span>${
                        car.car.cube ? car.car.cube : "لا يوجد"
                      }</span>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6">
                  <h5 class="card-title">بيانات المقطوره</h5>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      رقم المقطوره : <span>${car.trailer.number}</span>
                    </li>
                    <li class="list-group-item">
                      حروف المقطوره : <span>${car.trailer.letters}</span>
                    </li>
                    <li class="list-group-item">
                      طول المقطوره : <span>${
                        car.trailer.length ? car.trailer.length : "لا يوجد"
                      }</span>
                    </li>
                    <li class="list-group-item">
                      عرض المقطوره : <span>${
                        car.trailer.width ? car.trailer.width : "لا يوجد"
                      }</span>
                    </li>
                    <li class="list-group-item">
                      ارتفاع المقطوره : <span>${
                        car.trailer.height ? car.trailer.height : "لا يوجد"
                      }</span>
                    </li>
                    <li class="list-group-item">
                      كوريك : <span>${
                        car.trailer.korek ? "يوجد كوريك" : "لا يوجد كوريك"
                      } </span>
                    </li>
                    <li class="list-group-item">
                      تكعيب المقطوره : <span>${
                        car.trailer.cube ? car.trailer.cube : "لا يوجد"
                      }</span>
                    </li>
                  </ul>
                </div>
                <h5 class="card-title mt-3">تفاصيل</h5>

                <p class="card-text border mt-3 p-2 rounded">
                  القائم بالتكعيب : <span>${car.eng}</span>
                </p>
                <p class="card-text border p-2 rounded">
                  التكعيب الاجمالي : <span>${car.cube} </span>
                </p>
                <p class="card-text border p-2 rounded">
                  تاريخ التكعيب : <span>${car.date}</span>
                </p>
                <p class="card-text border p-2 rounded">
                  ملحوظــــة : <span>${car.about}</span>
                </p>
                <p class="card-text border p-2 rounded">
                  القائم بأدخال البيانات : <span>${
                    car.user ? car.user : "لسه معملتهاش"
                  }</span>
                </p>
              </div>
            </div>
          </div>`;
}

document.addEventListener("load", getSingleCar());
