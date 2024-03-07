import React, { useMemo, useState } from 'react'
import { useEffect } from 'react'
import { Platform, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { ChevronDown, X } from '~/ui/icons'
import { birthdayPickerStyles as styles } from '~/styles'
import noop from '~/utils/noop'

const months = [
  { label: 'Jan', value: 1 },
  { label: 'Feb', value: 2 },
  { label: 'Mar', value: 3 },
  { label: 'Apr', value: 4 },
  { label: 'May', value: 5 },
  { label: 'Jun', value: 6 },
  { label: 'Jul', value: 7 },
  { label: 'Aug', value: 8 },
  { label: 'Sep', value: 9 },
  { label: 'Oct', value: 10 },
  { label: 'Nov', value: 11 },
  { label: 'Dec', value: 12 },
]

const ArrowComponent = () => <ChevronDown style={styles.icon} />
const CloseComponent = () => <X style={styles.icon} />

const BirthdayPicker = ({ onChangeDate = noop }) => {
  const currDate = new Date()
  const [year, setYear] = useState(currDate.getFullYear() - 18)
  const [month, setMonth] = useState(currDate.getMonth() + 1)
  const [date, setDate] = useState(currDate.getDate())
  const [openMonth, setOpenMonth] = useState(false)
  const [openDate, setOpenDate] = useState(false)
  const [openYear, setOpenYear] = useState(false)

  const yearOptions = () => {
    const currYear = new Date().getFullYear()
    const start = currYear - 18
    const end = currYear - 100

    let yearArr = []
    for (let i = start; i >= end; i--) {
      yearArr.push({
        value: i,
        label: i,
      })
    }
    return yearArr
  }

  const dateOptions = useMemo(() => {
    let lastDate = 31

    if ([4, 6, 9, 11].includes(month)) {
      lastDate = 30
    } else if (month === 2) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        lastDate = 29
      } else {
        lastDate = 28
      }
    }
    return [...Array(lastDate)].map((_, i) => ({ label: i + 1, value: i + 1 }))
  }, [year, month])

  const onChangeMonth = _month => {
    let lastDate = 31

    if ([4, 6, 9, 11].includes(_month)) {
      lastDate = 30
    } else if (_month === 2) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        lastDate = 29
      } else {
        lastDate = 28
      }
    }

    if (date > lastDate) {
      setDate(lastDate)
    }
  }

  const onChangeYear = _year => {
    let lastDate = 31

    if ([4, 6, 9, 11].includes(month)) {
      lastDate = 30
    } else if (month === 2) {
      if ((_year % 4 === 0 && _year % 100 !== 0) || _year % 400 === 0) {
        lastDate = 29
      } else {
        lastDate = 28
      }
    }

    if (date > lastDate) {
      setDate(lastDate)
    }
  }

  useEffect(() => {
    const birthday = `${year}-${String(month).padStart(2, '0')}-${String(
      date,
    ).padStart(2, '0')}`
    onChangeDate(birthday)
  }, [year, month, date, onChangeDate])

  return (
    <View style={[styles.container, Platform.OS === 'ios' && styles.zIndex1]}>
      <DropDownPicker
        open={openMonth}
        value={month}
        items={months}
        setOpen={setOpenMonth}
        setValue={setMonth}
        loading
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        style={styles.dropdown}
        containerStyle={{ maxWidth: 100 }}
        labelStyle={styles.label}
        arrowIconStyle={{ fill: styles.listItem.color }}
        tickIconStyle={{
          tintColor: styles.listItem.color,
        }}
        listItemLabelStyle={styles.listItem}
        listItemContainerStyle={styles.listItemContainer}
        itemSeparator
        itemSeparatorStyle={styles.separator}
        searchContainerStyle={styles.searchContainer}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        placeholderStyle={styles.placeholder}
        ArrowUpIconComponent={ArrowComponent}
        ArrowDownIconComponent={ArrowComponent}
        CloseIconComponent={CloseComponent}
        onChangeValue={onChangeMonth}
      />

      <DropDownPicker
        open={openDate}
        value={date}
        items={dateOptions}
        setOpen={setOpenDate}
        setValue={setDate}
        loading
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        style={styles.dropdown}
        containerStyle={{ maxWidth: 100 }}
        labelStyle={styles.label}
        arrowIconStyle={{ fill: styles.listItem.color }}
        tickIconStyle={{
          tintColor: styles.listItem.color,
        }}
        listItemLabelStyle={styles.listItem}
        listItemContainerStyle={styles.listItemContainer}
        itemSeparator
        itemSeparatorStyle={styles.separator}
        searchContainerStyle={styles.searchContainer}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        placeholderStyle={styles.placeholder}
        ArrowUpIconComponent={ArrowComponent}
        ArrowDownIconComponent={ArrowComponent}
        CloseIconComponent={CloseComponent}
      />

      <DropDownPicker
        open={openYear}
        value={year}
        items={yearOptions()}
        setOpen={setOpenYear}
        setValue={setYear}
        loading
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        style={styles.dropdown}
        containerStyle={{ maxWidth: 120 }}
        labelStyle={styles.label}
        arrowIconStyle={{ fill: styles.listItem.color }}
        tickIconStyle={{
          tintColor: styles.listItem.color,
        }}
        listItemLabelStyle={styles.listItem}
        listItemContainerStyle={styles.listItemContainer}
        itemSeparator
        itemSeparatorStyle={styles.separator}
        searchContainerStyle={styles.searchContainer}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        placeholderStyle={styles.placeholder}
        ArrowUpIconComponent={ArrowComponent}
        ArrowDownIconComponent={ArrowComponent}
        CloseIconComponent={CloseComponent}
        onChangeValue={onChangeYear}
      />
    </View>
  )
}

export default BirthdayPicker
