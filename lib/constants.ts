export const ROOMS = [
  { name: "Lila", key: "lila", color: "hsl(270, 60%, 65%)" },
  { name: "Blå", key: "bla", color: "hsl(210, 70%, 55%)" },
  { name: "Röd", key: "rod", color: "hsl(0, 70%, 55%)" },
  { name: "Grön", key: "gron", color: "hsl(140, 50%, 45%)" },
  { name: "Orange", key: "orange", color: "hsl(30, 90%, 55%)" },
  { name: "Rosa", key: "rosa", color: "hsl(330, 60%, 65%)" },
  { name: "Kök", key: "kok", color: "hsl(45, 70%, 50%)" },
  { name: "Personalrum", key: "personal", color: "hsl(195, 50%, 50%)" },
] as const;

export type RoomKey = (typeof ROOMS)[number]["key"];

export const ROOM_CARD_CLASSES: Record<RoomKey, string> = {
  lila: "room-card-lila",
  bla: "room-card-bla",
  rod: "room-card-rod",
  gron: "room-card-gron",
  orange: "room-card-orange",
  rosa: "room-card-rosa",
  kok: "room-card-kok",
  personal: "room-card-personal",
};

// Coordinates for weather: 60°06'18.3"N 19°48'03.7"E
export const WEATHER_LAT = 60.105083;
export const WEATHER_LON = 19.801028;

export const LOGGING_END_DATE = "2025-05-01";
