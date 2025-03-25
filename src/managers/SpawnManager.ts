import { v4 as uuidv4 } from "uuid";
import type { Spawn, SpawnType } from "@types";

export class SpawnManager {
  private spawns: Spawn[] = [];
  private cooldown = 30000;
  private maxSpawns = 10;

  constructor(
    private getPlayerCoords: () => { lat: number; lng: number },
    private getZone: () => string
  ) {}

  private randomSpawnType(): SpawnType {
    const types: SpawnType[] = ["creature", "item", "event"];
    return types[Math.floor(Math.random() * types.length)];
  }

  private generateNearbySpawn(): Spawn {
    const { lat, lng } = this.getPlayerCoords();
    const zone = this.getZone();
    const offsetLat = (Math.random() - 0.5) * 0.005;
    const offsetLng = (Math.random() - 0.5) * 0.005;

    return {
      id: uuidv4(),
      type: this.randomSpawnType(),
      lat: lat + offsetLat,
      lng: lng + offsetLng,
      zone,
      expiresAt: Date.now() + 1000 * 60 * 5,
      metadata: {},
    };
  }

  private tick() {
    const now = Date.now();
    this.spawns = this.spawns.filter((s) => s.expiresAt > now);

    if (this.spawns.length < this.maxSpawns) {
      const newSpawn = this.generateNearbySpawn();
      this.spawns.push(newSpawn);
    }
  }

  start(intervalMs = this.cooldown) {
    setInterval(() => this.tick(), intervalMs);
  }

  getSpawnsInZone(zone: string): Spawn[] {
    return this.spawns.filter((s) => s.zone === zone);
  }

  removeSpawn(id: string) {
    this.spawns = this.spawns.filter((s) => s.id !== id);
  }

  getAll(): Spawn[] {
    return [...this.spawns];
  }
}
