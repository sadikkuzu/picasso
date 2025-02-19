import React, { ReactNode } from 'react'
import {
  PicassoLight,
  FixViewport,
  FontsLoader,
} from '@toptal/picasso-provider'
import { Page, Container } from '@toptal/picasso'

const App = ({ children }: { children: ReactNode }) => (
  <PicassoLight>
    <FixViewport />
    <FontsLoader />
    <Page>
      <Page.TopBar title='Picasso with viewport fixing utility and fonts loaded' />
      <Page.Content>
        <Page.Article>
          <Container top={7} bottom={7} flex justifyContent='center'>
            {children}
          </Container>
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </PicassoLight>
)

const Index = () => (
  <div id='root'>
    <App>Your app with a fixed viewport tag and fonts loaded</App>
  </div>
)

export default Index
