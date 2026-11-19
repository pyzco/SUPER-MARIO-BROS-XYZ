// Mundo.h – definición del motor principal del juego.
// Gestiona la matriz del mundo, la cámara, las entidades y la lógica de juego.
#ifndef PROGRA2_PROYECTO_MUNDO_H
#define PROGRA2_PROYECTO_MUNDO_H

#include <vector>
#include <string>
#include "Entidad.h"
#include "Mario.h"
#include <fstream>
#include "Goomba.h"
#include "BloqueEstatico.h"

class Mundo {
private:
    // Matriz dinámica 50x240 que representa el mundo (celdas con códigos de color).
    int** matrizMundo;
    static const int FILAS = 50;
    static const int COLUMNAS = 240;
    // Fila donde comienza el piso (el resto son bloques ladrillo).
    static const int FILA_INICIO_PISO = 44;
    // Altura de "suelo" para Mario (posición vertical base).
    int nivelSuelo;
    // Vector que contiene todas las entidades (Mario, Goombas, bloques).
    std::vector<Entidad*> entidades;
    // Puntero al jugador (Mario). No se elimina en el destructor porque también está en entidades.
    Mario* jugador;
    // Desplazamiento horizontal de la cámara (columna inicial de la ventana visible).
    int offsetCamara;
    int monedas;
    bool juegoIniciado;
    bool juegoTerminado;

    // Métodos internos de apoyo.
    void crearPiso();
    void actualizarCamara();
    void verificarColisiones();
    void aplicarMovimiento(std::string direccion);

public:
    Mundo();
    ~Mundo();

    void create_world();
    void draw_world();
    void draw_scene();
    void draw_player();

    void move_player(std::string opcion, int veces);

    void save();
    bool load();

    void procesarComando(std::string linea);

    void resetearMatriz();

    // Sobrecarga de operador para acumular monedas en el marcador
    Mundo& operator+=(int cantidad);
};

#endif //PROGRA2_PROYECTO_MUNDO_H