# 🌆 Titan City Net — Game UI

Metaverse-style experimental game UI inspired by Võ Lâm Truyền Kỳ (VLTK) and Pokémon Go, built with React + Tailwind + modular components.

![TitanCity Demo](https://github.com/khangdc2/titan-city-net/assets/preview.png)

---

## 🎮 Tính năng

- 👤 Chọn avatar từ màn hình landing
- 🗺️ Map nhiều zone (Downtown, Solar Park, Pagoda, Long Tuyền Thôn)
- 🧙 NPC có đối thoại + nhiệm vụ
- ⚔️ Skill (1–6) + thi triển vào spawn gần nhất
- 🎯 Tầm đánh hiển thị vòng tròn
- 🔍 Zoom in/out bằng phím `+` / `-`
- 🧘 Thiền định tại Pagoda để ngộ đạo 🌸

---

## 🚀 Cài đặt & chạy

```bash
# Clone & install
git clone https://github.com/khangdc2/titan-city-net.git
cd titan-city-net
npm install

# Chạy dev server
npm run dev
```

---

## 🎨 Tech stack

- **React 18** + Vite
- **TailwindCSS** UI framework
- **TypeScript** & module alias (`@components`, `@managers`, ...)
- Sound effects (sắp tới)
- Modular game loop & managers

---

## 🗂️ Cấu trúc thư mục

```
src/
  ├─ components/       // UI components (MiniMap, DialogueBox, ...)
  ├─ managers/         // Game logic (SpawnManager, QuestManager)
  ├─ pages/            // Main GamePage.tsx
  ├─ types/            // Type declarations for NPC, Spawn, ...
```

---

## ✨ Đóng góp / Triển khai tiếp

Mình đang phát triển tiếp:
- 🎵 Ambience âm thanh cho từng zone
- 💬 Hệ thống hội thoại nhiều nhánh
- 📦 Túi đồ / vật phẩm / quái rớt
- 🌐 Multiplayer Realtime + Mapbox GPS

---

## 💚 Đóng góp bởi

> Made with energy, coffee & countryside rice 🌾  
> Code cùng ChatGPT & cộng đồng Titan-Citi-Net  
> GitHub: [@khangdc2](https://github.com/khangdc2)

---

## License

MIT