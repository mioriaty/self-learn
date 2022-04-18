export class Node {
  public data: Node;
  public parent: null | Node;
  public children: Node[] = [];

  constructor(data: Node) {
    this.data = data;
    this.parent = null;
    this.children = [];
  }
}
