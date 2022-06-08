"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SATISFACTION_DECAY = 0.02;
var Organism = /** @class */ (function () {
    function Organism(x, y) {
        this.position = { x: 0, y: 0 };
        this.direction = 260;
        this.satisfaction = 0.5;
        this.radius = 5;
        this.baseSpeed = 5;
        this.position = { x: x, y: y };
    }
    /**
     * Converts a given angle from degrees to radians
     * @param angleDegrees The angle in degrees
     * @returns The angle in radians
     */
    Organism.prototype.degToRad = function (angleDegrees) {
        return angleDegrees * (Math.PI / 180);
    };
    Organism.prototype.update = function (deltaTime, dimensions) {
        var speed = this.baseSpeed / this.satisfaction;
        var x = Math.sin(this.degToRad(this.direction)) * speed * deltaTime;
        var y = Math.cos(this.degToRad(this.direction)) * speed * deltaTime;
        this.position.x -= x;
        this.position.y -= y;
        this.handleBorderCollision(dimensions);
        this.handleRotations();
        this.handleSatisfaction(dimensions);
    };
    Organism.prototype.handleRotations = function () {
        var rotateChance = (1.1 - this.satisfaction) / 5;
        if (Math.random() < rotateChance) {
            var newRotation = Math.random() * 360;
            this.direction = newRotation;
        }
    };
    Organism.prototype.handleSatisfaction = function (dimensions) {
        var halfway = dimensions.width / 2;
        if (this.position.x < halfway) {
            this.satisfaction -= SATISFACTION_DECAY;
        }
        else {
            this.satisfaction += SATISFACTION_DECAY;
        }
        if (this.satisfaction <= 0.1)
            this.satisfaction = 0.1;
        if (this.satisfaction >= 1)
            this.satisfaction = 1;
    };
    Organism.prototype.handleBorderCollision = function (dimensions) {
        if (this.position.x + this.radius > dimensions.width) {
            this.position.x = dimensions.width - this.radius;
        }
        else if (this.position.x - this.radius < 0) {
            this.position.x = this.radius;
        }
        if (this.position.y + this.radius > dimensions.height) {
            this.position.y = dimensions.height - this.radius;
        }
        else if (this.position.y - this.radius < 0) {
            this.position.y = this.radius;
        }
    };
    Organism.prototype.render = function (ctx) {
        var pX = this.position.x;
        var pY = this.position.y;
        ctx.beginPath();
        ctx.arc(pX, pY, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgb(100, 255, 100)";
        ctx.fill();
        ctx.closePath();
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(pX, pY);
        var x = Math.sin(this.degToRad(this.direction)) * this.radius;
        var y = Math.cos(this.degToRad(this.direction)) * this.radius;
        ctx.lineTo(pX - x, pY - y);
        ctx.stroke();
    };
    return Organism;
}());
exports.default = Organism;
//# sourceMappingURL=Organism.js.map