import { FunctionComponent } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import Background from "../components/Background";
import Ticket from "../components/Ticket";

type TicketViewProps = {};

const TicketView: FunctionComponent<TicketViewProps> = (props) => {
  return (
    <View style={styles.wrapper}>
      <Background />
      <SafeAreaView style={styles.safeArea}>
        <Ticket />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  safeArea: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TicketView;
