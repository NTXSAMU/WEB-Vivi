# frontend/ (actualmente sin usar)

Esta carpeta se mantiene por estructura, pero ahora mismo no se usa.

El sitio en producción (GitHub Pages) se genera con
`scripts/freeze.py`, que renderiza directamente `backend/templates/` +
`backend/data/content.json` a HTML estático. Así solo hay **una** fuente de
verdad — editas `backend/`, y tanto la versión local (Flask) como la
publicada salen de ahí.

Si en algún momento quieres una versión frontend-only totalmente
independiente del backend (por ejemplo para probar frameworks como React),
este es el sitio para reconstruirla — pero de momento, todo el desarrollo
real pasa por `backend/`.
