const util = require('util')
const exec = util.promisify(require('child_process').exec)

module.exports.getRepos = async () => {
    const { stdout } = await exec('titan ls')
    const data = stdout.split('\n')
    data.shift()
    data.pop()

    return data.map(x => x.split(/[ ]+/)).map(x => {
        return { name: x[1], status: x[2] }
    })
}

module.exports.getCommits = async (answers) => {
    const { stdout } = await exec(`titan log ${answers.repo}`)
    const commits = stdout.split('commit ').map(x => x.split('\n'))
    commits.shift()

    return commits.map(x => {
        const ret = {
            'hash': x.shift()
        }

        do {
            message = x.pop()
        } while (
            message === undefined ||
            (message.length === 0 && x.length >= 1)
        )

        ret['message'] = message

        for (i = 0; i < x.length; i++) {
            let item = x[i]
            if (item.length > 0) {
                let split = item.split(': ')
                ret[split[0].toLowerCase()] = split[1]
            }
        }

        return ret
    })
}

module.exports.checkoutCommit = async (answers) => {
    const { stdout } = await exec(`titan checkout -c ${answers.commit} ${answers.repo}`)
    return stdout
}

module.exports.createCommit = async (answers) => {
    const { stdout } = await exec(`titan commit -m "${answers.commit_message}" ${answers.repo}`)
    return stdout
}

module.exports.deleteCommit = async (answers) => {
    const { stdout } = await exec(`titan delete -c ${answers.commit} ${answers.repo}`)
    return stdout
}
