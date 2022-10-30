import React, { useCallback, useState } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Form, useFormAutoSave } from '@toptal/picasso-forms'

const autoSaveSubscribedFields = ['autoSave-firstName']

// the emulation of the api call
const saveWithDelay = async () =>
  new Promise(resolve => setTimeout(() => resolve('success'), 2000))

const Example = () => {
  const [savedValues, setSavedValues] = useState({
    'autoSave-firstName': undefined,
    'autoSave-lastName': undefined,
    'autoSave-age': undefined,
  })

  const handleFormValuesChange = useCallback(async (values: any) => {
    await saveWithDelay()

    setSavedValues(values)
  }, [])

  const { autoSaveDecorator, saving } = useFormAutoSave({
    subscripedFields: autoSaveSubscribedFields,
    onFormValuesChange: handleFormValuesChange,
  })

  return (
    <Form
      onSubmit={values => window.alert(JSON.stringify(values, undefined, 2))}
      decorators={[autoSaveDecorator]}
    >
      <Container flex direction='row' gap='medium'>
        <Container>
          <Form.Input
            required
            name='autoSave-firstName'
            label='First name'
            placeholder='e.g. Bruce'
          />
          <Form.Input
            required
            name='autoSave-lastName'
            label='Last name'
            placeholder='e.g. Wayne'
          />
          <Form.NumberInput
            enableReset
            required
            name='autoSave-age'
            label="What's your age?"
            placeholder='e.g. 25'
          />
          {saving && <Typography align='right'>Saving</Typography>}
        </Container>
        <Container variant='grey' padded='medium' rounded>
          <Typography>Auto-saved values:</Typography>
          <pre style={{ width: 500 }}>
            {JSON.stringify(savedValues, undefined, 2)}
          </pre>
        </Container>
      </Container>

      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default Example
