document.addEventListener("DOMContentLoaded", () => {
  displaySection("main");
  logic();
});

function logic() {
  waitApiCall();
  clearAll();
  displayMainButton();
  displaySettingsButton();
  disableSelectRole();
}

function disableSelectRole() {
  const select = document.querySelector("#select-role");
  const input = document.querySelector("#ownRole");
  input.addEventListener("input", function () {
    if (input.value !== "") {
      select.disabled = true;
    } else {
      select.disabled = false;
    }
  });
}

function clearAll() {
  const clearButton = document.querySelector("#clear");
  clearButton.onclick = () => {
    const question = document.querySelector("#question");
    const answer = document.querySelector("#answer");
    question.value = "";
    answer.value = "";
  };
}

function displaySettingsButton() {
  const settingsButton = document.querySelector("#settings");
  settingsButton.onclick = () => {
    displaySection("settings");
  };
}

function displayMainButton() {
  const mainButton = document.querySelector("#main");
  mainButton.onclick = () => {
    displaySection("main");
  };
}

function displaySection(section) {
  const mainSection = document.querySelector("#mainSection");
  const settingsSection = document.querySelector("#settingsSection");
  const title = document.querySelector("#title");

  if (section === "main") {
    settingsSection.style.display = "none";
    mainSection.style.display = "block";
    title.innerHTML = "GPT Assistant";
  } else if (section === "settings") {
    settingsSection.style.display = "block";
    mainSection.style.display = "none";
    title.innerHTML = "Settings";
  }
}

function waitApiCall() {
  const askButton = document.querySelector("#ask");
  askButton.onclick = () => {
    const question = document.querySelector("#question");
    callApi(question.value);
  };
}

function getModel() {
  return "gpt-3.5-turbo";
}

function getRole() {
  const input = document.querySelector("#ownRole");
  let value = input.value;
  value = value.replace(/\s+/g, "");
  if (value == "") {
    const select = document.querySelector("#select-role");
    const selectedValue = select.value;
    return selectedValue;
  }
  return value;
}

async function callApi(q) {
  const model = getModel();
  const role = getRole();

  let url = new URL("http://0.0.0.0:8000/answer");
  let params = { q: q, model: model, role: role };
  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url);

  const json = await response.json();
  const parse = JSON.stringify(json);
  const content = JSON.parse(parse);

  const answer = document.querySelector("#answer");
  answer.value = content.message;
}
