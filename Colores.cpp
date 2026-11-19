//
// Created by Sebastian Chipana on 11/7/2026.
//

#include "Colores.h"

// IMPLEMENTACION: busca el codigo en el hash map en O(1).
// Si no existe, retorna el reset para no romper la impresion.
std::string obtenerColorANSI(int codigo) {
    auto it = colorMap.find(codigo);
    if (it != colorMap.end()) {
        return it->second;
    }
    return RESET_COLOR;
}