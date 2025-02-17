import React, { useState } from "react";
import { Background, Input, SubmitButton, SubmitText } from "./styles";
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Header from "../../components/Header/Header";
import RegisterTypes from "../../components/RegisterTypes/RegisterTypes";
import { format } from "date-fns";
import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const [labelInput, setLabelInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [type, setType] = useState("receita");
  const navigation = useNavigation();

  function handleSubmit() {
    Keyboard.dismiss();

    if (labelInput === "" || valueInput === "") {
      Alert.alert("Preencha todos os campos");
      return;
    }

    if (isNaN(parseFloat(valueInput))) {
      Alert.alert("O valor deve ser um número válido");
      return;
    }

    Alert.alert(
      "Confirmando dados",
      `Tipo: ${type} - Valor: ${parseFloat(valueInput)}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleAdd(),
        },
      ]
    );
  }

  async function handleAdd() {
    Keyboard.dismiss();
    try {
      await api.post("/receive", {
        description: labelInput,
        value: Number(valueInput),
        type: type,
        date: format(new Date(), "dd/MM/yyyy"),
      });

      setLabelInput("");
      setValueInput("");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Erro ao registrar", "Tente novamente mais tarde.");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header title="Registrando" />

        <SafeAreaView style={{ marginTop: 14, alignItems: "center" }}>
          <Input
            placeholder="Descrição desse registro"
            value={labelInput}
            onChangeText={(text) => setLabelInput(text)}
          />

          <Input
            placeholder="Valor desejado"
            keyboardType="numeric"
            value={valueInput}
            onChangeText={(text) => setValueInput(text)}
          />

          <RegisterTypes
            type={type}
            sendTypeChanged={(item) => setType(item)}
          />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
