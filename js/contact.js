const instagram = document.querySelector(".instagram");

const myForm = document.getElementById("myForm");
myForm.addEventListener("submit", handleSubmit);

function getContactList() {
  const contactList = localStorage.getItem("contactList");
  if (contactList == true) {
    return JSON.parse(contactList);
  } else {
    return [];
  }
}

function saveContactList(contactList1) {
  const contactList = JSON.stringify(contactList1);
  localStorage.setItem("contactList", contactList);
}

function handleSubmit(event) {
  event.preventDefault(); // 페이지 로딩 막아줌

  // FORM의 제목 부분
  const nameInput = document.getElementById("ct_name");
  // FORM의 메세지 부분
  const messageInput = document.getElementById("ct_description");

  const nameValue = nameInput.value;
  const messageValue = messageInput.value;

  const sendAt = new Date().toISOString();

  // 1. contactList <- 메세지들을 담는다
  // 2. 새로운 메세지에 대해서 contactList에 추가한다
  // 3. 변경된 contactList를 storage에 저장한다
  // 4. 화면에 새로운 (갱신된) 데이터를 출력한다
  // 1
  const contactList = getContactList();
  // 2
  const newContact = {
    name: nameValue,
    message: messageValue,
    sendAt: sendAt,
  };
  contactList.push(newContact);
  // 3
  saveContactList(contactList);
  // 4
  const contactListElement = document.querySelector(".contactList");
  // newContactElement == <li> </li>
  const newcontactElement = document.createElement("li"); // element == HTML Tag
  // newContactElement == <li> ${nameValue} - ${messageValue} (${sendAt}) </li>
  newcontactElement.innerText = `${nameValue} - ${messageValue} (${sendAt})`;
  contactListElement.appendChild(newcontactElement);

  myForm.reset();
}

function setLocation() {
  instagram.addEventListener("click", () => {
    window.open("https://www.naver.com");
  });
}

function init() {
  // 1. Storage에 저장된 것을 가져옴
  // 2. 각각에 대해서 출력

  // 1
  const contactList = getContactList();
  // 2
  const contactListElement = document.querySelector(".contactList");
  contactList.forEach((value) => {
    const newcontactElement = document.createElement("li");
    newcontactElement.innerText = `${value.nameValue} - ${value.messageValue} (${value.sendAt})`;
    contactListElement.appendChild(newcontactElement);
  });
  setLocation();
}

window.onload = init();
