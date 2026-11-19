#ifndef PROGRA2_PROYECTO_COLORES_H
#define PROGRA2_PROYECTO_COLORES_H

#include <unordered_map>
#include <string>

inline const std::string RESET_COLOR = "\033[0m";

inline std::unordered_map<int, std::string> colorMap = {
    {0, "\033[107m"}, // Fondo / Piel
    {1, "\033[41m"},  // Rojo (piso, ropa de Mario)
    {2, "\033[42m"},  // Verde (arbustos, tubería)
    {3, "\033[103m"},  // Amarillo (bloques de interrogación)
    {4, "\033[40m"},  // Negro (contornos y bloques usados)
    {5, "\033[47m"},  // Blanco (detalles de Mario)
    {6, "\033[104m"}, // Azul claro (overol de Mario)
    {7, "\033[103m"}, // Amarillo claro (botones de Mario)
    {8, "\033[43m"}   // Marrón / Amarillo (Goomba, tal cual el switch original)
};

std::string obtenerColorANSI(int codigo);

#endif //PROGRA2_PROYECTO_COLORES_H