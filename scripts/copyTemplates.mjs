import fs from "fs-extra"
import path from "node:path"
import { fileURLToPath } from "node:url"

const _dirname = path.dirname(fileURLToPath(import.meta.url))

const templatePath = path.resolve(_dirname, "../src/templates")
const destinationPath = path.resolve(_dirname, "../dist/templates")

fs.removeSync(destinationPath)
fs.copySync(templatePath, destinationPath);