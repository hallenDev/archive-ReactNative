import React from 'react'
import { Text } from 'react-native'
import { Button, LinearGradient, Placeholder } from '~/ui'
import { colors } from '~/ui/theme'
import * as Animatable from 'react-native-animatable'
import { gradientButtonstyles as styles } from '~/styles'

const AnimatedButtonGradient = ({ children, animation }) =>
  animation ? (
    <Animatable.View
      ref={this.handleViewRef}
      animation="pulse"
      easing="ease-out"
      iterationCount="infinite"
    >
      {children}
    </Animatable.View>
  ) : (
    children
  )

const ButtonGradient = ({
  title,
  IconLeft,
  IconRight,
  className,
  textClassName,
  isDisabled,
  isLoading = false,
  isTransparent,
  sizeIcon = 16,
  animation = false,
  onAction = () => {},
}) => (
  <AnimatedButtonGradient animation={animation}>
    <Button
      style={[styles.btn, className, isDisabled && styles.isDisabled]}
      onPress={onAction}
      isDisabled={isDisabled}
      type="transparent"
    >
      {!isTransparent && (
        <LinearGradient
          style={styles.btnContent}
          colors={colors.linerGradient}
          start={{ x: 1.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
        />
      )}
      {IconLeft && (
        <IconLeft width={sizeIcon} height={sizeIcon} style={styles.iconLeft} />
      )}

      {isLoading ? (
        <Placeholder isWhite />
      ) : (
        <Text style={[styles.btnText, textClassName]}>{title}</Text>
      )}

      {IconRight && (
        <IconRight
          width={sizeIcon}
          height={sizeIcon}
          style={styles.iconRight}
        />
      )}
    </Button>
  </AnimatedButtonGradient>
)

export default ButtonGradient
