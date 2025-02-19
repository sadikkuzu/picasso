import React, { useState } from 'react'
import { Tag, Container, Typography, Settings16 } from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

const Example = () => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <Container flex gap='small'>
      <Container flex direction='column' gap='xsmall'>
        <Typography>Regular</Typography>
        <div>
          <Tag.Checkable
            icon={<Settings16 />}
            checked={checked}
            onChange={() => {
              setChecked(!checked)
            }}
          >
            Label
          </Tag.Checkable>
        </div>
      </Container>
      <Container flex direction='column' gap='xsmall'>
        <Typography>Hovered</Typography>
        <div>
          <Tag.Checkable icon={<Settings16 />} hovered onChange={noop}>
            Label
          </Tag.Checkable>
        </div>
      </Container>
      <Container flex direction='column' gap='xsmall'>
        <Typography>Checked</Typography>
        <div>
          <Tag.Checkable icon={<Settings16 />} checked onChange={noop}>
            Label
          </Tag.Checkable>
        </div>
      </Container>
      <Container flex direction='column' gap='xsmall'>
        <Typography>Hovered on Selected</Typography>
        <div>
          <Tag.Checkable icon={<Settings16 />} hovered checked onChange={noop}>
            Label
          </Tag.Checkable>
        </div>
      </Container>
      <Container flex direction='column' gap='xsmall'>
        <Typography>Disabled</Typography>
        <div>
          <Tag.Checkable
            icon={<Settings16 />}
            hovered
            checked
            disabled
            onChange={noop}
          >
            Label
          </Tag.Checkable>
        </div>
      </Container>
    </Container>
  )
}

export default Example
