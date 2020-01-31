const util = require('util')
const exec = util.promisify(require('child_process').exec)

module.exports.listRepos = async () => {
    const { stdout } = await exec('titan ls')
    const data = stdout.split('\n')
    data.shift()
    data.pop()

    return data.map(x => x.split(/[ ]+/)).map(x => {
        return { name: `${x[1]} (${x[2]})`, value: x[1] }
    })
}

module.exports.listCommits = async (answers) => {
    const { stdout } = await exec(`titan log ${answers.repo}`)
    const commits = stdout.split('commit ').map(x => x.split('\n'))
    commits.shift()

    return commits.map(x => {
        do {
            message = x.pop()
        } while (
            message === undefined ||
            (message.length === 0 && x.length >= 1)
        )

        if (message.length > 0) {
            return { name: message, value: x[0] }
        }
    })
}

module.exports.checkoutCommit = async (answers) => {
    const { stdout } = await exec(`titan checkout -c ${answers.commit} ${answers.repo}`)
    return stdout
}

module.exports.createCommit = async (answers) => {
    const { stdout } = await exec(`titan commit -m ${answers.commit_message} ${answers.repo}`)
    return stdout
}

module.exports.deleteCommit = async (answers) => {
    const { stdout } = await exec(`titan delete -c ${answers.commit} ${answers.repo}`)
    return stdout
}
