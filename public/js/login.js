const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;
  const senha2 = document.querySelector("#senha2").value;

  if (!nome || !email || !senha || !senha2 || !(senha === senha2)) {
    e.preventDefault();
    if (!nome || !email || !senha || !senha2)
      alert("Preencha todos os campos!");
    else if (!(senha === senha2)) alert("As senhas não correspondem!");
    else alert("Algo de errado aconteceu! Tente novamente.");
  }
});
