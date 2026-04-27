//! Old Code

// let inputName = document.querySelector("[name='inputName']");
// let des = document.querySelector("[name='des']");
// let add = document.querySelector("[type='submit']");
// let Type = document.querySelector("select");
// let output = document.getElementsByClassName("tasklist")[0];

// add.addEventListener("click", function (e) {
//   e.preventDefault();
//   let li = document.createElement("li");
//   let delBtn = document.createElement("button");
//   let check = document.createElement("input");
//   let paraDes = document.createElement("p");
//   if (inputName.value !== "" && des.value !== "") {
//     output.appendChild(li);
//     li.textContent = inputName.value;
//     paraDes.textContent = des.value;
//     li.setAttribute("data-type", Type.value);
//     li.appendChild(paraDes);
//     li.appendChild(delBtn);
//     li.appendChild(check);
//     delBtn.textContent = "Delete";
//     delBtn.className = "delete-btn";
//     check.type = "checkbox";
//     delBtn.addEventListener("click", function () {
//       li.remove();
//     });
//     check.addEventListener("change", function () {
//       if (check.checked) {
//         li.style.textDecoration = "line-through";
//       } else {
//         li.style.textDecoration = "none";
//       }
//     });
//   }

//   inputName.value = "";
//   des.value = "";
// });

//! New Clean Code

//? اول حاجه هنا انا نديت كل لعناصر بتاعتي
let inputName = document.querySelector("[name='inputName']");

let des = document.querySelector("[name='des']");
let add = document.querySelector("[type='submit']");
let delAll = document.querySelector(".del-all");
let Type = document.querySelector("[name='type']");
let output = document.getElementsByClassName("tasklist")[0];
let fontSelcet = document.querySelector("#fontselect");
changeFont();
// localStorage.clear();

//? هنا انا عملت arry عشان اقدر اتحكم في كل العناصر بتاعتي
let arr = [];

//? هنا انا عملت شرط عشان يمحصلش مشكله ان لو انا عندي بينات جوه local بالاسم دخ
if (localStorage.getItem("tasks")) {
  arr = JSON.parse(localStorage.getItem("tasks")); //? هات البنات بتاعتي
}
gettolocllstorage(); //?  هنا اناش بشتغل الفاشنكن بتاعتي
toggleDeleteAll();
removeAllTask();

//? هنا انا امله شرط انت اليوزر لو هو كاتب كلام جوه input اشغتغل هنا
add.addEventListener("click", function () {
  if (inputName.value !== "" && des.value !== "") {
    addTaskInArray(inputName.value, des.value, Type.value); //? ضيف ليا العناصر جوه array
    inputName.value = "";
    des.value = "";
    popup();
  }
});
function toggleDeleteAll() {
  if (arr.length > 1) {
    delAll.style.display = "block";
  } else {
    delAll.style.display = "none";
  }
}

//? هنا انا علمت فانكشن بتضيق العناصر بتاعتي لل array
//Add To Tasks
function addTaskInArray(title, description, type) {
  //? عملت ليا تلاته para عشان الي انا بتستقبلو من اليوز  الاسم ولوصف ولنوع
  const task = {
    id: Date.now(), //? هنا انا استعملت الداله لي بتجيب ليا التاريخ بطريقه عشوائيه عشان اعمل id مميز
    title: title,
    description: description,
    type: type,
  };
  arr.push(task); //? هنا انا قولتله ضيف ليا tasks بتاعتي دي لل array
  setToLocalStorage(); //? أنا بنده function مسئولة عن حفظ البيانات في localStorage بعد ما أعدل على الـ array، عشان تضمن إن أي تحديث يتخزن مباشرة.
  addElementInBody(task); //? هنا انا بنده علي الفانشك المسؤله عن اضافه العناصر بتاعهتي جوه الصفحه
  toggleDeleteAll();
}

function addElementInBody(task) {
  let li = document.createElement("li");
  let paraDes = document.createElement("p");
  let delBtn = document.createElement("button");

  li.textContent = task.title;
  li.setAttribute("data-type", task.type);
  li.setAttribute("data-id", task.id);

  paraDes.textContent = task.description;

  delBtn.textContent = "Delete";
  delBtn.className = "delete-btn";

  delBtn.addEventListener("click", () => {
    //? هنا الحدث المسؤل عن حذف العناصر بتاعتي من الصفحه  وندهت جوه الفانشكن المسؤله عن  الحفظ في local
    li.remove();
    deltaskinlocalstorage(task.id);
    toggleDeleteAll();

    popup(); //? دي popup message
  });

  li.appendChild(paraDes);
  li.appendChild(delBtn);
  output.appendChild(li);
}

