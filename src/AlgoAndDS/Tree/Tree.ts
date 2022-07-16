import { Node } from './Node';

export class Tree {
  private root: Node;

  constructor(data: Node) {
    let node = new Node(data);
    this.root = node;
  }

  /**
   * If the current node matches the data, return it, otherwise recurse on each child node
   * @param {Node} data - the data to search for
   * @param node - the node to start searching from
   * @returns The node that matches the data
   */
  find(data: Node, node = this.root) {
    if (node.data === data) {
      return node;
    }

    //recurse on each child node
    for (const child of node.children) {
      //if the data is found in any child node it will be returned here
      if (this.find(data, child)) {
        return child;
      }
    }

    return null;
  }

  // adding elements to the tree
  add(data: Node, parentData: Node) {
    let node = new Node(data);
    let parent = this.find(parentData);

    // if the parent exists, add the node to it
    if (parent) {
      parent.children.push(node);
      node.parent = parent;

      return node;
    } else {
      throw new Error('Parent does not exist');
    }
  }

  // remove elements from the tree
  remove(data: Node) {
    let node = this.find(data);

    // if the node exists, remove it
    if (node) {
      let parent = node.parent as Node;
      let indexOfNode = parent.children.indexOf(node);

      parent.children.slice(indexOfNode, 1);
    } else {
      throw new Error('Node does not exist');
    }
  }
}
