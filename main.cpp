// Programa principal del juego Super Mario Bros XYZ.
// Inicia el motor del mundo y procesa los comandos del usuario.
#include <iostream>
#include "Mundo.h"

int main() {
    // Instancia el mundo del juego.
    Mundo mundo;
    std::string linea;

    // Bucle interactivo que lee la consola hasta "exit".
    while (true) {
        std::cout << "Consola: ";
        if (!std::getline(std::cin, linea) || linea == "exit") {
            break;
        }
        // Envía la línea ingresada al motor para su procesamiento.
        mundo.procesarComando(linea);
    }

    return 0;
}