function setToLocalStorage() {
  //? دي بقا function  المسؤله عن الحفظ
  window.localStorage.setItem("tasks", JSON.stringify(arr)); //?  انا استخدت json stringify عشان  احول العناصر الي جوه array لي نص
}
function gettolocllstorage() {
  //? هنا الفانشكن المسؤله تجيب البينات بتاعتي من local
  let date = window.localStorage.getItem("tasks"); //? هنا انا بقوله لو انت عندك جوه local متخزن بالاسم ده
  if (date) {
    //* لو الشرط اتحقق اعمل ليا كذا
    let tasks = JSON.parse(date); //?  هنا انا بقوله لو الشرط اتحقق اعمل ليا parse لل العناصر الي جو local وضيف لل arrayرواجع ابنني العناصر واحده واحده
    arr = tasks;
    output.innerHTML = "";
    tasks.forEach((task) => {
      addElementInBody(task);
    });
  }
}

function deltaskinlocalstorage(id) {
  //? هنا دي fun المسؤله عن الحذق  من local
  arr = arr.filter((task) => task.id !== id); //?هنا انا هنده الفنكشن دي جوه الحدث بتاع  del
  //? هنا انا بقوله اعمل ليا فلتر لو taskid تساوي id العصنر الي انا  عملت كليك عليها اخذف من local
  setToLocalStorage(); //هنا عشان احدث البيانات جوه  local
}

function popup() {
  setTimeout(function () {
    let conatainarPopUp = document.createElement("div");
    let DelBtn = document.createElement("button");
    let overlay = document.createElement("div");
    let HPop = document.createElement("h2");
    let dis = document.createElement("p");
    let icon = document.createElement("div");

    HPop.textContent = "Success!";
    dis.textContent = "Your action was completed successfully.";
    DelBtn.textContent = "×";
    icon.textContent = "✔";

    document.body.append(overlay, conatainarPopUp);
    conatainarPopUp.append(icon, HPop, dis, DelBtn);

    // ===== Popup Style =====
    conatainarPopUp.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.7);
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 340px;
      height: 240px;
      background: white;
      border-radius: 12px;
      opacity: 0;
      transition: all 0.3s ease;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      font-family: sans-serif;
    `;

    // ===== Overlay =====
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: none;
      opacity: 0;
      transition: 0.3s;
    `;

    // ===== Close Button =====
    DelBtn.style.cssText = `
      width: 32px;
      height: 32px;
      position: absolute;
      top: 10px;
      right: 10px;
      background: #ff4d4d;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      color: white;
    `;

    icon.style.cssText = `
      font-size: 40px;
      color: #28a745;
      margin-bottom: 10px;
      transform: scale(0);
      transition: 0.3s ease;
    `;

    HPop.style.margin = "5px";
    dis.style.color = "#555";
    dis.style.textAlign = "center";

    setTimeout(() => {
      overlay.style.display = "block";

      setTimeout(() => {
        overlay.style.opacity = "1";
        conatainarPopUp.style.opacity = "1";
        conatainarPopUp.style.transform = "translate(-50%, -50%) scale(1)";
      }, 10);

      setTimeout(() => {
        icon.style.transform = "scale(1.2)";
      }, 200);
    }, 400);

    function closePopup() {
      conatainarPopUp.style.opacity = "0";
      conatainarPopUp.style.transform = "translate(-50%, -50%) scale(0.7)";
      overlay.style.opacity = "0";

      setTimeout(() => {
        overlay.style.display = "none";
        conatainarPopUp.remove();
        overlay.remove();
      }, 300);
    }

    DelBtn.addEventListener("click", closePopup);
    overlay.addEventListener("click", closePopup);
  });
}

function removeAllTask() {
  delAll.addEventListener("click", () => {
    output.innerHTML = "";
    arr = [];
    window.localStorage.removeItem("tasks");
    gettolocllstorage();
    toggleDeleteAll();
  });
}

function changeFont() {
  fontSelcet.addEventListener("change", function () {
    document.documentElement.style.setProperty(
      "--main-font",
      `'${this.value}', sans-serif`,
    );
  });
}
