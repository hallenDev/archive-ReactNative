import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, LinearGradient } from '~/ui'
import { Trash } from '~/ui/icons'
import { colors, typography } from '~/ui/theme'

const DeleteMediaBtn = ({ isDisabled = true, onPress }) => {
  return (
    <View style={styles.container}>
      {isDisabled ? (
        <Button
          isDisabled={isDisabled}
          type="transparent"
          style={styles.btn}
          onPress={onPress}
        >
          <Trash width={16} height={16} style={styles.icon} />
          <Text style={styles.btnText}>Delete</Text>
        </Button>
      ) : (
        <Button onPress={onPress}>
          <LinearGradient style={styles.content} colors={colors.linerGradient}>
            <Trash width={16} height={16} style={styles.icon} />
            <Text style={styles.btnText}>Delete</Text>
          </LinearGradient>
        </Button>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  btn: {
    width: '100%',
  },
  content: {
    width: '100%',
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  icon: {
    color: colors.textMain,
    marginRight: 8,
  },
  btnText: {
    ...typography.p2,
    color: colors.textMain,
  },
})

export default DeleteMediaBtn
