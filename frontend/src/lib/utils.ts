import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatearFecha(fecha: string) : string {
  const date = new Date(fecha)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}