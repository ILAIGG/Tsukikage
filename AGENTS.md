# Contrato de cambios de Tsukikage

Este archivo rige el trabajo futuro dentro de este repositorio.

## En cada cambio solicitado

1. Antes de editar, revisa `git status` y conserva cualquier trabajo existente del usuario.
2. Haz el cambio pedido y actualiza `CHANGELOG.md` bajo la versión siguiente.
3. Incrementa `package.json` y `package-lock.json` con versionado semántico: PATCH para correcciones, MINOR para funciones compatibles y MAJOR para cambios incompatibles. Mantén ambos archivos sincronizados (`npm install --package-lock-only` si hace falta).
4. Ejecuta `npm run build` para validar cambios de aplicación. Si no compila, corrige antes de cerrar.
5. Crea un commit Git enfocado, con mensaje convencional (`feat:`, `fix:`, `docs:`, `chore:`) y la versión reflejada en el changelog.
6. Publica el commit en `origin`/GitHub cuando la rama y el remoto estén disponibles. No hagas force-push ni sobrescribas cambios ajenos. Si no se puede publicar, conserva el commit local y explica el motivo.
7. Resume el cambio, versión, commit, publicación y validación.

## Límites

- Un commit por unidad coherente de trabajo solicitada, no un commit por archivo o por cada edición intermedia.
- No incluyas secretos, credenciales, `node_modules`, `dist` ni archivos generados ignorados.
- Si el repositorio tiene cambios ajenos o conflictos, no los descartes: limita el commit a los archivos de la tarea.
- El changelog debe describir resultados visibles para el usuario, no cada detalle interno.
