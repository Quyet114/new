import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'


import { COLOR } from '../../constant/color'
import { emailPattern } from '../../constant/valid'

import ButtonLogin from '../form/ButtonLogin'
import InputLogin from './Input'
import Remember from './Remember'
import { login } from '../http/userHttp/user'
import { useMyContext } from '../navigation/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'


interface user {
  email: string,
  password: string,

}
export type valid = {
  email: boolean,
  password: boolean,
}

const FormLogin = ({ setModal, setStatus, setIsLoading }: { setModal: (value: boolean) => void, setStatus: (value: boolean) => void, setIsLoading: (value: boolean) => void }) => {
  const [valueF, setValueF] = useState<user>({ email: "vanquyet@gmail.com", password: "123" })
  const [valid, setValid] = useState<valid>({ email: true, password: true })

  const { setUser } = useMyContext();

  function onChangText(key: string, values: string) {
    setValueF({
      ...valueF,
      [key]: values
    })

  }

  const submit = async () => {
    const { email, password } = { ...valueF };
    const trimmedEmail = email.trim();
    const isValidEmail = emailPattern.test(trimmedEmail);
    const trimmedPassword = password.trim();
    const isValidPassword = trimmedPassword.length > 0;

    if (!isValidEmail || !isValidPassword) {
 
      
      setValid({ email: isValidEmail, password: isValidPassword });
    
    } 

      setValid({ email: true, password: true });
      console.log(valid);
      
      try {
        const result = await login(email, password);
        console.log(result);
        if (result) {
          
          
          setTimeout(() => {
            setUser(result);

          }, 2000);
          await AsyncStorage.setItem('token', result.token);
          console.log("Token set", result.token);
          setIsLoading(true)
          setModal(true);
          setStatus(true);
          setTimeout(() => {

            setModal(false);
          }, 1000);
        } else {
          setModal(true);
          setStatus(false);
          setTimeout(() => {
            setModal(false);
          }, 1000);

        }
      } catch (error) {
        console.log("Login error", error);
      }
    
  };
  return (
    <View>

      <InputLogin invalid={!valid.email} label="Email" value={valueF.email} onchangText={onChangText.bind(this, 'email')} iconE />
      <InputLogin invalid={!valid.password} label="Password" value={valueF.password} onchangText={onChangText.bind(this, 'password')} iconPass password={true} />
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Remember />
        <TouchableOpacity>
          <Text>Forgot password?</Text>
        </TouchableOpacity>

      </View>
      <View>
<ButtonLogin textLogin chilren='Login' textColor='#fff' onPress={submit} />
      </View>
    </View>
  )
}

export default FormLogin

const styles = StyleSheet.create({})