export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  confidence?: number
  category?: string
}

export interface ChatState {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
}

export interface ChatResponse {
  message: string
  confidence: number
  category: string
  timestamp: string
}

export interface ChatMetrics {
  totalMessages: number
  averageConfidence: number
  popularCategories: string[]
}
