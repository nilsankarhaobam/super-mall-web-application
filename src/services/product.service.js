import { db } from "../lib/firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  doc, 
  deleteDoc 
} from "firebase/firestore";

// Match the name used in your Page.jsx
export const createProduct = async (productData) => {
  const docRef = await addDoc(collection(db, "products"), {
    ...productData,
    createdAt: new Date().toISOString()
  });
  return { id: docRef.id, ...productData };
};

// Fetch products for a specific shop
export const getProductsByShop = async (shopId) => {
  const q = query(collection(db, "products"), where("shopId", "==", shopId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Needed for the Admin Dashboard count
export const getAllProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add the delete functionality used in your table
export const deleteProduct = async (productId) => {
  const productRef = doc(db, "products", productId);
  await deleteDoc(productRef);
};