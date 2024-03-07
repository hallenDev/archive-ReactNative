import React, { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { useQuery } from 'react-query'
import { getQuestions } from '~/shared/api'
import DropdownList from '~/ui/DropdownList'
import noop from '~/utils/noop'
import { dropdownStyles as styles } from '~/styles'

const QuestionsList = ({
  questionId,
  isReset = false,
  containerStyle,
  onChangeQuestion = noop,
  isUseFirstQuestionId = false,
  disable = false,
  dropdownPosition,
}) => {
  const [value, setValue] = useState(questionId)

  const { data } = useQuery('getQuestions', getQuestions)

  const questionsLists = useMemo(
    () =>
      data?.questions?.map(({ id: value, question: label }) => ({
        value,
        label,
      })),
    [data?.questions],
  )

  const onChange = useCallback(
    data => {
      setValue(data.value)
      if (data.value !== null) {
        onChangeQuestion(data.value)
        if (isReset) {
          setTimeout(() => setValue(null), 500)
        }
      }
    },
    [onChangeQuestion, isReset],
  )

  useEffect(() => {
    if (isUseFirstQuestionId && !!questionsLists?.length) {
      onChange(questionsLists[0])
    }
  }, [isUseFirstQuestionId, questionsLists, onChange])

  return (
    <DropdownList
      value={value}
      onChange={onChange}
      dataList={questionsLists}
      mainStyle={styles.dropdown}
      containerStyle={containerStyle}
      placeholder="Pick a question"
      disable={disable}
      dropdownPosition={dropdownPosition}
    />
  )
}

export default memo(QuestionsList)
