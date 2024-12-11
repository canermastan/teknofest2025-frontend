import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from 'expo-router';
import { Button, Colors } from 'react-native-ui-lib';

export default function HomeScreen() {
    
    const router = useRouter();

    const handleLogin = () => {
      router.push("login");
    };

    const handleSignup = () => {
      router.push("signup");
    };

    return (
      <View style={styles.container}>
        <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
        <Image source={require("../../assets/images/man.png")} style={styles.bannerImage} />
        <Text style={styles.title}>Teknofest Project</Text>
        <Text style={styles.subTitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore 
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.loginButtonWrapper,
              { backgroundColor: colors.primary },
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginButtonWrapper]}
            onPress={handleSignup}
          >
            <Text style={styles.signupButtonText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: "center",
      marginTop: 20,
    },
    logo: {
      height: 40,
      width: 140,
      marginVertical: 30,
    },
    bannerImage: {
      marginVertical: 20,
      height: 250,
      width: 231,
    },
    title: {
      fontSize: 40,
      fontFamily: fonts.SemiBold,
      paddingHorizontal: 20,
      textAlign: "center",
      color: colors.primary,
      marginTop: 40,
    },
    subTitle: {
      fontSize: 18,
      paddingHorizontal: 20,
      textAlign: "center",
      color: colors.secondary,
      fontFamily: fonts.Medium,
      marginVertical: 20,
    },
    buttonContainer: {
      marginTop: 20,
      flexDirection: "row",
      borderWidth: 2,
      borderColor: colors.primary,
      width: "80%",
      height: 60,
      borderRadius: 100,
    },
    loginButtonWrapper: {
      justifyContent: "center",
      alignItems: "center",
      width: "50%",
      borderRadius: 98,
    },
    loginButtonText: {
      color: colors.white,
      fontSize: 18,
      fontFamily: fonts.SemiBold,
    },
    signupButtonText: {
      fontSize: 18,
      fontFamily: fonts.SemiBold,
    },
  });
  
