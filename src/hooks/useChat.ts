'use client'

import { useState, useCallback, useEffect } from 'react'
import { ChatMessage, ChatState } from '@/types/chat'

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  role: 'assistant',
  content: '¡Hola! 👋 Soy Carlos Montoya. Pregúntame sobre mi experiencia profesional, proyectos, habilidades técnicas o cualquier información sobre mi perfil. ¡Estoy aquí para ayudarte!',
  timestamp: new Date(),
  confidence: 100,
  category: 'greeting'
}

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [INITIAL_MESSAGE],
    isLoading: false,
    error: null
  })

  // Guardar chat en localStorage
  useEffect(() => {
    const savedChat = localStorage.getItem('portfolio-chat')
    if (savedChat) {
      try {
        const parsed = JSON.parse(savedChat)
        setState(prev => ({
          ...prev,
          messages: parsed.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }))
      } catch (error) {
        console.error('Error loading saved chat:', error)
      }
    }
  }, [])

  const saveToStorage = useCallback((messages: ChatMessage[]) => {
    try {
      localStorage.setItem('portfolio-chat', JSON.stringify({ messages }))
    } catch (error) {
      console.error('Error saving chat:', error)
    }
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error en la respuesta')
      }

      const data = await response.json()
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        confidence: data.confidence,
        category: data.category
      }

      const newMessages = [...state.messages, userMessage, assistantMessage]
      
      setState(prev => ({
        ...prev,
        messages: newMessages,
        isLoading: false
      }))

      saveToStorage(newMessages)

    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un error procesando tu mensaje. ¿Podrías intentar de nuevo? 🤔',
        timestamp: new Date(),
        confidence: 0,
        category: 'error'
      }

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }))
    }
  }, [state.messages, saveToStorage])

  const clearChat = useCallback(() => {
    const resetState = {
      messages: [INITIAL_MESSAGE],
      isLoading: false,
      error: null
    }
    setState(resetState)
    localStorage.removeItem('portfolio-chat')
  }, [])

  const getChatMetrics = useCallback(() => {
    const userMessages = state.messages.filter(msg => msg.role === 'user')
    const assistantMessages = state.messages.filter(msg => msg.role === 'assistant' && msg.confidence)
    
    const averageConfidence = assistantMessages.length > 0 
      ? assistantMessages.reduce((acc, msg) => acc + (msg.confidence || 0), 0) / assistantMessages.length
      : 0

    const categories = assistantMessages
      .map(msg => msg.category)
      .filter(Boolean) as string[]
    
    const categoryCounts = categories.reduce((acc, cat) => {
      acc[cat] = (acc[cat] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const popularCategories = Object.entries(categoryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([cat]) => cat)

    return {
      totalMessages: userMessages.length,
      averageConfidence: Math.round(averageConfidence),
      popularCategories
    }
  }, [state.messages])

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearChat,
    getChatMetrics
  }
}
