const input = document.getElementById('user-input');
const texto = document.getElementById('prompt-text');
const btnContainer = document.getElementById('botones-container');
const rep = document.getElementById('reproductor');
let etapa = 1;

// Playlist completa integrada
const playlist = [
    { nombre: "TILL YOU TELL ME TO LEAVE - TV GIRL", src: "songs/song1.mp3" },
    { nombre: "HEAVEN IS A BEDROOM - TV GIRL", src: "songs/song2.mp3" },
    { nombre: "LOVERS ROCK - TV GIRL", src: "songs/song3.mp3" },
    { nombre: "VEO TAN DENTRO - DEPRESION SONORA", src: "songs/song4.mp3" },
    { nombre: "DONDE ESTAN MIS AMIGOS - DEPRESION SONORA", src: "songs/song5.mp3" },
    { nombre: "AMOR DE SIEMPRE - CUCO", src: "songs/song6.mp3" },
    { nombre: "AURA - CUCO", src: "songs/song7.mp3" },
    { nombre: "SI ME VOY - CUCO", src: "songs/song8.mp3" },
    { nombre: "LO QUE SIENTO - CUCO", src: "songs/song9.mp3" },
    { nombre: "MI INFINITA - CUCO", src: "songs/song10.mp3" },
    { nombre: "MY KIND OF WOMAN - MAC DEMARCO", src: "songs/song11.mp3" },
    { nombre: "SWEET - CIGARETTES AFTER SEX", src: "songs/song12.mp3" },
    { nombre: "FRANCES LIMON - ENANITOS VERDES", src: "songs/song13.mp3" },
    { nombre: "FRIENDS - LOS RETROS", src: "songs/song14.mp3" },
    { nombre: "SOMEONE TO SPEND TIME WITH - LOS RETROS", src: "songs/song15.mp3" },
    { nombre: "FIRE AND THE THUD - ARCTIC MONKEYS", src: "songs/song16.mp3" }
];

let indice = 0;
let audio = new Audio();

async function cambiarTexto(nuevoTexto) {
    texto.style.opacity = '0';
    await new Promise(r => setTimeout(r, 800));
    texto.innerText = nuevoTexto;
    texto.style.opacity = '1';
}

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const val = input.value.trim().toUpperCase();
        if (etapa === 1 && val === "MWW") {
            cambiarTexto("¿POR QUÉ NOS CONOCIMOS?"); etapa = 2;
        } else if (etapa === 2 && val === "TV GIRL") {
            cambiarTexto("20-5-1-13-15-19-1-18-1"); etapa = 3;
        } else if (etapa === 3 && val === "TE AMO SARA") {
            input.style.display = 'none';
            iniciarConfesion();
        } else {
            let p = "ERROR.";
            if (etapa === 1) p = "PISTA: INICIALES 'MY WHOLE WORLD'";
            else if (etapa === 2) p = "PISTA: NUESTRA BANDA FAVORITA";
            else if (etapa === 3) p = "PISTA: A=1, B=2, C=3 (NUMÉRICO)";
            cambiarTexto(p);
        }
        input.value = '';
    }
});

async function iniciarConfesion() {
    const frases = ["Supongo que todo el tiempo fui penoso...", "Desde el instante que te vi, supe que eras la correcta.", "Te amaré toda la vida.", "¿QUIERES SER MI NOVIA?"];
    for (let f of frases) {
        await cambiarTexto(f);
        await new Promise(r => setTimeout(r, 2500));
    }
    btnContainer.innerHTML = '<button onclick="iniciarRep()">SÍ</button><button onclick="alert(\'Inténtalo de nuevo, jaja\')">NO</button>';
}

function iniciarRep() {
    btnContainer.style.opacity = '0';
    texto.style.display = 'none'; 
    
    setTimeout(() => {
        btnContainer.style.display = 'none';
        rep.style.display = 'block';
        setTimeout(() => { rep.style.opacity = '1'; }, 100);
        audio.src = playlist[0].src;
        document.getElementById('track-name').innerText = playlist[0].nombre;
        audio.play();
    }, 800);
}

function toggleAudio() { audio.paused ? audio.play() : audio.pause(); }

function cambiarCancion(dir) {
    rep.style.opacity = '0';
    setTimeout(() => {
        indice = (indice + dir + playlist.length) % playlist.length;
        audio.src = playlist[indice].src;
        document.getElementById('track-name').innerText = playlist[indice].nombre;
        audio.play();
        rep.style.opacity = '1';
    }, 500);
}