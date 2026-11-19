// Mario.h – definición de la clase Mario, personaje jugable que hereda de Entidad.
#ifndef PROGRA2_PROYECTO_MARIO_H
#define PROGRA2_PROYECTO_MARIO_H

#include "Entidad.h"
#include "Sprites.h"

// Mario no agrega comportamiento propio; solo inicializa su sprite.
class Mario : public Entidad {
public:
    Mario(int x, int y);
};

#endif //PROGRA2_PROYECTO_MARIO_H