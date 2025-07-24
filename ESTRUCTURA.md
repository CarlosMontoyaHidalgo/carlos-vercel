# Estructura del Proyecto

Este proyecto ha sido reorganizado con una estructura más modular y escalable.

## 📁 Estructura de Carpetas

```
src/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes de la aplicación
│   ├── layout/           # Componentes de layout
│   │   ├── ContentWrapper.tsx
│   │   ├── Navigation.tsx
│   │   └── Sidebar.tsx
│   ├── sections/         # Secciones de la página
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   └── Technologies.tsx
│   └── ui/               # Componentes de UI reutilizables
│       ├── Loading.tsx
│       ├── NavigationSettings.tsx
│       ├── PageLoader.tsx
│       └── ThemeToggle.tsx
├── providers/            # Context providers
│   ├── NavigationProvider.tsx
│   └── ThemeProvider.tsx
└── utils/                # Utilidades y constantes
    ├── constants.ts
    └── helpers.ts
```

## 🎯 Características Principales

### Navegación Dual

- **Modo Header**: Navegación tradicional en la parte superior
- **Modo Sidebar**: Barra lateral colapsible con menú hamburguesa
- Intercambiable dinámicamente con el botón de configuración
- Persistencia de preferencias en localStorage

### Sistema de Temas

- **Modo Claro**: Tema brillante y limpio
- **Modo Oscuro**: Tema oscuro con alto contraste
- **Modo Sistema**: Se adapta automáticamente a las preferencias del sistema
- Transiciones suaves entre temas

### Experiencia Móvil Mejorada

- Sidebar responsivo que se convierte en overlay en móvil
- Botón hamburguesa animado con rotación
- Prevención de scroll del body cuando el sidebar está abierto
- Cierre automático al navegar (especialmente útil en móvil)

### Funcionalidades Avanzadas

- **Navegación por teclado**: Cierre del sidebar con tecla Escape
- **Animaciones fluidas**: Transiciones y transformaciones suaves
- **Accesibilidad**: Labels ARIA y manejo de focus
- **Optimización de rendimiento**: Debouncing y lazy loading donde corresponde

## 🔧 Componentes Destacados

### NavigationProvider

Maneja el estado global de navegación:

- Tipo de navegación (header/sidebar)
- Estado del sidebar (abierto/cerrado)
- Persistencia de preferencias

### Sidebar

Barra lateral completamente funcional:

- Navegación suave entre secciones
- Controles de tema y navegación
- Animaciones de entrada/salida
- Overlay para móvil

### NavigationSettings

Componente de configuración:

- Alternador visual entre modos
- Dropdown con vista previa
- Iconos descriptivos

## 🛠 Utilidades

### helpers.ts

Funciones auxiliares reutilizables:

- `scrollToSection()`: Navegación suave con callbacks
- `debounce()`: Control de frecuencia de llamadas
- `prefersReducedMotion()`: Detección de preferencias de accesibilidad

### constants.ts

Constantes centralizadas:

- Items de navegación
- Enlaces sociales
- Duraciones de animación
- Breakpoints responsive

## 🚀 Mejoras Implementadas

1. **Organización Modular**: Separación clara de responsabilidades
2. **TypeScript Estricto**: Tipado completo en toda la aplicación
3. **Accesibilidad**: Cumplimiento de estándares WCAG
4. **Rendimiento**: Optimizaciones y lazy loading
5. **Mantenibilidad**: Código limpio y bien documentado

## 📱 Responsive Design

- **Móvil**: Sidebar como overlay con botón hamburguesa
- **Tablet**: Transición suave entre modos
- **Desktop**: Sidebar persistente con toggle opcional

## 🎨 Sistema de Diseño

- Variables CSS para temas consistentes
- Animaciones y transiciones estandarizadas
- Componentes reutilizables con API consistente
- Glass morphism y efectos modernos
