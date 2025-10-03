# KOMTEST PWA

Aplicación web progresiva para catálogo y generación de proformas de bancos de prueba KOMTEST.

## Características

- Fichas técnicas de todos los modelos (CRI-2100, CRIPUMP-2200, UNIT-2500, etc.)
- Selección de accesorios estándar y opcionales
- Generación de proformas imprimibles en PDF
- Funciona offline (PWA)
- Instalable en móvil y escritorio

## Cómo usar

1. Clona este repositorio
2. Añade las imágenes en `assets/machines/` y `assets/accessories/`
3. Edita `data/machines.json` para agregar nuevos modelos
4. Sirve con un servidor HTTP:
   ```bash
   python3 -m http.server 8000