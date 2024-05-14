import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";

const ChatBubble = ({ role, text }) => {
  return (
    <View style={{ flexDirection: role === "model" ? "row-reverse" : "row" }}>
      <View
        style={[
          styles.chatItem,
          role === "user" ? styles.userChatItem : styles.modelChatItem,
        ]}
      >
        <Text style={styles.chatText}>
          {text}
          </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: "70%",
    backgroundColor: "#f1f0f0",
  },
  userChatItem: {
    alignSelf: "flex-end",
    backgroundColor: "#e0f7fa",
  },
  modelChatItem: {
    alignSelf: "flex-start",
    backgroundColor: "#A9E4EF",
  },
  chatText: {
    fontSize: 16,
  },
});

export default ChatBubble;
