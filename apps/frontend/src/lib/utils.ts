import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const res = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  let data: any;
  try {
    data = await res.json();
  } catch (error) {
    data = null;
  }

  if (!res.ok) {
    const message = data?.message || `Request failed with ${res.status}`;
    throw new Error(message);
  }
  return data as T;
}

export enum EventType {
  received = "received",
  sent = "sent",
  error = "error",
}

export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
}

export function logger<T = any>(
  service: string,
  event: Event | string,
  data?: T,
  level: LogLevel = LogLevel.INFO
): void {
  if (typeof window !== "undefined") return;
  const timestamp = new Date().toISOString();
  const base = `[${timestamp}] [${level}] [${service}] ${event}`;

  switch (level) {
    case LogLevel.ERROR:
      console.error(base, data ?? "");
      break;
    case LogLevel.WARN:
      console.warn(base, data ?? "");
      break;
    case LogLevel.DEBUG:
      console.debug(base, data ?? "");
      break;
    default:
      console.log(base);
      console.dir(data, { depth: null, colors: true });
  }
}
