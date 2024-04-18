import * as React from 'react';
import { StyleSheet, Text, Button, SafeAreaView } from 'react-native';
import { SlideDrawer } from 'react-native-slide-drawer';

export default function App() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <SlideDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        side="right"
      >
        <Text style={{ color: 'white', fontSize: 16 }}>item 1</Text>
        <Text style={{ color: 'white', fontSize: 16 }}>item 2</Text>
        <Text style={{ color: 'white', fontSize: 16 }}>item 3</Text>
        <Text style={{ color: 'white', fontSize: 16 }}>item 4</Text>
        <Text style={{ color: 'white', fontSize: 16 }}>item 5</Text>
        <Text style={{ color: 'white', fontSize: 16 }}>item 6</Text>
      </SlideDrawer>
      <Button title="open drawer" onPress={() => setIsOpen(true)}>
        open drawer
      </Button>
      <Button title="close drawer" onPress={() => setIsOpen(false)}>
        close drawer
      </Button>
      <Text style={{ position: 'absolute', left: 0, color: '#fff', zIndex: 1 }}>
        hello there
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
