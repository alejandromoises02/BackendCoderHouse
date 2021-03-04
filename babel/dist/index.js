"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var moment = require('moment'); // require
moment().format();
var fs = require("fs");
var puerto = 8080;

//Manejo de archivos

var Archivo = function () {
  function Archivo(nombre) {
    _classCallCheck(this, Archivo);

    this.nombre = "./" + nombre + ".txt";
  }

  _createClass(Archivo, [{
    key: "leer",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var chat;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return fs.promises.readFile(this.nombre, "utf-8");

              case 3:
                chat = _context.sent;
                return _context.abrupt("return", JSON.parse(chat));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", []);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function leer() {
        return _ref.apply(this, arguments);
      }

      return leer;
    }()
  }, {
    key: "guardar",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(mensaje) {
        var nuevoMensaje, lista, aux;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                nuevoMensaje = {
                  msg: mensaje
                };
                _context2.next = 3;
                return this.leer();

              case 3:
                lista = _context2.sent;

                lista.push(nuevoMensaje);

                _context2.prev = 5;
                _context2.next = 8;
                return fs.promises.writeFile(this.nombre, JSON.stringify(lista));

              case 8:
                aux = _context2.sent;
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](5);

                console.log("No se pudo escribir en el archivo");

              case 14:
                return _context2.abrupt("return", nuevoMensaje);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 11]]);
      }));

      function guardar(_x) {
        return _ref2.apply(this, arguments);
      }

      return guardar;
    }()
  }]);

  return Archivo;
}();

var miArchivo = new Archivo("productos");
//Manejo de archivos


var users = [];

var productos = [{
  id: 1,
  title: "leche",
  price: 200,
  thumbnail: "leche.png"
}, {
  id: 2,
  title: "azucar",
  price: 100,
  thumbnail: "azucar.png"
}, {
  id: 3,
  title: "azucar",
  price: 100,
  thumbnail: "azucar.png"
}, {
  id: 4,
  title: "azucar",
  price: 100,
  thumbnail: "azucar.png"
}, {
  id: 5,
  title: "azucar",
  price: 100,
  thumbnail: "azucar.png"
}];

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
