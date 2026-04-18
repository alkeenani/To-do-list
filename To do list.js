let inputName = document.querySelector("[name='inputName']");
let des = document.querySelector("[name='des']");
let add = document.querySelector("[type='submit']");
let Type = document.querySelector("select");
let output = document.getElementsByClassName("tasklist")[0];

add.addEventListener("click", function (e) {
  e.preventDefault();
  let li = document.createElement("li");
  let delBtn = document.createElement("button");
  let check = document.createElement("input");
  let paraDes = document.createElement("p");
  if (inputName.value !== "" && des.value !== "") {
    output.appendChild(li);
    li.textContent = inputName.value;
    paraDes.textContent = des.value;
    li.setAttribute("data-type", Type.value);
    li.appendChild(paraDes);
    li.appendChild(delBtn);
    li.appendChild(check);
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    check.type = "checkbox";
    delBtn.addEventListener("click", function () {
      li.remove();
    });
    check.addEventListener("change", function () {
      if (check.checked) {
        li.style.textDecoration = "line-through";
      } else {
        li.style.textDecoration = "none";
      }
    });
  }

  inputName.value = "";
  des.value = "";
});
