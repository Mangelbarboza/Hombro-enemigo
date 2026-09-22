# Hombro Enemigo

Prototipo universitario de una comunidad de desahogo anónimo, inspirado en la temática de Friend Shoulder, con diseño y marca propios. React + TypeScript + Vite + Firebase + PWA.

## Ejecutar

Requiere Node.js 22 o superior.

```powershell
cd 'C:\Users\angel\Desktop\Hombro enemigo'
npm install
npm run dev
```

Abre http://localhost:5173. Sin variables Firebase la app queda vacía y usa persistencia local para que puedas revisar el flujo. Al conectar Firebase, usuarios, publicaciones, reacciones, respuestas y conversaciones se sincronizan en tiempo real.

## Conectar Firebase

1. Crea un proyecto en Firebase y registra una aplicación **Web**.
2. Activa **Authentication → Método de acceso → Anónimo**.
3. Crea una base de datos **Cloud Firestore** (no Realtime Database).
4. Copia `.env.example` a `.env.local` y completa los seis valores del objeto `firebaseConfig` de la aplicación Web. Usa la configuración pública del SDK cliente, nunca una clave privada de cuenta de servicio.
5. En Firestore → Reglas, publica el contenido de `firestore.rules`. Las reglas impiden modificar historias de terceros, restringen chats a sus participantes y mantienen los reportes fuera de las lecturas del cliente. Revisa los reportes con acceso administrativo en la consola.
6. Agrega el dominio de despliegue en Authentication → Configuración → Dominios autorizados, cuando corresponda.
7. Reinicia `npm run dev`. La etiqueta superior cambia a «Comunidad conectada»; el feed real empieza vacío. Prueba con dos navegadores/perfiles para tener dos identidades diferentes.

Variables: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`.

La identidad anónima pertenece a ese navegador. Borrar sus datos puede perder el acceso a sus publicaciones. Los alias y avatares no se verifican y no son una identidad de confianza. Los guardados y alias ocultos son preferencias locales. Se cargan las 100 historias más recientes, hasta 200 respuestas por historia y los 200 mensajes más recientes por conversación.

## PWA y publicación

```powershell
npm run build
npm run preview
```

Abre http://localhost:4173 para probar la versión instalable. Incluye manifiesto, iconos normales y maskable y service worker con caché del shell y aviso de actualización. La aplicación se puede volver a abrir sin conexión después de una primera carga completa; Firebase requiere conexión para confirmar escrituras y no tiene persistencia offline en disco configurada. Las fuentes tienen alternativas del sistema si no hay conexión.

En un teléfono, la instalación necesita **HTTPS**; `http://192.168.x.x` sirve para revisar el diseño, pero no instala una PWA. Chrome/Edge ofrecen instalar; Safari iOS usa Compartir → Añadir a pantalla de inicio. El navegador decide cuándo ofrecer la instalación. No se ha publicado todavía un dominio.

Para Firebase Hosting, después de instalar Firebase CLI y autenticarte:

```powershell
npm run build
firebase deploy --project TU_ID_DE_PROYECTO --only hosting,firestore:rules
```

`firebase.json` está preparado para servir `dist` por HTTPS. No es necesario usar Sites ni otra base de datos.

## Funcionalidad

- Historias por tema y emoción, búsqueda, orden y eliminación propia.
- Respuestas, apoyo reversible, guardados y personalización de alias/avatar.
- Registro anónimo sin correo ni contraseña: alias y avatar predefinido guardados en `users`.
- Conversaciones privadas entre participantes, con envío real al conectar Firebase.
- Reportes para revisión manual y ocultación local de alias.
- Diseño responsive, navegación móvil, diálogos con control de foco y textos sobre el contexto del prototipo.
- No se incluye analítica ni captura de comportamiento. Para el estudio: definir responsable, consentimiento informado separado, finalidad, retención, retiro y acceso a los datos antes de reclutar participantes.

## Límites de esta primera versión

No reproduce pixel por pixel Friend Shoulder ni usa sus assets. No hay push, recuperación de cuentas, moderador en la UI, detección automática de abuso o límites de frecuencia del servidor. Para uso público se necesitan controles antiabuso (por ejemplo App Check y backend para límites de frecuencia) y un proceso de moderación. Los mensajes no tienen cifrado de extremo a extremo; administradores Firebase pueden leerlos. Eliminar una historia oculta sus subcolecciones por reglas, pero no las borra físicamente: una política de eliminación completa necesitará un trabajo administrativo o Cloud Function. Todavía no se ha probado la conexión contra tu proyecto Firebase.

## Verificación

```powershell
npm run build
npx playwright install chromium
npm run test:e2e
```

Las pruebas cubren publicaciones, respuestas, apoyo, guardados, edición de perfil, chat local, persistencia, eliminación, filtros, manifest/service worker y desbordamiento móvil. Se ejecutan contra el build de producción.

Referencias: https://firebase.google.com/docs/auth/web/anonymous-auth y https://vite-pwa-org.netlify.app/guide/.
