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
    this.quantityNodes = 0;
    this.degree = 0;
    this.height = 0;
    this.string = "";
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      this.quantityNodes++;
    }

    if (!this.getNode(value)) {
      this.insertNode(this.root, newNode);
      this.quantityNodes++;
    }

    this.setDegree();
    this.height = this.getHeight(this.root);
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

  getHeight(node) {
    if (node === null) {
      return -1;
    } else {
      let heightLeft = this.getHeight(node.left);
      let heightRight = this.getHeight(node.right);

      if (heightLeft < heightRight) {
        return heightRight + 1;
      } else {
        return heightLeft + 1;
      }
    }
  }

  setDegree() {
    this.degree = 0;

    if (this.root.left) {
      this.degree++;
    }
    if (this.root.right) {
      this.degree++;
    }
  }

  getDegree() {
    this.setDegree();
    return this.degree();
  }

  getNode(value, node = this.root) {
    if (node === null) {
      return null;
    }

    if (value === node.value) {
      return node;
    }

    if (value > node.value) {
      return this.getNode(value, node.right);
    } else {
      return this.getNode(value, node.left);
    }
  }
}
