import React, { useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";

import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header/Header";
import { Background, ListBalance } from "./styles";
import { format } from "date-fns";
import api from "../../services/api";
import { useIsFocused } from "@react-navigation/native";
import BalanceItem from "../../components/BalanceItem/BalanceItem";

export default function Home() {
  const isFocused = useIsFocused();
  const [listBalance, setListBalance] = useState([]);
  const [dateMoviments, setDateMoviments] = useState(new Date());

  useEffect(() => {
    isActive = true;

    async function getMoviments() {
      let formatedDate = format(dateMoviments, "dd/MM/yyyy");

      const balance = await api.get("/balance", {
        params: {
          date: formatedDate,
        },
      });

      if (isActive) {
        setListBalance(balance.data);
      }
    }

    getMoviments();

    return () => (isActive = false);
  }, [isFocused]);

  return (
    <Background>
      <Header title="Minhas movimentações" />
      <ListBalance
        data={listBalance}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtrator={(item) => item.tag}
        renderItem={({ item }) => <BalanceItem data={item} />}
      />
    </Background>
  );
}
