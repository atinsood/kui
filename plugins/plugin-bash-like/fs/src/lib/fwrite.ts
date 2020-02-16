/*
 * Copyright 2020 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { writeFile } from 'fs'

import { Arguments, Registrar, CodedError } from '@kui-shell/core'

/**
 * Kui command for fs.write
 *
 */
const fwrite = ({ argvNoOptions, execOptions }: Arguments) => {
  return new Promise<boolean>((resolve, reject) => {
    const fullpath = argvNoOptions[1]
    const data = execOptions.data

    writeFile(fullpath, data, err => {
      if (err) {
        if (err.code === 'ENOENT') {
          const error: CodedError = new Error(err.message)
          error.stack = err.stack
          error.code = 404
          reject(error)
        } else {
          reject(err)
        }
      } else {
        resolve(true)
      }
    })
  })
}

/**
 * Register command handlers
 *
 */
export default (registrar: Registrar) => {
  registrar.listen('/fwrite', fwrite, {
    hidden: true,
    requiresLocal: true
  })
}
