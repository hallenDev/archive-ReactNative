import React, { PureComponent } from 'react'
import { Animated } from 'react-native'

class AnimatedHideView extends PureComponent {
  static defaultProps = {
    duration: 300,
    animate: true,
    unmountOnHide: false,
    style: {},
  }

  constructor(props) {
    super(props)
    this.opacity = new Animated.Value(props.visible ? 1 : 0)
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.animate()
    }
  }

  animate = () => {
    const { animate, duration, visible } = this.props

    Animated.timing(this.opacity, {
      toValue: visible ? 1 : 0,
      duration: animate ? duration : 0,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const { unmountOnHide, visible, style, children, ...otherProps } =
      this.props

    const renderStyle = {
      opacity: this.opacity,
      zIndex: visible ? 1 : 0,
    }

    const pointerEvents = visible ? 'auto' : 'none'

    if (unmountOnHide && !visible) {
      return null
    }

    return (
      <Animated.View
        pointerEvents={pointerEvents}
        style={[renderStyle, style]}
        {...otherProps}
      >
        {children}
      </Animated.View>
    )
  }
}

export default AnimatedHideView
