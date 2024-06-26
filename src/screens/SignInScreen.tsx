import { Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../constant/color'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Form from '../component/form/Form'
import ModalPoup from '../component/Modal/ModalPoup'
import { useNavigation } from '@react-navigation/native'
import { navigationType } from '../component/stack/UserStack'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SignupScreen: React.FC = () => {
    const [modal,setModal]= useState(false);
    const navigation = useNavigation<navigationType>()
    
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={COLOR.primary200} />
            <View style={styles.container}>
                <View style={{ flexDirection: "row", padding: 20 }}>
                    <View  style={[styles.viewToolbar, styles.viewAll]}>
                       <TouchableOpacity onPress={()=>navigation.goBack()} style={{flexDirection:"row",alignItems:"center"}}>
                       <Image  source={require("../media/Dicons/back.png")} style={styles.image} />
                        <Text style={{ color: "white" }}>Back</Text>
                       </TouchableOpacity>
                    </View>
                    <View style={[styles.viewAll]}>
                        <Text style={styles.labelLogin}>Create Account</Text>
                    </View>
                    <View style={styles.viewAll}></View>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'null'} style={styles.viewContent}>
                    <Text style={{ marginBottom: 10, fontSize: 28, color: "black", fontWeight: "bold" }}>Welcome</Text>
                    <View style={{ marginBottom: 10 }}>
                        <Text>Create Account to keep exploring amazing</Text>
                        <Text>destinations around the world!</Text>
                    </View>
                    <Form setModal={setModal} />
                    <View style={styles.text}>
                        <Text style={{ color: "black" }}>Already have an account?</Text>
                        <Text style={{ fontSize: 15, color: COLOR.primary200, fontWeight: "bold" }}>Sign in</Text>
                    </View>
                    <View style={{ flex: 1,alignItems:"center",justifyContent:"center" }}>
                        <View style={{position:"absolute",bottom:30}}>
                            <Text style={{ textAlign: "center",color:"black" }}>By creating an account, you agree to our</Text>
                            <Text style={{color:"black"}}><Text style={{color:COLOR.primary200}}>Terms & Condistions</Text> and agree to <Text style={{color:COLOR.primary200}}>Privacy Policy</Text></Text>
                        </View>
                    </View>
                    
                </KeyboardAvoidingView>
                <ModalPoup visible={modal} text='Đăng kí thành công'/>
            </View>
        </>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.primary200,

    },
    image: {
        width: 20,
        height: 15,
        tintColor: "white"
    },
    viewToolbar: {
        flexDirection: "row", alignItems: "center"
    },
    viewAll: {
        flex: 1
    },
    labelLogin: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    },
    viewContent: {
        backgroundColor: "#ffff", flex: 1, marginTop: 15, borderTopEndRadius: 30, borderTopStartRadius: 30, padding: 18
    },
    text: {
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        marginTop: 10
    }

})