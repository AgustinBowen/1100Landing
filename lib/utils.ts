import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatearTiempo(tiempoStr:string) {
  const str = tiempoStr.toString().padStart(7, '0');
  
  const minutos = str.slice(0, 2);
  const segundos = str.slice(2, 4);
  const milisegundos = str.slice(4, 7);

  return `${minutos}:${segundos}.${milisegundos}`;
}