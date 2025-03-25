// src/types/index.ts

// 🧍 NPC definition
export interface NPC {
  id: string;
  name: string;
  message: string;
  x: number;
  y: number;
  zone: string;
  task?: string;
}

// 🚗 Vehicle definition
export interface Vehicle {
  id: string;
  x: number;
  y: number;
  label: string;
  owner: string;
}

// 🧬 Player Avatar
export interface Player {
  id: string;
  avatarUrl: string;
  x: number;
  y: number;
  zone: string;
  inventory: string[];
  activeQuest?: string;
}

// 📍 Zone definition
export interface Zone {
  id: string;
  name: string;
  polygon: number[][]; // [[lat, lng], [lat, lng], ...]
  music?: string;       // background music
  description?: string;
}

// 🔮 Spawnable types
export type SpawnType = "creature" | "item" | "event";

export interface Spawn {
  id: string;
  type: SpawnType;
  lat: number;
  lng: number;
  zone: string;
  expiresAt: number;
  metadata?: any;
}

// 🧾 Quest structure
export interface Quest {
  id: string;
  title: string;
  description: string;
  giverNpcId: string;
  targetZone: string;
  objective: string;
  reward?: string;
  completed?: boolean;
}
