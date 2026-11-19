// BloqueEstatico.cpp – implementación de los bloques estáticos del mundo.
// Cada bloque elige su sprite según el tipo y gestiona la recolección/restauración de monedas.
#include "BloqueEstatico.h"
#include "Sprites.h"

// Función auxiliar (inline) que devuelve una referencia al sprite correspondiente al tipo.
static const std::vector<std::vector<int>>& obtenerSpritePorTipo(const std::string& tipo) {
    static const std::unordered_map<std::string, std::vector<std::vector<int>>> sprites = {
        {"arbol", SPRITE_ARBUSTO},
        {"tuberia", SPRITE_TUBERIA},
        {"madera", SPRITE_LADRILLO},
        {"signo", SPRITE_SIGNO},
        {"piso", SPRITE_LADRILLO}
    };
    return sprites.at(tipo);
}

// Constructor: delega en Entidad pasando el sprite correspondiente al tipo.
BloqueEstatico::BloqueEstatico(int x, int y, std::string tipo)
    : Entidad(x, y,
        obtenerSpritePorTipo(tipo)[0].size(),
        obtenerSpritePorTipo(tipo).size(),
        obtenerSpritePorTipo(tipo))
{
    this->tipo = tipo;
    // Sólo los bloques "signo" pueden contener una moneda.
    this->tieneMoneda = (tipo == "signo");
}

// Devuelve el tipo literal del bloque (ej. "arbol").
std::string BloqueEstatico::getTipo() {
    return this->tipo;
}

// Indica si el bloque "signo" aún tiene su moneda.
bool BloqueEstatico::getTieneMoneda() {
    return this->tieneMoneda;
}

// Si es un signo con moneda, la marca como recogida, cambia el sprite y devuelve true.
bool BloqueEstatico::recolectarMoneda() {
    if (tipo == "signo" && tieneMoneda) {
        tieneMoneda = false;
        setSprite(SPRITE_SIGNO_USADO);
        return true;
    }
    return false;
}

// Restaura la moneda del signo (usado al cargar una partida guardada).
void BloqueEstatico::restaurarMoneda() {
    if (tipo == "signo") {
        tieneMoneda = true;
        setSprite(SPRITE_SIGNO);
    }
}
