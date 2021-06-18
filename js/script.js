const tree = new BinaryTree();
const btnInsertNode = document.querySelector("#btn-insert");
const inputInsetNode = document.querySelector("#input-node");
const displayMermaid = document.querySelector(".mermaid");
const messageError = document.querySelector(".msg-invalid-input");

function renderTree() {
  const values = `graph TD; ${tree.show()}`;

  const displayMermaid = document.querySelector(".mermaid");
  if (displayMermaid.firstChild !== null) {
    displayMermaid.innerHTML = "";
  }

  const code = values;

  let insert = function (code) {
    displayMermaid.innerHTML = code;
  };

  mermaid.render("preparedScheme", code, insert);
}

btnInsertNode.addEventListener("click", () => {
  // limpar input ápos inserir
  // inserir ao clicar enter
  const inputValues = inputInsetNode.value;
  messageError.style.display = "none";

  if (inputValues < 0) {
    const value = parseInt(inputValues);

    tree.insert(value);
  } else if (/^[0-9]{1,}$/.test(inputValues)) {
    const value = parseInt(inputValues);

    tree.insert(value);
  } else if (/^[0-9; ]{1,}$/.test(inputValues)) {
    const values = inputValues.replace(/\s/g, "").split(";");

    values.map((input) => {
      tree.insert(parseInt(input));
    });
  } else {
    messageError.style.display = "block";
  }

  if (tree.root !== null) {
    displayMermaid.style.display = "block";
    renderTree();
  }
});
