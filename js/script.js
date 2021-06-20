const tree = new BinaryTree();
const btnInsertNode = document.querySelector("#btn-insert");
const inputInsetNode = document.querySelector("#input-node");
const displayMermaid = document.querySelector(".mermaid");
const messageError = document.querySelector(".msg-invalid-input");
const infoNode = document.querySelector("#info-node");
let nodes;
let markdownTree;

function showInfoNode(node) {
  const nodeValue = parseInt(node.getAttribute("id"));
  const nodeAttributes = tree.getNode(nodeValue);

  infoNode.innerText = `
        Value: ${nodeAttributes.value}
        ${nodeAttributes.left ? "ChildLeft: " + nodeAttributes.left.value : ""}
        ${
          nodeAttributes.right
            ? "ChildRight: " + nodeAttributes.right.value
            : ""
        }
        ${
          tree.getHeight(nodeAttributes)
            ? "Height: " + tree.getHeight(nodeAttributes)
            : ""
        }
        `;
}

function insertNode() {
  const inputValues = inputInsetNode.value;
  messageError.style.display = "none";

  if (inputValues < 0) {
    const value = parseInt(inputValues);

    tree.insert(value);
  } else if (/^[0-9]{1,}$/.test(inputValues)) {
    const value = parseInt(inputValues);
    inputInsetNode.value = "";
    tree.insert(value);
  } else if (/^[0-9; ]{1,}$/.test(inputValues)) {
    const values = inputValues.replace(/\s/g, "").split(";");
    values.map((input) => {
      tree.insert(parseInt(input));
    });
    inputInsetNode.value = "";
  } else {
    inputInsetNode.focus();
    messageError.style.display = "block";
  }

  if (tree.root !== null) {
    displayMermaid.style.display = "block";
    renderTree();
  }
}

function generateMarkdownNode(node) {
  if (node.left) {
    markdownTree = `${markdownTree} ${node.value} --> ${node.left.value};`;
    generateMarkdownNode(node.left);
  }

  if (node.right) {
    markdownTree = `${markdownTree} ${node.value} --> ${node.right.value};`;
    generateMarkdownNode(node.right);
  }
}

function generateMarkdown(tree) {
  markdownTree = "";

  if (!tree.root.left && !tree.root.right) {
    return `${tree.root.value};`;
  }

  generateMarkdownNode(tree.root);

  return markdownTree;
}

function renderTree() {
  const values = `graph TD; ${generateMarkdown(tree)}`;

  const displayMermaid = document.querySelector(".mermaid");
  if (displayMermaid.firstChild !== null) {
    displayMermaid.innerHTML = "";
  }

  const code = values;

  let insert = function (code) {
    displayMermaid.innerHTML = code;
    nodes = document.querySelectorAll(".nodes .node");

    nodes.forEach((node) => {
      node.addEventListener("click", () => showInfoNode(node));
    });
  };

  mermaid.render("preparedScheme", code, insert);
}

btnInsertNode.addEventListener("click", () => insertNode());
inputInsetNode.addEventListener("keydown", (e) => {
  if (e.keyCode !== 13) return;
  insertNode();
});
