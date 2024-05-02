import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
    PreLoginScreen,
    AdminHomeScreen,
    EmployeeHomeScreen,
    EmployeeRegistrationScreen,
    AdminEmployeeScreen,
    AdminRegistrationScreen,
    AdminBreakTimesScreen,
    AdminReportsScreen, LoginScreen
} from "./src/screens";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { decode, encode } from "base-64";
import { auth } from './src/firebase/config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {DefaultTheme, Divider, PaperProvider} from "react-native-paper";
import LogoutButton from "./src/components/Shared/LogoutButton";
import HeaderBackButton from "./src/components/Shared/HeaderBackButton";
import {fetchUserRole} from "./src/firebase/checkAccess";
import {
    ActivityIndicator,
    Alert,
    Button,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import AboutButton from "./src/components/Shared/AboutButton";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();


export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [aboutModalVisible, setAboutModalVisible] = useState(false);

    useEffect(() => {
        // Listener for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setIsLoading(true);
            if (user) {
                const { isAdmin, isEmployee } = await fetchUserRole(user.uid); // Implement fetchUserRole to determine if the user is admin or employee

                if(isAdmin)
                    setUserRole("admin");
                else if(isEmployee)
                    setUserRole("employee")
                else {
                    setUserRole("guest");
                    Alert.alert("Geçersiz kullanıcı!");
                }
            } else {
                setUserRole("guest");
            }
            setIsLoading(false);
        });

        return unsubscribe; // Cleanup subscription
    }, []);

    const handleLogout = async () => {
        await signOut(auth).then(() => {
            AsyncStorage.clear().then(() => {
                setUserRole(null); // Update state to reflect logout
            });
        }).catch((error) => {
            console.error("Failed to sign out:", error);
        });
    };

    const handleAbout = async () => {
        setAboutModalVisible(true);
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors } };

    const contributors = [
        {
            fullName: "Zinet Seid Ali",
            studentNo: "220757918"
        },
        {
            fullName: "Derya Gülmez",
            studentNo: "220757040"
        },
        {
            fullName: "Elif karaca",
            studentNo: "220757030"
        },
        {
            fullName: "Rabia Yıldız İlgar",
            studentNo: "220757023"
        }
    ];

    return (
    <PaperProvider theme={theme}>

        <StatusBar style="auto" backgroundColor="#4F6D7A" animated={true} />

        <NavigationContainer>
            {userRole === "admin" ? (
              // Admin Stack Navigator
              <Stack.Navigator screenOptions={{
                  headerStyle: {
                      backgroundColor: '#4F6D7A',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                      fontWeight: 'bold',
                  },
              }}>

                  <Stack.Screen
                      name="AdminHome"
                      component={AdminHomeScreen}
                      options={({ navigation }) => ({
                          title: "Yönetici Kontrol Paneli",
                          headerLeft: ()=> null,
                          headerRight: () => (
                              <View style={styles.headerBtns}>
                                  <TouchableOpacity onPress={handleLogout}>
                                      <LogoutButton label={'Çıkış Yap'} />
                                  </TouchableOpacity>

                                  <TouchableOpacity onPress={handleAbout}>
                                      <AboutButton />
                                  </TouchableOpacity>
                              </View>
                          ),
                      })}
                  />

                  <Stack.Screen
                      name="AdminEmployee"
                      component={AdminEmployeeScreen}
                      options={({ navigation }) => ({
                          title: "Çalışanları Yönetin",
                          //headerLeft: ()=> null,
                          headerRight: () => (
                              <View style={styles.headerBtns}>
                                  <TouchableOpacity onPress={handleLogout}>
                                      <LogoutButton label={'Çıkış Yap'} />
                                  </TouchableOpacity>

                                  <TouchableOpacity onPress={handleAbout}>
                                      <AboutButton />
                                  </TouchableOpacity>
                              </View>
                          ),
                      })}
                  />

                  <Stack.Screen
                      name="AdminBreakTimes"
                      component={AdminBreakTimesScreen}
                      options={({ navigation }) => ({
                          title: "Mola zamanları",
                          //headerLeft: ()=> null,
                          headerRight: () => (
                              <View style={styles.headerBtns}>
                                  <TouchableOpacity onPress={handleLogout}>
                                      <LogoutButton label={'Çıkış Yap'} />
                                  </TouchableOpacity>

                                  <TouchableOpacity onPress={handleAbout}>
                                      <AboutButton />
                                  </TouchableOpacity>
                              </View>
                          ),
                      })}
                  />

                  <Stack.Screen
                      name="AdminReports"
                      component={AdminReportsScreen}
                      options={({ navigation }) => ({
                          title: "Mola Raporu",
                          //headerLeft: ()=> null,
                          headerRight: () => (
                              <View style={styles.headerBtns}>
                                  <TouchableOpacity onPress={handleLogout}>
                                      <LogoutButton label={'Çıkış Yap'} />
                                  </TouchableOpacity>

                                  <TouchableOpacity onPress={handleAbout}>
                                      <AboutButton />
                                  </TouchableOpacity>
                              </View>
                          ),
                      })}
                  />
              </Stack.Navigator>
            ) : userRole === "employee" ? (
              // Break Stack Navigator
              <Stack.Navigator screenOptions={{
                  headerStyle: {
                      backgroundColor: '#4F6D7A',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                      fontWeight: 'bold',
                  },
              }}>
                  <Stack.Screen
                      name="EmployeeHome"
                      component={EmployeeHomeScreen}
                      options={({ navigation }) => ({
                          title: "Molalar",
                          headerLeft: ()=> null,
                          headerRight: () => (
                              <View style={styles.headerBtns}>
                                  <TouchableOpacity onPress={handleLogout}>
                                      <LogoutButton label={'Çıkış Yap'} />
                                  </TouchableOpacity>

                                  <TouchableOpacity onPress={handleAbout}>
                                      <AboutButton />
                                  </TouchableOpacity>
                              </View>
                          ),
                      })}
                  />
              </Stack.Navigator>
            ) : (
              // Guest/PreLogin Stack Navigator
              <Stack.Navigator screenOptions={{
                  headerStyle: {
                      backgroundColor: '#4F6D7A',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                      fontWeight: 'bold',
                  },
              }}>
                  <Stack.Screen name="PreLogin" component={PreLoginScreen} options={({ navigation }) => ({
                      headerShown: true,
                      title: "MolaTrak",
                      headerLeft: ()=> null,
                      headerRight: () => (
                          <TouchableOpacity onPress={handleAbout}>
                              <AboutButton />
                          </TouchableOpacity>
                      ),
                  })}/>

                  <Stack.Screen name="Login" component={LoginScreen} options={({ navigation }) => ({
                      title: "Oturum aç",
                      headerLeft: (props) => (
                          <HeaderBackButton {...props} onPress={() => navigation.navigate('PreLogin')} />
                      )
                  })} />

                  <Stack.Screen name="AdminRegistration" component={AdminRegistrationScreen} options={{
                      title: "Yönetici Kayd Olun",
                      headerRight: () => (
                          <TouchableOpacity onPress={handleAbout}>
                              <AboutButton />
                          </TouchableOpacity>
                      ),
                  }} />

                  <Stack.Screen name="EmployeeRegistration" component={EmployeeRegistrationScreen} options={{
                      title: "Çalışan Kayd Olun",
                      headerRight: () => (
                          <TouchableOpacity onPress={handleAbout}>
                              <AboutButton />
                          </TouchableOpacity>
                      ),
                  }} />
              </Stack.Navigator>
            )}
        </NavigationContainer>

        <Modal
            animationType="slide"
            transparent={true}
            visible={aboutModalVisible}
            onRequestClose={() => {
                setAboutModalVisible(!aboutModalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Hakkında</Text>

                    <ScrollView style={styles.container}>
                        <Text>Uygulama geliştirmede katılanlar</Text>

                        {contributors.map((contributor) => (
                            <View key={contributor.studentNo} style={styles.contributor}>
                                <Text>Ad Soyad: {contributor.fullName}</Text>
                                <Text>Öğrenci Numara: {contributor.studentNo}</Text>
                                <Divider />
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.closeBtn}>
                        <Button title="Kapat" onPress={() => setAboutModalVisible(false)} color="#4F6D7A"/>
                    </View>
                </View>
            </View>
        </Modal>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
    headerBtns: {
        display: "flex",
        flexDirection: "row",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "#4F6D7A"
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    contributorsTitle: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    contributor: {
        marginTop: 10,
    },
    name: {
        fontWeight: 'bold',
    },
    closeBtn: {
        marginTop: 20
    }
});


