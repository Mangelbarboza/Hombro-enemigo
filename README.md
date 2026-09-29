# Hombro Enemigo

> Comunidad anónima para compartir desahogos, conversar y acompañarse.

[![Demo](https://img.shields.io/badge/Ver%20demo-009F8F?style=for-the-badge&logo=vercel&logoColor=white)](https://hombro-enemigo.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![PWA](https://img.shields.io/badge/PWA-Instalable-5A0FC8?style=for-the-badge)](https://web.dev/progressive-web-apps/)

## Sobre el proyecto

**Hombro Enemigo** es una aplicación web instalable creada como proyecto universitario. Permite explorar publicaciones sin una cuenta y, al registrarse con un usuario y contraseña, participar en conversaciones de forma seudónima.

La experiencia está diseñada primero para móvil, pero se adapta a escritorio. La aplicación se inspira en el tipo de comunidad de desahogo de Friend Shoulder; su interfaz, marca e implementación son propias y el proyecto no está afiliado a ese servicio.

## Funcionalidades

- Feed público con filtros por categoría, modo claro y oscuro.
- Registro sin correo mediante usuario, contraseña y perfil personalizable.
- Publicaciones, comentarios, reacciones y contador de conversación.
- Imágenes en desahogos, respuestas y mensajes privados.
- Chats privados, grupos por invitación y bloqueo de usuarios.
- Notificaciones dentro de la app y notificaciones push con Firebase Cloud Messaging.
- Perfiles públicos con biografía, Instagram y foto.
- PWA instalable en Android, iOS y escritorio, con guía integrada de instalación.
- Sincronización en tiempo real con Firestore y reglas de seguridad para usuarios, chats y grupos.

## Stack

| Área | Tecnología |
| --- | --- |
| Interfaz | React 19, TypeScript, CSS responsivo y Lucide |
| Build | Vite |
| Datos y autenticación | Firebase Authentication + Cloud Firestore |
| Archivos | Firebase Storage |
| Notificaciones | Firebase Cloud Messaging + Cloud Functions |
| Instalación | vite-plugin-pwa, Web App Manifest y Service Worker |
| Calidad | Playwright |
| Despliegue | Vercel |

## Arquitectura

```text
React PWA
  ├─ Firebase Authentication  → cuentas con usuario y contraseña
  ├─ Cloud Firestore          → perfiles, posts, respuestas, chats y grupos
  ├─ Firebase Storage         → imágenes temporales
  └─ Cloud Functions + FCM    → notificaciones de respuestas, mensajes e invitaciones
```

## Ejecutar localmente

**Requisito:** Node.js 22 o superior.

```bash
git clone https://github.com/Mangelbarboza/Hombro-enemigo.git
cd Hombro-enemigo
npm install
```

Crea un archivo `.env.local` con la configuración de tu aplicación web de Firebase:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
# Opcional, necesario para notificaciones push:
VITE_FIREBASE_VAPID_KEY=
```

```bash
npm run dev
```

Abre `http://localhost:5173`.

## Scripts

```bash
npm run dev       # servidor de desarrollo
npm run build     # comprobación de tipos y build de producción
npm run preview   # revisa el build localmente
npm run test:e2e  # pruebas de interfaz con Playwright
```

## Seguridad y privacidad

El proyecto usa reglas de Firestore y Storage para restringir las escrituras a participantes autorizados. Aun así, se trata de un prototipo académico: antes de utilizarlo para una investigación con participantes deben definirse consentimiento informado, moderación, política de retención, atención ante emergencias y mecanismos de reporte adecuados.

## Autor

Desarrollado por [Manuel Ángel Barboza](https://github.com/Mangelbarboza).

## Licencia

Distribuido bajo la licencia [MIT](LICENSE).
