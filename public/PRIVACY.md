# Privacidad de Tsukikage

**Última actualización: 6 de noviembre de 2026**

Tsukikage es una aplicación de escritura local-first. Esta política describe el comportamiento del código de Tsukikage; si otra persona aloja una copia o activa servicios, esa persona debe publicar los datos y el contacto que correspondan a su instalación.

## Datos guardados en el dispositivo

Los proyectos, capítulos, fichas, preferencias y borradores se guardan en IndexedDB del navegador. Tsukikage no envía este contenido a un servidor central. Borrar los datos del sitio o del navegador puede eliminar la única copia local, así que puedes descargar una copia JSON desde Exportar.

Los datos locales y los archivos descargados no están cifrados por Tsukikage. Las personas con acceso a tu perfil del navegador o a tus copias pueden leerlos. Cambiar de dominio, navegador o dispositivo no transfiere los proyectos: exporta e importa una copia JSON.

## Sincronización opcional

La sincronización no está activa en una instalación nueva. Si el operador configura Supabase, puedes iniciar sesión con un código enviado a tu correo. El manuscrito no se sube por iniciar sesión: solo se envía al pulsar “Subir copia a la nube”. “Restaurar desde la nube” descarga el contenido de esa cuenta y reemplaza el espacio local después de descargar una copia local.

Al usar esta opción, el proyecto Supabase configurado recibe el correo de autenticación y el espacio JSON completo, incluido el contenido de los proyectos. Supabase procesa esos datos según la configuración y condiciones del operador. La sincronización no ofrece cifrado de extremo a extremo. La app no incluye una acción para borrar una copia remota; el operador debe gestionarla desde su proyecto Supabase.

## Servicios externos

La hoja de estilos solicita DM Sans, Manrope y Newsreader a Google Fonts. El navegador puede contactar a Google Fonts para descargarlas. Si el operador elimina esa dependencia, la app usa fuentes locales alternativas.

Si Tsukikage se aloja en GitHub Pages, GitHub registra y almacena las direcciones IP de quienes visitan el sitio por motivos de seguridad, según [la documentación de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages). La persona u organización que publica el sitio debe considerar este tratamiento al informar sobre su instancia.

En un despliegue en Vercel, el proveedor de alojamiento procesa las solicitudes HTTP y los datos técnicos necesarios para servir el sitio. El operador debe revisar su configuración y la [política de privacidad de Vercel](https://vercel.com/legal/privacy-policy). La configuración de beta no incorpora Vercel Analytics ni Speed Insights.

No se incorporan analíticas ni anuncios en el código de Tsukikage.

## Archivos exportados

Las copias JSON y exportaciones EPUB, DOCX, Markdown y PDF se generan en el navegador y se descargan al dispositivo. Tsukikage no las recibe.

## Contacto y cambios

Para el código oficial, puedes abrir un asunto en [el repositorio de Tsukikage](https://github.com/ILAIGG/Tsukikage). No publiques manuscritos, correos ni otros datos privados en un issue público. Si alojas una instancia propia, sustituye este contacto por el canal y responsable de privacidad de tu servicio.
