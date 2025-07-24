# 📝 Guía de Modificación de Contenido

Esta guía te explica cómo modificar fácilmente el contenido de tu portfolio sin tocar el código.

## 📁 Estructura de Archivos de Contenido

```
src/
├── data/
│   ├── portfolio.json  # Contenido principal del portfolio
│   └── config.json     # Configuración general del sitio
└── hooks/
    └── usePortfolioData.ts  # Hook para acceder a los datos
```

## 🎯 Modificar Contenido del Portfolio

### Información Personal

Edita el objeto `personal` en `src/data/portfolio.json`:

```json
{
  "personal": {
    "name": "Tu Nombre",
    "fullName": "Tu Nombre Completo",
    "title": "Tu Título Profesional",
    "description": "Tu descripción",
    "email": "tu@email.com",
    "github": "https://github.com/tu-usuario",
    "linkedin": "https://linkedin.com/in/tu-perfil",
    "location": "Tu Ubicación"
  }
}
```

### Sección Hero

Modifica el objeto `hero`:

```json
{
  "hero": {
    "greeting": "¡Hola! Soy",
    "typingText": "Tu título que se escribirá",
    "description": "Tu descripción principal",
    "ctaButtons": [
      {
        "text": "Texto del botón",
        "href": "#seccion-destino",
        "type": "primary" // o "secondary"
      }
    ]
  }
}
```

### Navegación

Edita el array `navigation`:

```json
{
  "navigation": [
    { "name": "Inicio", "href": "#hero" },
    { "name": "Sobre mí", "href": "#about" },
    { "name": "Experiencia", "href": "#experience" }
    // Añade o quita elementos aquí
  ]
}
```

### Experiencia Laboral

Modifica el objeto `experience`:

```json
{
  "experience": {
    "title": "Experiencia Laboral",
    "subtitle": "Mi trayectoria profesional",
    "items": [
      {
        "id": 1,
        "position": "Desarrollador Full Stack Senior",
        "company": "Tech Solutions S.L.",
        "location": "Madrid, España",
        "type": "Tiempo completo",
        "startDate": "2022-03",
        "endDate": "Actualidad", // o fecha específica
        "duration": "2 años",
        "description": "Descripción del puesto...",
        "achievements": [
          "Logro específico 1",
          "Logro específico 2"
        ],
        "technologies": ["React", "Node.js", "AWS"],
        "featured": true // para destacar posiciones importantes
      }
    ],
    "education": [
      {
        "id": 1,
        "degree": "Grado en Ingeniería Informática",
        "institution": "Universidad",
        "location": "Ciudad, País",
        "startDate": "2016-09",
        "endDate": "2020-06",
        "gpa": "8.5/10", // opcional
        "honors": ["Matrícula de Honor"], // opcional
        "relevantCourses": ["Curso 1", "Curso 2"] // opcional
      }
    ],
    "certifications": [
      {
        "name": "AWS Certified Solutions Architect",
        "issuer": "Amazon Web Services",
        "date": "2022-03",
        "credentialId": "AWS-SA-2022-001234",
        "url": "https://aws.amazon.com/certification/",
        "skills": ["AWS", "Cloud Computing"]
      }
    ]
  }
}
```

### Tecnologías

Modifica el objeto `technologies`:

```json
{
  "technologies": {
    "title": "Mis Tecnologías",
    "subtitle": "Lo que manejo",
    "categories": [
      {
        "name": "Frontend",
        "icon": "🎨",
        "skills": [
          { "name": "React", "level": 90, "icon": "⚛️" }
          // Añade más skills aquí
        ]
      }
      // Añade más categorías aquí
    ]
  }
}
```

### Proyectos

Edita el array `projects.items`:

```json
{
  "projects": {
    "title": "Mis Proyectos",
    "subtitle": "Algunos trabajos",
    "items": [
      {
        "id": 1,
        "title": "Nombre del Proyecto",
        "description": "Descripción del proyecto",
        "image": "/images/proyecto1.jpg",
        "technologies": ["React", "Node.js"],
        "github": "https://github.com/tu-usuario/proyecto",
        "demo": "https://proyecto-demo.com",
        "featured": true // true para proyectos destacados
      }
      // Añade más proyectos aquí
    ]
  }
}
```

## ⚙️ Configuración General

Edita `src/data/config.json` para cambiar:

### Tema y Colores

```json
{
  "theme": {
    "defaultTheme": "dark", // "dark" o "light"
    "enableThemeToggle": true,
    "colors": {
      "primary": "#3182ce",
      "accent": "#ff6b35"
      // Modifica los colores aquí
    }
  }
}
```

### Características

```json
{
  "features": {
    "enableContactForm": true,
    "enableBlog": false,
    "enableAnalytics": false
    // Activa/desactiva funcionalidades
  }
}
```

