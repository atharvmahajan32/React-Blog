"use client"

import { useEffect } from "react"
import { startKeepAlive } from "@/lib/api"

let started = false

export function KeepAlive() {
  useEffect(() => {
    if (!started) {
      started = true
      startKeepAlive()
    }
  }, [])

  return null
}
