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
        // console.log('update');
    }

    function render(dt) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall(dt);
        // console.log('render');
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

    function drawBall() {
        ctx.beginPath();
        ctx.fillStyle = `rgb(255, 255, 255, 1)`;
        ctx.arc(100, 100, 20, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
    }

})();