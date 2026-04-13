# 🚗 Trafic Car Game

🎮 Videojuego 2D desarrollado con **HTML5 Canvas API + JavaScript + Bootstrap + CSS Glassmorphism**

---

## 👨‍💻 PROGRAMADOR

Este proyecto fue desarrollado por:

**Jean Samuel Laroque**  
📘 Ingeniería en Sistemas Computacionales  
💻 Programación Web – 2026  

---

## 📁 RUTA DEL PROYECTO

Estructura recomendada del proyecto:
Trafic-Car-Game/
│
├── index.html
├── README.md
│
├── assets/
│   ├── css/
│   │   └── styles.css
│   │
│   ├── js/
│   │   └── main.js
│   │
│   ├── img/
│   │   ├── player.png
│   │   ├── enemy1.png
│   │   ├── enemy2.png
│   │   ├── enemy3.png
│   │   ├── enemy4.png
│   │   ├── enemy5.png
│   │   ├── road.jpg
│   │   ├── fondo.jpg
│   │   ├── cursor.png
│   │   └── favicon.png
│
└── docs/ (opcional)
    └── documentación.pdf



---

## 🧩 CONTEXTO

El presente proyecto consiste en el desarrollo de un videojuego tipo “endless runner” donde el jugador controla un vehículo en una carretera con múltiples carriles.

El sistema fue desarrollado utilizando:

- HTML5 Canvas API
- JavaScript Vanilla
- Bootstrap 5
- CSS Glassmorphism
- LocalStorage


El videojuego simula una carretera con múltiples carriles donde el jugador controla un vehículo y debe evitar obstáculos (enemigos) generados de forma aleatoria.

El proyecto se desarrolla con fines académicos para aplicar conceptos de:

Programación en JavaScript
Manipulación de gráficos en Canvas
Eventos de teclado y mouse
Animación en tiempo real
Lógica de videojuegos

---

## 🎯 OBJETIVO
El objetivo principal es desarrollar un videojuego interactivo que permita:

Controlar un vehículo en diferentes carriles
Evitar colisiones con enemigos en movimiento
Incrementar la dificultad progresivamente según el nivel
Registrar la puntuación del jugador y su récord (High Score)

Además, se busca aplicar habilidades como:

Manejo de eventos en tiempo real
Detección de colisiones
Generación aleatoria de objetos
Uso de LocalStorage para persistencia de datos

---

## 💡 JUSTIFICACIÓN

Este proyecto es importante porque permite integrar conocimientos teóricos y prácticos del desarrollo web moderno.

El uso de la Canvas API facilita la creación de gráficos y animaciones en tiempo real dentro del navegador, mientras que JavaScript permite controlar la lógica del videojuego.

Asimismo, el proyecto mejora habilidades como:

Lógica de programación
Resolución de problemas
Diseño de interfaces interactivas
Experiencia de usuario (UX)

La implementación de un sistema de enemigos con diferentes velocidades (enemy4 más rápido y enemy5 más lento) añade dinamismo y dificultad progresiva al juego.

---

## ⚙️ OPERACIÓN DEL VIDEOJUEGO

El funcionamiento del videojuego se basa en las siguientes mecánicas:

🎮 Inicio del juego
El juego inicia al presionar cualquier tecla
Se muestra una pantalla inicial con instrucciones básicas
🚗 Control del jugador
⬅️➡️ Movimiento entre carriles
⬆️⬇️ Movimiento vertical del vehículo
P: Pausa del juego 🚧 ENEMIGOS (5 TIPOS)

Los enemigos aparecen aleatoriamente en los carriles y se desplazan hacia abajo.

El juego incluye 5 tipos de enemigos:
| Tipo | Descripción |
|------|------------|
| enemy1 | velocidad normal 🚗 |
| enemy2 | velocidad normal 🚗 |
| enemy3 | velocidad normal 🚗 |
| enemy4 | 🔥 más rápido (mayor dificultad) |
| enemy5 | 🐢 más lento (más fácil de esquivar) |

Cada enemigo tiene velocidad dinámica según su tipo  
Se generan aleatoriamente en carriles  
Aumentan la dificultad con el nivel  
Cada enemigo tiene comportamiento dinámico según el nivel del jugador.

---

Este proyecto demuestra la capacidad del desarrollador **Jean Samuel Laroque** para integrar:

- Lógica de programación
- Animaciones en Canvas
- Diseño UI moderno (Glassmorphism)
- Manejo de eventos y colisiones
- Persistencia de datos

---


Proyecto desarrollado por Jean Samuel Laroque, demostrando habilidades en desarrollo web interactivo y diseño de videojuegos 2D con tecnologías modernas.