import React, { useMemo, ReactNode, useRef } from 'react'
import {
  Form as FinalForm,
  FormProps as FinalFormProps,
} from 'react-final-form'
import {
  FormApi,
  SubmissionErrors,
  getIn,
  setIn,
  AnyObject,
  MutableState,
} from 'final-form'
import { useNotifications } from '@toptal/picasso/utils'

import { createScrollToErrorDecorator } from '../utils'
import {
  FormContext,
  Validators,
  FormContextProps,
  createFormContext,
} from './FormContext'
import FormRenderer from './FormRenderer'

const setActiveFieldTouched = <
  FormValues = object,
  InitialFormValues = Partial<FormValues>
>(
  _: any[],
  state: MutableState<FormValues, InitialFormValues>
) => {
  const activeFieldName = state.formState.active

  if (activeFieldName) {
    const field = state.fields[activeFieldName]

    field.touched = true
  }
}

export type Props<T = AnyObject> = FinalFormProps<T> & {
  disableScrollOnError?: boolean
  autoComplete?: HTMLFormElement['autocomplete']
  successSubmitMessage?: ReactNode
  failedSubmitMessage?: ReactNode
  scrollOffsetTop?: number
  'data-testid'?: string
}

const getValidationErrors = (
  validators: Validators,
  formValues: any,
  form: FormApi<any>
): SubmissionErrors | void => {
  let errors: SubmissionErrors

  Object.entries(validators).forEach(([key, validator]) => {
    const fieldValue = getIn(formValues, key)
    const fieldMetaState = form.getFieldState(key)

    if (!validator) {
      return
    }

    const error = validator(fieldValue, formValues, fieldMetaState)

    if (error) {
      errors = setIn(errors || {}, key, error)
    }
  })

  return errors
}

export const Form = <T extends AnyObject = AnyObject>(props: Props<T>) => {
  const {
    autoComplete,
    children,
    disableScrollOnError,
    onSubmit,
    successSubmitMessage,
    failedSubmitMessage,
    decorators = [],
    mutators = {},
    validateOnBlur,
    'data-testid': dataTestId,
    ...rest
  } = props
  const { showSuccess, showError } = useNotifications()
  const scrollToErrorDecorator = useMemo(
    () =>
      createScrollToErrorDecorator({
        disableScrollOnError,
      }),
    [disableScrollOnError]
  )

  const validationObject = useRef<FormContextProps>(createFormContext())

  const showSuccessNotification = () => {
    if (!successSubmitMessage) {
      return
    }

    showSuccess(successSubmitMessage)
  }

  const showErrorNotification = (errors: SubmissionErrors) => {
    if (typeof errors === 'string') {
      showError(errors, undefined, { persist: true })

      return
    }

    if (!failedSubmitMessage) {
      return
    }

    showError(failedSubmitMessage, undefined, { persist: true })
  }

  const handleSubmit = async (
    values: T,
    form: FormApi<T>,
    callback?: (errors?: SubmissionErrors) => void
  ) => {
    const validationErrors = getValidationErrors(
      validationObject.current.getValidators(),
      values,
      form
    )

    if (validationErrors) {
      return validationErrors
    }

    const submissionErrors = await onSubmit(values, form, callback)

    if (!submissionErrors) {
      showSuccessNotification()
    } else {
      showErrorNotification(submissionErrors)
    }

    return submissionErrors
  }

  return (
    <FormContext.Provider value={validationObject}>
      <FinalForm
        render={({ form, handleSubmit: handleFormRendererSubmit }) => (
          <FormRenderer
            autoComplete={autoComplete}
            data-testid={dataTestId}
            onSubmit={handleFormRendererSubmit}
            validateOnBlur={validateOnBlur}
            setActiveFieldTouched={form.mutators.setActiveFieldTouched}
          >
            {children}
          </FormRenderer>
        )}
        onSubmit={handleSubmit}
        decorators={[...decorators, scrollToErrorDecorator]}
        mutators={{
          ...mutators,
          setActiveFieldTouched,
        }}
        validateOnBlur={validateOnBlur}
        {...rest}
      />
    </FormContext.Provider>
  )
}

Form.defaultProps = {}

Form.displayName = 'Form'

export default Form
