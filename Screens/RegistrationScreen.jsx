import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocus, setIsFocus] = useState({
    login: false,
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
          source={require("../assets/photoBG.png")}
        >
          <View style={styles.imageWrapper}>
            <Image source={require("../assets/frame.png")} />
          </View>
          <View style={styles.wrapperForm}>
            <View style={styles.form}>
              <Text style={styles.title}>Реєстрація</Text>
              <View>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <View
                    style={{
                      paddingBottom:
                        isFocus.email || isFocus.password || isFocus.login
                          ? 32
                          : 0,
                    }}
                  >
                    <TextInput
                      onFocus={() => {
                        setIsShowKeyboard(true);
                        setIsFocus({ ...isFocus, login: true });
                      }}
                      onBlur={() => {
                        setIsFocus({ ...isFocus, login: false });
                      }}
                      placeholderTextColor="#BDBDBD"
                      placeholder="Логін"
                      value={state.login}
                      onChangeText={(value) => {
                        setState((prevState) => ({
                          ...prevState,
                          login: value,
                        }));
                      }}
                      style={{
                        ...styles.input,
                        borderColor: isFocus.login ? `#FF6C00` : `#E8E8E8`,
                      }}
                    />
                    <TextInput
                      keyboardType="email-address"
                      onFocus={() => {
                        setIsShowKeyboard(true);
                        setIsFocus({ ...isFocus, email: true });
                      }}
                      onBlur={() => {
                        () => emailValidator();
                        setIsFocus({ ...isFocus, email: false });
                      }}
                      placeholder="E-mail"
                      value={state.email}
                      onChangeText={(value) =>
                        setState((prevState) => ({
                          ...prevState,
                          email: value,
                        }))
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
                        placeholder="Пароль"
                        maxLength={10}
                        value={state.password}
                        onChangeText={(value) =>
                          setState((prevState) => ({
                            ...prevState,
                            password: value,
                          }))
                        }
                        keyboardType="numeric"
                        secureTextEntry={isSecureEntry}
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
                  <Text
                    style={styles.textButton}
                  >
                    Зареєструватися
                  </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {!isShowKeyboard && (
              <TouchableOpacity>
                <Text
                  style={styles.textLink}
                  onPress={() => navigation.navigate("Login")}
                >
                  Вже маєте акаунт? Увійти
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  secureEntry: {
    width: 71,
    color: "#1B4371",
    height: 19,
    right: 15,
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
  },
  textButton: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    position: "relative",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  imageWrapper: {
    left: "35%",
    top: "10%",
    zIndex: 100,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  wrapperForm: {
    paddingBottom: 45,
    paddingTop: 92,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 27,
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
  },
  textPassword: {
    position: "absolute",
    top: "50%",
    left: "80%",
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 51,
    marginTop: 43,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  textLink: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});