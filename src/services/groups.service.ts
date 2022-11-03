import fs from 'fs'
import data from '../../lessions/data.json'

// const content = fs.readFileSync('./lessions/data.json').toString()
// const data = JSON.parse(content)

export const allGroups = () => {
    return data
}

export const groupLessions = (path: string) => {
    const group = data.find(group => group.path == path)
    return group?.lessions || []
}