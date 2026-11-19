// Mundo.cpp – implementación del motor principal del juego.
// Contiene la lógica de inicialización, renderizado, movimiento, colisiones y persistencia.
#include <iostream>
#include "Mundo.h"
#include "Colores.h"

Mundo::Mundo() {
    // Reservar la matriz 2D que representa el mundo.
    matrizMundo = new int*[FILAS];
    for (int i = 0; i < FILAS; i++) {
        matrizMundo[i] = new int[COLUMNAS];
        for (int j = 0; j < COLUMNAS; j++) {
            matrizMundo[i][j] = 0; // cielo inicial (código 0).
        }
    }
    jugador = nullptr;
    offsetCamara = 0;
    monedas = 0;
    juegoIniciado = false;
    juegoTerminado = false;
    nivelSuelo = FILA_INICIO_PISO - 16; // posición Y donde Mario se apoya.
}

Mundo::~Mundo() {
    // Liberar la matriz dinámica.
    for (int i = 0; i < FILAS; i++) {
        delete[] matrizMundo[i];
    }
    delete[] matrizMundo;
    // Borrar todas las entidades creadas.
    for (Entidad* e : entidades) {
        delete e;
    }
    entidades.clear();
}

void Mundo::crearPiso() {
    // Rellenar las filas del suelo con el código de ladrillo (1).
    for (int i = FILA_INICIO_PISO; i < FILAS; i++) {
        for (int j = 0; j < COLUMNAS; j++) {
            matrizMundo[i][j] = 1;
        }
    }
}

void Mundo::create_world() {
    crearPiso();
    int alturaArbol = 7;
    int alturaGoomba = 16;
    int filaBloques = 7;
    int arbolY = FILA_INICIO_PISO - alturaArbol;
    int goombaY = FILA_INICIO_PISO - alturaGoomba;
    // Crear al jugador y añadirlo al vector de entidades.
    jugador = new Mario(1, nivelSuelo);
    entidades.push_back(jugador);
    // Bloques estáticos del escenario.
    entidades.push_back(new BloqueEstatico(21, arbolY, "arbol"));
    entidades.push_back(new BloqueEstatico(29, arbolY, "arbol"));
    entidades.push_back(new BloqueEstatico(37, arbolY, "arbol"));
    entidades.push_back(new BloqueEstatico(98, arbolY, "arbol"));
    entidades.push_back(new BloqueEstatico(135, 22, "tuberia"));
    entidades.push_back(new BloqueEstatico(29, filaBloques, "signo"));
    entidades.push_back(new BloqueEstatico(82, filaBloques, "signo"));
    entidades.push_back(new BloqueEstatico(100, filaBloques, "signo"));
    entidades.push_back(new BloqueEstatico(73, filaBloques, "madera"));
    entidades.push_back(new BloqueEstatico(91, filaBloques, "madera"));
    entidades.push_back(new BloqueEstatico(109, filaBloques, "madera"));
    // Primer Goomba con límites de patrulla.
    entidades.push_back(new Goomba(104, goombaY, -1, 6, 0, 135));
    // Crear el hueco del vacío entre columnas 163 y 180.
    for (int i = FILA_INICIO_PISO; i < FILAS; i++) {
        for (int j = 163; j <= 180; j++) {
            matrizMundo[i][j] = 0;
        }
    }
    // Bloques adicionales y segundo Goomba.
    entidades.push_back(new BloqueEstatico(167, filaBloques, "signo"));
    entidades.push_back(new BloqueEstatico(190, arbolY, "arbol"));
    entidades.push_back(new BloqueEstatico(195, filaBloques, "madera"));
    entidades.push_back(new BloqueEstatico(204, filaBloques, "signo"));
    entidades.push_back(new BloqueEstatico(213, filaBloques, "madera"));
    entidades.push_back(new BloqueEstatico(222, filaBloques, "signo"));
    entidades.push_back(new BloqueEstatico(231, filaBloques, "madera"));
    entidades.push_back(new BloqueEstatico(218, arbolY, "arbol"));
    entidades.push_back(new Goomba(224, goombaY, -1, 6, 180, COLUMNAS));
    juegoIniciado = true;
}

void Mundo::draw_world() {
    // Dibujar todas las entidades excepto el jugador (se dibuja después).
    for (Entidad* e : entidades) {
        if (e != jugador) {
            e->draw(matrizMundo);
        }
    }
}

void Mundo::draw_player() {
    // Dibujar al jugador sobre el resto del escenario.
    jugador->draw(matrizMundo);
}

void Mundo::draw_scene() {
    // Limpiar el cielo, dibujar mundo y jugador, y luego imprimir la ventana visible.
    resetearMatriz();
    draw_world();
    draw_player();
    for (int fila = 0; fila < FILAS; fila++) {
        for (int col = offsetCamara; col < offsetCamara + 90; col++) {
            int codigo = matrizMundo[fila][col];
            std::cout << obtenerColorANSI(codigo) << "  " << RESET_COLOR;
        }
        std::cout << "\n";
    }
}

