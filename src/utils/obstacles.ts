export const obstacles = [
  { x: 500, y: 400, width: 100, height: 100 },
  { x: 200, y: 200, width: 80, height: 80 },
];

export const isBlocked = (x: number, y: number) => {
  return obstacles.some(obj =>
    x >= obj.x && x <= obj.x + obj.width &&
    y >= obj.y && y <= obj.y + obj.height
  );
};
