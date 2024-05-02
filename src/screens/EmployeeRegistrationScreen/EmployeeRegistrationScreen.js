import React, { useState } from 'react';
import {Alert, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import styles from './styles';
import {db} from "../../firebase/config";
import functions from "@react-native-firebase/functions";

// Registration screen component
export default function EmployeeRegistrationScreen({ navigation }) {
    // State variables for form fields
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('Login');
    };

    const onRegisterPress = async () => {
        if (password !== confirmPassword) {
            alert("Şifreler eşleşmiyor.");
            return;
        }

        try {
            const result = await functions().httpsCallable('createUser')({
                email,
                password,
            });

            console.log('User created with UID:', result.data.uid);

            const data = {
                id: result.data.uid,
                email,
                fullName,
                role: 'employee',
            };

            const usersRef = doc(db, "users", result.data.uid);
            setDoc(usersRef, data)
                .then(() => {
                    Alert.alert("Success", "New employee added successfully.");

                    setFullName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');

                    navigation.navigate("Login");
                })
                .catch((error) => {
                    Alert.alert("Error", error.message);
                });
        } catch (error) {
            console.error('Error creating new user:', error);
            Alert.alert("Hata", error.message);
        }
    };
    
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />

                <Text style={styles.title}>MolaTrak</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Ad Soyad'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Şifre'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Şifre onayla'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Hesap oluştur</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Hesabınız var mı? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Oturum aç</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}