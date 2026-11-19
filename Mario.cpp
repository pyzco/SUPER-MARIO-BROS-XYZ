// Mario.cpp – implementación del constructor de Mario.
// Sólo delega en Entidad pasando el sprite predefinido de Mario.
#include "Mario.h"

Mario::Mario(int x, int y) : Entidad(x, y, SPRITE_MARIO[0].size(), SPRITE_MARIO.size(), SPRITE_MARIO) {}
