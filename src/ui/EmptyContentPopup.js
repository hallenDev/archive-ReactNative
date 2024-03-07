import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { colors, typography } from '~/ui/theme'
import Button from '~/ui/Button'
import noop from '~/utils/noop'

const EmptyContentPopup = ({
  Icon = null,
  title = '',
  description = '',
  buttonText = null,
  onPress = noop,
}) => (
  <View style={styles.container}>
    {Icon ? Icon : null}
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>

    {buttonText && (
      <Button style={styles.button} onPress={onPress} type="primary">
        {buttonText}
      </Button>
    )}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.p2,
    color: colors.textMain,

    marginTop: 20,
    marginBottom: 8,
  },
  description: {
    ...typography.p2,
    color: colors.textSub,
    textAlign: 'center',
  },
  button: {
    color: colors.textSub,
    width: '100%',
    marginTop: 20,
  },
})

export default EmptyContentPopup
