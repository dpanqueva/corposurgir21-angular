# Corposurgir21 Angular

Frontend del sitio web de CORPOSURGIR21, una ONG colombiana. Desarrollado con Angular 16.2.12, Bootstrap 5.3 y CSS plano.

## Desarrollo local

```bash
npm install
ng serve
```

Navigate to `http://localhost:4200/`.

## Build producción

```bash
ng build --configuration=production --base-href=/
```

Los archivos se generan en `dist/`.

---

## Buenas prácticas del proyecto

### Arquitectura de componentes

Los componentes siguen la estructura de carpetas `principal/` para vistas públicas y `auth/` para el módulo de administración.

```
components/
├── about/
│   ├── principal/        # Vista pública
│   └── auth/             # Panel admin
├── alliances/
│   ├── principal/
│   │   ├── alliances.component.ts
│   │   └── detail/
│   └── auth/
├── category/
│   ├── principal/
│   │   └── category-detail/
│   └── auth/
└── ...
```

### Reglas de edición — NO editar

Por seguridad y estabilidad, **nunca modificar**:

- `src/app/components/login/*`
- `src/app/components/back-page/*`
- `src/app/components/spinner/*`
- `src/styles.css` (global de Angular)
- `src/assets/css/bootstrap.min.css`
- `src/assets/css/bootstrap-icons.css`
- Archivos `.component.ts` (lógica Angular)
- `angular.json`, `package.json`, `tsconfig.json`

### Capa de datos vs Presentación

**Principio rector:** dos capas que nunca se mezclan.

| Capa | Qué es | Qué haces |
|------|--------|-----------|
| Datos | Todo lo Angular: `{{ }}`, `*ngFor`, `[binding]`... | **PRESERVAR** sin excepción |
| Presentación | HTML estructural, clases CSS, layout, tipografía | **REESCRIBIR** con libertad |

Al reescribir HTML/CSS de un componente:
- ✅ Conservar todas las expresiones `{{ }}`, directivas `*ngFor/*ngIf`, bindings `[prop]` y eventos `(event)`
- ✅ Proponer nuevo DOM semántico
- ✅ Reescribir CSS completamente
- ❌ Nunca cambiar `[routerLink]` por `href`
- ❌ Nunca reemplazar interpolaciones por texto literal

### Estilos CSS — Reglas estrictas

```
✅ CSS plano — SIN SCSS, SIN SASS, SIN nesting
✅ Solo variables var(--cs-*) — NUNCA hex hardcodeados
✅ NUNCA usar !important (salvo para sobrescribir Bootstrap)
✅ NUNCA usar style="" inline en HTML
✅ NUNCA usar degradados (gradient) en fondos de sección
✅ Solo las 2 familias tipográficas del sistema: --font-display y --font-body
```

### Sistema de diseño

Las variables CSS se definen en `src/assets/css/styles.css` en `:root`:

```css
:root {
  --cs-primary:       #135A5F;   /* verde teal oscuro */
  --cs-primary-dark:  #0D3E42;   /* hover */
  --cs-secondary:     #58812C;   /* verde oliva */
  --cs-accent:        #2297A5;   /* azul teal */
  --cs-bg:            #FAFAFA;
  --cs-bg-soft:       #F3F5FA;
  --cs-text:          #1A1A1A;
  --cs-text-mid:      #37517E;
  --cs-muted:         #6B6B6B;
  --cs-line:          #E5E8E8;
  --cs-white:         #FFFFFF;
  --font-display:     'Cormorant Garamond', serif;
  --font-body:        'Inter', sans-serif;
  --section-py:       6rem;
}
```

Google Fonts se carga en `src/index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

### Clases utilitarias globales

Definidas una sola vez en `styles.css`:

- `.section-label` — overline de sección
- `.btn-cs` — botón sólido institucional
- `.btn-cs-outline` — botón contorno institucional
- `.cs-section-hero` — hero de página interior
- `.cs-section-body` — sección de contenido estándar

### Rutas del sitio

Las rutas públicas están en `src/app/common/routes.modules.ts`:

| Ruta | Componente |
|------|------------|
| `/` | HomeComponent |
| `/nosotros` | AboutComponent |
| `/alianzas` | AlliancesComponent |
| `/alianzas/:nombre` | DetailComponent |
| `/categoria/:nombre` | CategoryDetailComponent |
| `/contactanos` | ContactComponent |
| `/informacion-donaciones` | DonationComponent |
| `/login` | LoginComponent |

Las rutas del panel admin tienen el prefijo `modulo-` y están protegidas por `AdminGuard`.

### Workflow para editar un componente

1. **Leer el .ts** — identificar propiedades disponibles en el template
2. **Leer el .html actual** — listar todas las expresiones Angular (`{{ }}`, `*ngFor`, `[binding]`, etc.)
3. **Diseñar el DOM nuevo** — proponer estructura semántica desde cero
4. **Escribir el .html** — incrustar cada expresión Angular en su nuevo elemento
5. **Escribir el .css** — solo var(--cs-*), CSS plano, mobile-first
6. **Verificar** — confirmar que ninguna expresión Angular fue eliminada o alterada

### Design tokens

- **Títulos**: `font-family: var(--font-display)`, peso 400-600
- **Cuerpo**: `font-family: var(--font-body)`, peso 400, `line-height: 1.75`
- **Animaciones**: solo `opacity` + `translateY`, duración `0.4s ease`
- **Separadores**: `border-top: 1px solid var(--cs-line)` — nada más
- **Spinning**: `padding: var(--section-py) 0` por sección

### Errores comunes a evitar

- ❌ Poner el logotipo sobre imágenes de fondo
- ❌ Usar imágenes de banco de imágenes posadas o dramáticas en el hero
- ❌ Crear submenús de más de un nivel en el navbar (máximo 7 ítems)
- ❌ Incluir textos estatutarios completos inline en el HTML
- ❌ Usar WhatsApp personal o lenguaje informal en Contact
- ❌ Inventar nombres de propiedades Angular — siempre leer el `.ts` primero

---

## Further help

Para más información sobre Angular CLI: https://angular.io/cli