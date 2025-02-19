import { Classes } from '@toptal/picasso-shared'
import Quill from 'quill'

import getTypographyClassName from '../../Typography/utils/get-typography-class-name'

const QuillBold = Quill.import('formats/bold')

const makeBoldFormat = (typographyClasses: Classes) =>
  class LinkBlot extends QuillBold {
    static create(value: string) {
      const node = super.create(value)

      node.classList.add(
        ...getTypographyClassName(typographyClasses, {
          variant: 'body',
          size: 'inherit',
          weight: 'semibold',
        }).split(' ')
      )

      return node
    }
  }

export default makeBoldFormat
