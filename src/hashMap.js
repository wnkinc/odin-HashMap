import { LinkedList } from "./linkedList";

class HashMap {
  constructor(initialBuckets = 16, loadFactor = 0.75) {
    this.buckets = initialBuckets;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.map = Array.from({ length: this.buckets }, () => null);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets;
    }

    return hashCode;
  }

  hashWithNewBuckets(key, newBuckets) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % newBuckets;
    }

    return hashCode;
  }

  resize() {
    const newBuckets = this.buckets * 2;
    const newMap = Array.from({ length: newBuckets }, () => null);

    // Rehash all existing key-value pairs into the new map
    for (let i = 0; i < this.buckets; i++) {
      if (this.map[i] != null) {
        let current = this.map[i].head;
        while (current) {
          let newIndex = this.hashWithNewBuckets(current.value.key, newBuckets);
          if (newMap[newIndex] == null) {
            const newList = new LinkedList();
            newList.append(current.value);
            newMap[newIndex] = newList;
          } else {
            newMap[newIndex].append(current.value);
          }
          current = current.nextNode;
        }
      }
    }

    this.buckets = newBuckets;
    this.map = newMap;
  }

  set(key, value) {
    let index = this.hash(key);

    if (this.map[index] == null) {
      const myList = new LinkedList();
      myList.append({ key, value });
      this.map[index] = myList;
      this.size++;
    } else {
      let current = this.map[index].head;
      while (current) {
        if (current.value.key === key) {
          current.value.value = value; // Update existing value
          return;
        }
        current = current.nextNode;
      }
      this.map[index].append({ key, value }); // Add new key-value pair
      this.size++;
    }

    if (this.size / this.buckets > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    let index = this.hash(key);

    if (this.map[index] != null) {
      let current = this.map[index].head;
      while (current) {
        if (current.value.key === key) {
          return current.value.value;
        }
        current = current.nextNode;
      }
    }

    return null;
  }

  has(key) {
    let index = this.hash(key);

    if (this.map[index] != null) {
      let current = this.map[index].head;
      while (current) {
        if (current.value.key === key) {
          return true;
        }
        current = current.nextNode;
      }
    }

    return false;
  }

  remove(key) {
    let index = this.hash(key);

    if (this.map[index] != null) {
      let current = this.map[index].head;
      let linkIndex = 0;

      while (current) {
        if (current.value.key === key) {
          this.map[index].removeAt(linkIndex);

          if (this.map[index].head == null) {
            this.map[index] = null;
          }

          this.size--;
          return true;
        }

        current = current.nextNode;
        linkIndex++;
      }
    }

    return false;
  }

  length() {
    let length = 0;
    for (let i = 0; i < this.buckets; i++) {
      if (this.map[i] != null) {
        let current = this.map[i].head;

        while (current) {
          current = current.nextNode;
          length++;
        }
      }
    }

    return length;
  }

  clear() {
    for (let i = 0; i < this.buckets; i++) {
      if (this.map[i] != null) {
        this.map[i] = null;
      }
    }
  }

  keys() {
    console.log(this.buckets);
    const arrayOfKeys = [];
    for (let i = 0; i < this.buckets; i++) {
      if (this.map[i] != null) {
        let current = this.map[i].head;

        while (current) {
          console.log(`Bucket index: ${[i]} and key: ${current.value.key}`);
          arrayOfKeys.push(current.value.key);
          current = current.nextNode;
        }
      }
    }

    return arrayOfKeys;
  }

  values() {
    const arrayOfValues = [];
    for (let i = 0; i < this.buckets; i++) {
      if (this.map[i] != null) {
        let current = this.map[i].head;

        while (current) {
          arrayOfValues.push(current.value.value);
          current = current.nextNode;
        }
      }
    }

    return arrayOfValues;
  }

  entries() {
    const arrayOfKeyValuePairs = [];
    for (let i = 0; i < this.buckets; i++) {
      if (this.map[i] != null) {
        let current = this.map[i].head;

        while (current) {
          arrayOfKeyValuePairs.push([current.value.key, current.value.value]);
          current = current.nextNode;
        }
      }
    }

    return arrayOfKeyValuePairs;
  }
}

export default HashMap;
