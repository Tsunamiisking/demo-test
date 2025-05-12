"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Plus, Trash2, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

const Todo: React.FC = () => {
  const [task, setTask] = useState("")
  const [todos, setTodos] = useState<TodoItem[]>([])

  const addTodo = () => {
    if (task.trim() === "") return

    const newTodo: TodoItem = {
      id: Date.now(),
      text: task,
      completed: false,
    }

    setTodos([newTodo, ...todos])
    setTask("")
  }

  const toggleComplete = (id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - activeCount

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg pb-6">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <ClipboardList className="h-6 w-6" />
            Task Manager
          </CardTitle>
          {todos.length > 0 && (
            <div className="flex justify-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">
                {activeCount} active
              </Badge>
              <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">
                {completedCount} completed
              </Badge>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex gap-2 mb-6">
            <Input
              type="text"
              value={task}
              placeholder="What needs to be done?"
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border-gray-300 focus-visible:ring-violet-500"
            />
            <Button onClick={addTodo} size="icon" className="bg-violet-600 hover:bg-violet-700 text-white">
              <Plus className="h-5 w-5" />
              <span className="sr-only">Add task</span>
            </Button>
          </div>

          {todos.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>Your task list is empty</p>
              <p className="text-sm">Add a new task to get started</p>
            </div>
          ) : (
            <ul className="space-y-3">
              <AnimatePresence initial={false}>
                {todos.map((todo) => (
                  <motion.li
                    key={todo.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.2 }}
                    className="group flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <button
                        onClick={() => toggleComplete(todo.id)}
                        className={`flex-shrink-0 h-5 w-5 rounded-full border ${
                          todo.completed
                            ? "bg-violet-600 border-violet-600 flex items-center justify-center"
                            : "border-gray-300 dark:border-gray-600 hover:border-violet-500"
                        }`}
                        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                      >
                        {todo.completed && <Check className="h-3 w-3 text-white" />}
                      </button>
                      <span
                        className={`flex-1 ${
                          todo.completed
                            ? "text-gray-400 dark:text-gray-500 line-through"
                            : "text-gray-700 dark:text-gray-200"
                        } transition-all duration-200`}
                      >
                        {todo.text}
                      </span>
                    </div>
                    <Button
                      onClick={() => removeTodo(todo.id)}
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 transition-opacity"
                      aria-label="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Todo
