(function () {

    // Init
    var canvas = document.getElementById('snow-canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // GameState
    let gs = {
        snowflakes: [],
        dt: 0,
        dtAcc: 0,
        prev: 0,
    };

    loop();

    function snowFlake() {
        gs.snowflakes.push({
            x: Math.floor(Math.random() * canvas.width),
            y: -10,
            velocity: randomBetween(.25, .75),
            opacity: randomBetween(.25, .75),
            radius: randomBetween(2, 4)
        });
    }

    function loop() {
        const now = performance.now();
        gs.dt = now - gs.prev;
        gs.dtAcc = gs.dtAcc > 100 ? 0 : gs.dtAcc + gs.dt;

        draw();
        update();
        debug();

        gs.prev = now;
        requestAnimationFrame(loop);
    }

    function update() {
        // move snowflakes
        gs.snowflakes = gs.snowflakes.map(p => {
            p.y += p.velocity;
            p.x += Math.sin(p.y / 10) / 10;
            return p;
        });

        // spawn new snowflakes
        if (gs.dtAcc === 0) {
            snowFlake();
        }


        // remove snowflakes out of screen
        gs.snowflakes = gs.snowflakes.filter(p => p.y < canvas.height + 50);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gs.snowflakes.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = `rgb(255, 255, 255, ${p.opacity})`;
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
        })
    }

    function debug() {
        ctx.beginPath();
        ctx.font = '14px serif';
        ctx.fillStyle = `rgb(255, 255, 255, 1)`;
        ctx.fillText(`flakes: ${gs.snowflakes.length}`, 20, 100);
        ctx.fillText(`now: ${Math.floor(performance.now())}`, 20, 125);
        ctx.fillText(`dt: ${Math.floor(gs.dt)}`, 20, 150);
        ctx.fillText(`dtAcc: ${Math.floor(gs.dtAcc)}`, 20, 175);
        ctx.fillText(`prev: ${Math.floor(gs.prev)}`, 20, 200);
        ctx.closePath();
    }

    function randomBetween(min, max, round = false) {
        const result = Math.random() * (max - min) + min;
        return !round ? result : Math.floor(result);
    }
})();