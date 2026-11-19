// Entidad.h – definición de la clase base de todas las entidades del juego.
// Cada entidad posee posición, dimensiones y un sprite (matriz de colores).
#ifndef PROGRA2_PROYECTO_ENTIDAD_H
#define PROGRA2_PROYECTO_ENTIDAD_H

#include <vector>

class Entidad {
private:
    int x; // coordenada horizontal (columna) de la entidad.
    int y; // coordenada vertical (fila) de la entidad.
    int ancho; // ancho en celdas del sprite.
    int alto; // alto en celdas del sprite.
    std::vector<std::vector<int>> sprite; // matriz que representa el sprite (0 = transparente).
public:
    // Constructor: inicializa posición, tamaño y sprite.
    Entidad(int x, int y, int ancho, int alto, std::vector<std::vector<int>> sprite);
    // Cambia el sprite de la entidad.
    void setSprite(std::vector<std::vector<int>> nuevoSprite);
    // Destructor virtual para permitir borrado correcto a través de punteros base.
    virtual ~Entidad();
    // Getters de posición y dimensiones.
    int getX();
    int getY();
    int getAncho();
    int getAlto();
    // Devuelve la matriz del sprite.
    std::vector<std::vector<int>> getSprite();
    // Actualiza la posición.
    void setPosicion(int x, int y);
    // Dibuja la entidad sobre la matriz del mundo, respetando transparencia.
    virtual void draw(int** mundo);
    // Detección de colisión AABB con otra entidad.
    bool colision(const Entidad &entidad) const;
};

#endif //PROGRA2_PROYECTO_ENTIDAD_H