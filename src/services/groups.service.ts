import fs from 'fs'
import { Group, Lesson } from '@models/group'

const basePath = "./lessions"

const groups = loadGroups()

export const allGroups = () => {
    return groups
}

export const findGroup = (code: string) => {
    return groups.find(group => group.code == code)
}

// ----------------------------------------------- //

function loadGroups() {
    const groups: Group[] = []
    const dirs = fs.readdirSync(basePath)

    for(let dir of dirs) {
        const path = `${basePath}/${dir}`
        const infoPath = `${path}/group-info.json`

        if (fs.existsSync(infoPath)) {

            const info = loadJson(infoPath)

            groups.push({
                name: info.name,
                code: info.code,
                path,
                lessons: loadLessions(path),
                lesson(number: number) {
                    return this.lessons.find(lesson => lesson.number == number)
                }
            })
        }
    }
    return groups
}

function loadLessions(path: string): Lesson[] {
    const lessons: Lesson[] = []

    const dirs = fs.readdirSync(path)

    for(let dir of dirs) {
        const lessonPath = `${path}/${dir}`
        const infoPath = `${lessonPath}/lesson-info.json`
        const materialPath = `${lessonPath}/materials.md`

        if (fs.existsSync(infoPath)) {

            const info = loadJson(infoPath)
            
            const filesList = loadFiles(`${lessonPath}/files`)

            lessons.push({
                number: info.number,
                theme: info.theme,
                date: info.date,
                description: info.description,
                tags: info.tags,
                materials: materialPath,
                path: lessonPath,
                files: filesList
            })
        }
    }

    return lessons.sort((a, b) => a.number - b.number)
}

function loadJson(path: string) {
    const fileContent = fs.readFileSync(path).toString() 
    const info = JSON.parse(fileContent)
    return info
}


function loadFiles(path: string) {
    console.log(path + " : " + fs.existsSync(path));
    
    if (fs.existsSync(path)) {
        console.log(path + " : " + fs.readdirSync(path));
        return fs.readdirSync(path)
    }
    return []
}