/**
 * Helper to manage product comparison list
 */
export const toggleCompare = (currentList, product) => {
  const exists = currentList.find((item) => item.id === product.id);
  
  if (exists) {
    return currentList.filter((item) => item.id !== product.id);
  }
  
  if (currentList.length >= 3) {
    alert("You can compare a maximum of 3 products.");
    return currentList;
  }
  
  return [...currentList, product];
};

// Helper to get items safely from storage
export const getCompareList = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("compareList") || "[]");
  }
  return [];
};