# react-native-slide-drawer

A smooth animating side drawer for React Native built with [Reanimated](https://docs.swmansion.com/react-native-reanimated/).

## Installation

```sh
npm install react-native-slide-drawer
```

### Dependencies
This library requires these dependencies to be installed before you can use it:
```sh
npm install react-native-reanimated react-native-gesture-handler
```

## Usage

```js
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
    </SafeAreaView>
  );
}
```

## Props
| name            | type                      | required | description                                 |
| --------------- | ------------------------- | -------- | ------------------------------------------- |
| isOpen          | boolean                   | true     | Controls whether the drawer is open or not. |
| onClose         | Function                  | true     | Function to close the drawer.               |
| children        | ReactNode                 | true     | The content contained within the drawer.    |
| containerStyle  | SlideDrawerContainerStyle | false    | Styles for the drawer container.            |
| backdropOpacity | number                    | false    | Opacity for the drawer backdrop.            |

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
