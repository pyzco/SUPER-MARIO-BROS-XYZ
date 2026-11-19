// Goomba.h – definición de la clase Goomba (enemigo) que hereda de Entidad.
// Implementa movimiento horizontal de patrulla entre dos límites.
#ifndef PROGRA2_PROYECTO_GOOMBA_H
#define PROGRA2_PROYECTO_GOOMBA_H

#include "Entidad.h"
#include "Sprites.h"

class Goomba : public Entidad {
private:
    int direccion; // 1 = derecha, -1 = izquierda (sentido de movimiento).
    int velocidad; // número de celdas que avanza por turno.
    int limiteIzq; // límite izquierdo donde invierte dirección.
    int limiteDer; // límite derecho donde invierte dirección.
public:
    // Construye un Goomba en (x,y) con dirección, velocidad y límites dados.
    Goomba(int x, int y, int dir, int vel, int limIzq, int limDer);
    // Actualiza posición según dirección y velocidad, invierte al tocar los límites.
    void actualizar();
    int getDireccion();
    void setDireccion(int dir);
};

#endif //PROGRA2_PROYECTO_GOOMBA_H