"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Engine_1 = __importDefault(require("./Engine"));
window.onload = function () {
    var canvas = document.getElementById("canvas");
    var engine = new Engine_1.default(canvas);
    engine.start();
};
//# sourceMappingURL=main.js.map