import * as fs from 'fs'
import * as path from 'path'
import * as  core from '@actions/core';

async function run(): Promise<void> {
    try {
        const searchPath = core.getInput('file-path', { required: true }).trim();

        if (process.env.GITHUB_WORKSPACE) {
            const file = path.join(process.env.GITHUB_WORKSPACE, searchPath);
            loadInputsFormFile(file);
        }

    } catch (error: any) {
        core.setFailed(error.message as string);
    }
}


function loadInputsFormFile(searchResult: string) {

    if (fs.existsSync(searchResult)) {
        core.info(`load inptus form file ${searchResult}`);
        const payload = JSON.parse(
            fs.readFileSync(searchResult, { encoding: 'utf8' })
        )

        Object.keys(payload).forEach(key => {
            process.env[`INPUT_${key.replace(/ /g, '_').toUpperCase()}`] = payload[key] || '';
        });
    } else {
        core.warning(`the file ${searchResult} not exist.`);
    }
}

run();