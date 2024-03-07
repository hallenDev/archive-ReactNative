import React from 'react'
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native'
import UserCredit from '~/components/UserCredit/UserCredit'
import noop from '~/utils/noop'
import SvgChevronRight from '~/ui/icons/ChevronRight'
import { typography, colors, text } from '~/ui/theme'

export const MyAccountMenu = ({ menu = [], withCreditBtn = false }) => {
  return (
    <>
      {withCreditBtn && (
        <View style={[styles.container, styles.isFirst]}>
          <UserCredit />
        </View>
      )}
      {menu.map(item => (
        <MyAccountMenuItem
          key={item.title}
          RightComponent={RightArrow}
          color={colors.textMain}
          {...item}
        />
      ))}
    </>
  )
}

export const MyAccountWarningMenu = ({ menu = [] }) => {
  return menu.map((item, index) => (
    <MyAccountMenuItem
      key={item.title}
      isFirst={!index}
      color="#FE037B"
      iconColor="#FE037B"
      {...item}
    />
  ))
}

const MyAccountMenuItem = ({
  Icon,
  title,
  description,
  onPress = noop,
  isFirst = false,
  color = null,
  iconColor = null,
  RightComponent,
}) => {
  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor="transparent"
      onPress={onPress}
    >
      <>
        <View style={styles.left}>
          <Icon width="22" height="22" color={iconColor ?? '#737B8C'} />
        </View>
        <View style={styles.content}>
          <Text style={[styles.title, color && { color }]}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        {RightComponent && <RightComponent />}
      </>
    </TouchableHighlight>
  )
}

const RightArrow = () => (
  <View style={styles.right}>
    <SvgChevronRight width="24" height="24" color="#737B8C" />
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
  },
  isFirst: {
    borderTopWidth: 0,
  },
  left: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: 'center',
  },
  right: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 18,
    color: '#1F292E',
    fontFamily: text.semiBold.fontFamily,
    fontWeight: '600',
  },
  description: {
    marginTop: 2,
    color: colors.textSub,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: text.regular.fontFamily,
  },
  membership: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleMembership: {
    ...typography.bodyBold16,
    color: colors.pureBlack,
  },
  descriptionMembership: {
    ...typography.bodyRegular12,
    color: colors.pureBlack,

    marginTop: 4,
  },
})

export default MyAccountMenu
