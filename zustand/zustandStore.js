import { create } from "zustand"

export const userDataStore = create(set => ({
	userObject: {},
	setUserObject: userObject => set({ userObject }),
}))

export const darkModeStore = create(set => ({
	darkMode: false,
	setDarkModeTrue: darkMode => set({ darkMode }),
	setDarkModeFalse: darkMode => set({ darkMode }),
}))
