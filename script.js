document.addEventListener("DOMContentLoaded", () => {
  const askButton = document.querySelector("#ask");
  askButton.onclick = () => {
    const question = document.querySelector("#question");
    callApi(question.value);
  };

  const clearButton = document.querySelector("#clear");
  clearButton.onclick = () => {
    const answer = document.querySelector("#answer").querySelector("textarea");
    answer.innerHTML = "";
  };
});

async function callApi(q) {
  const response = await fetch(`http://localhost:8000/answer?q=${q}`);
  const json = await response.json();
  const parse = JSON.stringify(json);
  const content = JSON.parse(parse);

  const answer = document.querySelector("#answer").querySelector("textarea");
  answer.innerHTML = content.message;
}
