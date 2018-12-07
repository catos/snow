// import * as Vector2 from './vector2.js';

/**
 * http://www.somethinghitme.com/2013/11/13/snippets-i-always-forget-movement/
 * https://developer.mozilla.org/en-US/docs/Games/Techniques
 */

; (function () {

    // Init
    var canvas = document.getElementById('snow-canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fps = 30;
    const fpsInterval = 1000 / fps; // 1000 / 30 = 33.333 ms per frame
    let now = 0;
    let then = 0;
    let dt = 0;
    let elapsed = 0;

    function start() {
        then = performance.now();

        // Start the loop
        main();
    }

    function main() {
        requestAnimationFrame(main);

        now = performance.now();
        dt = now - then;

        let elapsed = now - then;

        if (elapsed > fpsInterval) {
            update(dt);
            render(dt);
            debug(dt);
            then = now;
        }

    }

    function update(dt) {
        // move snowflakes
        snowflakes = snowflakes.map(p => {
            // p.x += p.velocity.x;
            p.x += Math.sin(p.velocity.y / 25) / 2;
            p.y += p.velocity.y;
            return p;
        });
    }

    function render(dt) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // TODO: move
        snowflakes.forEach(p => renderSnowflake(p));
    }

    function debug(dt) {
        ctx.beginPath();
        ctx.font = '14px serif';
        ctx.fillStyle = `rgb(255, 255, 255, 1)`;
        ctx.fillText(`now: ${Math.round(now)}`, 20, 20);
        ctx.fillText(`then: ${Math.round(then)}`, 20, 40);
        ctx.fillText(`elapsed: ${Math.round(elapsed)}`, 20, 60);
        ctx.fillText(`dt: ${Math.round(dt)}`, 20, 80);
        ctx.closePath();
    }

    start();

    /**
     * MOVE STUFF BELOW
     */

    let snowflakes = [];
    for (let i = 0; i < 100; i++) {
        snowflakes.push({
            x: Math.floor(Math.random() * canvas.width),
            y: 0,
            age: 0,
            velocity: new Vector2(0, 1), //randomBetween(1, 3)
            opacity: randomBetween(.1, .8),
            radius: randomBetween(2, 4)
        });
    }

    function renderSnowflake(snowflake) {
        ctx.beginPath();
        ctx.fillStyle = `rgb(255, 255, 255, ${snowflake.opacity})`;
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = `blue`;
        ctx.moveTo(snowflake.x, snowflake.y);
        ctx.lineTo(snowflake.x + snowflake.velocity.x * 10, snowflake.y + snowflake.velocity.y * 10);
        ctx.stroke();
        ctx.closePath();
    }

    function randomBetween(min, max, round = false) {
        const result = Math.random() * (max - min) + min;
        return !round ? result : Math.floor(result);
    }

})();