"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const calculateModule = "./calculadores";
const operacion = async (a, b, ope) => {
    let operation = null;
    switch (ope.toUpperCase()) {
        case "SUMA":
            operation = await Promise.resolve().then(() => __importStar(require(calculateModule))).then(m => m.Suma);
            break;
        case 'RESTA':
            operation = await Promise.resolve().then(() => __importStar(require(calculateModule))).then(m => m.Resta);
            break;
        default: console.log("Operacion invalida");
    }
    return new operation(a, b).result();
};
const operaciones = async () => {
    let rest = await operacion(2, 4, "suma");
    console.log(rest);
    rest = await operacion(5, 3, "ReSTa");
    console.log(rest);
    rest = await operacion(2, 2, "error");
    console.log(rest);
};
operaciones();
