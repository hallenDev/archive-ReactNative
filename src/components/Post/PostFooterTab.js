import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { countAbbreviatedForm } from '~/shared/utils/count-abbreviated-form'
import { colors, typography } from '~/ui/theme'

const PostFooterTab = ({
  Icon = null,
  counter = 0,
  isPink = false,
  action = () => {},
}) => {
  const text = countAbbreviatedForm(counter)

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={action}>
        <Icon
          width={22}
          height={22}
          style={[styles.icon, isPink && styles.isPink]}
        />
      </TouchableOpacity>

      {counter > 0 && <Text style={styles.text}>{text}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 8,
    alignContent: 'flex-end',
    justifyContent: 'center',
  },
  icon: {
    color: colors.semiGray,
    marginRight: 2,
  },
  text: {
    ...typography.p2,
    color: colors.semiGray,
  },
  isPink: {
    color: colors.primary,
  },
})

export default PostFooterTab
