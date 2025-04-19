import { createContext, useState } from "react";

const context = createContext();

function UserProvider({ children }) {
	const [id_khach_hang, setId_khach_hang] = useState(null);
	return (
		<context.Provider value={id_khach_hang}>{children}</context.Provider>
	);
}

export default UserProvider;
