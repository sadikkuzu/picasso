import Quill, { RangeStatic, Sources, DeltaStatic } from 'quill'

import { FormatType } from '../../types'

type SelectionChangeArgs = [RangeStatic, RangeStatic, Sources]
type TextChangeArgs = [DeltaStatic, DeltaStatic, Sources]

/**
 * When we write block format and enter new empty line, we have unformated text format.
 * We need to send this information to the state
 */
const handleNewLineAfterBlock = ({
  quill,
  onSelectionChange,
  latestDelta,
}: {
  quill: Quill
  onSelectionChange: (format: FormatType) => void
  latestDelta: DeltaStatic
}) => {
  const latestAttributes =
    latestDelta.ops?.[latestDelta.ops.length - 1]?.attributes

  const isHeaderFormatRemoved = latestAttributes?.header === null
  const isListFormatRemoved = latestAttributes?.list === null

  if (isHeaderFormatRemoved || isListFormatRemoved) {
    const format = quill.getFormat() as FormatType

    onSelectionChange({ ...format, header: undefined, list: undefined })
  }
}

const isDeleteOperationOfSelection = (delta: DeltaStatic) => {
  const delOperation = delta.ops?.[0].delete

  return delOperation && delOperation > 1
}

const getEditorChangeHandler = (
  quill: Quill,
  onSelectionChange: (format: FormatType) => void
) => {
  const handler = (
    name: 'text-change' | 'selection-change',
    ...args: SelectionChangeArgs | TextChangeArgs
  ) => {
    if (name === 'text-change') {
      const [latestDelta, , source] = args as TextChangeArgs

      const isFromApi = source === 'api'
      const isFromUser = source === 'user'

      if (isFromApi) {
        // this event is triggered when format of block element is changed
        // for example from p > h3 | h3 > ol
        onSelectionChange(quill.getFormat() as FormatType)
      } else if (isFromUser) {
        handleNewLineAfterBlock({ latestDelta, quill, onSelectionChange })

        if (isDeleteOperationOfSelection(latestDelta)) {
          onSelectionChange(quill.getFormat() as FormatType)
        }
      }
    }
  }

  return handler
}

export default getEditorChangeHandler
