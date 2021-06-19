/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

// https://github.com/traPtitech/booQ-UI/blob/master/scripts/generate-apis.js

const fs = require('fs').promises
const path = require('path')
const { exec } = require('child_process')
const { promisify } = require('util')
const execPromise = promisify(exec)
const addApis = require('./add-apis')

const SWAGGER_PATH =
  'https://raw.githubusercontent.com/hackathon-21-spring-02/back-end/main/docs/swagger/swagger.yaml' // TODO: cname ついたら変える
const GENERATED_DIR = 'src/lib/apis/generated'

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'

const generateCmd = [
  npx,
  'openapi-generator-cli',
  'generate',
  '-g',
  'typescript-axios',
  '-i',
  SWAGGER_PATH,
  '-o',
  GENERATED_DIR,
]

;(async () => {
  await fs.mkdir(path.resolve(__dirname, '../', GENERATED_DIR), {
    recursive: true,
  })

  await execPromise(generateCmd.join(' '))

  // generate Apis class
  await addApis(GENERATED_DIR)
})()
