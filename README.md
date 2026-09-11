# Planificador de Herencia BTC

Repo: [github.com/satsforge/inheritance-planner-btc](https://github.com/satsforge/inheritance-planner-btc)

Herramienta 100% del lado del cliente que convierte un cuestionario sobre tu
situación actual de custodia en un **plan concreto de respaldo y
documentación para tus herederos** — sin custodiar nada, sin guardar nada
entre sesiones, y sin ninguna conexión de red en absoluto (ni siquiera a
mempool.space como sus hermanas watch-only: esta herramienta no necesita
saber nada de la red Bitcoin, solo de tu situación).

A diferencia del resto del grupo [SatsForge](https://github.com/satsforge),
esta herramienta **no toca ninguna clave de Bitcoin en ningún momento** — no
hay ningún campo para pegar una semilla, un WIF, ni un xpub. Es, con
diferencia, la de menor riesgo criptográfico de todo el suite: el único
"riesgo" real es dar un mal consejo, no un bug de firma.

> ⚠️ **Aviso importante.**
> Esta herramienta da **guía técnica y operativa**, no asesoramiento legal,
> financiero, ni impositivo. Las leyes de sucesión varían enormemente según
> el país — para que un plan de herencia tenga validez legal real, consultá
> a un profesional matriculado en tu jurisdicción para el instrumento
> correspondiente (testamento, fideicomiso, u otro).

## Cómo usarlo

```bash
npm install
npm run build     # genera dist/index.html e index.html
```

Abrí `index.html` en cualquier navegador — funciona sin conexión a internet,
podés abrirlo directamente con `file://`.

1. **Cuestionario (4 pasos)**: tu custodia actual (semilla suelta, hardware,
   multifirma, exchange...), tu respaldo físico, si tus herederos saben de
   la existencia de los fondos y sabrían acceder, si tenés a alguien de
   confianza técnica que pueda ayudarlos, y opcionalmente tu país (solo para
   personalizar el texto de la carta, sin cambiar ninguna recomendación).
2. **Plan generado**, con seis secciones adaptadas a tus respuestas:
   diagnóstico de riesgo, camino de mejora recomendado, plan de distribución
   de respaldo, checklist de qué documentar (y qué NO documentar) para tus
   herederos, un borrador de carta que podés adaptar con tus propias
   palabras, y el aviso legal.
3. **Exportar**: como texto plano (`.txt`), como PDF, o **cifrado**
   (AES-256-GCM con contraseña) si vas a guardarlo en un lugar menos
   controlado — usa exactamente el mismo formato de cifrado que Paper
   Wallet BTC y My Wallet BTC, así que un archivo cifrado por cualquiera de
   las tres herramientas se recupera en cualquiera de las tres.
4. **Recuperar un plan cifrado**: pegá o cargá el `.txt` cifrado y su
   contraseña para volver a verlo — sin necesidad de haber generado el plan
   en esta misma sesión.

## Modelo de seguridad

- **Nunca pide ninguna clave de Bitcoin**: no hay semilla, WIF, ni xpub en
  ningún campo de esta herramienta, en ningún paso. El cuestionario solo
  pregunta sobre tu situación general (tipo de custodia, cantidad de
  respaldos, si tus herederos saben) — nunca un dato que por sí solo pueda
  comprometer fondos.
- **Cero red, verificable**: `connect-src 'none'` en la CSP — la misma
  política que Paper Wallet BTC y PSBT Signer BTC. No hay ninguna excepción
  como el `mempool.space` de sus hermanas watch-only, porque esta
  herramienta no necesita consultar nada de la blockchain.
- **Cifrado reutilizado, no reinventado**: el cifrado AES-256-GCM (scrypt
  N=65536 + salt/nonce/ciphertext) es el mismo código, con los mismos
  parámetros, que ya usan Paper Wallet BTC y My Wallet BTC para cifrar una
  semilla — verificado con un test que descifra acá un bloque cifrado por
  el módulo real de Paper Wallet BTC, no una reimplementación.
- **Medidor de fortaleza de contraseña reutilizado**: la misma lógica
  conservadora de Paper Wallet BTC (`src/lib/strength.js`, copiada tal
  cual) — frases largas en lenguaje natural puntúan bajo a propósito, en
  vez de sobreestimar su entropía real.
- **Cero persistencia, a propósito, incluso a costa de comodidad**: no se
  usa `localStorage` ni IndexedDB para guardar el progreso del cuestionario
  entre sesiones — se consideró (el enfoque original que se descartó), pero
  se optó por reforzar en cambio el patrón "exportá para retomar más
  tarde" que ya usan las demás herramientas del grupo (el Coordinador
  Multifirma con sus descriptores, por ejemplo), en vez de guardar en el
  navegador datos personales/familiares que, aunque no sean claves, siguen
  siendo información sensible.

## Estructura del proyecto

```
src/
  lib/
    plan.js          logica pura: que contenido aplica segun las respuestas del cuestionario
                      (el archivo mas importante de revisar - es el que "opina")
    textcipher.js      cifra/descifra texto arbitrario, AES-256-GCM (mismo formato que
                      paper-wallet-btc/my_btc_wallet, generalizado de semilla a texto libre)
    strength.js        medidor de fortaleza de contraseña (copiado de paper-wallet-btc)
    pdf.js             arma el PDF del plan con jsPDF (paginado, sin claves ni QR)
    i18n.js            diccionario ES/EN - incluye TODO el contenido del plan, no solo la UI
  app.js               controlador de la UI: wizard, render del plan, exportar/recuperar
  styles.css            tema oscuro/claro al estilo del resto del grupo
index.src.html          plantilla HTML fuente (placeholders __CSS__/__SCRIPT__/__CSP__)
build.mjs               empaqueta todo en un único index.html autocontenido
test/                   tests (node:test)
```

## Tests

```bash
npm test
```

`plan.test.mjs` prueba la lógica de contenido en sí (la parte que más
importa acá): que cada tipo de custodia genera las seis secciones sin
claves de traducción rotas, que la recomendación de multifirma aparece
solo cuando corresponde (custodia de una sola clave) y no cuando ya hay
multifirma, que las advertencias condicionales (sin respaldo, herederos
que no saben, sin ayuda de confianza) aparecen exactamente cuando las
respuestas las ameritan y no antes, y que la nota de jurisdicción se
inserta en la carta cuando se completa.

`textcipher.test.mjs` prueba el cifrado real: ida y vuelta con la
contraseña correcta, rechazo explícito con la incorrecta, tolerancia a
saltos de línea (como los que deja un archivo impreso o pegado desde un
email), y — el test más importante — que un bloque cifrado por el módulo
**real** de `paper-wallet-btc` (importado directamente, no reimplementado)
se descifra correctamente acá, confirmando la compatibilidad cruzada real
entre herramientas.

Además del test suite, el flujo completo se probó a mano en el navegador:
las 4 preguntas del cuestionario con distintas combinaciones de respuestas,
el plan generado (verificado que el texto cambia correctamente según las
respuestas), exportación a PDF real (verificado que el archivo descargado
es un PDF válido de varias páginas), exportación a texto plano, y el
round-trip completo de exportar cifrado → recuperar con la contraseña → ver
el mismo contenido — con contraseñas y contenido reales, no simulados.

## Limitaciones conocidas

- No es asesoramiento legal, financiero, ni impositivo — es guía técnica y
  operativa. El instrumento legal real (testamento, fideicomiso) necesita
  un profesional matriculado en tu jurisdicción.
- La sección de "jurisdicción" es puramente cosmética: personaliza un
  párrafo de la carta, pero no cambia ninguna recomendación de la
  herramienta según el país — las leyes de sucesión no se modelan acá.
- El plan es genérico dentro de cada rama de respuestas — no reemplaza una
  conversación real con un profesional o con tus herederos sobre tu
  situación particular.
- No hay guardado automático del progreso del cuestionario: si cerrás la
  pestaña a mitad del cuestionario, se pierde y hay que empezar de nuevo
  (es una decisión deliberada, ver "Modelo de seguridad" más arriba).
- El PDF generado (vía jsPDF) pesa bastante como dependencia — el archivo
  final autocontenido de esta herramienta es de aproximadamente 1.6 MB,
  similar al de Paper Wallet BTC por la misma razón. Sigue siendo un único
  archivo que carga al instante una vez descargado, no un problema
  práctico, pero vale la pena mencionarlo.

## Licencia

ISC — software "tal cual", sin garantía. Esta herramienta no reemplaza el
asesoramiento profesional — leé el código fuente y consultá a un
profesional matriculado para el instrumento legal real.
