import React from 'react'
import { View, Text } from 'react-native'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { Button } from '~/ui'
import { colors } from '~/ui/theme'
import { infoButtonStyles as styles } from '~/styles'

const ProfileMainInfoBtn = ({
  title,
  active,
  Icon,
  onAction = () => {},
  additionalStyles,
  additionalTextStyle = {},
  isLoading = false,
}) => (
  <>
    {isLoading ? (
      <View style={styles.containerSkeleton}>
        <ContentLoader backgroundColor={colors.darkBlack} opacity={0.25}>
          <Rect width="300" height="40" />
        </ContentLoader>
      </View>
    ) : (
      <Button
        type="transparent"
        style={[styles.btn, additionalStyles]}
        onPress={onAction}
      >
        <View style={styles.btnContent}>
          <Icon
            width={16}
            height={16}
            color={active ? colors.primary : colors.textMain}
          />
          <Text style={[styles.btnText, additionalTextStyle]}>{title}</Text>
        </View>
      </Button>
    )}
  </>
)

export default ProfileMainInfoBtn
