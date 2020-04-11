
export const getLocalData = (): any[] => {
    const local = localStorage.getItem("data");
    return local ? JSON.parse(local) : [];
} 