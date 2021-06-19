class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = null;
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
        newNode.parent = node.value;
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }

      return;
    }

    if (node.value < newNode.value) {
      if (node.right === null) {
        newNode.parent = node.value;
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }

      return;
    }
  }

  remove(value) {
    this.root = this.removeNode(this.root, value);
  }

  removeNode(node, value) {
    if (node === null) {
      return null;
    } else if (value > node.value) {
      node.right = this.removeNode(node.right, value);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      const aux = this.findSmallerNode(node.right);

      node.value = aux.value;

      node.right = this.removeNode(node.right, aux.value);

      return node;
    }
  }

  findSmallerNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.findSmallerNode(node.left);
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
