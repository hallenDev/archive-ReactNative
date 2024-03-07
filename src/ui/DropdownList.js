import React from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { ChevronDown } from '~/ui/icons'
import noop from '~/utils/noop'
import { colors } from '~/ui/theme'
import { dropdownListStyles as styles } from '~/styles'

const ArrowComponent = () => <ChevronDown style={styles.icon} />

const DropdownList = ({
  value,
  placeholder,
  containerStyle,
  mainStyle,
  onChange = noop,
  dataList = [],
  disable = false,
  dropdownPosition = 'bottom',
}) => (
  <Dropdown
    style={[styles.dropdown, mainStyle]}
    placeholderStyle={styles.placeholder}
    selectedTextStyle={styles.label}
    selectedTextProps={{ numberOfLines: 1 }}
    containerStyle={[
      styles.dropDownContainerStyle,
      containerStyle && {
        marginHorizontal: containerStyle.paddingHorizontal,
      },
      dropdownPosition === 'top' && styles.dropDownTopContainerStyle,
    ]}
    itemContainerStyle={styles.listItemContainer}
    itemTextStyle={styles.listItem}
    iconStyle={styles.icon}
    data={dataList}
    maxHeight={200}
    activeColor={colors.semiBlack25}
    autoScroll={false}
    labelField="label"
    valueField="value"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    renderRightIcon={ArrowComponent}
    showsVerticalScrollIndicator={false}
    disable={disable}
    dropdownPosition={dropdownPosition}
  />
)

export default DropdownList
