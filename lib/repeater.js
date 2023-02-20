let memoary = ""
let count = 0
function repeat(data) {
    if (JSON.stringify(data.message) === memoary) {
        count++
        if (count === 2) {
            data.reply(data.message)
        }
    } else {
        count = 0
    }
    memoary = JSON.stringify(data.message)
}
module.exports = { repeat }