
import  { createContext, useContext, useState, useEffect } from "react";

const HistoryContext = createContext();

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);
    const authToken = sessionStorage.getItem("authToken");

    useEffect(() => {
        if (!authToken) return;

        async function fetchHistory() {
            try {
                const response = await fetch("https://tvshowdbapi.herokuapp.com/user/history", {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                if (!response.ok) throw new Error("Failed to fetch history");

                const data = await response.json();
                setHistory(data);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            }
        }

        fetchHistory();
    }, [authToken]);

    return (
        <HistoryContext.Provider value={{ history, setHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};
