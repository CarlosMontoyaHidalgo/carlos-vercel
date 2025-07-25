'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Save, X, Edit2, BarChart3, FileText, Code, Users, Briefcase, LogOut, Shield } from 'lucide-react'
import Link from 'next/link'
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard'
import AdminLoginForm from '@/components/admin/AdminLoginForm'

interface ContentSection {
  id: string
  title: string
  content: string
  type: 'text' | 'technologies' | 'experience'
}

interface Experience {
  id: number
  position: string
  company: string
  location: string
  type: string
  startDate: string
  endDate: string
  duration: string
  description: string
  achievements: string[]
  technologies: string[]
  featured: boolean
}

interface Technology {
  name: string
  icon: string
  level: '' | 'learning'
}

interface TechnologyCategory {
  name: string
  icon: string
  skills: Technology[]
}

interface Project {
  id: number
  title: string
  description: string
  image: string | null
  technologies: string[]
  github: string | null
  demo: string | null
  featured: boolean
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [securityStats, setSecurityStats] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('analytics')
  const [sections, setSections] = useState<ContentSection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState('')
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [technologies, setTechnologies] = useState<TechnologyCategory[]>([])
  const [editingTechnology, setEditingTechnology] = useState<Technology | null>(null)
  const [editingCategory, setEditingCategory] = useState<string>('')
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryIcon, setNewCategoryIcon] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  useEffect(() => {
    checkAuthStatus()
    loadContent()
    loadExperiences()
    loadTechnologies()
    loadProjects()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/admin/auth')
      if (response.ok) {
        const data = await response.json()
        setIsAuthenticated(true)
        setSecurityStats(data.stats)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      setIsAuthenticated(false)
      setSecurityStats(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
    checkAuthStatus() // Recargar stats de seguridad
  }

  const loadContent = async () => {
    try {
      const response = await fetch('/api/admin/content')
      const data = await response.json()
      setSections(data)
    } catch (error) {
      console.error('Error loading content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadExperiences = async () => {
    try {
      const response = await fetch('/api/admin/experiences')
      const data = await response.json()
      setExperiences(data)
    } catch (error) {
      console.error('Error loading experiences:', error)
    }
  }

  const loadTechnologies = async () => {
    try {
      const response = await fetch('/api/admin/technologies')
      const data = await response.json()
      setTechnologies(data)
    } catch (error) {
      console.error('Error loading technologies:', error)
    }
  }

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error loading projects:', error)
    }
  }

  const saveContent = async (sectionId: string, content: string) => {
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sectionId, content }),
      })

      if (response.ok) {
        alert('Contenido guardado exitosamente!')
        loadContent()
        setActiveSection(null)
      } else {
        alert('Error al guardar el contenido')
      }
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Error al guardar el contenido')
    }
  }

  const saveExperiences = async () => {
    try {
      const response = await fetch('/api/admin/experiences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ experiences }),
      })

      if (response.ok) {
        alert('Experiencias guardadas exitosamente!')
        loadExperiences()
        loadContent()
      } else {
        alert('Error al guardar las experiencias')
      }
    } catch (error) {
      console.error('Error saving experiences:', error)
      alert('Error al guardar las experiencias')
    }
  }

  const saveTechnologies = async () => {
    try {
      const response = await fetch('/api/admin/technologies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ technologies }),
      })

      if (response.ok) {
        alert('Tecnologías guardadas exitosamente!')
        loadTechnologies()
        loadContent()
      } else {
        alert('Error al guardar las tecnologías')
      }
    } catch (error) {
      console.error('Error saving technologies:', error)
      alert('Error al guardar las tecnologías')
    }
  }

  const saveProjects = async (updatedProjects?: Project[]) => {
    const projectsToSave = updatedProjects || projects
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectsToSave),
      })

      if (response.ok) {
        if (updatedProjects) {
          setProjects(updatedProjects)
        }
        alert('Proyectos guardados exitosamente!')
        loadProjects()
        loadContent()
      } else {
        alert('Error al guardar los proyectos')
      }
    } catch (error) {
      console.error('Error saving projects:', error)
      alert('Error al guardar los proyectos')
    }
  }

  const startEditing = (section: ContentSection) => {
    setActiveSection(section.id)
    setEditingContent(section.content)
  }

  const cancelEditing = () => {
    setActiveSection(null)
    setEditingContent('')
  }

  const handleSave = () => {
    if (activeSection) {
      saveContent(activeSection, editingContent)
    }
  }

  const addNewExperience = () => {
    const newExperience: Experience = {
      id: Math.max(...experiences.map(e => e.id), 0) + 1,
      position: '',
      company: '',
      location: '',
      type: 'Prácticas',
      startDate: '',
      endDate: '',
      duration: '',
      description: '',
      achievements: [''],
      technologies: [''],
      featured: false
    }
    setEditingExperience(newExperience)
  }

  const editExperience = (experience: Experience) => {
    setEditingExperience({ ...experience })
  }

  const deleteExperience = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta experiencia?')) {
      setExperiences(experiences.filter(exp => exp.id !== id))
    }
  }

  const saveExperience = () => {
    if (!editingExperience) return
    
    if (experiences.find(exp => exp.id === editingExperience.id)) {
      setExperiences(experiences.map(exp => 
        exp.id === editingExperience.id ? editingExperience : exp
      ))
    } else {
      setExperiences([...experiences, editingExperience])
    }
    
    setEditingExperience(null)
  }

  const cancelEditExperience = () => {
    setEditingExperience(null)
  }

  const addNewTechnology = (categoryName: string) => {
    const newTechnology: Technology = {
      name: '',
      icon: '🔧',
      level: ''
    }
    setEditingTechnology(newTechnology)
    setEditingCategory(categoryName)
  }

  const editTechnology = (technology: Technology, categoryName: string) => {
    setEditingTechnology({ ...technology })
    setEditingCategory(categoryName)
  }

  const deleteTechnology = (technologyName: string, categoryName: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta tecnología?')) {
      setTechnologies(technologies.map(category => 
        category.name === categoryName 
          ? { 
              ...category, 
              skills: category.skills.filter(tech => tech.name !== technologyName) 
            }
          : category
      ))
    }
  }

  const deleteCategory = (categoryName: string) => {
    if (confirm(`¿Estás seguro de que quieres eliminar toda la categoría "${categoryName}" y todas sus tecnologías?`)) {
      setTechnologies(technologies.filter(category => category.name !== categoryName))
    }
  }

  const addNewCategory = () => {
    if (!newCategoryName.trim() || !newCategoryIcon.trim()) {
      alert('Por favor, completa el nombre y el icono de la categoría')
      return
    }

    if (technologies.find(cat => cat.name === newCategoryName)) {
      alert('Ya existe una categoría con ese nombre')
      return
    }

    const newCategory: TechnologyCategory = {
      name: newCategoryName.trim(),
      icon: newCategoryIcon.trim(),
      skills: []
    }

    setTechnologies([...technologies, newCategory])
    setNewCategoryName('')
    setNewCategoryIcon('')
    setShowNewCategoryForm(false)
  }

  const cancelNewCategory = () => {
    setNewCategoryName('')
    setNewCategoryIcon('')
    setShowNewCategoryForm(false)
  }

  const saveTechnology = () => {
    if (!editingTechnology || !editingCategory) return
    
    setTechnologies(technologies.map(category => {
      if (category.name === editingCategory) {
        const existingTechIndex = category.skills.findIndex(tech => tech.name === editingTechnology.name)
        if (existingTechIndex >= 0) {
          // Actualizar existente
          const updatedSkills = [...category.skills]
          updatedSkills[existingTechIndex] = editingTechnology
          return { ...category, skills: updatedSkills }
        } else {
          // Añadir nueva
          return { ...category, skills: [...category.skills, editingTechnology] }
        }
      }
      return category
    }))
    
    setEditingTechnology(null)
    setEditingCategory('')
  }

  const cancelEditTechnology = () => {
    setEditingTechnology(null)
    setEditingCategory('')
  }

  const addNewProject = () => {
    const newProject: Project = {
      id: Date.now(), // Usar timestamp como ID único
      title: '',
      description: '',
      image: null,
      technologies: [],
      github: null,
      demo: null,
      featured: false
    }
    setEditingProject(newProject)
  }

  const editProject = (project: Project) => {
    setEditingProject({ ...project })
  }

  const deleteProject = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      const updatedProjects = projects.filter(p => p.id !== id)
      saveProjects(updatedProjects)
    }
  }

  const saveProject = () => {
    if (!editingProject) return
    
    let updatedProjects: Project[]
    
    if (projects.find(proj => proj.id === editingProject.id)) {
      updatedProjects = projects.map(proj => 
        proj.id === editingProject.id ? editingProject : proj
      )
    } else {
      updatedProjects = [...projects, editingProject]
    }
    
    saveProjects(updatedProjects)
    setEditingProject(null)
  }

  const cancelEditProject = () => {
    setEditingProject(null)
  }

  const renderExperienceForm = () => {
    if (!editingExperience) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {editingExperience.id && experiences.find(e => e.id === editingExperience.id) 
                ? 'Editar Experiencia' 
                : 'Nueva Experiencia'}
            </h3>
            <button
              onClick={cancelEditExperience}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Posición
                </label>
                <input
                  type="text"
                  value={editingExperience.position}
                  onChange={(e) => setEditingExperience({...editingExperience, position: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ej: Desarrollador Web"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Empresa
                </label>
                <input
                  type="text"
                  value={editingExperience.company}
                  onChange={(e) => setEditingExperience({...editingExperience, company: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ej: TechCorp S.L."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ubicación
                </label>
                <input
                  type="text"
                  value={editingExperience.location}
                  onChange={(e) => setEditingExperience({...editingExperience, location: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ej: Madrid, España"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tipo
                </label>
                <select
                  value={editingExperience.type}
                  onChange={(e) => setEditingExperience({...editingExperience, type: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="Prácticas">Prácticas</option>
                  <option value="Prácticas Externas">Prácticas Externas</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Tiempo Completo">Tiempo Completo</option>
                  <option value="Tiempo Parcial">Tiempo Parcial</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha Inicio
                </label>
                <input
                  type="month"
                  value={editingExperience.startDate}
                  onChange={(e) => setEditingExperience({...editingExperience, startDate: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha Fin
                </label>
                <input
                  type="month"
                  value={editingExperience.endDate}
                  onChange={(e) => setEditingExperience({...editingExperience, endDate: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Duración
                </label>
                <input
                  type="text"
                  value={editingExperience.duration}
                  onChange={(e) => setEditingExperience({...editingExperience, duration: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ej: 3 meses"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Descripción
              </label>
              <textarea
                value={editingExperience.description}
                onChange={(e) => setEditingExperience({...editingExperience, description: e.target.value})}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-24"
                placeholder="Describe las responsabilidades y tareas principales..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tecnologías (separadas por coma)
              </label>
              <input
                type="text"
                value={editingExperience.technologies.join(', ')}
                onChange={(e) => setEditingExperience({
                  ...editingExperience, 
                  technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="React, TypeScript, Node.js"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Logros (uno por línea)
              </label>
              <textarea
                value={editingExperience.achievements.join('\n')}
                onChange={(e) => setEditingExperience({
                  ...editingExperience, 
                  achievements: e.target.value.split('\n').filter(a => a.trim())
                })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-24"
                placeholder="Logro 1&#10;Logro 2&#10;Logro 3"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={editingExperience.featured}
                onChange={(e) => setEditingExperience({...editingExperience, featured: e.target.checked})}
                className="rounded"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Destacar esta experiencia
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={saveExperience}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
              <button
                onClick={cancelEditExperience}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderTechnologyForm = () => {
    if (!editingTechnology) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {technologies.find(cat => cat.name === editingCategory)?.skills.find(tech => tech.name === editingTechnology.name)
                ? 'Editar Tecnología' 
                : 'Nueva Tecnología'}
            </h3>
            <button
              onClick={cancelEditTechnology}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Categoría
              </label>
              <input
                type="text"
                value={editingCategory}
                disabled
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre de la Tecnología
              </label>
              <input
                type="text"
                value={editingTechnology.name}
                onChange={(e) => setEditingTechnology({...editingTechnology, name: e.target.value})}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ej: React"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Icono (Emoji)
              </label>
              <input
                type="text"
                value={editingTechnology.icon}
                onChange={(e) => setEditingTechnology({...editingTechnology, icon: e.target.value})}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ej: ⚛️"
                maxLength={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nivel de Conocimiento
              </label>
              <select
                value={editingTechnology.level}
                onChange={(e) => setEditingTechnology({...editingTechnology, level: e.target.value as '' | 'learning'})}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Sin etiqueta</option>
                <option value="learning">Aprendiendo</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={saveTechnology}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
              <button
                onClick={cancelEditTechnology}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderEditor = (section: ContentSection) => {
    const isJsonEditor = section.type === 'technologies' || section.type === 'experience'
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {section.type === 'technologies' && '💡 Formato JSON: Edita las categorías y tecnologías'}
            {section.type === 'experience' && '💼 Formato JSON: Edita/añade experiencia (mantén la existente)'}
            {section.type === 'text' && '📝 Texto normal'}
          </span>
        </div>
        <textarea
          value={editingContent}
          onChange={(e) => setEditingContent(e.target.value)}
          className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isJsonEditor ? 'h-96 font-mono text-sm' : 'h-40'
          }`}
          placeholder={
            section.type === 'technologies' 
              ? 'Edita las categorías de tecnologías en formato JSON...'
              : section.type === 'experience'
              ? 'Edita/añade experiencia profesional - mantén la estructura JSON existente...'
              : 'Edita el contenido aquí...'
          }
        />
        {isJsonEditor && (
          <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
            ⚠️ Cuidado: Este es contenido JSON. Asegúrate de mantener la sintaxis correcta.
          </div>
        )}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Guardar
          </button>
          <button
            onClick={cancelEditing}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando panel de administración...</p>
        </div>
      </div>
    )
  }

  const renderProjectForm = () => {
    if (!editingProject) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingProject.id && projects.find(p => p.id === editingProject.id) 
                  ? 'Editar Proyecto' 
                  : 'Nuevo Proyecto'}
              </h3>
              <button
                onClick={cancelEditProject}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nombre del proyecto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Descripción *
                </label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descripción del proyecto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL de la imagen
                </label>
                <input
                  type="text"
                  value={editingProject.image || ''}
                  onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="/images/proyecto.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tecnologías (separadas por coma)
                </label>
                <input
                  type="text"
                  value={editingProject.technologies.join(', ')}
                  onChange={(e) => setEditingProject({
                    ...editingProject, 
                    technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                  })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, TypeScript, Tailwind CSS"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL de GitHub
                </label>
                <input
                  type="text"
                  value={editingProject.github || ''}
                  onChange={(e) => setEditingProject({...editingProject, github: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/usuario/proyecto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL de Demo
                </label>
                <input
                  type="text"
                  value={editingProject.demo || ''}
                  onChange={(e) => setEditingProject({...editingProject, demo: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://mi-proyecto.vercel.app"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editingProject.featured}
                  onChange={(e) => setEditingProject({...editingProject, featured: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Proyecto destacado
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={saveProject}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Guardar Proyecto
              </button>
              <button
                onClick={cancelEditProject}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Mostrar pantalla de loading mientras verifica autenticación
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Verificando acceso...</p>
        </motion.div>
      </div>
    )
  }

  // Mostrar formulario de login si no está autenticado
  if (!isAuthenticated) {
    return <AdminLoginForm onAuthenticated={handleAuthenticated} />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Panel de Administración
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Gestiona tu portfolio desde un lugar centralizado
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Security Stats */}
                {securityStats && (
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <Shield size={16} className="text-green-600 dark:text-green-400" />
                      <span className="text-green-700 dark:text-green-300">
                        {securityStats.activeSessions} sesión{securityStats.activeSessions !== 1 ? 'es' : ''} activa{securityStats.activeSessions !== 1 ? 's' : ''}
                      </span>
                    </div>
                    {securityStats.blockedIPs > 0 && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                        <span className="text-red-700 dark:text-red-300">
                          {securityStats.blockedIPs} IP{securityStats.blockedIPs !== 1 ? 's' : ''} bloqueada{securityStats.blockedIPs !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Logout Button */}
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Cerrar sesión"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Salir</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {[
                  { id: 'analytics', name: 'Analytics', icon: BarChart3, description: 'Métricas y estadísticas' },
                  { id: 'content', name: 'Contenido', icon: FileText, description: 'Textos y secciones' },
                  { id: 'experience', name: 'Experiencia', icon: Briefcase, description: 'Trabajo y formación' },
                  { id: 'technologies', name: 'Tecnologías', icon: Code, description: 'Skills técnicas' },
                  { id: 'projects', name: 'Proyectos', icon: Users, description: 'Portfolio de trabajos' }
                ].map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`group relative py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        isActive
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={18} />
                        <span>{tab.name}</span>
                      </div>
                      <div className="absolute left-0 right-0 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {tab.description}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnalyticsDashboard />
              </motion.div>
            )}

            {activeTab === 'content' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid gap-6">
                  {sections.filter(section => section.type !== 'experience').map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                  {activeSection !== section.id && (
                    <button
                      onClick={() => startEditing(section)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Editar
                    </button>
                  )}
                </div>

                {activeSection === section.id ? (
                  renderEditor(section)
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    {section.type === 'text' ? (
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {section.content}
                      </p>
                    ) : (
                      <div className="text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium">
                            {section.type === 'technologies' && '💡 Tecnologías (JSON)'}
                          </span>
                        </div>
                        <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                          {section.content.substring(0, 200)}...
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'experience' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
            {/* Gestor de Experiencias */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  🏢 Gestor de Experiencias Profesionales
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={addNewExperience}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Nueva Experiencia
                  </button>
                  <button
                    onClick={saveExperiences}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Guardar Cambios
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {exp.position || 'Sin título'}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {exp.company} • {exp.type} • {exp.duration}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {exp.description || 'Sin descripción'}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => editExperience(exp)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteExperience(exp.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {experiences.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No hay experiencias añadidas. Haz clic en "Nueva Experiencia" para empezar.
                  </div>
                )}
              </div>
            </motion.div>
              </motion.div>
            )}

            {activeTab === 'technologies' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
            {/* Gestor de Tecnologías */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  💡 Gestor de Tecnologías
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowNewCategoryForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Nueva Categoría
                  </button>
                  <button
                    onClick={saveTechnologies}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Guardar Cambios
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Formulario para nueva categoría */}
                {showNewCategoryForm && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                      ➕ Nueva Categoría de Tecnologías
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                          Nombre de la Categoría
                        </label>
                        <input
                          type="text"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          className="w-full p-2 border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Ej: Base de Datos"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                          Icono (Emoji)
                        </label>
                        <input
                          type="text"
                          value={newCategoryIcon}
                          onChange={(e) => setNewCategoryIcon(e.target.value)}
                          className="w-full p-2 border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Ej: 🗄️"
                          maxLength={2}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={addNewCategory}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Crear Categoría
                      </button>
                      <button
                        onClick={cancelNewCategory}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                {technologies.map((category, categoryIndex) => (
                  <div key={category.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="text-xl">{category.icon}</span>
                        {category.name}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => addNewTechnology(category.name)}
                          className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                        >
                          <Plus className="w-3 h-3" />
                          Añadir
                        </button>
                        <button
                          onClick={() => deleteCategory(category.name)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                          title={`Eliminar categoría ${category.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                          Borrar Categoría
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid gap-3">
                      {category.skills.map((tech, techIndex) => (
                        <div key={tech.name} className="flex items-center justify-between bg-white dark:bg-gray-600 rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{tech.icon}</span>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {tech.name}
                              </h4>
                              {tech.level && (
                                <span className="text-xs px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                                  {tech.level === 'learning' && 'Aprendiendo'}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => editTechnology(tech, category.name)}
                              className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => deleteTechnology(tech.name, category.name)}
                              className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
                              title={`Eliminar ${tech.name}`}
                            >
                              <Trash2 className="w-3 h-3" />
                              Borrar
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {category.skills.length === 0 && (
                        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                          No hay tecnologías en esta categoría.
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {technologies.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No hay categorías de tecnologías cargadas.
                  </div>
                )}
              </div>
            </motion.div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
          {/* Gestor de Proyectos */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  🚀 Gestor de Proyectos
                </h3>
                <button
                  onClick={addNewProject}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Nuevo Proyecto
                </button>
              </div>

              <div className="grid gap-4">
                {projects.map((project, index) => (
                  <div key={project.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {project.title}
                          </h4>
                          {project.featured && (
                            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                              Destacado
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                          {project.github && (
                            <span>GitHub: {project.github}</span>
                          )}
                          {project.demo && (
                            <span>Demo: {project.demo}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => editProject(project)}
                          className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Editar proyecto"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                          title={`Eliminar proyecto ${project.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                          Borrar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {projects.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No hay proyectos añadidos. Haz clic en "Nuevo Proyecto" para empezar.
                  </div>
                )}
              </div>
            </div>
          </div>
              </motion.div>
            )}
          </div>

          {/* Instrucciones generales fuera de las pestañas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 space-y-4"
          >
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                💡 Instrucciones Básicas
              </h3>
              <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                <li>• Haz clic en &quot;Editar&quot; para modificar cualquier sección</li>
                <li>• Los cambios se aplican inmediatamente al guardar</li>
                <li>• Usa el Gestor de Experiencias para añadir/editar/eliminar experiencias</li>
                <li>• Usa el Gestor de Proyectos para administrar tu portafolio</li>
                <li>• Este panel solo es visible desde tu IP autorizada</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                🚀 Gestión de Proyectos
              </h3>
              <ul className="text-purple-800 dark:text-purple-200 space-y-1 text-sm">
                <li>• Usa "Nuevo Proyecto" para añadir trabajos o demos</li>
                <li>• Edita títulos, descripciones, tecnologías y enlaces</li>
                <li>• Marca proyectos como &quot;Destacados&quot; para resaltarlos</li>
                <li>• Elimina proyectos obsoletos con el botón &quot;Borrar&quot;</li>
                <li>• Los proyectos aparecerán automáticamente en la sección Proyectos</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                🏢 Gestión de Experiencias
              </h3>
              <ul className="text-green-800 dark:text-green-200 space-y-1 text-sm">
                <li>• Usa "Nueva Experiencia" para añadir trabajos o prácticas</li>
                <li>• Edita cualquier experiencia existente con el botón &quot;Editar&quot;</li>
                <li>• Elimina experiencias no deseadas con el icono de papelera</li>
                <li>• No olvides hacer clic en &quot;Guardar Cambios&quot; para aplicar los cambios</li>
                <li>• Las experiencias aparecerán automáticamente en Research y Experience</li>
              </ul>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Volver al Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Formularios modales */}
      {renderExperienceForm()}
      {renderTechnologyForm()}
      {renderProjectForm()}
    </div>
  )
}
