import { create } from "zustand";

export const useLabyrint = create(set => ({
  labyrint: [],
  username: "",
  loading: false,
  error: null,
  setUsername: (username) => { set({ username }); },
  setType: (type) => { set({ type }); },
  setDirection: (direction) => { set({ direction }); },
  setCoordinates: (coordinates) => { set({ coordinates }); },
  setRoom: (room) => { set({ room }); },
  setLabyrint: (labyrint) => { set({ labyrint }); },
  fetchLabyrint: async (username) => {
    const data = { username: username };
    set({ loading: true, error: null });
    try {
      const response = await fetch(`https://labyrinth.technigo.io/start`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const labyrint = await response.json();
      set({ labyrint, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
  fetchDirectionLabyrint: async (username, type, direction, coordinates, room) => {
    const data = {
      username: username,
      type: type,
      direction: direction,
      coordinates: coordinates,
      room: room,

    };
    set({ loading: true, error: null });
    try {
      const response = await fetch(`https://labyrinth.technigo.io/action`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const labyrint = await response.json();
      set({ labyrint, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  }
}));