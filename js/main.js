import { data } from "./data.js";

let elBody = document.querySelector(`.js-body`);
let elSearch = document.querySelector(`.js-search`);
let elDefault = document.querySelector(`.js-default`);
let elSort = document.querySelector(`.js-sort`);
let elFilter = document.querySelector(`.js-filter`);
let elList = document.querySelector(`.js-list`);
let elBgc = document.querySelector(`.js-bgc`);
let elEdit = document.querySelector(`.js-edit`);
let elStatus = document.querySelector(`.js-status`);
let elSave = document.querySelector(`.js-save`);
let elX = document.querySelector(`.js-x`);

let newArr = [];

function task(arr) {
  for (let i = 0; i < arr.length; i++) {
    newArr.push({
      id: newArr.length + 1,
      ava: arr[i].ava,
      name: arr[i].name,
      phone: arr[i].phone,
      email: arr[i].email,
      address: arr[i].address,
      time: arr[i].time,
      company: arr[i].company,
      text: arr[i].text,
      date_of_onliine: arr[i].date_of_onliine,
      date_of_register: arr[i].date_of_register,
      priority: arr[i].priority,
    });
  }
}
task(data);

function createElement(arr, node) {
  elList.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let newItem = document.createElement(`li`);
    newItem.dataset.id = arr[i].id;
    newItem.classList = `w-100 d-flex align-item-center bg-white py-3 px-4 border-3 border-bottom`;

    let newAvatar = document.createElement(`div`);
    newAvatar.classList = `div1 d-flex align-item-center`;

    let newImg = document.createElement(`img`);
    newImg.classList = `me-4 rounded-circle`;
    newImg.src = arr[i].ava;
    newImg.width = 44;
    newImg.height = 44;
    newImg.alt = `user avatar`;

    let newBox = document.createElement(`div`);

    let newEmile = document.createElement(`p`);
    newEmile.classList = `d-block m-0 fw-bold`;
    newEmile.textContent = arr[i].company;

    let newDay = document.createElement(`p`);
    newDay.classList = `d-block my-0 text-black-50 fw-bold`;
    newDay.textContent = `Updated 1 day ago`;

    let newCont = document.createElement(`div`);
    newCont.classList = `div2 d-flex align-item-center`;

    let newMilCont = document.createElement(`div`);
    newMilCont.classList = `con1`;

    let newName = document.createElement(`p`);
    newName.classList = `d-block m-0 fw-bold`;
    newName.textContent = arr[i].name;

    let newTime = document.createElement(`time`);
    newTime.classList = `d-block text-black-50 fw-bold`;
    newTime.datetime = arr[i].date_of_register;
    newTime.textContent = arr[i].date_of_register;

    let newOnline = document.createElement(`div`);
    newOnline.classList = `con2`;

    let newOnlineTime = document.createElement(`time`);
    newOnlineTime.classList = `d-block fw-bold`;
    newOnlineTime.datetime = arr[i].date_of_onliine;
    newOnlineTime.textContent = arr[i].date_of_onliine;

    let newOn = document.createElement(`time`);
    newOn.classList = `d-block text-black-50 fw-bold`;
    newOn.datetime = arr[i].time;
    newOn.textContent = arr[i].time;

    let newDegre = document.createElement(`p`);
    newDegre.classList = `d-block fw-bold text-white`;
    newDegre.textContent = arr[i].priority.toUpperCase();
    if (newDegre.textContent == `HIGH`) {
      newDegre.classList.add(`high`);
    } else if (newDegre.textContent == `NORMAL`) {
      newDegre.classList.add(`normal`);
    } else if (newDegre.textContent == `LOW`) {
      newDegre.classList.add(`low`);
    }

    let newIconBox = document.createElement(`span`);
    newIconBox.classList = `con3 d-block pt-2 there-dot`;

    let newDiv = document.createElement(`div`);
    newDiv.classList = `edite none p-2`;

    let newEdit = document.createElement(`button`);
    newEdit.classList = `edit-btn`;
    newEdit.textContent = `EDITE`;

    let newBtn = document.createElement(`button`);
    newBtn.classList = `del-btn`;
    newBtn.textContent = `DELETE`;

    let newIcon = document.createElement(`img`);

    // DELETE
    newIcon.addEventListener("click", (evt) => {
      newDiv.classList.toggle(`none`);
      elBody.classList.toggle(`body`);
      elBgc.classList.remove(`none`);
    });
    newEdit.addEventListener(`click`, (evt) => {
      elBgc.classList.remove(`none`);
      elEdit.classList.remove(`none`);
      elBody.classList.add(`body`);
      newDiv.classList.add(`none`);
      let taskId =
        +evt.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
      let task = newArr.find((task) => task.id === taskId);

      elStatus.value = task.priority;
      elSave.dataset.id = task.id;
    });
    elBgc.addEventListener(`click`, () => {
      newDiv.classList.add(`none`);
    });
    newBtn.addEventListener("click", () => {
      elBgc.classList.add(`none`);
    });

    newBtn.addEventListener("click", (evt) => {
      let parrent = evt.target.parentNode.parentNode.parentNode.parentNode;
      let parrentId = +parrent.dataset.id;
      newArr = newArr.filter((element) => element.id !== parrentId);
      parrent.remove();
      elBody.classList.remove(`body`);
    });

    newIcon.src = `https://cdn-icons-png.flaticon.com/512/2311/2311524.png`;
    newIcon.width = 24;
    newIcon.height = 24;

    newItem.append(newAvatar, newCont);
    newAvatar.append(newImg, newBox);
    newBox.append(newEmile, newDay);
    newCont.append(newMilCont, newOnline, newDegre, newIconBox);
    newMilCont.append(newName, newTime);
    newOnline.append(newOnlineTime, newOn);
    newIconBox.append(newIcon, newDiv);
    newDiv.append(newEdit, newBtn);

    node.appendChild(newItem);
  }
}
createElement(newArr, elList);

