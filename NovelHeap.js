class NovelHeap {
    constructor(capacity, numChildren) {
        this.capacity = capacity;
        this.numChildren = numChildren;
        this.size = 0;
        this.heap = new Array(capacity);
    }

    parent(i) {
        return Math.floor((i - 1) / this.numChildren);
    }

    child(i, k) {
        return this.numChildren * i + k;
    }

    insert(value) {
        if (this.size === this.capacity) {
            this.heap = [...this.heap, ...new Array(this.capacity)];
            this.capacity *= 2;
        }

        this.heap[this.size] = value;
        this.siftUp(this.size);
        this.size++;
    }

    siftUp(i) {
        while (i > 0 && this.heap[this.parent(i)] < this.heap[i]) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }

    popMax() {
        if (this.size === 0) {
            throw new Error("Heap is empty");
        }

        let max = this.heap[0];
        this.heap[0] = this.heap[this.size - 1];
        this.size--;
        this.siftDown(0);
        return max;
    }

    siftDown(i) {
        let maxIndex = i;

        for (let k = 1; k <= this.numChildren; k++) {
            let j = this.child(i, k);
            if (j < this.size && this.heap[j] > this.heap[maxIndex]) {
                maxIndex = j;
            }
        }

        if (i !== maxIndex) {
            this.swap(i, maxIndex);
            this.siftDown(maxIndex);
        }
    }

    swap(i, j) {
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
}