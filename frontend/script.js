document.addEventListener("DOMContentLoaded", () => {
  const mainSection = document.querySelector("#mainSection");
  const settingsSection = document.querySelector("#settingsSection");
  const title = document.querySelector("#title");
  console.log(settingsSection);
  settingsSection.style.display = "none";

  const askButton = document.querySelector("#ask");
  askButton.onclick = () => {
    const question = document.querySelector("#question");
    callApi(question.value);
  };

  const clearButton = document.querySelector("#clear");
  clearButton.onclick = () => {
    const question = document.querySelector("#question");
    const answer = document.querySelector("#answer");
    question.value = "";
    answer.value = "";
  };

  const settingsButton = document.querySelector("#settings");
  settingsButton.onclick = () => {
    mainSection.style.display = "none";
    settingsSection.style.display = "block";
    title.innerHTML = "Settings";
  };

  const mainButton = document.querySelector("#main");
  mainButton.onclick = () => {
    mainSection.style.display = "block";
    settingsSection.style.display = "none";
    title.innerHTML = "GPT Assistant";
  };
});

async function callApi(q) {
  const response = await fetch(`http://localhost:8000/answer?q=${q}`);
  const json = await response.json();
  const parse = JSON.stringify(json);
  const content = JSON.parse(parse);

  const answer = document.querySelector("#answer");
  answer.value = content.message;
}