// SEARCH
elSearch.addEventListener(`input`, (evt) => {
  let keyWord = evt.target.value.trim().toUpperCase();

  let foundTasks = newArr.filter((element) => {
    if (element.name.toUpperCase().includes(keyWord)) {
      return element;
    }
  });
  createElement(foundTasks, elList);
});

//  SORT
elSort.addEventListener("click", () => {
  let a = newArr.sort((a, b) => {
    if (a.name > b.name) return 1;
    return -1;
  });

  createElement(a, elList);
});

// ASL HOLATI
elDefault.addEventListener("click", () => {
  let a = newArr.sort((a, b) => {
    if (a.id > b.id) return 1;
    return -1;
  });
  elFilter.value = `filter`;
  createElement(a, elList);
});

// FILTER
elFilter.addEventListener("change", (event) => {
  const filterType = event.target.value;

  let filteredArr = newArr.filter((task) => task.priority === filterType);

  createElement(filteredArr, elList);
});

// EDITE
elBgc.addEventListener("click", () => {
  elBgc.classList.add(`none`);
  elEdit.classList.add(`none`);
  elBody.classList.remove(`body`);
});

elSave.addEventListener("click", (evt) => {
  elBgc.classList.add(`none`);
  elEdit.classList.add(`none`);
  elBody.classList.remove(`body`);

  let taskId = +evt.target.dataset.id;
  let editePriority = elStatus.value;

  newArr = newArr.map((oldMap) => {
    if (oldMap.id === taskId) {
      return {
        ...oldMap,
        priority: editePriority,
      };
    }
    return oldMap;
  });

  createElement(newArr, elList);
});

elX.addEventListener("click", () => {
  elBgc.classList.add(`none`);
  elEdit.classList.add(`none`);
  elBody.classList.remove(`body`);
});
