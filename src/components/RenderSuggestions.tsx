import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const suggestions = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' }
];

const RenderSuggestions = ({ keyword, onSuggestionPress }) => {
  if (keyword == null) return null;

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => onSuggestionPress(item)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.suggestionsContainer}>
      <FlatList
        data={filteredSuggestions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  suggestionsContainer: {
    backgroundColor: 'red',
    height: 900,
    padding: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  list: {
    flexGrow: 0 // Ensures the FlatList does not grow beyond items it holds
  }
});

export default RenderSuggestions;
