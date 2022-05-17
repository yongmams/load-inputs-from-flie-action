import { readFileSync, existsSync } from 'fs'
import * as  core from '@actions/core';

try {
    const filePath = core.getInput('file-path')?.trim();

    let payload: { [key: string]: any };

    if (filePath) {
        if (existsSync(filePath)) {
            payload = JSON.parse(
                readFileSync(filePath, { encoding: 'utf8' })
            )

            Object.keys(payload).forEach(key => {
                process.env[`INPUT_${key.replace(/ /g, '_').toUpperCase()}`] = payload[key] || '';
            });
        } else {
            const path = filePath
            process.stdout.write(`${path} does not exist.`)
        }
    }
} catch (error: any) {
    core.setFailed(error.message as string);
}