void Mundo::actualizarCamara() {
    const int ANCHO_VENTANA = 90;
    const int MARGEN_DERECHO = 42;
    const int MARGEN_IZQUIERDO = 32;
    int distDerecha = (offsetCamara + ANCHO_VENTANA) - (jugador->getX() + jugador->getAncho());
    int distIzquierda = jugador->getX() - offsetCamara;
    if (distDerecha < MARGEN_DERECHO) {
        offsetCamara += (MARGEN_DERECHO - distDerecha);
    } else if (distIzquierda < MARGEN_IZQUIERDO) {
        offsetCamara -= (MARGEN_IZQUIERDO - distIzquierda);
    }
    if (offsetCamara < 0) {
        offsetCamara = 0;
    }
    if (offsetCamara > COLUMNAS - ANCHO_VENTANA) {
        offsetCamara = COLUMNAS - ANCHO_VENTANA;
    }
}

void Mundo::verificarColisiones() {
    int pieIzquierdo = jugador->getX();
    int pieDerecho = jugador->getX() + jugador->getAncho() - 1;
    int filaPies = nivelSuelo + 16;
    // Caída al vacío: si no hay bloque bajo ambos pies, el juego termina.
    if (jugador->getY() == nivelSuelo &&
        matrizMundo[filaPies][pieIzquierdo] == 0 &&
        matrizMundo[filaPies][pieDerecho] == 0) {
        juegoTerminado = true;
        return;
    }
    // Recorrer todas las entidades para detectar colisiones.
    for (Entidad* e : entidades) {
        if (e == jugador || !jugador->colision(*e)) {
            continue;
        }
        if (dynamic_cast<Goomba*>(e) != nullptr) {
            juegoTerminado = true; // contacto mortal con Goomba.
            return;
        }
        BloqueEstatico* bloque = dynamic_cast<BloqueEstatico*>(e);
        if (bloque != nullptr && bloque->getTipo() == "signo" && bloque->recolectarMoneda()) {
            *this += 1;
        }
    }
}

void Mundo::aplicarMovimiento(std::string direccion) {
    if (juegoTerminado) return;
    // Mapeo de comandos a desplazamiento horizontal y flag de salto.
    static const std::unordered_map<std::string, std::pair<int, bool>> movimientos = {
        {"right",    { 12, false}},
        {"left",     {-12, false}},
        {"top",      {  0, true}},
        {"up-right", { 34, true}},
        {"up-left",  {-34, true}}
    };
    auto it = movimientos.find(direccion);
    if (it == movimientos.end()) {
        std::cout << "invalid operation" << std::endl;
        return;
    }
    int viejoX = jugador->getX();
    int nuevoX = viejoX + it->second.first;
    bool esSalto = it->second.second;
    // Validar límites del mapa.
    if (nuevoX < 0 || nuevoX + jugador->getAncho() > COLUMNAS) {
        std::cout << "invalid operation" << std::endl;
        return;
    }
    // Mover al jugador horizontalmente.
    jugador->setPosicion(nuevoX, nivelSuelo);
    // Bloquear paso a través de tuberías.
    for (Entidad* e : entidades) {
        auto* bloque = dynamic_cast<BloqueEstatico*>(e);
        if (bloque && bloque->getTipo() == "tuberia" && jugador->colision(*bloque)) {
            nuevoX = viejoX;
            jugador->setPosicion(nuevoX, nivelSuelo);
            break;
        }
    }
    actualizarCamara();
    if (esSalto) {
        int alturaSalto = nivelSuelo - 24;
        if (alturaSalto < 0) alturaSalto = 0;
        jugador->setPosicion(nuevoX, alturaSalto);
        verificarColisiones();
        jugador->setPosicion(nuevoX, nivelSuelo);
    }
    verificarColisiones();
    // Actualizar posición de los Goombas.
    for (Entidad* e : entidades) {
        if (auto* goomba = dynamic_cast<Goomba*>(e)) {
            goomba->actualizar();
        }
    }
    verificarColisiones();
}

void Mundo::move_player(std::string opcion, int veces) {
    for (int i = 0; i < veces; i++) {
        if (juegoTerminado) {
            break;
        }
        aplicarMovimiento(opcion);
    }
}

// Serializa en texto plano el estado mutable de la partida (Mario, cámara, monedas, bloques y Goombas).
void Mundo::save() {
    // Validar que exista una partida activa antes de intentar guardar.
    if (!juegoIniciado || jugador == nullptr) {
        std::cout << "invalid operation" << std::endl;
        return;
    }

    // Abrir flujo de salida (sobrescribe el archivo si ya existía).
    std::ofstream archivo("partida_guardada.txt");
    if (!archivo.is_open()) {
        std::cout << "Error al guardar la partida" << std::endl;
        return;
    }
    // Guardar coordenadas del jugador, cámara, puntaje y bandera de derrota (1 o 0).
    archivo << jugador->getX() << " " << jugador->getY() << "\n";
    archivo << offsetCamara << "\n";
    archivo << monedas << "\n";
    if (juegoTerminado) {
        archivo << 1 << "\n";
    } else {
        archivo << 0 << "\n";
    }

    // Serializar polimórficamente solo las entidades cuyo estado cambia en tiempo de ejecución.
    for (Entidad* e : entidades) {
        if (auto* bloque = dynamic_cast<BloqueEstatico*>(e)) {
            if (bloque->getTipo() == "signo") {
                if (bloque->getTieneMoneda()) {
                    archivo << 1 << "\n";
                } else {
                    archivo << 0 << "\n";
                }
            }
        } else if (auto* goomba = dynamic_cast<Goomba*>(e)) {
            archivo << goomba->getX() << " " << goomba->getY() << " " << goomba->getDireccion() << "\n";
        }
    }

    // Vaciar búfer y cerrar archivo en disco.
    archivo.close();
    std::cout << "Partida guardada" << std::endl;
}

