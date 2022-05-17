import * as fs from 'fs'
import * as  core from '@actions/core';
import * as  glob from '@actions/glob';

async function run(): Promise<void> {
    try {
        const searchPath = core.getInput('file-path', { required: true }).trim();
        core.info(`search inputs file form ${searchPath}`);

        const globber = await glob.create(
            searchPath,
            getDefaultGlobOptions()
        )
        const rawSearchResults: string[] = await globber.glob();

        for (const searchResult of rawSearchResults) {
            const fileStats = await fs.promises.stat(searchResult)
            
            core.info(`loading inputs form ${searchResult}`);

            if (!fileStats.isDirectory()) {
                loadInputsFormFile(searchResult);
            }
        }
    } catch (error: any) {
        core.setFailed(error.message as string);
    }
}


function loadInputsFormFile(searchResult: string) {

    const payload = JSON.parse(
        fs.readFileSync(searchResult, { encoding: 'utf8' })
    )

    Object.keys(payload).forEach(key => {
        process.env[`INPUT_${key.replace(/ /g, '_').toUpperCase()}`] = payload[key] || '';
    });
}

function getDefaultGlobOptions(): glob.GlobOptions {
    return {
        followSymbolicLinks: true,
        implicitDescendants: true,
        omitBrokenSymbolicLinks: true
    }
}

run();