### Animaciones

```json
{
  "animations": {
    "enableHeroTyping": true,
    "typingSpeed": 100, // Velocidad de escritura en ms
    "enableHoverEffects": true
  }
}
```

## 🚀 Cómo Añadir Nuevo Contenido

### ✅ Añadir una Nueva Experiencia Laboral
1. Abre `src/data/portfolio.json`
2. Ve al array `experience.items`
3. Añade un nuevo objeto con la estructura:
```json
{
  "id": 5, // Número único
  "position": "Tu Nuevo Puesto",
  "company": "Nombre de la Empresa",
  "location": "Ciudad, País",
  "type": "Tiempo completo", // o "Freelance", "Prácticas", etc.
  "startDate": "2023-01",
  "endDate": "Actualidad", // o fecha específica como "2024-06"
  "duration": "1 año 6 meses",
  "description": "Descripción de tus responsabilidades...",
  "achievements": [
    "Logro específico y medible 1",
    "Logro específico y medible 2"
  ],
  "technologies": ["React", "Node.js", "AWS"],
  "featured": true // true para destacar esta experiencia
}
```

### ✅ Añadir una Nueva Certificación
1. Ve a `experience.certifications`
2. Añade:
```json
{
  "name": "Nombre de la Certificación",
  "issuer": "Organización que la emite",
  "date": "2024-01",
  "credentialId": "ID-CERT-2024-001",
  "url": "https://link-verificacion.com",
  "skills": ["Skill 1", "Skill 2"]
}
```

### ✅ Añadir Educación
1. Ve a `experience.education`
2. Añade:
```json
{
  "id": 3,
  "degree": "Máster en Desarrollo Web",
  "institution": "Universidad Online",
  "location": "Online",
  "startDate": "2021-09",
  "endDate": "2022-06",
  "gpa": "9.0/10", // opcional
  "honors": ["Mejor Proyecto Final"], // opcional
  "relevantCourses": ["React Avanzado", "Node.js"] // opcional
}
```

1. Abre `src/data/portfolio.json`
2. Ve al array `projects.items`
3. Añade un nuevo objeto con la estructura:

```json
{
  "id": 5, // Número único
  "title": "Mi Nuevo Proyecto",
  "description": "Descripción del nuevo proyecto",
  "image": "/images/nuevo-proyecto.jpg",
  "technologies": ["React", "TypeScript"],
  "github": "https://github.com/usuario/nuevo-proyecto",
  "demo": "https://nuevo-proyecto.com",
  "featured": true
}
```

### ✅ Añadir una Nueva Tecnología

1. Ve a `technologies.categories`
2. Encuentra la categoría apropiada ("Frontend", "Backend", etc.)
3. Añade al array `skills`:

```json
{
  "name": "Nueva Tecnología",
  "level": 80,
  "icon": "🔥"
}
```

### ✅ Añadir una Nueva Sección de Navegación

1. Ve al array `navigation`
2. Añade:

```json
{
  "name": "Nueva Sección",
  "href": "#nueva-seccion"
}
```

## 🎨 Personalización Avanzada

### Cambiar Colores del Tema

Edita `src/styles/colors.css` para cambios más profundos de color.

### Añadir Nuevos Hooks

Si necesitas acceso a datos específicos, puedes añadir nuevos hooks en `src/hooks/usePortfolioData.ts`.

## 📋 Lista de Verificación Antes de Publicar

- [ ] ✅ Información personal actualizada
- [ ] ✅ Enlaces de redes sociales funcionando
- [ ] ✅ Proyectos con imágenes y enlaces correctos
- [ ] ✅ Tecnologías y niveles actualizados
- [ ] ✅ Descripción del hero atractiva
- [ ] ✅ Email de contacto correcto
- [ ] ✅ URLs de GitHub y LinkedIn actualizadas

## 🆘 Solución de Problemas

### Error: "Cannot find module"

- Asegúrate de que las rutas en los imports estén correctas
- Verifica que los archivos JSON estén en la carpeta `src/data/`

### Los cambios no se reflejan

- Guarda los archivos JSON
- Reinicia el servidor de desarrollo (`npm run dev`)
- Verifica que no haya errores de sintaxis JSON

### Imágenes no se muestran

- Coloca las imágenes en la carpeta `public/images/`
- Usa rutas relativas desde la raíz: `/images/nombre-imagen.jpg`

## 💡 Consejos

1. **Usa un validador JSON** online para verificar la sintaxis
2. **Haz backups** antes de cambios grandes
3. **Prueba localmente** antes de hacer deploy
4. **Mantén consistencia** en nombres y estructura
5. **Optimiza las imágenes** antes de subirlas

¡Con esta estructura, modificar tu portfolio es súper fácil! 🚀
