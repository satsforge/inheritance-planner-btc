/**
 * Single source of truth for every user-facing string, including the plan
 * content itself (see plan.js, which only decides WHICH keys apply to a
 * given set of answers - never writes copy directly). Same dictionary/
 * walker pattern as the rest of the SatsForge suite.
 */
export const LANGS = ['es', 'en'];
export const DEFAULT_LANG = 'es';

const dict = {
  'meta.title': { es: 'Planificador de Herencia BTC', en: 'BTC Inheritance Planner' },
  'topbar.brand': { es: 'Planificador de Herencia BTC', en: 'BTC Inheritance Planner' },
  'topbar.theme.toLight': { es: '☀ Modo claro', en: '☀ Light mode' },
  'topbar.theme.toDark': { es: '🌙 Modo oscuro', en: '🌙 Dark mode' },
  'topbar.lang.toEnglish': { es: '🌐 English', en: '🌐 English' },
  'topbar.lang.toSpanish': { es: '🌐 Español', en: '🌐 Español' },

  'notice.intro': {
    es: 'Esta herramienta convierte un cuestionario sobre tu situación actual en un plan concreto de respaldo y documentación para tus herederos — sin custodiar nada, sin guardar nada entre sesiones, sin conexión de red (revisalo: la política de seguridad de esta página la bloquea por completo). <strong>No es asesoramiento legal, financiero ni impositivo</strong> — es una guía técnica/operativa que tenés que acompañar con un profesional matriculado para la parte legal real (testamento, fideicomiso).',
    en: 'This tool turns a questionnaire about your current setup into a concrete backup and documentation plan for your heirs — without custodying anything, without keeping anything between sessions, without any network connection at all (check for yourself: this page\'s security policy blocks it completely). <strong>This is not legal, financial, or tax advice</strong> — it is technical/operational guidance you need to pair with a licensed professional for the actual legal instrument (will, trust).',
  },

  'nav.start': { es: 'Empezar', en: 'Start' },
  'nav.back': { es: '← Atrás', en: '← Back' },
  'nav.next': { es: 'Siguiente →', en: 'Next →' },
  'nav.generate': { es: 'Generar mi plan', en: 'Generate my plan' },
  'nav.restart': { es: 'Empezar de nuevo', en: 'Start over' },
  'nav.stepOf': { es: 'Paso {n} de {total}', en: 'Step {n} of {total}' },

  // ---------- Wizard: step 1, custody ----------
  'wizard.step1.title': { es: 'Tu situación actual', en: 'Your current setup' },
  'wizard.custody.label': { es: '¿Cómo tenés guardados tus bitcoin hoy?', en: 'How do you currently hold your bitcoin?' },
  'wizard.custody.single': { es: 'Una sola frase semilla, en un solo lugar', en: 'A single seed phrase, in a single place' },
  'wizard.custody.single-backed': { es: 'Una sola frase semilla, con copias en más de un lugar', en: 'A single seed phrase, with copies in more than one place' },
  'wizard.custody.hardware-single': { es: 'Una wallet de hardware (un solo dispositivo, un solo fabricante)', en: 'A hardware wallet (a single device, a single vendor)' },
  'wizard.custody.multisig': { es: 'Ya tengo una configuración multifirma (2-de-3 o similar)', en: 'I already have a multisig setup (2-of-3 or similar)' },
  'wizard.custody.exchange': { es: 'Están en un exchange o custodia de terceros', en: 'They are on an exchange or third-party custody' },
  'wizard.custody.mixed': { es: 'Una combinación de varias de las anteriores', en: 'A combination of several of the above' },

  // ---------- Wizard: step 2, backups ----------
  'wizard.step2.title': { es: 'Respaldo y redundancia', en: 'Backup and redundancy' },
  'wizard.backup.label': { es: '¿Qué tipo de respaldo físico tenés? (marcá todas las que apliquen)', en: 'What kind of physical backup do you have? (check all that apply)' },
  'wizard.backup.paper': { es: 'Copia en papel', en: 'Paper copy' },
  'wizard.backup.metal': { es: 'Copia grabada en metal (resistente a fuego/agua)', en: 'Metal-stamped copy (fire/water resistant)' },
  'wizard.backup.multipleCopies': { es: 'Más de una copia', en: 'More than one copy' },
  'wizard.backup.multipleLocations': { es: 'Copias en más de una ubicación física', en: 'Copies in more than one physical location' },

  // ---------- Wizard: step 3, heirs ----------
  'wizard.step3.title': { es: 'Tus herederos', en: 'Your heirs' },
  'wizard.heirsAware.label': { es: '¿Tu familia o herederos saben que tenés bitcoin?', en: 'Do your family/heirs know you have bitcoin?' },
  'wizard.heirsAware.yes': { es: 'Sí, lo saben', en: 'Yes, they know' },
  'wizard.heirsAware.no': { es: 'No, nadie lo sabe', en: 'No, nobody knows' },
  'wizard.heirsAware.one-trusted': { es: 'Solo una persona de confianza lo sabe', en: 'Only one trusted person knows' },

  'wizard.heirsCapable.label': { es: '¿Alguno sabría técnicamente cómo acceder, con instrucciones claras?', en: 'Would any of them know how to access it technically, given clear instructions?' },
  'wizard.heirsCapable.yes': { es: 'Sí', en: 'Yes' },
  'wizard.heirsCapable.no': { es: 'No', en: 'No' },
  'wizard.heirsCapable.unsure': { es: 'No estoy seguro', en: 'Not sure' },

  'wizard.trustedHelper.label': {
    es: '¿Tenés a alguien de confianza técnica (amigo bitcoiner, profesional especializado) que podría ayudarlos si hace falta?',
    en: 'Do you have someone technically trustworthy (a bitcoiner friend, a specialized professional) who could help them if needed?',
  },
  'wizard.trustedHelper.yes': { es: 'Sí', en: 'Yes' },
  'wizard.trustedHelper.no': { es: 'No', en: 'No' },

  // ---------- Wizard: step 4, jurisdiction ----------
  'wizard.step4.title': { es: 'Contexto (opcional)', en: 'Context (optional)' },
  'wizard.jurisdiction.label': { es: 'País o jurisdicción (opcional)', en: 'Country or jurisdiction (optional)' },
  'wizard.jurisdiction.hint': {
    es: 'Esto solo personaliza el texto de la carta — no cambia ninguna recomendación de esta herramienta. Las leyes de sucesión varían mucho según el país: el instrumento legal (testamento, fideicomiso) lo tenés que resolver con un profesional matriculado ahí, esta herramienta no da asesoramiento legal.',
    en: 'This only personalizes the letter text - it does not change any of this tool\'s recommendations. Inheritance law varies a lot by country: the actual legal instrument (will, trust) needs a licensed professional there - this tool gives no legal advice.',
  },

  // ---------- Plan document ----------
  'plan.doc.title': { es: 'PLAN DE HERENCIA Y REDUNDANCIA — BITCOIN', en: 'BITCOIN INHERITANCE AND REDUNDANCY PLAN' },
  'plan.doc.generatedNote': {
    es: 'Generado con Planificador de Herencia BTC. Revisalo, completalo con tus propias palabras, y guardalo en un lugar seguro antes de compartirlo con nadie.',
    en: 'Generated with BTC Inheritance Planner. Review it, fill it in with your own words, and keep it somewhere safe before sharing it with anyone.',
  },

  'plan.risk.title': { es: 'Diagnóstico de riesgo', en: 'Risk diagnosis' },
  'plan.risk.single': {
    es: 'Hoy tenés un único punto de falla: una sola frase semilla, en un solo lugar. Perderla (incendio, robo, olvido de dónde la guardaste) significa perder los fondos para siempre — nadie, ni vos, la puede recuperar. Que alguien más la encuentre significa que esa persona puede vaciar los fondos sin que te des cuenta hasta que sea tarde. Ambos escenarios son más probables de lo que parecen.',
    en: 'Right now you have a single point of failure: one seed phrase, in one place. Losing it (fire, theft, forgetting where you put it) means losing the funds forever — nobody, not even you, can recover them. Someone else finding it means they can drain the funds before you even notice. Both scenarios are more likely than they seem.',
  },
  'plan.risk.singleBacked': {
    es: 'Tenés varias copias de la misma frase semilla, lo cual reduce el riesgo de pérdida por accidente — pero no reduce el riesgo de robo: cualquiera de esas copias, si cae en manos equivocadas, alcanza para vaciar los fondos. Seguís teniendo un único secreto que, solo, controla todo.',
    en: 'You have several copies of the same seed phrase, which reduces the risk of accidental loss — but not the risk of theft: any single one of those copies, if it falls into the wrong hands, is enough to drain the funds. You still have one single secret that, alone, controls everything.',
  },
  'plan.risk.hardwareSingle': {
    es: 'Un solo dispositivo de hardware, de un solo fabricante, sigue siendo un único punto de falla — tanto por el hardware en sí (una falla de firmware, como la de Coldcard en julio de 2026, puede comprometer miles de dispositivos del mismo modelo a la vez) como por la frase semilla que ese dispositivo generó y que probablemente también tenés escrita en algún lado.',
    en: 'A single hardware device, from a single vendor, is still a single point of failure — both because of the hardware itself (a firmware bug, like Coldcard\'s in July 2026, can compromise thousands of devices of the same model at once) and because of the seed phrase that device generated, which you probably also have written down somewhere.',
  },
  'plan.risk.multisig': {
    es: 'Ya tenés una arquitectura de claves robusta: ningún punto único de falla debería poder vaciar los fondos por sí solo. El riesgo ahora no está en la criptografía, sino en la logística: ¿dónde están distribuidas las claves? ¿alguien además de vos sabe cómo juntarlas si hiciera falta?',
    en: 'You already have a solid key architecture: no single point of failure should be able to drain the funds on its own. The risk now isn\'t the cryptography, it\'s the logistics: where are the keys actually distributed? Does anyone besides you know how to bring them together if needed?',
  },
  'plan.risk.exchange': {
    es: 'Tener bitcoin en un exchange no es autocustodia: tus fondos dependen de los términos de servicio de esa empresa, de que siga solvente, y de que tus herederos puedan completar su propio proceso de KYC y sucesión — que puede tardar meses y no está garantizado. Es el escenario con más riesgo de pérdida total para tus herederos de toda esta lista.',
    en: 'Having bitcoin on an exchange is not self-custody: your funds depend on that company\'s terms of service, on it staying solvent, and on your heirs being able to complete their own KYC and inheritance process — which can take months and isn\'t guaranteed. It\'s the scenario with the highest risk of total loss for your heirs on this whole list.',
  },
  'plan.risk.mixed': {
    es: 'Tener los fondos repartidos entre varias configuraciones distintas (semilla suelta, hardware, exchange) multiplica la cantidad de lugares donde algo puede salir mal, y hace mucho más difícil que sepas — o que tus herederos sepan — el panorama completo. Antes de pensar en herencia, lo primero es simplificar: consolidar en una sola arquitectura clara.',
    en: 'Having funds spread across several different setups (a loose seed, hardware, an exchange) multiplies the number of places something can go wrong, and makes it much harder for you - or your heirs - to know the full picture. Before thinking about inheritance, the first step is to simplify: consolidate into one clear architecture.',
  },
  'plan.risk.noBackupAtAll': {
    es: 'Un detalle importante: marcaste que no tenés ninguna copia de respaldo además del dispositivo/memoria original. Eso significa que si ese único ejemplar se pierde o se daña, no hay forma de recuperar los fondos — ni vos, ni tus herederos, ni nadie.',
    en: 'One important detail: you marked that you have no backup copy beyond the original device/memory. That means if that single copy is lost or damaged, there is no way to recover the funds — not you, not your heirs, nobody.',
  },
  'plan.risk.heirsUnaware': {
    es: 'Otro punto crítico: tu familia no sabe que tenés bitcoin. Sin importar qué tan bien esté todo lo demás, si nadie lo sabe, esos fondos se pierden con vos — nadie va a buscar algo que no sabe que existe.',
    en: 'Another critical point: your family doesn\'t know you have bitcoin. No matter how well everything else is set up, if nobody knows, those funds are lost with you — nobody looks for something they don\'t know exists.',
  },

  'plan.upgrade.title': { es: 'Camino de mejora recomendado', en: 'Recommended upgrade path' },
  'plan.upgrade.toMultisig': {
    es: 'La mejora de mayor impacto que podés hacer es migrar a una configuración multifirma (por ejemplo 2-de-3): en vez de una sola clave que lo controla todo, hacen falta 2 de 3 claves independientes para gastar. Perder una, o que alguien robe una, ya no compromete los fondos.',
    en: 'The highest-impact upgrade you can make is moving to a multisig setup (for example 2-of-3): instead of one key controlling everything, 2 of 3 independent keys are needed to spend. Losing one, or having one stolen, no longer compromises the funds.',
  },
  'plan.upgrade.vendorDiversity': {
    es: 'Usá hardware wallets de al menos dos fabricantes distintos para esas claves, no el mismo modelo repetido tres veces. Una falla de fábrica o de firmware específica de un fabricante no debería poder comprometer más de una de tus claves a la vez.',
    en: 'Use hardware wallets from at least two different vendors for those keys, not the same model repeated three times. A factory or firmware flaw specific to one vendor shouldn\'t be able to compromise more than one of your keys at a time.',
  },
  'plan.upgrade.coldcardIncident': {
    es: 'Esto no es paranoia teórica: en julio de 2026 se descubrió que un bug de firmware de Coldcard, presente desde 2021, había colapsado la entropía de generación de semillas en miles de dispositivos, permitiendo el robo de más de 1.800 BTC. Ningún fabricante está exento de este tipo de falla — la defensa real es no depender de uno solo.',
    en: 'This is not theoretical paranoia: in July 2026 it was discovered that a Coldcard firmware bug, present since 2021, had collapsed seed-generation entropy on thousands of devices, enabling the theft of over 1,800 BTC. No vendor is immune to this kind of failure — the real defense is not depending on just one.',
  },
  'plan.upgrade.tools': {
    es: 'Para armar y coordinar una wallet multifirma podés usar Coordinador Multifirma BTC (de este mismo grupo de herramientas), y PSBT Signer BTC para firmar offline con cada dispositivo.',
    en: 'To build and coordinate a multisig wallet you can use BTC Multisig Coordinator (from this same tool family), and PSBT Signer BTC to sign offline with each device.',
  },
  'plan.upgrade.alreadyMultisig': {
    es: 'Ya estás en el escenario recomendado — el trabajo que queda no es técnico sino logístico: asegurar que las claves y sus respaldos estén distribuidos de verdad, no todos en el mismo lugar o bajo el mismo techo.',
    en: 'You are already in the recommended scenario — the work left isn\'t technical, it\'s logistical: making sure the keys and their backups are genuinely distributed, not all in the same place or under the same roof.',
  },
  'plan.upgrade.reviewDistribution': {
    es: 'Revisá específicamente: ¿las claves están en ubicaciones físicamente distintas? Si te pasara algo a vos, ¿hay al menos M-1 personas (donde M es el quorum) que podrían llegar físicamente a suficientes claves para recuperar los fondos?',
    en: 'Check specifically: are the keys in physically distinct locations? If something happened to you, are there at least M-1 people (where M is the quorum) who could physically reach enough keys to recover the funds?',
  },
  'plan.upgrade.leaveExchange': {
    es: 'Considerá migrar progresivamente a autocustodia. Podés generar una wallet nueva con Paper Wallet BTC (offline, air-gapped) o acceder a una que ya tengas con My Wallet BTC, y desde ahí evaluar directamente el salto a una configuración multifirma en vez de pasar primero por una sola clave.',
    en: 'Consider progressively migrating to self-custody. You can generate a new wallet with Paper Wallet BTC (offline, air-gapped) or access one you already have with My Wallet BTC, and from there evaluate jumping straight to a multisig setup instead of going through a single key first.',
  },
  'plan.upgrade.consolidate': {
    es: 'Antes de optimizar la herencia, simplificá la arquitectura: elegí una sola configuración (idealmente multifirma 2-de-3 con hardware de distintos fabricantes) y migrá todo ahí, en vez de mantener varios esquemas en paralelo.',
    en: 'Before optimizing for inheritance, simplify the architecture: pick one single setup (ideally 2-of-3 multisig with hardware from different vendors) and migrate everything there, instead of keeping several schemes running in parallel.',
  },

  'plan.backup.title': { es: 'Plan de distribución de respaldo', en: 'Backup distribution plan' },
  'plan.backup.intro': {
    es: 'Sea cual sea tu arquitectura de claves, la distribución física del respaldo importa tanto como la arquitectura en sí:',
    en: 'Whatever your key architecture is, the physical distribution of the backup matters as much as the architecture itself:',
  },
  'plan.backup.geographic': {
    es: 'Separación geográfica: no guardes todas las copias en la misma casa o ciudad — un incendio, inundación, o robo no debería poder afectar a más de una copia.',
    en: 'Geographic separation: don\'t keep all copies in the same house or city — a fire, flood, or theft shouldn\'t be able to affect more than one copy.',
  },
  'plan.backup.separatePassword': {
    es: 'Si cifrás un respaldo (semilla o este mismo plan) con contraseña, nunca guardes la contraseña junto con el archivo cifrado — eso anula el cifrado por completo.',
    en: 'If you encrypt a backup (a seed, or this very plan) with a password, never store the password together with the encrypted file — that defeats the encryption entirely.',
  },
  'plan.backup.fireproof': {
    es: 'Preferí soportes resistentes al fuego y al agua (placas de metal grabadas) para las copias de largo plazo, no solo papel.',
    en: 'Prefer fire- and water-resistant media (stamped metal plates) for long-term copies, not just paper.',
  },
  'plan.backup.trustedPeople': {
    es: 'Considerá que al menos una copia (o una de las claves, en multisig) esté en manos de alguien de tu confianza absoluta, no solo en cajas de seguridad a las que nadie más tiene acceso.',
    en: 'Consider having at least one copy (or one of the keys, in multisig) held by someone you trust absolutely, not only in safe deposit boxes nobody else can access.',
  },
  'plan.backup.periodicCheck': {
    es: 'Revisá periódicamente (una vez al año alcanza) que las copias siguen donde deberían estar y siguen siendo legibles.',
    en: 'Periodically check (once a year is enough) that the copies are still where they should be and still legible.',
  },

  'plan.docs.title': { es: 'Qué documentar para tus herederos', en: 'What to document for your heirs' },
  'plan.docs.intro': {
    es: 'La regla de oro: documentá CÓMO acceder, nunca el secreto en sí. Lo que tus herederos necesitan encontrar es un mapa, no el tesoro.',
    en: 'The golden rule: document HOW to access it, never the secret itself. What your heirs need to find is a map, not the treasure.',
  },
  'plan.docs.whichTools': {
    es: 'Qué software/hardware usaste (nombres específicos: "Coldcard", "Coordinador Multifirma BTC", etc.) — sin eso, ni siquiera sabrán qué buscar.',
    en: 'What software/hardware you used (specific names: "Coldcard", "BTC Multisig Coordinator", etc.) — without that, they won\'t even know what to look up.',
  },
  'plan.docs.wherePhysical': {
    es: 'Dónde están las piezas físicas (dispositivos, copias en metal, papeles) — en términos generales que vos entendés pero que no comprometan la seguridad si el documento se pierde (ej: "en la caja fuerte del banco X, sucursal Y", no la combinación en sí).',
    en: 'Where the physical pieces are (devices, metal copies, papers) — in general terms you understand but that don\'t compromise security if the document is lost (e.g. "in the safe deposit box at bank X, branch Y", not the combination itself).',
  },
  'plan.docs.whoToContact': {
    es: 'A quién contactar si necesitan ayuda técnica — un amigo bitcoiner de confianza, un profesional especializado.',
    en: 'Who to contact if they need technical help — a trusted bitcoiner friend, a specialized professional.',
  },
  'plan.docs.quorum': {
    es: 'Si es multisig: cuántas claves hacen falta (el quorum) y dónde está cada una, sin necesidad de reunir más de las que realmente hacen falta.',
    en: 'If multisig: how many keys are needed (the quorum) and where each one is, without needing to gather more than actually required.',
  },
  'plan.docs.noAmounts': {
    es: 'Evitá anotar montos exactos en documentos que vayan a circular entre varias personas o queden en lugares poco controlados — es información que solo aumenta el riesgo de que alguien se tome un interés indebido.',
    en: 'Avoid writing exact amounts in documents that will circulate among several people or sit in loosely controlled places — it\'s information that only increases the risk of someone taking an undue interest.',
  },
  'plan.docs.noSeedInDocs': {
    es: 'Nunca escribas la frase semilla completa, ni una clave privada, ni la contraseña de cifrado, en el mismo documento que explica dónde están — si ese documento se pierde o lo ve la persona equivocada, perdés la separación que te protegía.',
    en: 'Never write the full seed phrase, a private key, or the encryption password, in the same document that explains where they are — if that document is lost or seen by the wrong person, you lose the separation that was protecting you.',
  },
  'plan.docs.notTechnical': {
    es: 'Marcaste que tus herederos no serían capaces de acceder solos con instrucciones — en ese caso, el punto de "a quién contactar" de la lista de abajo no es opcional: identificá a esa persona ahora, mientras podés, y asegurate de que exista una forma de contactarla.',
    en: 'You marked that your heirs would not be able to access things on their own with instructions — in that case, the "who to contact" item below isn\'t optional: identify that person now, while you can, and make sure there\'s a way to reach them.',
  },
  'plan.docs.noHelper': {
    es: 'Todavía no identificaste a nadie de confianza técnica que pueda ayudar. Es probablemente el paso más urgente de todo este plan: sin esa persona, tus herederos dependen únicamente de instrucciones escritas, sin nadie a quien preguntarle si algo no queda claro.',
    en: 'You haven\'t yet identified anyone technically trustworthy who could help. This is probably the single most urgent step in this whole plan: without that person, your heirs depend entirely on written instructions, with nobody to ask if something isn\'t clear.',
  },

  'plan.letter.title': { es: 'Borrador de carta para tus herederos', en: 'Draft letter to your heirs' },
  'plan.letter.intro1': {
    es: 'Lo que sigue es un punto de partida para una carta que podés adaptar con tus propias palabras. No reemplaza el instrumento legal (testamento/fideicomiso) — es la guía técnica que lo acompaña.',
    en: 'What follows is a starting point for a letter you can adapt in your own words. It does not replace the legal instrument (will/trust) — it is the technical guide that accompanies it.',
  },
  'plan.letter.intro2': {
    es: '"Si estás leyendo esto, es porque necesitás acceder a bitcoin que tengo guardado. Esto es dinero real, tuyo ahora, y la forma de acceder a él depende de que sigas estos pasos con cuidado. Tomate tu tiempo, no hay apuro, y desconfiá de cualquiera que te presione a actuar rápido."',
    en: '"If you\'re reading this, it\'s because you need to access bitcoin I\'ve kept. This is real money, yours now, and accessing it depends on following these steps carefully. Take your time, there\'s no rush, and be wary of anyone pressuring you to act quickly."',
  },
  'plan.letter.placeholders': {
    es: 'Completá en tu propia copia (no en este borrador): qué software o hardware usaste, dónde está cada pieza física, y quién es la persona de confianza técnica que puede ayudar si algo no está claro.',
    en: 'Fill in on your own copy (not on this draft): what software or hardware you used, where each physical piece is, and who the technically trustworthy person is who can help if something isn\'t clear.',
  },
  'plan.letter.scamWarning': {
    es: 'Advertencia importante para incluir: las personas que reciben una herencia son un blanco frecuente de estafadores — falsos "asesores" que se ofrecen a "ayudar" a cambio de acceso a las claves. Nadie legítimo necesita tu frase semilla para ayudarte. Si alguien la pide, es una estafa.',
    en: 'Important warning to include: people receiving an inheritance are a frequent target for scammers — fake "advisors" who offer to "help" in exchange for access to the keys. No legitimate helper ever needs your seed phrase. If someone asks for it, it\'s a scam.',
  },
  'plan.letter.jurisdiction': {
    es: 'Nota de jurisdicción: este plan cubre el aspecto técnico del acceso a los fondos. El instrumento legal correspondiente a {jurisdiction} (testamento, fideicomiso, y sus implicancias impositivas) lo tenés que resolver con un profesional matriculado ahí — esta herramienta no da asesoramiento legal ni impositivo.',
    en: 'Jurisdiction note: this plan covers the technical side of accessing the funds. The legal instrument for {jurisdiction} (will, trust, and their tax implications) needs a professional licensed there — this tool gives no legal or tax advice.',
  },

  'plan.legal.title': { es: 'Aviso legal', en: 'Legal notice' },
  'plan.legal.body': {
    es: 'Este plan es una guía técnica y operativa, generada localmente en tu navegador a partir de tus respuestas. No es asesoramiento legal, financiero, ni impositivo. Las leyes de sucesión varían enormemente según el país y tu situación particular — para que este plan tenga validez legal real, consultá a un profesional matriculado en tu jurisdicción para el instrumento correspondiente (testamento, fideicomiso, u otro). Ningún dato que ingreses en esta herramienta sale de tu navegador.',
    en: 'This plan is technical and operational guidance, generated locally in your browser from your answers. It is not legal, financial, or tax advice. Inheritance law varies enormously by country and by your particular situation — for this plan to have real legal standing, consult a professional licensed in your jurisdiction for the corresponding instrument (will, trust, or other). No data you enter into this tool ever leaves your browser.',
  },

  // ---------- Result screen ----------
  'result.title': { es: 'Tu plan', en: 'Your plan' },
  'result.hint': {
    es: 'Revisalo, editá el borrador de carta con tus propias palabras, y exportalo. Nada de esto se guarda en ningún lado salvo que vos lo descargues.',
    en: 'Review it, edit the draft letter in your own words, and export it. None of this is saved anywhere unless you download it yourself.',
  },
  'result.download.txt': { es: '⬇ Descargar como texto (.txt)', en: '⬇ Download as text (.txt)' },
  'result.download.pdf': { es: '⬇ Descargar como PDF', en: '⬇ Download as PDF' },
  'result.restart': { es: 'Volver a empezar', en: 'Start over' },

  'result.encrypt.title': { es: 'Exportar cifrado (opcional)', en: 'Export encrypted (optional)' },
  'result.encrypt.hint': {
    es: 'Si vas a guardar este plan en un lugar menos controlado (una nube, un email a vos mismo), cifralo con una contraseña primero. Usa el mismo cifrado (AES-256-GCM) que Paper Wallet BTC y My Wallet BTC — un archivo cifrado por cualquiera de las tres herramientas se puede recuperar en cualquiera de las tres.',
    en: 'If you\'re going to store this plan somewhere less controlled (a cloud drive, an email to yourself), encrypt it with a password first. It uses the same encryption (AES-256-GCM) as Paper Wallet BTC and My Wallet BTC — a file encrypted by any of the three tools can be recovered in any of the three.',
  },
  'result.encrypt.password.label': { es: 'Contraseña de cifrado', en: 'Encryption password' },
  'result.encrypt.download': { es: '⬇ Descargar cifrado (.txt)', en: '⬇ Download encrypted (.txt)' },
  'error.emptyPassword': { es: 'Ingresá una contraseña primero.', en: 'Enter a password first.' },

  'strength.emptyPassphrase': { es: 'Sin contraseña', en: 'No password' },
  'strength.weak': { es: 'Débil', en: 'Weak' },
  'strength.fair': { es: 'Regular', en: 'Fair' },
  'strength.good': { es: 'Buena', en: 'Good' },
  'strength.strong': { es: 'Fuerte', en: 'Strong' },

  // ---------- Recover screen ----------
  'recover.tab': { es: 'Recuperar un plan cifrado', en: 'Recover an encrypted plan' },
  'recover.title': { es: 'Recuperar un plan cifrado', en: 'Recover an encrypted plan' },
  'recover.hint': {
    es: 'Pegá o cargá el bloque cifrado (el .txt que descargaste con "Exportar cifrado") y su contraseña para ver el plan de nuevo.',
    en: 'Paste or load the encrypted block (the .txt you downloaded with "Export encrypted") and its password to view the plan again.',
  },
  'recover.blob.label': { es: 'Bloque cifrado', en: 'Encrypted block' },
  'recover.password.label': { es: 'Contraseña', en: 'Password' },
  'recover.button': { es: 'Descifrar', en: 'Decrypt' },
  'fileLoad.button': { es: '📁 Cargar desde archivo', en: '📁 Load from file' },
  'error.fileReadFailed': { es: 'No se pudo leer el archivo: {msg}', en: 'Could not read the file: {msg}' },
  'error.decryptFailed': { es: 'No se pudo descifrar: {msg}', en: 'Could not decrypt: {msg}' },

  'footer.note': {
    es: 'Sin conexion de red, sin cookies, sin almacenamiento persistente - nada de lo que escribas sale de esta pestaña salvo que vos lo descargues. No es asesoramiento legal. Revisa el codigo fuente antes de confiar en el.',
    en: 'No network connection, no cookies, no persistent storage - nothing you write leaves this tab unless you download it yourself. Not legal advice. Review the source code before trusting it.',
  },
};

export function t(key, lang, vars) {
  const entry = dict[key];
  let str = entry ? (entry[lang] ?? entry[DEFAULT_LANG]) : key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) str = str.replaceAll(`{${k}}`, String(v));
  }
  return str;
}
