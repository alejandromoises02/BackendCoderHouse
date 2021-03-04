var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var moment = require('moment'); // require
moment().format();
var fs = require("fs");
var puerto = 8080;
//Manejo de archivos
var Archivo = /** @class */ (function () {
    function Archivo(nombre) {
        this.nombre = "./" + nombre + ".txt";
    }
    Archivo.prototype.leer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var chat, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.promises.readFile(this.nombre, "utf-8")];
                    case 1:
                        chat = _a.sent();
                        return [2 /*return*/, JSON.parse(chat)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Archivo.prototype.guardar = function (mensaje) {
        return __awaiter(this, void 0, void 0, function () {
            var nuevoMensaje, lista, aux, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nuevoMensaje = {
                            msg: mensaje
                        };
                        return [4 /*yield*/, this.leer()];
                    case 1:
                        lista = _a.sent();
                        lista.push(nuevoMensaje);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fs.promises.writeFile(this.nombre, JSON.stringify(lista))];
                    case 3:
                        aux = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.log("No se pudo escribir en el archivo");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, nuevoMensaje];
                }
            });
        });
    };
    return Archivo;
}());
var miArchivo = new Archivo("productos");
//Manejo de archivos
var users = [];
var productos = [
    {
        id: 1,
        title: "leche",
        price: 200,
        thumbnail: "leche.png"
    },
    {
        id: 2,
        title: "azucar",
        price: 100,
        thumbnail: "azucar.png"
    },
    {
        id: 3,
        title: "azucar",
        price: 100,
        thumbnail: "azucar.png"
    },
    {
        id: 4,
        title: "azucar",
        price: 100,
        thumbnail: "azucar.png"
    },
    {
        id: 5,
        title: "azucar",
        price: 100,
        thumbnail: "azucar.png"
    },
];
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
io.on("connection", function (socket) {
    console.log("se conecto el usuario " + socket.id);
    socket.join(socket.id);
    socket.on("session", function (payload) {
        console.log(payload);
        if (!users.includes(payload.mail)) {
            users.push(payload.mail);
        }
        io.to(socket.id).emit("userId", {
            sessionId: payload.mail,
            users: users
        });
    });
    socket.on("message", function (payload) {
        console.log(payload);
        io.emit("message", {
            from: payload.mail,
            msg: payload.msg,
            date: moment().format('L')
        });
        miArchivo.guardar("Mensaje de " + payload.mail + " en Fecha " + payload.msg + ": " + payload.msg);
    });
});
io.on("disconnect", function (socket) {
    console.log("se desconecto");
});
http.listen(puerto, function () {
    console.log("Servidor esuchando puerto " + puerto);
});
