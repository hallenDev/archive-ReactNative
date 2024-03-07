import React from 'react'
import { Animated } from 'react-native'
import SwiperComponent from 'react-native-deck-swiper'
import isEqual from 'lodash/isEqual'

const labelType = {
  NONE: 'none',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
}

/**
 * @example https://github.com/webraptor/react-native-deck-swiper/blob/master/Swiper.js
 */
class Swiper extends SwiperComponent {
  onPanResponderGrant = (event, gestureState) => {
    this.props.dragStart && this.props.dragStart()
    if (!this.state.panResponderLocked) {
      this.state.pan.setOffset({
        x: 0,
        y: 0,
      })
    }

    this.state.pan.setValue({
      x: 0,
      y: 0,
    })
  }

  onPanResponderRelease = (e, gestureState) => {
    this.props.dragEnd && this.props.dragEnd()
    if (this.state.panResponderLocked) {
      this.state.pan.setValue({
        x: 0,
        y: 0,
      })

      this.state.pan.setOffset({
        x: 0,
        y: 0,
      })

      return
    }

    const { horizontalThreshold } = this.props

    const animatedValueX = Math.abs(this._animatedValueX)

    const isSwiping = animatedValueX > horizontalThreshold

    if (isSwiping && this.validPanResponderRelease()) {
      const onSwipeDirectionCallback = this.getOnSwipeDirectionCallback(
        this._animatedValueX,
      )

      this.swipeCard(onSwipeDirectionCallback)
    } else {
      this.resetTopCard()
    }

    if (!this.state.slideGesture) {
      this.props.onTapCard(this.state.firstCardIndex)
    }

    this.setState({
      labelType: labelType.NONE,
      slideGesture: false,
    })
  }

  onPanResponderMove = (event, gestureState) => {
    this.props.onSwiping(this._animatedValueX, this._animatedValueY)

    let { overlayOpacityHorizontalThreshold, overlayOpacityVerticalThreshold } =
      this.props
    if (!overlayOpacityHorizontalThreshold) {
      overlayOpacityHorizontalThreshold = this.props.horizontalThreshold
    }
    if (!overlayOpacityVerticalThreshold) {
      overlayOpacityVerticalThreshold = this.props.verticalThreshold
    }

    let isSwipingLeft, isSwipingRight, isSwipingTop, isSwipingBottom

    if (Math.abs(this._animatedValueX) > overlayOpacityHorizontalThreshold) {
      if (this._animatedValueX > 0) isSwipingRight = true
      else isSwipingLeft = true
    }

    if (isSwipingRight) {
      this.setState({ labelType: labelType.RIGHT })
    } else if (isSwipingLeft) {
      this.setState({ labelType: labelType.LEFT })
    } else {
      this.setState({ labelType: labelType.NONE })
    }

    const { onTapCardDeadZone } = this.props
    if (
      this._animatedValueX < -onTapCardDeadZone ||
      this._animatedValueX > onTapCardDeadZone ||
      this._animatedValueY < -onTapCardDeadZone ||
      this._animatedValueY > onTapCardDeadZone
    ) {
      this.setState({
        slideGesture: true,
      })
    }

    return Animated.event([null, this.createAnimatedEvent()], {
      useNativeDriver: false,
    })(event, gestureState)
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const { props, state } = this
    const propsChanged = props.close || nextProps.close

    const stateChanged =
      nextState.firstCardIndex !== state.firstCardIndex ||
      nextState.secondCardIndex !== state.secondCardIndex ||
      nextState.previousCardIndex !== state.previousCardIndex ||
      nextState.labelType !== state.labelType ||
      nextState.swipedAllCards !== state.swipedAllCards ||
      !isEqual(nextState.cards, state.cards)

    return propsChanged || stateChanged
  }

  pushCardToStack = (renderedCards, index, position, key, firstCard) => {
    const { cards } = this.state
    const stackCardZoomStyle = this.calculateStackCardZoomStyle(position)
    const stackCard = this.props.renderCard(
      cards?.[index],
      index,
      this.state.favoritedDuid,
    )
    const swipableCardStyle = this.calculateSwipableCardStyle()
    const renderOverlayLabel = this.renderOverlayLabel()
    renderedCards.push(
      <Animated.View
        key={key}
        style={firstCard ? swipableCardStyle : stackCardZoomStyle}
        {...this._panResponder.panHandlers}
      >
        {firstCard ? renderOverlayLabel : null}
        {stackCard}
      </Animated.View>,
    )
  }

  renderStack = () => {
    if (this.props.close) return null

    const { cards, firstCardIndex, swipedAllCards } = this.state
    const renderedCards = []
    let { stackSize, infinite, showSecondCard } = this.props
    let index = firstCardIndex
    let firstCard = true
    let cardPosition = 0

    while (
      stackSize-- > 0 &&
      (firstCard || showSecondCard) &&
      !swipedAllCards
    ) {
      const key = this.getCardKey(cards?.[index], index)
      this.pushCardToStack(renderedCards, index, cardPosition, key, firstCard)

      firstCard = false

      if (index === cards?.length - 1) {
        if (!infinite) break
        index = 0
      } else {
        index++
      }
      cardPosition++
    }
    return renderedCards
  }

  getCardIndex = () => this.state.firstCardIndex

  getCards = () => this.state.cards
  getCard = key => this.state.cards[key] ?? null

  pushCards = cards => {
    this.setState({
      cards: [...this.state.cards, ...cards],
      swipedAllCards: false,
    })
  }

  setCards = cards => {
    this.setState({
      cards: cards,
      firstCardIndex: 0,
      previousCardIndex: cards?.length - 1,
      secondCardIndex: cards?.length - 1 ? 0 : this.state.firstCardIndex + 1,
      swipeBackXYPositions: [],
      isSwipingBack: false,
      swipedAllCards: false,
    })

    this.initializeCardStyle()
    this.initializePanResponder()
    this.jumpToCardIndex(0)
  }

  setFavoritedDuid = duid => {
    this.setState(
      {
        favoritedDuid: duid,
      },
      () => {
        this.forceUpdate()
      },
    )
  }
}

export default Swiper
