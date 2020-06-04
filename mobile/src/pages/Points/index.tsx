import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native';
import { requestPermissionsAsync, PermissionStatus, getCurrentPositionAsync } from 'expo-location';

import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api';
import { Point } from '../../models/points';
import { Item } from '../../models/items';

interface QueryRouteParams {
    uf: string;
    city: string;
}

const Points = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { uf, city } = route.params as QueryRouteParams;
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [points, setPoints] = useState<Point[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        api.get('/items')
            .then(({ data }) => data)
            .then(setItems);
    }, []);

    useEffect(() => {
        api.get('/points', {
            params: {
                uf,
                city,
                items: selectedItems,
            },
        })
            .then(({ data }) => data)
            .then(setPoints);
    }, [selectedItems]);

    useEffect(() => {
        async function loadPosition() {
            const { status } = await requestPermissionsAsync();

            if (status !== PermissionStatus.GRANTED) {
                Alert.alert('Ooops... Não foi possivel recuperar a sua localização');
                return;
            }
            const location = await getCurrentPositionAsync();
            const { latitude, longitude } = location.coords;
            console.log(latitude, longitude);

            setInitialPosition([latitude, longitude]);
        }

        loadPosition();
    }, []);

    const handleNavigateToBack = () => navigation.goBack();
    const handleMarkerPress = (id: number) => navigation.navigate('Detail', { id });
    const selectItem = (id: number) => {
        const has = selectedItems.findIndex((i) => i === id);
        if (has >= 0) {
            setSelectedItems(selectedItems.filter((i) => i !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateToBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79"></Icon>
                </TouchableOpacity>
                <Text style={styles.title}>Bem vindo.</Text>
                <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

                <View style={styles.mapContainer}>
                    {initialPosition[0] !== 0 && (
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: initialPosition[0],
                                longitude: initialPosition[1],
                                latitudeDelta: 0.014,
                                longitudeDelta: 0.014,
                            }}
                        >
                            {points.map(({ id, name, lat, lng, image_url }) => (
                                <Marker
                                    key={id}
                                    onPress={() => handleMarkerPress(id)}
                                    style={styles.mapMarker}
                                    coordinate={{
                                        latitude: lat,
                                        longitude: lng,
                                    }}
                                >
                                    <View style={styles.mapMarkerContainer}>
                                        <Image
                                            style={styles.mapMarkerImage}
                                            source={{
                                                uri: image_url,
                                            }}
                                        />
                                        <Text style={styles.mapMarkerTitle}>{name}</Text>
                                    </View>
                                </Marker>
                            ))}
                        </MapView>
                    )}
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                    }}
                >
                    {items.map(({ id, title, image_url }) => (
                        <TouchableOpacity
                            onPress={() => selectItem(id)}
                            key={id}
                            style={[styles.item, selectedItems.includes(id) ? styles.selectedItem : {}]}
                        >
                            <SvgUri width={42} height={42} uri={image_url} />
                            <Text style={styles.itemTitle}>{title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 20 + Constants.statusBarHeight,
    },

    title: {
        fontSize: 20,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 4,
        fontFamily: 'Roboto_400Regular',
    },

    mapContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 16,
    },

    map: {
        width: '100%',
        height: '100%',
    },

    mapMarker: {
        width: 90,
        height: 80,
    },

    mapMarkerContainer: {
        width: 90,
        height: 70,
        backgroundColor: '#34CB79',
        flexDirection: 'column',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
    },

    mapMarkerImage: {
        width: 90,
        height: 45,
        resizeMode: 'cover',
    },

    mapMarkerTitle: {
        flex: 1,
        fontFamily: 'Roboto_400Regular',
        color: '#FFF',
        fontSize: 13,
        lineHeight: 23,
    },

    itemsContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 32,
    },

    item: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#eee',
        height: 120,
        width: 120,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'space-between',

        textAlign: 'center',
    },

    selectedItem: {
        borderColor: '#34CB79',
        borderWidth: 2,
    },

    itemTitle: {
        fontFamily: 'Roboto_400Regular',
        textAlign: 'center',
        fontSize: 13,
    },
});

export default Points;
