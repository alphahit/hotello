import { FC, memo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MentionInput } from "react-native-controlled-mentions";
import RenderSuggestions from "./RenderSuggestions";

const LexicalTextField: FC<any> = ({ style, containerStyles }) => {
    const [value, setValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const styles = useStyles();
  
    const handleMentionPress = (data) => {
      console.log("Mention pressed:", data);
      setValue(previousValue => `@${data.name} `); // Simpler mention insert example
      setIsFocused(false); // Optionally unfocus after selecting a mention
    };
  
    const renderSuggestions = ({ keyword }) => {
      if (isFocused && keyword) {
        return (
          <View style={styles.suggestionsContainer}>
            <RenderSuggestions keyword={keyword} onSuggestionPress={handleMentionPress} />
          </View>
        );
      }
      return null;
    };
  
    return (
      <View style={[styles.container, containerStyles]}>
        <MentionInput
          style={[styles.input, style]}
          value={value}
          onChange={setValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type something..."
          partTypes={[
            {
              trigger: '@',
              renderSuggestions: renderSuggestions,
              textStyle: styles.mention,
            },
            { pattern: /#(\w+)/g, textStyle: styles.hashtag },
          ]}
        />
        <Text style={styles.textOutput}>Text input value: {value}</Text>
      </View>
    );
  };
  
  const useStyles = () => StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'blue',
    },
    input: {
      minHeight: 40,
      padding: 10,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: '#ddd',
      backgroundColor: 'transparent',
    },
    textOutput: {
      marginTop: 10,
    },
    mention: {
      fontWeight: 'bold',
      color: 'blue',
    },
    hashtag: {
      fontWeight: '500',
      color: 'pink',
    },
    suggestionsContainer: {
      maxHeight: 200, // Limit height of suggestions box
      borderWidth: 1,
      borderColor: 'gray',
      backgroundColor: 'white',
    },
  });
  
  export default memo(LexicalTextField);
  