import React from "react";
import type { Vehicle } from "@types";

interface VehiclesProps {
  vehicles: Vehicle[];
}

export default function Vehicles({ vehicles }: VehiclesProps) {
  return (
    <>
      {vehicles.map((v) => (
        <div
          key={v.id}
          style={{ position: "absolute", top: v.y, left: v.x }}
          className="text-yellow-300 text-sm animate-bounce"
        >
          {v.label}
        </div>
      ))}
    </>
  );
}
