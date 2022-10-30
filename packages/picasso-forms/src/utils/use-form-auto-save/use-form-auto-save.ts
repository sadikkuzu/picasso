import { AnyObject } from 'final-form'
import { useCallback, useMemo, useState } from 'react'
import { debounce } from 'debounce'

import createAutoSaveDecorator from '../auto-save-decorator'

interface Props<T extends AnyObject> {
  subscripedFields?: (keyof T)[]
  onFormValuesChange: (values: T) => void
  debounceDelay?: number
}

const useFormAutoSave = <T extends AnyObject>(props: Props<T>) => {
  const [saving, setSaving] = useState(false)

  const {
    onFormValuesChange,
    subscripedFields,
    debounceDelay: delay = 1000,
  } = props

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleValueChange = useCallback(
    debounce(async (debouncedValues: T) => {
      await onFormValuesChange(debouncedValues)

      setSaving(false)
    }, delay),
    [delay, onFormValuesChange]
  )

  const handleFormValuesChange = useCallback(
    (values: T) => {
      setSaving(true)

      handleValueChange(values)
    },
    [handleValueChange]
  )

  const autoSaveDecorator = useMemo(
    () =>
      createAutoSaveDecorator({
        subscribedFields: subscripedFields,
        onFormValuesChange: handleFormValuesChange,
      }),
    [handleFormValuesChange, subscripedFields]
  )

  return {
    saving,
    autoSaveDecorator,
  }
}

export default useFormAutoSave