// Deserializa el archivo de guardado y sincroniza posiciones y sprites de bloques y enemigos.
bool Mundo::load() {

    // Verificar que exista un archivo de guardado previo.
    std::ifstream archivo("partida_guardada.txt");
    if (!archivo.is_open()) {
        std::cout << "No hay partida guardada" << std::endl;
        return false;
    }

    // Instanciar el mundo base en memoria si el usuario ejecuta 'load' antes que 'init'.
    if (!juegoIniciado) {
        create_world();
    }

    // Leer estado global en el mismo orden exacto en que fue serializado por save().
    int x, y, terminado;
    archivo >> x >> y;
    jugador->setPosicion(x, y);
    archivo >> offsetCamara;
    archivo >> monedas;
    archivo >> terminado;
    juegoTerminado = (terminado == 1);

    // Sincronizar estado y apariencia visual de bloques '?' y patrullaje de Goombas.
    for (Entidad* e : entidades) {
        if (auto* bloque = dynamic_cast<BloqueEstatico*>(e)) {
            if (bloque->getTipo() == "signo") {
                int tieneMoneda;
                archivo >> tieneMoneda;
                if (tieneMoneda == 0) {
                    bloque->recolectarMoneda(); // Cambia a sprite vacío/usado.
                } else {
                    bloque->restaurarMoneda();  // Restaura moneda y sprite original '?'
                }
            }
        } else if (auto* goomba = dynamic_cast<Goomba*>(e)) {
            int gx, gy, gdir;
            archivo >> gx >> gy >> gdir;
            goomba->setPosicion(gx, gy);
            goomba->setDireccion(gdir);
        }
    }
    archivo.close();
    std::cout << "Partida cargada" << std::endl;
    return true;
}

// Tokeniza la entrada de consola, despacha comandos de sistema y ejecuta secuencias de movimiento.
void Mundo::procesarComando(std::string linea) {

    // Separar la línea de entrada en palabras limpias ignorando espacios múltiples.
    std::vector<std::string> tokens;
    std::string palabraActual = "";
    for (int i = 0; i < (int) linea.size(); i++) {
        char c = linea[i];
        if (c == ' ') {
            if (!palabraActual.empty()) {
                tokens.push_back(palabraActual);
                palabraActual = "";
            }
        } else {
            palabraActual += c;
        }
    }
    if (!palabraActual.empty()) {
        tokens.push_back(palabraActual);
    }
    if (tokens.empty()) {
        return;
    }

    // verificar comando de inicialización del nivel.
    if (tokens[0] == "init") {
        if (juegoIniciado) {
            std::cout << "invalid operation" << std::endl;
            return;
        }
        create_world();
        std::cout << "Welcome to the world of super mario bros xyz" << std::endl;
        draw_scene();
        std::cout << "coins = " << monedas << std::endl;
        return;
    }

    // manejar comandos de persistencia (guardado y carga).
    if (tokens[0] == "save") {
        save();
        return;
    }
    if (tokens[0] == "load") {
        if (load()) {
            draw_scene();
            std::cout << "coins = " << monedas << std::endl;
            if (juegoTerminado) {
                std::cout << "Game Over" << std::endl;
            }
        }
        return;
    }

    // Guardas de estado: impedir movimientos sin iniciar partida o tras Game Over.
    if (!juegoIniciado) {
        std::cout << "invalid operation" << std::endl;
        return;
    }
    if (juegoTerminado) {
        std::cout << "Game Over" << std::endl;
        return;
    }

    // Ejecutar secuencialmente cada comando de movimiento ingresado en la línea.
    for (int i = 0; i < (int) tokens.size(); i++) {
        if (juegoTerminado) {
            break;  // Cortar secuencia si Mario muere a mitad de los pasos.
        }
        move_player(tokens[i], 1);
    }

    // Renderizar el cuadro resultante y actualizar marcador en consola.
    draw_scene();
    std::cout << "coins = " << monedas << std::endl;
    if (juegoTerminado) {
        std::cout << "Game Over" << std::endl;
    }
}

void Mundo::resetearMatriz() {
    // Limpiar la zona del cielo (filas antes del piso).
    for (int i = 0; i < FILA_INICIO_PISO; i++) {
        for (int j = 0; j < COLUMNAS; j++) {
            matrizMundo[i][j] = 0;
        }
    }
}

Mundo& Mundo::operator+=(int cantidad) {
    monedas += cantidad;
    return *this;
}