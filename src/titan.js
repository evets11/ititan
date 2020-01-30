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

module.exports.listCommits = async (repo) => {
    const { stdout } = await exec(`titan log ${repo}`)
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

module.exports.checkout = async (repo, commit) => {
    const { stdout } = await exec(`titan checkout -c ${commit} ${repo}`)
    return stdout
}
