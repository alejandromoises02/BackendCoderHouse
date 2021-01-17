"use strict";
class Suma {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    async result() {
        return this.a + this.b;
    }
}
class Resta {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    async result() {
        return this.a - this.b;
    }
}
module.exports = { Suma, Resta };
