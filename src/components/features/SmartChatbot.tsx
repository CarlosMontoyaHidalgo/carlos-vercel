'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react'
import { useChat } from '@/hooks/useChat'
import { useLanguage } from '@/providers/LanguageProvider'

const SUGGESTED_QUESTIONS = [
  "¿Qué tecnologías dominas?",
  "Cuéntame sobre tu experiencia en 2Coders",
  "¿Qué proyectos has desarrollado?",
  "Háblame sobre tu TFG",
  "¿Cómo puedo contactarte?"
]

const CONFIDENCE_COLORS = {
  high: 'text-green-600 dark:text-green-400',
  medium: 'text-yellow-600 dark:text-yellow-400', 
  low: 'text-red-600 dark:text-red-400'
}

export default function SmartChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, isLoading, error, sendMessage, clearChat } = useChat()
  const { t } = useLanguage()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const message = inputValue.trim()
    setInputValue('')
    await sendMessage(message)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
    sendMessage(question)
  }

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return CONFIDENCE_COLORS.low
    if (confidence >= 70) return CONFIDENCE_COLORS.high
    if (confidence >= 40) return CONFIDENCE_COLORS.medium
    return CONFIDENCE_COLORS.low
  }

  return (
    <>
      {/* Compact Chat Button for Header */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="relative bg-gray-800 text-white p-2 lg:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group border-2 border-white overflow-hidden flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Chat con Carlos AI"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Bot size={16} className="lg:hidden relative z-10" />
        <Bot size={20} className="hidden lg:block relative z-10" />
        
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-ping" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center sm:items-end sm:justify-end p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Chat Container */}
            <motion.div
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md h-[500px] sm:h-[650px] max-h-[80vh] sm:max-h-[85vh] flex flex-col border dark:border-gray-700 overflow-hidden mx-4 sm:mx-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <Bot size={24} className="text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      Carlos AI Assistant
                    </h3>
                    <p className="text-blue-100 text-sm">
                      Pregúntame cualquier cosa 🚀
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    onClick={clearChat}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Limpiar chat"
                  >
                    <RefreshCw size={18} />
                  </motion.button>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                          : 'bg-gradient-to-r from-purple-500 to-indigo-600'
                      }`}>
                        {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      
                      {/* Message Bubble */}
                      <div
                        className={`p-3 rounded-2xl shadow-sm ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white rounded-br-sm'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                        
                        {/* Message Footer */}
                        <div className="flex items-center justify-between mt-2 gap-2">
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white">
                        <Bot size={16} />
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {error && (
                  <motion.div
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-red-700 dark:text-red-300 text-sm">⚠️ {error}</p>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium flex items-center gap-2">
                    <Sparkles size={16} className="text-purple-500" />
                    Preguntas sugeridas:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((question, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-full hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 transition-all border border-blue-200 dark:border-blue-800 font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu pregunta sobre Carlos..."
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all text-sm"
                    disabled={isLoading}
                    maxLength={500}
                  />
                  <motion.button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={16} />
                  </motion.button>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  {inputValue.length}/500 • Powered by Smart AI
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
