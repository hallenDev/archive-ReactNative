import React, { useState, useEffect } from 'react'
import { Image, View } from 'react-native'
import { LinearGradient } from '~/ui'
import { colors } from '~/ui/theme'
import emojiBeaming from '~/assets/images/qs/emojiBeaming.png'
import emojiDisappointed from '~/assets/images/qs/emojiDisappointed.png'
import emojiExpressionless from '~/assets/images/qs/emojiExpressionless.png'
import emojiSmiling from '~/assets/images/qs/emojiSmiling.png'
import emojiSmirking from '~/assets/images/qs/emojiSmirking.png'
import emojiUnamused from '~/assets/images/qs/emojiUnamused.png'
import emojiWeary from '~/assets/images/qs/emojiWeary.png'
import { qualityBarStyles as styles } from '~/styles'

const QualityScoreProgress = ({ userScore }) => {
  const score = userScore ? (userScore < 7 ? 7 : userScore) : 0
  const [emoji, setEmoji] = useState(emojiWeary)

  useEffect(() => {
    switch (true) {
      case score <= 7:
        setEmoji(emojiWeary)
        break
      case score >= 8 && score <= 20:
        setEmoji(emojiDisappointed)
        break
      case score >= 21 && score <= 40:
        setEmoji(emojiUnamused)
        break
      case score >= 41 && score <= 60:
        setEmoji(emojiExpressionless)
        break
      case score >= 61 && score <= 80:
        setEmoji(emojiSmirking)
        break
      case score >= 81 && score <= 99:
        setEmoji(emojiBeaming)
        break
      case score === 100:
        setEmoji(emojiSmiling)
        break
    }
  }, [score])

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.meterWrap}
        colors={colors.qualityScoreGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.meterMiddleWrap}>
          <View style={styles.meterInnerWrap}>
            <LinearGradient
              style={[styles.qualityProgress, { width: `${score}%` }]}
              colors={colors.qualityProgressGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />

            {score > 60 && (
              <View style={[styles.emojiWrap, { width: `${score}%` }]}>
                <Image source={emoji} style={[styles.emojiImg]} />
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

export default QualityScoreProgress
