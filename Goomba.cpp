// Goomba.cpp – implementación de la clase Goomba (enemigo).
// Maneja el movimiento horizontal de patrulla entre límites y la inversión de dirección.
#include "Goomba.h"

// Constructor que delega en Entidad y guarda dirección, velocidad y límites.
Goomba::Goomba(int x, int y, int dir, int vel, int limIzq, int limDer)
    : Entidad(x, y, SPRITE_GOOMBA[0].size(), SPRITE_GOOMBA.size(), SPRITE_GOOMBA) {
    this->direccion = dir;
    this->velocidad = vel;
    this->limiteIzq = limIzq;
    this->limiteDer = limDer;
}

// Actualiza la posición del Goomba según su dirección y velocidad.
// Si alcanza el límite izquierdo o derecho, se ajusta la posición y se invierte la dirección.
void Goomba::actualizar() {
    // Calculamos la nueva posición horizontal.
    int nuevoX = getX() + (direccion * velocidad);

    // Límite izquierdo: no pasar del borde, cambiar a dirección derecha.
    if (nuevoX <= limiteIzq) {
        nuevoX = limiteIzq;
        direccion = 1;
    }
    // Límite derecho: no pasar del borde, cambiar a dirección izquierda.
    else if (nuevoX + getAncho() >= limiteDer) {
        nuevoX = limiteDer - getAncho();
        direccion = -1;
    }

    // Aplicamos la nueva posición.
    setPosicion(nuevoX, getY());
}

int Goomba::getDireccion() {
    return this->direccion;
}

void Goomba::setDireccion(int dir) {
    this->direccion = dir;
}
