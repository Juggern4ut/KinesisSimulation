"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Particle = /** @class */ (function () {
    function Particle(x, y) {
        this.position = { x: 0, y: 0 };
        this.velocity = { x: 4, y: -4 };
        this.mass = 0.1; //kg
        this.radius = 15; // 1px = 1cm
        this.restitution = -0.7;
        this.A = (Math.PI * this.radius * this.radius) / 10000;
        this.position = { x: x, y: y };
    }
    Particle.prototype.update = function (deltaTime, Cd, rho, ag, particles) {
        var forceX = (-0.5 *
            Cd *
            this.A *
            rho *
            this.velocity.x *
            this.velocity.x *
            this.velocity.x) /
            Math.abs(this.velocity.x);
        var forceY = (-0.5 *
            Cd *
            this.A *
            rho *
            this.velocity.y *
            this.velocity.y *
            this.velocity.y) /
            Math.abs(this.velocity.y);
        forceX = isNaN(forceX) ? 0 : forceX;
        forceY = isNaN(forceY) ? 0 : forceY;
        var accX = forceX / this.mass;
        var accY = ag + forceY / this.mass;
        this.velocity.x += accX * (deltaTime / 1000);
        this.velocity.y += accY * (deltaTime / 1000);
        this.position.x += this.velocity.x * (deltaTime / 1000) * 100;
        this.position.y += this.velocity.y * (deltaTime / 1000) * 100;
        this.handleCollision(particles);
    };
    Particle.prototype.handleCollision = function (particles) {
        var _this = this;
        if (this.position.y > 300 - this.radius) {
            this.velocity.y *= this.restitution;
            this.position.y = 300 - this.radius;
        }
        if (this.position.x > 300 - this.radius) {
            this.velocity.x *= this.restitution;
            this.position.x = 300 - this.radius;
        }
        if (this.position.x < this.radius) {
            this.velocity.x *= this.restitution;
            this.position.x = this.radius;
        }
        particles.forEach(function (o) {
            if (_this === o)
                return;
            var oX = o.position.x;
            var tX = _this.position.x;
            var oY = o.position.y;
            var tY = _this.position.y;
            var collisionXRight = tX - _this.radius > oX && tX - _this.radius < oX + o.radius;
            var collisionXLeft = tX + _this.radius < oX && tX + _this.radius > oX - o.radius;
            var collisionYTop = tY + _this.radius < oY && tY + _this.radius > oY - o.radius;
            var collisionYBottom = tY - _this.radius > oY && tY - _this.radius < oY + o.radius;
        });
        // FRICTION
        if (this.position.y === 300 - this.radius) {
            if (Math.abs(this.velocity.x) < 0.05)
                this.velocity.x = 0;
            else if (this.velocity.x < 0.05)
                this.velocity.x += 0.005;
            else if (this.velocity.x > 0.05)
                this.velocity.x -= 0.005;
        }
    };
    Particle.prototype.render = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.fill();
    };
    return Particle;
}());
exports.default = Particle;
//# sourceMappingURL=Particle.js.map