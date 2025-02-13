import { Text, View } from "react-native";
import React, { useMemo } from "react";
import { Container } from "./styles";

export default function BalanceItem({ data }) {
  const labelName = useMemo(() => {
    if (data.tag === "saldo") {
      return {
        label: "Saldo Atual",
        color: "3b3dbf",
      };
    } else if (data.tag === "receita") {
      return {
        label: "Entradas de Hoje",
        color: "00b94a",
      };
    } else {
      return {
        label: "Saidas de Hoje",
        color: "ef463a",
      };
    }
  }, [data]);
  return <Container bg={labelName.color}></Container>;
}
