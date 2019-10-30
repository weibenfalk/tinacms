/**

Copyright 2019 Forestry.io Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import React from 'react'
import App from 'next/app'
import { Tina, TinaCMS } from 'tinacms'
import { GitClient } from '@tinacms/git-client'

class MyApp extends App {

  constructor() {
    super()
    this.cms = new TinaCMS()
    this.cms.registerApi('git', new GitClient('http://localhost:3001/___tina'))
  }

  render() {
    const { Component, pageProps } = this.props
    
    return (
      <Tina position="displace" cms={this.cms}>
        <Component {...pageProps} />
      </Tina>
    )
  }
}

export default MyApp