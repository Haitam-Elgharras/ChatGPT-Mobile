import {
  View,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import ChatService from "./services/chat-service";
import ChatBubble from "./ChatBubble";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Gemini = () => {
  const apiKey = "AIzaSyB8olb-w2KHly0XMavISeKGd_fQwts2DfU";
  const host = 'http://localhost:8081/';

  const geminiHost = host + "?key=" + apiKey;

  const [userInput, setuserInput] = useState("");
  const [chat, setchat] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    setloading(true);
    setuserInput("");

    // save the chat state
    const chatState = [...chat];

    // optimistically update the chat    
    let updatedChat = [
      ...chat,
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ];
    setchat(updatedChat);
    try {
      const res = await ChatService.getResponse(userInput);

      if (res) {
        updatedChat = [
          ...updatedChat,
          {
            role: "model",
            parts: [{ text: res }],
          },
        ];

        setchat(updatedChat);
      }
    } catch (error) {
      setError(error);
      // revert the chat state
      setchat(chatState);
    } finally {
      setloading(false);
    }
  };

  const renderChatItem = ({ item }) => (
    <ChatBubble role={item.role} text={item.parts[0].text} />
  );

  return (
    <View style={Styles.container}>
      <View style={Styles.titleContainer}>
        <MaterialCommunityIcons name="robot-happy" size={24} color="#237aed" />
        <Text style={Styles.title}>Gemini Mobile</Text>
      </View>
      <FlatList
        data={chat}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={Styles.chatContainer}
      />
      {loading && <ActivityIndicator size="large" color="#333" />}
      {/* input */}
      <View style={Styles.inputContainer}>
        <TextInput
          style={Styles.input}
          value={userInput}
          onChangeText={(text) => setuserInput(text)}
          placeholder="Enter prompt here..."
        />
        <TouchableOpacity style={Styles.button} onPress={handleSend}>
          <Text style={Styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
      {error && (
        <Text style={{ color: "red", textAlign: "center" }}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

export default Gemini;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#eff8ff",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#237aed",
    marginLeft: 10,
    textAlign: "center",
  },

  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    padding: 10,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 10,
    color: "#333",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#237aed",
    padding: 12,
    borderRadius: 13,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
