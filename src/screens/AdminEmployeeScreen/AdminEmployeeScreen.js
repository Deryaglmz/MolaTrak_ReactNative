import React, {useEffect, useState} from 'react';
import {Alert, Button, FlatList, Modal, Text, TextInput, TouchableOpacity, View} from 'react-native';
import functions from '@react-native-firebase/functions';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    updateDoc,
    where
} from 'firebase/firestore';
import {db} from '../../firebase/config';
import styles from './styles';
import {getAuth} from "firebase/auth";

const AdminEmployeeScreen = ({ navigation }) => {
    const [employee, setEmployee] = useState([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        return onSnapshot(collection(db, "users"), (snapshot) => {
            const employeeList = snapshot.docs
                .filter(doc => doc.data().role === 'employee')
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
            setEmployee(employeeList);
        });
    }, []);

    const handleUpdateEmployee = async () => {
        if (!selectedEmployee) return;
        const userRef = doc(db, "users", selectedEmployee.id);
        await updateDoc(userRef, {
            fullName,
        });

        // Close modal and reset state , Modu kapatın ve durumu sıfırlayın
        setEditModalVisible(false);
        setSelectedEmployee(null);
        setFullName('');
        setEmail('');
        setRole('');
        Alert.alert("Başarılı", "Çalışan başarıyla güncellendi.");
    };

    const confirmDelete = (id) => {
        Alert.alert(
            "Çalışanı Sil",
            "Bu çalışanı ve ilgili molalarını silmek istediğinizden emin misiniz?",
            [
                {
                    text: "İptal et",
                    style: "cancel"
                },
                { text: "Tamam", onPress: () => handleDelete(id) }
            ]
        );
    };

    const handleDelete = async (uid) => {
        const auth = getAuth();
        if (!auth.currentUser) {
            // Handle the case where the user is not signed in, Kullanıcının oturum açmadığı durumu ele alın
            Alert.alert("Hata", "Bu işlemi gerçekleştirmek için oturum açmış olmanız gerekir.");
            return;
        }

        const deleteAssociatedBreaks = async () => {
            const breaksRef = collection(db, "breaks");
            const q = query(breaksRef, where("userId", "==", uid));
            const querySnapshot = await getDocs(q);
            const deletePromises = [];
            querySnapshot.forEach((document) => {
                deletePromises.push(deleteDoc(doc(db, "breaks", document.id)));
            });
            await Promise.all(deletePromises);
        };

        try {
            await functions().httpsCallable('deleteUser')({ uid });

            // Delete associated breaks first,
            await deleteAssociatedBreaks();

            console.log('Kullanıcı başarıyla silindi');

            // Proceed to delete Firestore document
            await deleteDoc(doc(db, "users", uid));

            Alert.alert("Başarılı", "Çalışan ve ilişkili molalar silindi.");
        } catch (error) {
            console.error("Silme sırasındaki hata:", error);
            Alert.alert("Hata", "Çalışan ve/veya ilişkili veriler silinemedi.");
        }
    };

    const handleBreaks = (employee) => {
        navigation.navigate("AdminBreakTimes", {
            employee: employee
        });
    };

    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee);
        setFullName(employee.fullName);
        setRole(employee.role);
        setEmail(employee.email);
        setEditModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.fullName}</Text>
            <View style={styles.actionBtns}>
                <TouchableOpacity style={styles.breaksBtn} onPress={() => handleBreaks(item)}>
                    <Text style={styles.breaksBtnText}>Molalar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editBtn} onPress={() => handleEditEmployee(item)}>
                    <Text style={styles.editBtnText}>Güncelle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => confirmDelete(item.id)}>
                    <Text style={styles.deleteBtnText}>Sil</Text>
                </TouchableOpacity> //tıklanma, dokunma olunca geri bildirim alır
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Çalışanlar</Text>

            <FlatList
                data={employee}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => {
                    setEditModalVisible(!editModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Çalışanı Düzenle</Text>
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={setFullName}
                            value={fullName}
                            placeholder="Ad Soyad"
                        />
                        <TextInput
                            style={styles.modalInput}
                            value={email}
                            placeholder="Email"
                            aria-disabled={true}
                            editable={false}
                        />
                        <TextInput
                            style={styles.modalInput}
                            value={role}
                            placeholder="Role"
                            aria-disabled={true}
                            editable={false}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="İptal et" onPress={() => setEditModalVisible(false)} color="#4F6D7A"/>
                            <Button title="Güncelle" onPress={handleUpdateEmployee} color="#e5a05b"/>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default AdminEmployeeScreen;
