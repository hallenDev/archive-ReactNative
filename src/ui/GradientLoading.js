import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Animated } from 'react-native'
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg'
import SvgSpinnerBg from '~/ui/icons/SpinnerBg'
const AnimatedSvg = Animated.createAnimatedComponent(Svg)
const AnimatedCirlce = Animated.createAnimatedComponent(Circle)

export default class GradientLoading extends PureComponent {
  constructor(props) {
    super(props)
    const { size } = props
    this.rotateAnim = new Animated.Value(0)
    this.radius = size / 2 - 4
    this.circleCm = Math.PI * 2 * this.radius
    this.rotateArr = [
      '0deg',
      '45deg',
      '90deg',
      '135deg',
      '180deg',
      '225deg',
      '270deg',
      '315deg',
      '360deg',
    ]
    this.offsetArr = [
      this.circleCm * 0.9,
      this.circleCm * 0.8,
      this.circleCm * 0.7,
      this.circleCm * 0.6,
      this.circleCm * 0.5,
      this.circleCm * 0.6,
      this.circleCm * 0.7,
      this.circleCm * 0.8,
      this.circleCm * 0.9,
    ]
    this.inputRange = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.rotateAnim, {
        toValue: 8,
        duration: this.props.speed,
        useNativeDriver: false,
      }),
    ).start()
  }

  render() {
    const {
      size,
      linearGradientColor,
      start,
      end = {},
      ringWidth,
      showBackCircle,
      backCircleColor,
      strokeLinecap,
    } = this.props
    const len = linearGradientColor.length
    return (
      <View style={styles.container}>
        <SvgSpinnerBg width={80} height={80} style={styles.spinner} />
        <AnimatedSvg
          viewBox={`0 0 ${size} ${size}`}
          style={{
            width: size,
            height: size,
            transform: [
              {
                rotate: this.rotateAnim.interpolate({
                  inputRange: this.inputRange,
                  outputRange: this.rotateArr,
                }),
              },
            ],
          }}
        >
          <Defs>
            <LinearGradient
              id="grad"
              x1={start.x}
              y1={start.y}
              x2={end.hasOwnProperty('x') ? end.x : size}
              y2={end.hasOwnProperty('y') ? end.y : size}
              gradientUnits="userSpaceOnUse"
            >
              {linearGradientColor.map((item, index) => (
                <Stop
                  offset={index * (index / (len - 1))}
                  stopColor={item}
                  key={index}
                />
              ))}
            </LinearGradient>
          </Defs>

          {showBackCircle ? (
            <AnimatedCirlce
              cx={size / 2}
              cy={size / 2}
              r={this.radius}
              strokeWidth={ringWidth}
              fill={'none'}
              stroke={backCircleColor}
            />
          ) : null}
          <AnimatedCirlce
            cx={size / 2}
            cy={size / 2}
            r={this.radius}
            strokeWidth={ringWidth}
            strokeDasharray={[this.circleCm, this.circleCm]}
            strokeLinecap={strokeLinecap}
            strokeDashoffset={this.rotateAnim.interpolate({
              inputRange: this.inputRange,
              outputRange: this.offsetArr,
            })}
            fill={'none'}
            stroke={'url(#grad)'}
          />
        </AnimatedSvg>
      </View>
    )
  }
}

GradientLoading.defaultProps = {
  size: 100,
  speed: 1200,
  linearGradientColor: ['red', 'blue'],
  start: { x: 0, y: 0 },
  ringWidth: 6,
  showBackCircle: true,
  backCircleColor: '#eee',
  strokeLinecap: 'round',
  direction: 0,
}

const styles = StyleSheet.create({
  image: size => ({
    width: size,
    height: size,
    aspectRatio: 1,
    resizeMode: 'contain',
    position: 'absolute',
  }),
  spinner: {
    position: 'absolute',
  },
})
