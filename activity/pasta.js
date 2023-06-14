const canvas = document.getElementById("interactive");

let width = window.innerWidth,
  height = window.innerHeight;

const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Body = Matter.Body,
  Mouse = Matter.Mouse,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Composites = Matter.Composites;

const engine = Engine.create(),
  world = engine.world;

const render = Render.create({
  engine: engine,
  canvas: canvas,
  options: {
    showAngleIndicator: false,
    wireframes: false,
    background: "#efefe8",
    width: width,
    height: height,
    showAngleIndicator: false,
    showCollisions: false,
    showVelocity: false
  }
});

const runner = Runner.create();
Runner.run(runner, engine);

const ground = Bodies.rectangle(width / 2, height + 100, width, 80, {
  isStatic: true,
  label: "ground",
  render: {
    visible: false
  }
});

Matter.Events.on(engine, "collisionStart", function(event) {
  let pairs = event.pairs;
  pairs.forEach(function(pair) {
    if (pair.bodyB.label === "noodle" && pair.bodyA.label === "ground") {
      Matter.World.remove(world, pair.bodyB, [(deep = true)]);
      noodleRestrictor();
    }
  });
});

const noodleLength = 30;
var noodle0 = "#edd683";
var noodle1 = "#f0dd99";
let noodlesDropped = 0;
let noodlesCount = 0;
let noodlesMax = 16;
let noodleTimeout = noodleLength;

const noodleRestrictor = function() {
  noodleTimeout--;
  if (noodleTimeout <= 0) {
    World.add(engine.world, noodle());
    noodleTimeout = noodleLength;
  }
};

const noodle = function() {
  let random = Math.floor(Math.random() * 100 - 50);
  let type = noodle0;
  if (noodlesDropped % 2 === 0) {
    type = noodle1;
  }
  noodlesDropped++;
  const particleOptions = {
      friction: 0.05,
      frictionAir: 0.1,
      label: "noodle",
      render: { visible: false }
    },
    constraintOptions = {
      stiffness: 0.06,
      render: {
        strokeStyle: type,
        lineWidth: 6
      }
    };
  return Composites.softBody(
    width / 2 + random,
    -400,
    1,
    noodleLength,
    5,
    5,
    false,
    4,
    particleOptions,
    constraintOptions
  );
};

let chopstickLength = width / 2;
if (chopstickLength > 500) {
  chopstickLength = 500;
}

let chopstick1 = Bodies.rectangle(
  width / 2 + chopstickLength / 2,
  height / 4,
  chopstickLength,
  8,
  {
    friction: 0,
    isStatic: true,
    render: {
      fillStyle: "#e45655"
    },
    angle: -Math.PI * 0.07
  }
);

let chopstick2 = Bodies.rectangle(
  width / 2 + chopstickLength / 2,
  height / 4 + 30,
  chopstickLength,
  8,
  {
    friction: 0,
    isStatic: true,
    render: {
      fillStyle: "#e45655"
    },
    angle: -Math.PI * 0.06
  }
);

World.add(world, [chopstick1, chopstick2]);

const mouse = Mouse.create(render.canvas);

Matter.Events.on(engine, "afterUpdate", function() {

  if (!mouse.position.x) {
    return;
  }
  const limit = width / 2 + chopstickLength / 3;
  let position = mouse.position.x;
  if (mouse.position.x < limit) {
    position = limit;
  }
  const offset1 = {
    x: 0,
    y: width * 0.02
  };
  const offset2 = {
    x: 0,
    y: width * 0.04 + 5
  };
  Body.translate(chopstick1, {
    x: (position - chopstick1.position.x - offset1.x) * 0.1,
    y: (mouse.position.y - chopstick1.position.y + offset1.y) * 0.1
  });
  Body.translate(chopstick2, {
    x: (position - chopstick2.position.x - offset2.x) * 0.1,
    y: (mouse.position.y - chopstick2.position.y + offset2.y) * 0.1
  });
});

let addNoodles = true;

window.addEventListener("mousedown", function() {
  Body.setAngle(chopstick1, -Math.PI * 0.075);
  Body.setAngle(chopstick2, -Math.PI * 0.055);
});

window.addEventListener("mouseup", function() {
  Body.setAngle(chopstick1, -Math.PI * 0.07);
  Body.setAngle(chopstick2, -Math.PI * 0.06);
});

World.add(engine.world, ground);

Engine.run(engine);
Render.run(render);

document.addEventListener("DOMContentLoaded", function(event) {
  addNoodles = setInterval(function() {
    if (noodlesCount > noodlesMax) {
      clearInterval(addNoodles);
      addNoodles = false;
      return;
    }
    World.add(engine.world, noodle());
    noodlesCount++;
  }, 200);
});
