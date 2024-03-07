import React, { memo } from 'react'
import { Text } from 'react-native'
import { Button, ButtonBackgroundGradient } from '~/ui'
import { PlusCircle } from '~/ui/icons'
import { addMediaStyles as styles } from '~/styles'

const AddMediaBtn = ({ navigation }) => {
  const onGoToAddMedia = () => {
    navigation.navigate('AddMedia')
  }

  return (
    <Button style={styles.btn} onPress={onGoToAddMedia}>
      <ButtonBackgroundGradient className={styles.container}>
        <PlusCircle width={16} height={16} style={styles.icon} />
        <Text style={styles.btnText}>Add Photos &amp; Vids</Text>
      </ButtonBackgroundGradient>
    </Button>
  )
}

export default memo(AddMediaBtn)
