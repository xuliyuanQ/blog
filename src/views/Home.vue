<template>
  <div class="home">
    <canvas></canvas>
    <div class="desktop">
      <div class="menuBtn">
        <el-button @click="showMenu">
          <i class="el-icon-menu el-icon--left"></i>
          <span>MENU</span>
        </el-button>
      </div>
      <transition name="fade">
        <div class="menu" v-if="show">
          <p>hello</p>
        </div>
      </transition>
      <div class="arrowDown">
        <i class="el-icon-arrow-down"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
declare var document: Document | any;
@Component({})
export default class Home extends Vue {
  mounted(): void {
    console.log(123123);

    var canvas: any = document.querySelector("canvas");
    var c: any = canvas.getContext("2d");

    canvas.height = innerHeight;
    canvas.width = innerWidth;

    document.documentElement.style.overflow = "hidden";

    // Declarations --------------------
    var mouse: any = {
      x: 0,
      y: 0
    };
    // Utilities ----------------------

    function randomIntFromRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Bubbles -------------------------
    var Bubbles: any = function(x: any, y: any, radius: any) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = {
        bg: "rgba(255, 255, 255, 0.45)"
      };
      this.velocity = {
        x: (Math.random() - 0.5) * 0.5,
        y: Math.random() * 2
      };
      this.opacity = 1;
    };
    Bubbles.prototype.draw = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color.bg;
      c.fill();
      c.closePath();
    };
    Bubbles.prototype.update = function() {
      this.y -= this.velocity.y;
      this.draw();
    };

    // Mini Bubbles ---------------

    var miniBubbles: any = function(x: any, y: any, radius: any) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = {
        bg: "rgba(255, 255, 255, 0.45)"
      };
      this.velocity = {
        x: (Math.random() - 0.5) * 0.6,
        y: (Math.random() - 1) * 0.5
      };
      this.gravity = -0.03;
      this.timeToLive = 500;
    };
    miniBubbles.prototype.draw = function() {
      c.save();
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color.bg;
      c.fill();
      c.closePath();
      c.restore();
    };
    miniBubbles.prototype.update = function() {
      if (this.y - this.radius < 0) {
        this.velocity.y = this.velocity.y;
      } else {
        this.velocity.y += this.gravity;
      }
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.timeToLive -= 1;
      this.draw();
    };

    const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
    // backgroundGradient.fillStyle="#009cff";
    backgroundGradient.addColorStop(0, "#222222");
    var bubbles = [];
    var minibubbles = [];
    var timer = 0;
    var spawnRate = 99;

    function init() {
      bubbles = [];
      minibubbles = [];
    }

    function animate() {
      requestAnimationFrame(animate);
      //background linear gradient ------------
      c.fillStyle = backgroundGradient;
      c.fillRect(0, 0, canvas.width, canvas.height);

      // Render the Bubbles -------------------
      bubbles.forEach((bubble, index) => {
        bubble.update();
        if (bubble.radius == 0) {
          bubbles.splice(index, 1);
        }
      });
      minibubbles.forEach((minibubble, index) => {
        minibubble.update();
        if (minibubble.timeToLive == 0) {
          minibubbles.splice(index, 1);
        }
      });

      timer++;
      if (timer % spawnRate == 0) {
        const radius = randomIntFromRange(15, 30);
        const minradius = Math.random() * 2 + 1;
        // const radius = 15;
        const x = Math.max(radius, Math.random() * canvas.width - radius);
        const y = innerHeight + 100;
        bubbles.push(new Bubbles(x, y, radius));
        minibubbles.push(new miniBubbles(x, y, minradius));
        spawnRate = randomIntFromRange(70, 200);
      }

      //  When Hover over the bubbles ------------------
      for (var i = 0; i < bubbles.length; i++) {
        if (
          mouse.x > bubbles[i].x - bubbles[i].radius &&
          mouse.x < bubbles[i].x + bubbles[i].radius
        ) {
          if (
            mouse.y > bubbles[i].y - bubbles[i].radius &&
            mouse.y < bubbles[i].y + bubbles[i].radius
          ) {
            var x = bubbles[i].x;
            var y = bubbles[i].y;
            var radius = Math.random() * 2 + 1;
            bubbles[i].radius -= bubbles[i].radius;
            for (let a = 0; a < Math.random() * 4 + 4; a++) {
              minibubbles.push(new miniBubbles(x, y, radius));
            }
          }
        }
      }
    }

    // Event Listener ---------------

    canvas.addEventListener("mousemove", mouseMove);

    function mouseMove(e) {
      mouse.x = e.offsetX;
      mouse.y = e.offsetY;
    }
    addEventListener("resize", function() {
      canvas.height = innerHeight;
      canvas.width = innerWidth;
      init();
    });

    //  call ---------------
    animate();
    init();
  }
  private show: boolean = false;
  private showMenu(): void {
    this.show = !this.show;
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}

body {
  color: #fefefe;
  padding: 0;
  margin: 0;
  .desktop {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    .menuBtn {
      position: fixed;
      top: 30px;
      left: 30px;
      ::v-deep .el-button {
        color: #f2f2f2;
        background-color: #222222;
        padding: 12px 30px;
        .el-icon--left {
          margin-left: -15px;
          span {
            margin-left: 15px;
            font-size: 20px;
          }
        }
      }
    }
    .menu {
      width: 350px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid red;
    }
    .fade-enter {
      transform: translateX(-350px);
    }
    .fade-enter-active {
      transition: all 0.4s ease;
    }
    .arrowDown {
      position: absolute;
      bottom: 50px;
      left: 0px;
      right: 0px;
      -webkit-animation: arrowDown-animation 1.5s linear infinite;
      animation: arrowDown-animation 1.5s linear infinite;
      .el-icon-arrow-down {
        font-size: 50px;
        color: #fefefe;
      }
    }
    @-webkit-keyframes arrowDown-animation {
      25% {
        -webkit-transform: translateY(10px);
      }
      50%,
      100% {
        -webkit-transform: translateY(0);
      }
      75% {
        -webkit-transform: translateY(-10px);
      }
    }
    @keyframes arrowDown-animation {
      25% {
        transform: translateY(10px);
      }
      50%,
      100% {
        transform: translateY(0);
      }
      75% {
        transform: translateY(-10px);
      }
    }
  }
}
</style>