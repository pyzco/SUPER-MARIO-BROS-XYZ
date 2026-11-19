// Entidad.cpp – implementación de la clase base Entidad.
// Los métodos gestionan posición, sprite y colisión sin lógica de juego específica.
#include "Entidad.h"

// Constructor: asigna los valores recibidos a los atributos internos.
Entidad::Entidad(int x, int y, int ancho, int alto, std::vector<std::vector<int>> sprite) {
    this->x = x;
    this->y = y;
    this->ancho = ancho;
    this->alto = alto;
    this->sprite = sprite;
}

// Destructor vacío (virtual en la clase base).
Entidad::~Entidad() {}

// Getters de posición y dimensiones.
int Entidad::getX() { return this->x; }
int Entidad::getY() { return this->y; }
int Entidad::getAncho() { return this->ancho; }
int Entidad::getAlto() { return this->alto; }

// Devuelve la matriz completa del sprite.
std::vector<std::vector<int>> Entidad::getSprite() { return this->sprite; }

// Actualiza la posición de la entidad.
void Entidad::setPosicion(int x, int y) {
    this->x = x;
    this->y = y;
}

// Dibuja el sprite sobre la matriz del mundo respetando transparencia (valor 0).
void Entidad::draw(int** mundo) {
    for (int i = 0; i < alto; i++) {
        for (int j = 0; j < ancho; j++) {
            if (sprite[i][j] != 0) {
                mundo[y + i][x + j] = sprite[i][j];
            }
        }
    }
}

// Colisión axis-aligned bounding box (AABB) entre dos entidades.
bool Entidad::colision(const Entidad &entidad) const {
    return (x < entidad.x + entidad.ancho) && (x + ancho > entidad.x) &&
           (y < entidad.y + entidad.alto) && (y + alto > entidad.y);
}

// Reemplaza el sprite actual por uno nuevo.
void Entidad::setSprite(std::vector<std::vector<int>> nuevoSprite) {
    this->sprite = nuevoSprite;
}
