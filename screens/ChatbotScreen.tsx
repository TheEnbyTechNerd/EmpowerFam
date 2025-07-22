import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('https://empowerfam.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage: Message = { text: data.reply, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with bot:', error);
      setMessages(prev => [
        ...prev,
        { text: 'Oops! Something went wrong.', sender: 'bot' },
      ]);
    }
  };

  return (
    <View style={styles.outerWrapper} accessible accessibilityLabel="Chatbot screen">
      <View style={styles.chatContainer}>
        <Text style={styles.header}>Welcome to EmpowerBot 🤖</Text>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={80}
        >
          <ScrollView
            contentContainerStyle={styles.chatContent}
            keyboardShouldPersistTaps="handled"
            accessibilityLabel="Chat messages list"
          >
            {messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  msg.sender === 'user' ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text style={styles.messageText} accessibilityLabel={`Message: ${msg.text}`}>
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type a message..."
              placeholderTextColor="#666"
              returnKeyType="send"
              onSubmitEditing={sendMessage}
              accessibilityLabel="Type your message here"
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={styles.sendButton}
              accessibilityRole="button"
              accessibilityLabel="Send message"
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontFamily: 'PlayfairDisplay-SemiBold',
    color: '#243010',
    textAlign: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  outerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    width: '92%',
    maxWidth: 420,
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  chatContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  messageBubble: {
    padding: 14,
    marginVertical: 6,
    borderRadius: 16,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#F7D08A',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 16,
    color: '#243010',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7D08A',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'PlayfairDisplay-Regular',
    color: '#243010',
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: 'transparent',
  },
  sendButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  sendButtonText: {
    color: '#CA5310',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
});
