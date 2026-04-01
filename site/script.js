const CONFIG = {
    itemCount: 16,
    zGap: 900,
    camSpeed: 2.8
};

CONFIG.loopSize = CONFIG.itemCount * CONFIG.zGap;

const HEROES = [
    { name: "YESHUA", ref: "APOC 19:16", status: "REI DOS REIS", grace: "SALVAÇÃO" },
    { name: "MIGUEL", ref: "APOC 12:7", status: "ARCANJO", grace: "GUERRA" },
    { name: "MOISÉS", ref: "ÊXODO 14", status: "LIBERTADOR", grace: "LIDERANÇA" },
    { name: "DAVI", ref: "1 SAM 17", status: "UNGIDO", grace: "ADORAÇÃO" },
    { name: "ESTER", ref: "ESTER 4:14", status: "RAINHA", grace: "CORAGEM" },
    { name: "PEDRO", ref: "MAT 16:18", status: "APÓSTOLO", grace: "FÉ INABALÁVEL" },
    { name: "PAULO", ref: "ROM 1:1", status: "MISSIONÁRIO", grace: "REVELAÇÃO" },
    { name: "ELIAS", ref: "1 REIS 18", status: "PROFETA", grace: "FOGO" }
];

const state = {
    scroll: 0,
    virtualZ: 0,
    velocity: 0,
    targetSpeed: 0
};

const world = document.getElementById('world');
const viewport = document.getElementById('viewport');
const fpsEl = document.getElementById('fps');
const velEl = document.getElementById('vel-readout');
const coordEl = document.getElementById('coord');

const items = [];

for (let i = 0; i < CONFIG.itemCount; i++) {
    const el = document.createElement('div');
    el.className = 'item';

    const isText = i % 2 === 0;
    
    const dataIndex = Math.floor(i / 2) % HEROES.length;
    const hero = HEROES[dataIndex];

    if (isText) {
        const txt = document.createElement('div');
        txt.className = 'big-text';
        txt.innerText = hero.name;
        txt.setAttribute('data-text', hero.name);
        el.appendChild(txt);

        const textX = (Math.random() - 0.5) * 60;

        items.push({ el, type: 'text', baseZ: -i * CONFIG.zGap, x: textX, y: 0, rot: 0 });
    } else {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <div class="card-header">SCROLL // ${hero.ref}</div>
            <h2>${hero.name}</h2>
            <div class="tech-specs">
                <div class="spec-line">
                    <span>STATUS</span>
                    <span class="neon-text-blue">${hero.status}</span>
                </div>
                <div class="spec-line">
                    <span>GIFT / DOM</span>
                    <span>${hero.grace}</span>
                </div>
                <div class="spec-line">
                    <span>SPIRIT</span>
                    <span class="neon-text-yellow">ALIVE</span>
                </div>
            </div>
            <div class="card-accent"></div>
        `;
        el.appendChild(card);

        const side = (i % 4 === 1) ? 1 : -1; 
        
        const x = side * (120 + Math.random() * 100); 
        const y = (Math.random() - 0.5) * 150;
        const rot = (Math.random() - 0.5) * 15;

        items.push({ el, type: 'card', baseZ: -i * CONFIG.zGap, x, y, rot });
    }
    world.appendChild(el);
}

const lenis = new Lenis({ 
    lerp: 0.08,
    infinite: true 
});

lenis.on('scroll', ({ scroll, velocity }) => {
    state.scroll = scroll;
    state.targetSpeed = velocity;
});

let lastTime = performance.now();
let frames = 0;

function raf(time) {
    const t = time * 0.001;
    
    frames++;
    if (time - lastTime >= 1000) {
        fpsEl.innerText = frames;
        frames = 0;
        lastTime = time;
    }

    velEl.innerText = Math.abs(state.velocity).toFixed(2);
    coordEl.innerText = (state.scroll * 0.1).toFixed(3);

    const isScrolling = Math.abs(state.velocity) > 0.5;

    document.querySelectorAll('.big-text').forEach(el => {
        if (isScrolling) {
            el.classList.add('glitch');
            if (Math.abs(state.velocity) > 30) {
                el.style.transform = `skewX(${Math.random() * 20 - 10}deg)`;
            }
        } else {
            el.classList.remove('glitch');
            el.style.transform = `skewX(0deg)`;
        }
    });

    lenis.raf(time);
    // state.velocity += (state.targetSpeed - state.velocity) * 0.1;
    state.velocity += (state.targetSpeed - state.velocity) * 0.1;
    state.virtualZ += state.velocity * CONFIG.camSpeed;
    
    const cameraZ = state.virtualZ;

    // const cameraZ = state.scroll * CONFIG.camSpeed;
    const corridorOffset = Math.sin(state.scroll * 0.0015) * 80 + Math.cos(state.scroll * 0.003) * 40;

    items.forEach((item, i) => {
        let relZ = item.baseZ + cameraZ;
        const mod = CONFIG.loopSize;
        let z = ((relZ % mod) + mod) % mod;

        if (z > 600) z -= mod;

        const dist = Math.abs(z);
        const waveStrength = Math.max(0, 1 - dist / 1800);

        const wave1 = Math.sin(state.scroll * 0.0015 + i * 0.3);
        const wave2 = Math.cos(state.scroll * 0.0022 + i * 0.7);
        const organicWave = (wave1 + wave2 * 0.6);
        const drift = Math.sin(t * 1.2 + i) * 30;

        const waveX = organicWave * waveStrength * 150 + drift;
        const noiseY = Math.sin(t * 0.8 + i) * 15 + Math.cos(t * 0.4 + i * 0.5) * 10;

        const finalX = item.x + waveX + corridorOffset;
        const finalY = item.y + noiseY;

        let alpha = 1;
        if (z < -4000) alpha = 0;
        else if (z < -2500) alpha = (z + 4000) / 1500;
        if (z > 200) alpha = 1 - ((z - 200) / 400);

        item.el.style.opacity = alpha;

        let extraRot = item.rot;
        if (isScrolling && item.type === 'card') {
            extraRot += (Math.random() - 0.5) * Math.abs(state.velocity) * 0.2;
        }

        let transform = `
            translate(-50%, -50%)
            translate3d(${finalX}px, ${finalY}px, ${z}px)
        `;

        if (item.type === 'card') {
            transform += ` rotateZ(${extraRot}deg)`;
        }

        item.el.style.transform = transform;
    });

    world.style.transform = `
        translateX(${corridorOffset * -0.1}px)
        rotateX(${state.velocity * -0.2}deg)
        rotateY(${state.velocity * 2}deg)
    `;

    const fov = 1000 - Math.min(Math.abs(state.velocity) * 25, 750);
    viewport.style.perspective = `${fov}px`;

    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);