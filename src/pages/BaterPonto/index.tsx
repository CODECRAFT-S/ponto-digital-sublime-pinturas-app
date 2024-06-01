import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { View, TouchableOpacity, Text } from "react-native";
import { Text as TextPaper } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

import notFoundImage from "@image/notFound.png";
import styles from "./styles";
import { Colors } from "@constants/Colors";
import ButtonConfirm from "@components/ButtonConfirm";
import ModalNotification from "@components/ModalNotification";
import { apiUrl } from "@scripts/apiUrl";
import { KeyApi } from "@constants/KeyApi";

interface WorkPointProps {
  status: string;
  data:
    | {
        id: Number;
        name: string;
        latitude: string;
        longitude: string;
        distance: Number;
      }
    | [];
}

type ModalStatus = "Success" | "Fail" | "Alert";

export default function BaterPonto({ navigation, route }) {
  let [username, setUsername] = useState("");
  let [token, setToken] = useState("");
  useEffect(() => {
    const name = SecureStore.getItemAsync("USERNAME")
      .then((e) => {
        return e;
      })
      .catch((e) => {
        navigation.navigate("Login");
      });
    const token = SecureStore.getItemAsync("TOKEN_USER")
      .then((e) => {
        return e;
      })
      .catch((e) => {
        navigation.navigate("Login");
      });
    setUsername(name);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        navigation.navigate("Login");
        return;
      }
    })();
  }, []);

  const [photo, setPhoto] = useState(route.params?.photoData ?? notFoundImage);
  const [dataTime, setDataTime] = useState(new Date());

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState<ModalStatus>("Success");

  const padZero = (num) => (num < 10 ? `0${num}` : num);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function formatedTime() {
    const hours = padZero(dataTime.getHours())
    const minutes = padZero(dataTime.getMinutes())
    return `${hours}:${minutes}`;
  }

  function formatedDate() {
    const day = padZero(dataTime.getDate())
    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const month = monthNames[dataTime.getMonth()];
    const year = dataTime.getFullYear();
    return `${day} de ${month}, ${year}`;
  }

  function logout() {
    SecureStore.deleteItemAsync("TOKEN_USER");
    SecureStore.deleteItemAsync("USERNAME");
    navigation.navigate("Login");
  }

  function handleCapturePhoto() {
    navigation.navigate("CapturePhoto");
  }

  async function handleWorkPoint(latitude: string, longitude: string) {
    try {
      const result = await axios.get(apiUrl("/workpoint"), {
        headers: {
          Authorization: KeyApi,
        },
        params: {
          lat: latitude,
          log: longitude,
        },
      });
      if (result.status === 200) {
        const data: WorkPointProps = result.data;
        return data;
      }
    } catch (error) {
      return {
        status: "Failed",
        data: []
      };
    }
  }

  async function handleRegisterPoint() {
    
  }

  async function handleBaterPonto() {
    setPhoto(notFoundImage);
    let timeFull = `${padZero(dataTime.getFullYear())}-${padZero(dataTime.getMonth()+1)}-${padZero(dataTime.getDay())} ${padZero(dataTime.getHours())}:${padZero(dataTime.getMinutes())}:${padZero(dataTime.getSeconds())}`
    let location = await Location.getCurrentPositionAsync({});
    const latitude = String(location.coords.latitude)
    const longitude = String(location.coords.longitude)
    // const latitude = "-7.527434828863182";
    // const longitude = "-46.04329892365424";
    try {
      const workPoint = await handleWorkPoint(latitude, longitude);
      if(Array.isArray(workPoint.data)){
        setModalMessage("Não tem Ponto de Trabalho na sua Área.");
        setModalStatus("Alert");
      } else {
        console.log("Batendo Ponto");
        console.log(workPoint)
        console.log(timeFull);
        console.log(photo);
  
        setModalMessage("Ponto registrado com sucesso.");
        setModalStatus("Success");
      }
    } catch (error) {
      console.log(error);
      setModalMessage("Falha ao registrar o ponto. Tente novamente.");
      setModalStatus("Fail");
    }
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerPage}>
        <View style={styles.welcomeUser}>
          <TextPaper
            variant="titleMedium"
            style={[styles.textUser, { fontWeight: "400" }]}
          >
            Olá,{" "}
          </TextPaper>
          <TextPaper
            variant="titleMedium"
            style={[styles.textUser, { fontWeight: "bold" }]}
          >
            {username}
          </TextPaper>
        </View>
        <TouchableOpacity onPress={logout}>
          <FontAwesome name="power-off" size={25} color={Colors.text.yellow} />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={photo} style={styles.image} />
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleCapturePhoto}
        >
          <FontAwesome name="camera" size={27} color={Colors.text.tertiary} />
        </TouchableOpacity>
      </View>
      <View style={styles.timeCurrent}>
        <Text style={styles.time}>{formatedTime()}</Text>
        <TextPaper
          variant="labelLarge"
          style={{ color: Colors.text.secondary }}
        >
          {formatedDate()}
        </TextPaper>
      </View>
      <View style={styles.btnPonto}>
        <ButtonConfirm
          text="Bater Ponto"
          disable={photo == notFoundImage ? true : false}
          onPress={handleBaterPonto}
        ></ButtonConfirm>
      </View>
      <ModalNotification
        mensagem={modalMessage}
        status={modalStatus}
        timeVisable={3000}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
}
