import { AnyObject, FormApi } from 'final-form'

export const isValuesEqual = <T extends AnyObject>(
  newValues: T,
  existingValues?: T,
  subscribedFields?: (keyof T)[]
) => {
  if (!existingValues) {
    return false
  }

  if (subscribedFields && subscribedFields.length > 0) {
    return subscribedFields.every(
      field => newValues[field] === existingValues[field]
    )
  }

  return Object.keys(newValues).every(
    key => newValues[key] === existingValues[key]
  )
}

interface Props<T extends AnyObject> {
  onFormValuesChange: (values: T) => void
  subscribedFields?: (keyof T)[]
}

let oldValues: AnyObject | undefined

const createAutoSaveDecorator = <T extends AnyObject>({
  onFormValuesChange,
  subscribedFields,
}: Props<T>) => {
  return (form: FormApi<T>) => {
    const unsubscribe = form.subscribe(
      ({ values: newValues }) => {
        if (!oldValues) {
          // to avoid calling onFormValuesChange on the first render with initial values
          oldValues = newValues
        } else if (
          !isValuesEqual(newValues, oldValues as T, subscribedFields)
        ) {
          onFormValuesChange(newValues)

          oldValues = newValues
        }
      },
      { values: true }
    )

    return () => {
      unsubscribe()
    }
  }
}

export default createAutoSaveDecorator
