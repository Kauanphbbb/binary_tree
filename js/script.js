const tree = new BinaryTree();
const btnInsertNode = document.querySelector("#btn-insert");
const btnRemoveNode = document.querySelector("#btn-remove");
const btnSearchNode = document.querySelector("#btn-search");
const inputInsetNode = document.querySelector("#input-node");
const displayMermaid = document.querySelector(".mermaid");
const messageError = document.querySelector(".msg-invalid-input");
const infoNode = document.querySelector("#info-node");
const infoTree = document.querySelector("#info-tree");
let nodes;
let markdownTree;

function showInfoTree() {
  infoTree.innerText = `
  Degree: ${tree.degree}
  Height: ${tree.height}
  Quantity Nodes: ${tree.quantityNodes}
  `;
}

function showInfoNode(node) {
  if (document.querySelector(".found-node")) {
    document.querySelector(".found-node").classList.remove("found-node");
  }

  const nodeElement = document.querySelector(`g[id="${node.value}"]`);

  nodeElement.classList.add("found-node");

  infoNode.innerText = `
  Value: ${node.value}
  ${node.left ? "ChildLeft: " + node.left.value : ""}
  ${node.right ? "ChildRight: " + node.right.value : ""}
  ${node.parent ? "Parent: " + node.parent : ""}
  ${tree.getHeight(node) ? "Height: " + tree.getHeight(node) : ""}
  `;
}

function insertNode() {
  const inputValues = inputInsetNode.value;
  messageError.style.display = "none";
  infoNode.innerText = "";

  if (inputValues < 0) {
    const value = parseInt(inputValues);
    inputInsetNode.value = "";
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

function removeNode() {
  const inputValues = inputInsetNode.value;
  messageError.style.display = "none";
  infoNode.innerText = "";

  if (inputValues < 0) {
    const value = parseInt(inputValues);
    inputInsetNode.value = "";
    tree.remove(value);
  } else if (/^[0-9]{1,}$/.test(inputValues)) {
    const value = parseInt(inputValues);
    inputInsetNode.value = "";
    tree.remove(value);
  } else {
    inputInsetNode.focus();
    messageError.style.display = "block";
  }

  if (tree.root === null) {
    displayMermaid.style.display = "none";
  } else {
    renderTree();
  }
}

function searchNode() {
  const inputValues = inputInsetNode.value;
  let node = null;
  messageError.style.display = "none";
  infoNode.innerText = "";

  if (inputValues < 0) {
    const value = parseInt(inputValues);
    inputInsetNode.value = "";
    node = tree.getNode(value);
  } else if (/^[0-9]{1,}$/.test(inputValues)) {
    const value = parseInt(inputValues);
    inputInsetNode.value = "";
    node = tree.getNode(value);
  } else {
    inputInsetNode.focus();
    messageError.style.display = "block";
  }

  if (node) {
    showInfoNode(node);
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
      node.addEventListener("click", () => {
        const nodeValue = parseInt(node.getAttribute("id"));
        const nodeAttributes = tree.getNode(nodeValue);
        showInfoNode(nodeAttributes);
      });
    });

    showInfoTree();
  };

  mermaid.render("preparedScheme", code, insert);
}

btnInsertNode.addEventListener("click", () => insertNode());
btnSearchNode.addEventListener("click", () => searchNode());
btnRemoveNode.addEventListener("click", () => removeNode());
inputInsetNode.addEventListener("keydown", (e) => {
  if (e.keyCode !== 13) return;
  insertNode();
});
