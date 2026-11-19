// BloqueEstatico.h – definición de bloques estáticos del mundo (árbol, tubería, madera, signo).
// Cada bloque es una entidad que no se mueve y puede contener una moneda (signo).
#ifndef PROGRA2_PROYECTO_BLOQUEESTATICO_H
#define PROGRA2_PROYECTO_BLOQUEESTATICO_H

#include "Entidad.h"
#include <string>
#include <unordered_map>

class BloqueEstatico : public Entidad {
private:
    std::string tipo; // tipo literal del bloque ("arbol", "tuberia", "madera" o "signo").
    bool tieneMoneda; // sólo relevante para bloques tipo "signo".
public:
    // Construye el bloque en la posición (x,y) y asigna su sprite según el tipo.
    BloqueEstatico(int x, int y, std::string tipo);

    std::string getTipo(); // devuelve el tipo del bloque.
    bool getTieneMoneda(); // indica si el signo aún tiene su moneda.
    // Si el bloque es un signo con moneda, la recoge (cambia sprite a usado) y devuelve true.
    bool recolectarMoneda();
    // Restaura la moneda del signo (usado al cargar una partida).
    void restaurarMoneda();
};

#endif //PROGRA2_PROYECTO_BLOQUEESTATICO_H