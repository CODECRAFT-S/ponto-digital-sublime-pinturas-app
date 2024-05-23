import React from "react";
import {View, Text, FlatList} from 'react-native'


export default function HistoricoPonto(){
    return(
        <View>
            <Text>Histórico de Resitros</Text>
            <FlatList>
                <View>
                <Text>Data: 16/04/2024</Text>
                <Text>Hora: 14:00:05</Text>
                </View>
            </FlatList>

        </View>
    )
}