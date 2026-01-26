/**
 * Copy files from home-gallery repo and generate CLI help outputs
 */
import fs from 'fs/promises'
import path from 'path'
import { spawn } from 'child_process'

const copy = [
  {src: 'gallery.config-example.yml', file: 'docs/docs/configuration/files/gallery.config-example.yml'},
  {src: 'CHANGELOG.md', file: 'docs/docs/changelog.md'},
]

const cliCommands = [
  { args: ['--help'], file: 'docs/docs/cli/files/help.out'},
  { args: ['run', '--help'], file: 'docs/docs/cli/files/run-help.out'},
  { args: ['run', 'init', '--help'], file: 'docs/docs/cli/files/run-init-help.out'},
  { args: ['run', 'import', '--help'], file: 'docs/docs/cli/files/run-import-help.out'},
  { args: ['run', 'server', '--help'], file: 'docs/docs/cli/files/run-server-help.out'},
  { args: ['export', 'static', '--help'], file: 'docs/docs/cli/files/export-static-help.out'},
  { args: ['export', 'meta', '--help'], file: 'docs/docs/cli/files/export-meta-help.out'},
  { args: ['fetch', '--help'], file: 'docs/docs/cli/files/fetch-help.out'},
  { args: ['database', 'remove', '--help'], file: 'docs/docs/cli/files/database-remove-help.out'},
  { args: ['storage', 'purge', '--help'], file: 'docs/docs/cli/files/storage-purge-help.out'},
  { args: ['cast', '--help'], file: 'docs/docs/cli/files/cast-help.out'},
  { args: ['plugin', '--help'], file: 'docs/docs/cli/files/plugin-help.out'},
  { args: ['plugin', 'ls', '--help'], file: 'docs/docs/cli/files/plugin-ls-help.out'},
  { args: ['plugin', 'create', '--help'], file: 'docs/docs/cli/files/plugin-create-help.out'},
]

updateCli()
  .then(() => console.log('Copied files successfully'))
  .catch(err => console.error(`Error updating CLI: ${err}`, err))

async function updateCli() {
  const workingDir = path.resolve('..', 'home-gallery')
  const cli = path.join(workingDir, 'gallery.js')

  for (const { src, file } of copy) {
    const srcPath = path.join(workingDir, src)
    const dstPath = path.resolve(file)
    await fs.copyFile(srcPath, dstPath)
    console.log(`Copied ${src} to ${file}`)
  }

  for (const { args, file } of cliCommands) {
    const result = await run(cli, args, { cwd: workingDir })
    const outPath = path.resolve(file)
    await fs.writeFile(outPath, result.output)
    console.log(`Wrote output of gallery.js ${args.join(' ')} to ${file}`)
  }
}

async function run(cli, args, options) {
  return new Promise((resolve, reject) => {
    const stdout = []
    const stderr = []
    
    const child = spawn('node', [cli, ...args], {
      stdio: 'pipe',
      cwd: options.cwd,
    })

    child.stdout.on('data', chunk => {
      stdout.push(chunk)
    })

    child.stderr.on('data', chunk => {
      stderr.push(chunk)
    })

    child.on('close', code => {
      const output = Buffer.concat(stdout).toString()
      const error = Buffer.concat(stderr).toString()
      if (code === 0) {
        resolve({ code, output, error })
      } else {
        const err = new Error(`Process exited with code ${code}`)
        err.code = code
        err.output = output
        err.error = error
        reject(err)
      }
    })
  })
}

