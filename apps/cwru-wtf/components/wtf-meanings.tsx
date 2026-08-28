"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const meanings = [
  "We Tinker Fearlessly",
  "Wow! That's Fuego",
  "Wow! That's Fire",
  "We Transcend Fiction"
]

export default function WtfMeanings() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % meanings.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-5 flex h-7 items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-mono text-caption uppercase tracking-[0.2em] text-muted-foreground"
        >
          {meanings[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
