import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocus, setIsFocus] = useState({
    email: false,
    password: false,
  });
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  function keyboardHide() {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  }

  function submitForm() {
    console.log(state);
    setState(initialState);
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/PhotoBG.png")}
        >
          <View style={styles.wrapperForm}>
            <View style={styles.form}>
              <Text style={styles.title}>Увійти</Text>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View
                  style={{
                    paddingBottom: isFocus.email || isFocus.password ? 21 : 0,
                  }}
                >
                  <TextInput
                    keyboardType="email-address"
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsFocus({ ...isFocus, email: true });
                    }}
                    onBlur={() => {
                      setIsFocus({ ...isFocus, email: false });
                    }}
                    placeholderTextColor="#BDBDBD"
                    placeholder="E-mail"
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                    style={{
                      ...styles.input,
                      borderColor: isFocus.email ? `#FF6C00` : `#E8E8E8`,
                    }}
                  />
                  <View>
                    <TextInput
                      onFocus={() => {
                        setIsShowKeyboard(true);
                        setIsFocus({ ...isFocus, password: true });
                      }}
                      onBlur={() => {
                        setIsFocus({ ...isFocus, password: false });
                      }}
                      placeholderTextColor="#BDBDBD"
                      placeholder="Пароль"
                      value={state.password}
                      onChangeText={(value) =>
                        setState((prevState) => ({
                          ...prevState,
                          password: value,
                        }))
                      }
                      secureTextEntry={isSecureEntry}
                      iconPosition="right"
                      style={{
                        ...styles.input,
                        borderColor: isFocus.password ? `#FF6C00` : `#E8E8E8`,
                      }}
                    />
                    <TouchableOpacity
                      activeOpacity={0.65}
                      style={styles.textPassword}
                      onPress={() => {
                        setIsSecureEntry((prevState) => !prevState);
                      }}
                    >
                    <Text
                      style={styles.secureEntry}
                    >
                      {isSecureEntry ? "Показати" : "Сховати"}
                    </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
              {!isShowKeyboard && (
                <TouchableOpacity
                  activeOpacity={0.65}
                  onPress={submitForm}
                  style={styles.button}
                >
                  <Text style={styles.textButton}>Увійти</Text>
                </TouchableOpacity>
              )}
            </View>
            {!isShowKeyboard && (
              <TouchableOpacity>
                <Text
                  style={styles.textLink}
                  onPress={() => navigation.navigate("Registration")}
                >
                  Немає акаунту? Зареєструватися
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  secureEntry: {
    minWidth: 71,
    color: "#1B4371",
    height: 19,
    right: -7,
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 32,
  },

  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    color: "#212121",
    width: 360,
    left: -11,
  
  },
  wrapperForm: {
    paddingBottom: 111,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    marginHorizontal: 26,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 50,
    marginTop: 43,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  textLink: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
  textPassword: {
    position: "absolute",
    top: "50%",
    left: "75%",
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },
});
