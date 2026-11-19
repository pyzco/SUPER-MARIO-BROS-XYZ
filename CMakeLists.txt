cmake_minimum_required(VERSION 4.2)
project(PROGRA2_PROYECTO)

set(CMAKE_CXX_STANDARD 20)

add_executable(PROGRA2_PROYECTO main.cpp
        Entidad.cpp
        Entidad.h
        Goomba.cpp
        Goomba.h
        Sprites.h
        Mario.cpp
        Mario.h
        Colores.cpp
        Colores.h
        BloqueEstatico.cpp
        BloqueEstatico.h
        Mundo.cpp
        Mundo.h)
