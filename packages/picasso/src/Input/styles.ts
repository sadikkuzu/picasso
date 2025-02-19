import { Theme, createStyles } from '@material-ui/core/styles'

import '../InputBase/styles'
import '../InputLabel/styles'
import '../OutlinedInput/styles'
import '../InputAdornment/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      fontSize: '1rem',
      backgroundColor: palette.common.white,
      cursor: 'text',
    },
    rootMultiline: {
      height: 'auto',
    },
    rootMultilineLimiter: {
      minHeight: '3.75rem',
      paddingBottom: '1.875rem',
    },
    inputMultilineResizable: {
      resize: 'vertical',
    },
  })
