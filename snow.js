(function () {

    // Init
    var canvas = document.getElementById('snow-canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fps = 30;
    const fpsInterval = 1000 / fps;


    // GameState
    let state = {
        snowflakes: [],
        start: 0,
        elapsed: 0,
        prev: 0,
        frame: 0,

        colObjects: [
            { x: 200, y: 200, w: 400, h: 400 },
            { x: 500, y: 700, w: 300, h: 300 },
        ]
    };

    function init() {
        // Start the loop
        loop();
    }

    init();

    // Draw ground
    function drawColObjects() {
        ctx.beginPath();
        ctx.fillStyle = `rgb(255, 255, 255, 0.5)`;
        state.colObjects.map(p => {
            ctx.fillRect(p.x, p.y, p.w, p.h);
        });
        ctx.closePath();
    }

    // Creates a snowflake
    function snowflake() {
        state.snowflakes.push({
            x: Math.floor(Math.random() * canvas.width),
            y: -10,
            age: 0,
            velocity: randomBetween(1, 3), // randomBetween(.25, .75),
            opacity: randomBetween(.1, .8),
            radius: randomBetween(2, 4)
        });
    }

    function loop() {

        requestAnimationFrame(loop);

        const now = performance.now();
        state.elapsed = now - state.prev;

        if (state.elapsed > fpsInterval) {
            draw();
            update();
            debug();

            state.frame++;
            state.prev = now;
        }

    }

    function update() {
        // move snowflakes
        state.snowflakes = state.snowflakes.map(p => {
            p.y += p.velocity;
            if (p.velocity > 0) {
                p.x += Math.sin(p.y / 25) / 2;
            }
            return p;
        });

        // spawn new snowflakes
        if (state.frame % 2 === 0) {
            snowflake();
        }

        // check for collision
        state.colObjects.forEach(co => {
            state.snowflakes.forEach(sf => {
                if (isColliding(co, sf)) {
                    sf.velocity = 0;
                }
            });
        });

        // age snowflakes that has collided
        state.snowflakes = state.snowflakes.map(p => {
            if (p.velocity === 0) {
                p.age++;
            }
            return p;
        });

        // remove snowflakes out of screen
        state.snowflakes = state.snowflakes.filter(p => p.y < canvas.height + 50);
        
        // remove totally melted snowflakes
        state.snowflakes = state.snowflakes.filter(p => p.age < 30 * 60 * 3);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw collidable objects
        drawColObjects();

        state.snowflakes.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = `rgb(255, 255, 255, ${p.opacity})`;
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
        });
    }

    function debug() {
        ctx.beginPath();
        ctx.font = '14px serif';
        ctx.fillStyle = `rgb(255, 255, 255, 1)`;
        ctx.fillText(`flakes: ${state.snowflakes.length}`, 20, 100);
        ctx.fillText(`start: ${Math.floor(performance.now())}`, 20, 120);
        ctx.fillText(`now: ${Math.floor(performance.now())}`, 20, 140);
        ctx.fillText(`elapsed: ${Math.floor(state.elapsed)}`, 20, 160);
        ctx.fillText(`prev: ${Math.floor(state.prev)}`, 20, 180);
        ctx.fillText(`frame: ${Math.floor(state.frame)}`, 20, 200);
        ctx.closePath();
    }

    function isColliding(colObject, snowflake) {
        if (snowflake.opacity < .3 || snowflake.opacity > .6) {
            return false;
        }

        if (snowflake.x >= colObject.x && snowflake.x <= (colObject.x + colObject.w) &&
            snowflake.y >= colObject.y && snowflake.y <= (colObject.y + colObject.h)) {
            return true;
        }
        return false;
    }

    function randomBetween(min, max, round = false) {
        const result = Math.random() * (max - min) + min;
        return !round ? result : Math.floor(result);
    }

})();