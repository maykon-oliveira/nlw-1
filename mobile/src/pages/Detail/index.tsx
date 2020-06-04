import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import { Point } from '../../models/points';
import { composeAsync } from 'expo-mail-composer';

interface QueryRouteParams {
    id: number;
}

const Detail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as QueryRouteParams;

    const [point, setPoint] = useState<Point>({} as Point);

    useEffect(() => {
        api.get(`/points/${id}`)
            .then(({ data }) => data)
            .then(setPoint);
    }, []);

    const handleNavigateToBack = () => navigation.goBack();

    const handleWhatsapp = () => Linking.openURL(`whatsapp://send?phone=${point.whatsapp}`);

    const handleComposeEmail = () => {
        composeAsync({
            subject: 'Interesse na coleta de resíduos',
            recipients: [point.email],
        });
    };

    if (Object.keys(point).length === 0) {
        return null;
    }    

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateToBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79"></Icon>
                </TouchableOpacity>
                <Image
                    style={styles.pointImage}
                    source={{
                        uri: point.image,
                    }}
                />
                <Text style={styles.pointName}>{point.name}</Text>
                <Text style={styles.pointItems}>{point.items.map(({ title }) => title).join(', ')}</Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{`${point.city} / ${point.uf}`}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsapp}>
                    <FontAwesome name="whatsapp" color="#fff" size={20} />
                    <Text style={styles.buttonText}>Whatsapp</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleComposeEmail}>
                    <Icon name="mail" color="#fff" size={20} />
                    <Text style={styles.buttonText}>Email</Text>
                </RectButton>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        paddingTop: 20 + Constants.statusBarHeight,
    },

    pointImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 32,
    },

    pointName: {
        color: '#322153',
        fontSize: 28,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },

    pointItems: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80',
    },

    address: {
        marginTop: 32,
    },

    addressTitle: {
        color: '#322153',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    },

    addressContent: {
        fontFamily: 'Roboto_400Regular',
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80',
    },

    footer: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#999',
        paddingVertical: 20,
        paddingHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    button: {
        width: '48%',
        backgroundColor: '#34CB79',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        marginLeft: 8,
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Roboto_500Medium',
    },
});

export default Detail;
