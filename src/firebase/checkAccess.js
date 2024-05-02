import {auth, db} from "./config";
import {collection, getDocs, query, where} from "firebase/firestore";
import {Alert} from "react-native";

export const fetchUserRole = async () => {
    const user = auth.currentUser;
    if (!user) return { isAuthenticated: false, isAdmin: false, user: null };

    const idTokenResult = await user.getIdTokenResult();
    const isAdmin = !!idTokenResult.claims.admin;
    let isEmployee = false;

    if(!isAdmin) {
        // check if user is valid employee
        const usersRef = query(
            collection(db, "users"),
            where("id", "==", user.uid),
            where("role", "==", "employee")
        );

        await getDocs(usersRef)
            .then((response) => {
                if (response.size === 0) {
                    Alert.alert("Invalid employee user");
                    return;
                }

                isEmployee = true;
            })
            .catch((error) => {
                Alert.alert(`Authentication error: ${error.message}`);
            });
    }

    return {
        isAuthenticated: true,
        isAdmin,
        isEmployee,
        user,
    };
};
