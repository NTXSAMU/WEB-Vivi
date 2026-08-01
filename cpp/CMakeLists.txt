# CMakeLists.txt — módulo C++ opcional para lógica de alto rendimiento
# (p. ej. física de partículas o procesado de audio) que más adelante
# podría compilarse a WebAssembly con Emscripten y usarse desde frontend/js.
#
# Build nativo (para pruebas/desarrollo):
#   cmake -S . -B build && cmake --build build
#
# Build a WebAssembly (cuando el módulo exista de verdad):
#   emcmake cmake -S . -B build-wasm && cmake --build build-wasm

cmake_minimum_required(VERSION 3.16)
project(mi_landing_native LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(mi_landing_native src/main.cpp)
target_include_directories(mi_landing_native PRIVATE include)
