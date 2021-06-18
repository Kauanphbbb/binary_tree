class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
    this.string = "";
  }

  insert(value) {
    // numero negativo está inserindo no nó direito
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (node.value > newNode.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }

      return;
    }

    if (node.value < newNode.value) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }

      return;
    }
  }

  show() {
    this.string = "";

    if (!this.root.left && !this.root.right) {
      return `${this.root.value};`;
    }

    this.showNode(this.root);
    return this.string;
  }

  showNode(node) {
    if (node.left) {
      this.string = `${this.string} ${node.value} --> ${node.left.value};`;
      this.showNode(node.left);
    }

    if (node.right) {
      this.string = `${this.string} ${node.value} --> ${node.right.value};`;
      this.showNode(node.right);
    }
  }
}
