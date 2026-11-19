# Super Mario Bros XYZ

Motor de juego en consola desarrollado en C++ para el curso de **Programación II** (UTEC). El proyecto implementa las mecánicas clásicas de plataformas lateral mediante programación orientada a objetos, gestión dinámica de memoria y renderizado por terminal usando secuencias de escape ANSI.

## Arquitectura del Proyecto

El código está dividido en módulos independientes para separar la lógica del tablero, el renderizado y el comportamiento de cada objeto en pantalla:

* **`Mundo` (`Mundo.h`, `Mundo.cpp`):** Administra el bucle principal, el ciclo de vida de los objetos y la matriz bidimensional dinámica (`int** matrizMundo`) que representa el nivel.
* **`Entidad` (`Entidad.h`, `Entidad.cpp`):** Clase base polimórfica que define posición, dimensiones y detección de colisiones AABB (Axis-Aligned Bounding Box).
* **`Mario` (`Mario.h`, `Mario.cpp`):** Controla el movimiento del jugador, gravedad, salto y estados al interactuar con enemigos o bloques.
* **`Goomba` (`Goomba.h`, `Goomba.cpp`):** Implementa el desplazamiento horizontal y las colisiones básicas de los enemigos terrestres.
* **`BloqueEstatico` (`BloqueEstatico.h`, `BloqueEstatico.cpp`):** Representa plataformas, suelo y obstáculos fijos del mapa.
* **`Colores` y `Sprites` (`Colores.h`, `Colores.cpp`, `Sprites.h`):** Mapeo de identificadores numéricos a colores ANSI mediante `std::unordered_map` y definición de matrices de caracteres para cada elemento gráfico.

## Decisiones Técnicas

* **Colisiones en $O(1)$:** Se utiliza un mapa espacial (`std::unordered_map`) para indexar las entidades activas por coordenadas, evitando recorrer todo el arreglo de objetos en cada frame.
* **Memoria Dinámica Explícita:** Tanto la grilla del nivel como las instancias polimórficas se asignan en el heap y se liberan manualmente al finalizar la ejecución para evitar fugas de memoria.
* 
## Requisitos y Compilación

Necesitas un compilador compatible con **C++17** (GCC, Clang o MSVC) y **CMake** (3.10 o superior), además de una terminal con soporte para colores ANSI (Windows Terminal, Kitty, Alacritty, GNOME Terminal, etc.).