import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Button, LinearGradient, InputField, Placeholder } from '~/ui'
import { GiftsMessage } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'

const GiftMessageModal = ({
  uri,
  username,
  onSendMessage,
  profilePic,
  isLoading,
}) => {
  return (
    <>
      <Text style={styles.title}>
        Write a message to go with your virtual gift
      </Text>
      <View style={styles.msgContainer}>
        <View style={styles.giftContainer}>
          <View style={[styles.content, styles.gift]}>
            <Image source={{ uri }} style={styles.giftImg} />
          </View>
          <View style={styles.content}>
            <Image source={{ uri: profilePic }} style={styles.avatar} />
            <Text style={styles.name}>{username}</Text>
          </View>
          <View style={styles.icon}>
            <GiftsMessage width={24} height={24} color={colors.textMain} />
          </View>
        </View>
        <InputField
          name="message"
          placeholder="Start typing..."
          multiline
          maxLength={500}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
      </View>
      <Button
        style={styles.btn}
        onPress={onSendMessage}
        type="transparent"
        isDisabled={isLoading}
      >
        <LinearGradient
          style={styles.btnContent}
          colors={colors.linerGradient}
        />
        {isLoading ? (
          <Placeholder isWhite />
        ) : (
          <Text style={styles.btnText}>Send message</Text>
        )}
      </Button>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    ...typography.h3,
    color: colors.textMain,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  msgContainer: {
    width: '100%',
    position: 'relative',
  },
  giftContainer: {
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.semiBlack25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  gift: {
    borderRightWidth: 1,
    borderColor: colors.semiGray,
  },
  giftImg: {
    width: 50,
    height: 50,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    ...typography.p3b,
    color: colors.textMain,
  },
  icon: {
    position: 'absolute',
    backgroundColor: colors.primary,
    borderRadius: 2,
    paddingHorizontal: 5,
  },
  btn: {
    flex: 1,
    position: 'relative',
    maxHeight: 40,
    marginTop: 35,
  },
  btnContent: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
  },
  btnText: {
    ...typography.p2,
    color: colors.textMain,
  },
  inputContainer: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 0,
    backgroundColor: colors.semiBlack15,
    justifyContent: 'flex-start',
    paddingBottom: 30,
  },
  input: {
    minHeight: 100,
    maxHeight: 120,
  },
})

export default GiftMessageModal
