import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'

const useStyles = makeStyles(styles, {
  name: 'PicassoQuoteMark',
})

export const QuoteMark = () => {
  const classes = useStyles()

  return (
    <svg className={classes.root} width='30' height='24' viewBox='0 0 30 24'>
      <path
        d='M0 16.32C0 21.24 2.963 24 6.296 24c2.963 0 5.185-2.4 5.185-5.16 0-2.88-2.098-5.04-4.938-5.04-.37 0-1.234.12-1.358.24.247-3.84 3.334-8.52 7.284-11.16L8.765 0C4.075 3.36 0 9.6 0 16.32zm17.53 0c0 4.92 2.84 7.68 6.174 7.68 3.086 0 5.308-2.4 5.308-5.16 0-2.88-2.098-5.04-4.938-5.04-.494 0-1.234.12-1.358.24.247-3.84 3.333-8.52 7.284-11.16L26.296 0c-4.815 3.36-8.765 9.6-8.765 16.32z'
        fillRule='evenodd'
      />
    </svg>
  )
}

QuoteMark.displayName = 'QuoteMark'

export default QuoteMark
