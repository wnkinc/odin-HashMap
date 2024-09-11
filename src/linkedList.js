class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.nextNode) {
        current = current.nextNode;
      }
      current.nextNode = newNode;
    }
  }

  prepend(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      const current = this.head;
      this.head = newNode;
      newNode.nextNode = current;
    }
  }

  size() {
    let nodeCount = 0;
    let current = this.head;
    while (current) {
      nodeCount++;
      current = current.nextNode;
    }
    return nodeCount;
  }

  head() {
    return this.head;
  }

  tail() {
    let current = this.head;
    if (!current) {
      return null;
    }
    while (current.nextNode) {
      current = current.nextNode;
    }
    return current;
  }

  at(index) {
    let nodeIndex = 0;
    let current = this.head;

    while (current) {
      if (index == nodeIndex) {
        return current;
      }
      nodeIndex++;
      current = current.nextNode;
    }
    return null;
  }

  pop() {
    let current = this.head;
    let previous = current;

    if (!current.nextNode) {
      this.head = null;
      return;
    }

    if (current) {
      while (current.nextNode) {
        previous = current;
        current = current.nextNode;
      }
      previous.nextNode = null;
    }
  }

  contains(value) {
    let current = this.head;

    while (current) {
      if (current.value == value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  find(value) {
    let nodeIndex = 0;
    let current = this.head;

    while (current) {
      if (current.value == value) {
        return nodeIndex;
      }
      nodeIndex++;
      current = current.nextNode;
    }
    return null;
  }

  toString() {
    let valuesArr = [];
    let current = this.head;

    while (current) {
      valuesArr.push(`( ${current.value} )`);
      current = current.nextNode;
    }

    return valuesArr.join(" -> ") + " -> null";
  }

  insertAt(value, index = 0) {
    const newNode = new Node(value);
    let nodeIndex = 0;
    let current = this.head;
    let previous = current;

    if (!current || index == 0) {
      newNode.nextNode = this.head;
      this.head = newNode;
      return;
    }

    while (current) {
      if (index == nodeIndex) {
        previous.nextNode = newNode;
        newNode.nextNode = current;
        return;
      }
      nodeIndex++;
      previous = current;
      current = current.nextNode;
    }

    // If index is exactly one more than the length of the list, append at the end
    if (index === nodeIndex) {
      previous.nextNode = newNode;
      return;
    }

    return null;
  }

  removeAt(index) {
    let current = this.head;
    let previous = null;
    let nodeIndex = 0;

    if (!this.head) {
      return null;
    }

    if (index === 0) {
      this.head = current.nextNode;
      return true;
    }

    while (current) {
      if (nodeIndex === index) {
        previous.nextNode = current.nextNode;
        return true;
      }
      previous = current;
      current = current.nextNode;
      nodeIndex++;
    }

    return false;
  }
}

export { LinkedList, Node };
