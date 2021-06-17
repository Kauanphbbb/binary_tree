const tree = {};

function insert(tree, value) {
  if (tree.root) {
    if (value > tree.root) {
      insert(tree.right, value);
    } else if (value < tree.root) {
      insert(tree.left, value);
    }
  } else {
    tree.root = value;
    tree.left = {};
    tree.right = {};
  }
}

console.log(tree);
