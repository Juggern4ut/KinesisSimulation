"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Organism_1 = __importDefault(require("./Organism"));
var Engine = /** @class */ (function () {
    function Engine(canvas) {
        this.organisms = [];
        this.previousTime = 0;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.dimensions = { width: this.canvas.width, height: this.canvas.height };
        this.goodElem = document.getElementById("good");
        this.badElem = document.getElementById("bad");
        this.totElem = document.getElementById("total");
        for (var i = 0; i < 2000; i++) {
            this.organisms.push(new Organism_1.default(this.canvas.width / 2, Math.random() * this.canvas.height + 5));
        }
    }
    Engine.prototype.step = function (time, ths) {
        var deltaTime = time - ths.previousTime;
        ths.previousTime = time;
        // Update your game
        ths.update(deltaTime / 250);
        // Render your game
        ths.render(this.ctx);
        // Repeat
        window.requestAnimationFrame(function (time) { return ths.step(time, ths); });
    };
    /**
     * Start the Engine
     */
    Engine.prototype.start = function () {
        var _this = this;
        window.requestAnimationFrame(function (time) {
            _this.previousTime = time;
            window.requestAnimationFrame(function (time) { return _this.step(time, _this); });
        });
    };
    /**
     * Update the objects for the next frame
     */
    Engine.prototype.update = function (dt) {
        var _this = this;
        this.organisms.forEach(function (p) { return p.update(dt, _this.dimensions); });
        var good = 0;
        var bad = 0;
        this.organisms.forEach(function (o) {
            if (o.position.x < _this.dimensions.width / 2)
                bad++;
            else
                good++;
        });
        this.goodElem.innerHTML = good.toString();
        this.badElem.innerHTML = bad.toString();
        this.totElem.innerHTML = (bad + good).toString();
    };
    /**
     * Render the objects to the screen
     */
    Engine.prototype.render = function (ctx) {
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        this.ctx.fillStyle = "#c33";
        this.ctx.fillRect(0, 0, this.dimensions.width / 2, this.dimensions.height);
        this.ctx.fillStyle = "#234dcc";
        this.ctx.fillRect(this.dimensions.width / 2, 0, this.dimensions.width / 2, this.dimensions.height);
        this.organisms.forEach(function (p) { return p.render(ctx); });
    };
    return Engine;
}());
exports.default = Engine;
//# sourceMappingURL=Engine.js.map