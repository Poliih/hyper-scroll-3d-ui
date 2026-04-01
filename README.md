<div align="center">
  
# 🔮 HYPER SCROLL 3D UI // REVELATION

> **Uma experiência web imersiva rodando a 60FPS. Matemática, Vanilla JS e Brutalismo Digital em um loop infinito.**

<br>

[![Acessar Live Demo](https://img.shields.io/badge/🔴_LIVE_DEMO-ACESSAR_SISTEMA-%23ff0040?style=for-the-badge)](https://hyper-scroll.poliihrodrigues.com.br/)

<br>

  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/Creative_Coding-FF0040?style=for-the-badge&logo=artstation&logoColor=white" alt="Creative Coding" />

</div>

<br>

**HYPER SCROLL // REVELATION** é um experimento de *Creative Web Design*. Construído sem frameworks reativos complexos (Zero React/Vue), o projeto utiliza apenas **Vanilla JavaScript** e a biblioteca **Lenis** para criar um túnel 3D responsivo, onde elementos HTML nativos flutuam em um eixo Z infinito.

A temática é um "Cyber-Gospel", misturando geometria brutalista, cores neon e referências teológicas (Heróis da Fé) em formato de base de dados militar.

## ⚡ Core Features

* **Creative Coding & Trigonometria:** O movimento ondulatório dos cards não é uma animação CSS estática. É gerado em tempo real por algoritmos que combinam `Math.sin()` e `Math.cos()`, criando um drift orgânico que reage à velocidade do scroll.
* **Motor de Loop Infinito:** Manipulação de scroll contínua onde a câmera virtual acumula distância, reciclando a posição dos elementos no eixo Z sem quebra de imersão.
* **HUD Reativo:** Interface (Heads-Up Display) que atualiza em tempo real a velocidade vetorial do usuário, coordenadas tridimensionais e monitoramento de FPS puro.
* **Glitch Dinâmico:** Efeitos de distorção de texto que escalam agressivamente dependendo da aceleração do usuário.
* **UI Brutalista (Clip-Path):** Design arquitetado com bordas cortadas, alto contraste e tipografia monoespaçada, forçando os limites do visual sci-fi usando apenas CSS moderno.

## 🧠 Under the Hood (Como funciona)

Em vez de renderizar via WebGL (Canvas/Three.js), este projeto injeta esteroides no DOM normal do navegador:

1.  **O Espaço:** Uma `div` principal tem a perspectiva cravada e reativa à velocidade do scroll (FoV dinâmico).
2.  **A Renderização:** O `requestAnimationFrame` calcula a distância de cada elemento relativo à câmera a cada frame.
3.  **A Otimização:** O cálculo de transparência (`opacity`) apaga elementos que ficam muito atrás ou muito distantes da câmera, poupando processamento de GPU.

## 🚀 Como Rodar Localmente

Por ser construído puramente em tecnologias nativas da web, não há necessidade de instalar dependências complexas (Node.js, NPM, etc).

1. Clone o repositório:
```bash
git clone https://github.com/Poliih/hyper-scroll-3d-ui.git
```
2. Abra a pasta do projeto.
3. Você pode simplesmente dar um duplo clique no arquivo `index.html` para abrir no navegador, ou utilizar a extensão **Live Server** do VS Code para uma experiência otimizada.

## 🛠️ Tecnologias Utilizadas

* **Vanilla JS:** Lógica de loop, injeção de DOM, e física matemática.
* **CSS3 Advanced:** Variáveis dinâmicas, `clip-path`, `transform-style: preserve-3d`, e text-strokes.
* **Lenis Scroll:** Biblioteca de smooth scroll com interpolação linear para garantir inércia e fluidez perfeitas na navegação.
