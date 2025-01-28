import { db } from "../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

// Save User Data
export const saveUserToFirestore = async (user) => {
    try {
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Error saving user:", error);
    }
};

// Fetch All Users
export const fetchUsers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};
