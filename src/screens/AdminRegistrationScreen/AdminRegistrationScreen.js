import React, { useState } from 'react';
import {Alert, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import styles from './styles';
import functions from "@react-native-firebase/functions";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase/config";

// Registration screen component
export default function AdminRegistrationScreen({ navigation }) {
    // State variables for form fields
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Function to navigate to the login screen
    const onFooterLinkPress = () => {
        navigation.navigate('Login');
    };
  
    // Function to handle user registration
    // Function to handle user registration and set admin role
    const onRegisterPress = async () => {
        // Check if passwords match
        if (password !== confirmPassword) {
            Alert.alert("Hata", "Şifreler eşleşmiyor.");
            return;
        }

        try {
            const result = await functions().httpsCallable('createUser')({
                email,
                password,
            });

            console.log('User created with UID:', result.data.uid);
            const uid = result.data.uid;

            const setAdminRole = functions().httpsCallable('setAdminRole');

            try {
                await setAdminRole({ uid });
                Alert.alert("Başarılı", "Yönetici kullanıcı oluşturuldu ve yönetici olarak işaretlendi.");

                // Reset form fields
                setFullName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');

                navigation.navigate("Login");

            } catch (error) {
                console.error("Error setting admin role:", error);
                Alert.alert("Hata", "Yönetici rolü ayarlanamadı.");
            }

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
                {/* App logo */}
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />

                <Text style={styles.title}>MolaTrak</Text>

                {/* Full name input field */}
                <TextInput
                    style={styles.input}
                    placeholder='Ad Soyad'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {/* Email input field */}
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {/* Password input field */}
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
                {/* Confirm password input field */}
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Şifreyi Onayla'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {/* Register button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Hesap oluştur</Text>
                </TouchableOpacity>
                {/* Footer link to navigate to the login screen */}
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Hesabınız var mı? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Oturum açın</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}