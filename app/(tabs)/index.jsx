import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Modal, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button, Colors, Text, TextField, View } from 'react-native-ui-lib';
import * as Location from 'expo-location';

export default function HomeScreen() {

  const [region, setRegion] = useState({
    latitude: 39.9247,
    longitude: 32.8367,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        console.log("Konum Verisi: ", location);
      } else {
        console.log("Konum izni verilmedi");
      }
    };

    getLocationAsync();
  }, []);

  const handleMarkerPress = (place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  const reviews = [
    { id: '1', username: 'Ali', comment: 'Harika bir yer!', rating: 5 },
    { id: '2', username: 'Ayşe', comment: 'Görülmeye değer.', rating: 4 },
    { id: '3', username: 'Mehmet', comment: 'Oldukça etkileyici.', rating: 5 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextField
          placeholder="Yer ara..."
          hideUnderline
          style={styles.searchBox}
          onChangeText={(text) => console.log(text)}
          editable={true}
        />
        <Button
          label="Ara"
          backgroundColor={Colors.blue30}
          size={Button.sizes.small}
          style={styles.helpButton}
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={region}
      >
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          onPress={() => handleMarkerPress({
            title: "Burayı gezmelisiniz 😋",
            description: "Anıtkabir",
            images: [
              'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/253f/live/65fa18b0-7fa3-11ee-a503-4588075e3427.jpg.webp',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAJDZqIkNYwNUL4mfLf46Pgxth7FkYhVK_XA&s',
              'https://via.placeholder.com/300',
            ],
          })}
        >
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe7RBfPAw2WrKd8LZ7fvH7ggEWlPK3BAOy6w&s' }}
            style={styles.customMarker}
          />
        </Marker>
      </MapView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPlace && (
              <>
                <FlatList
                  horizontal
                  data={selectedPlace.images}
                  renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.image} />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  style={styles.imageList}
                />
                <Text style={styles.title}>{selectedPlace.title}</Text>
                <Text style={styles.description}>{selectedPlace.description}</Text>
                <FlatList
                  data={reviews}
                  renderItem={({ item }) => (
                    <View style={styles.reviewItem}>
                      <Text style={styles.username}>{item.username}</Text>
                      <Text style={styles.comment}>{item.comment}</Text>
                      <Text style={styles.rating}>⭐ {item.rating}/5</Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                />
                <Button
                  label="Kapat"
                  onPress={() => setModalVisible(false)}
                  backgroundColor={Colors.red30}
                  style={styles.closeButton}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  searchBox: {
    flex: 1,
    fontSize: 16,
    height: 30,
    paddingHorizontal: 10,
  },
  helpButton: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  imageList: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: Colors.grey30,
    marginBottom: 10,
  },
  reviewItem: {
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  comment: {
    fontSize: 14,
  },
  rating: {
    color: Colors.yellow30,
  },
  closeButton: {
    marginTop: 10,
  },
  customMarker: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderColor: Colors.grey80,
    borderWidth: 0.8
  },
});
