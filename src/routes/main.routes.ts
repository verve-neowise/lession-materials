import { Router } from 'express';
import { allGroups, findGroup } from '../services/groups.service'

import fs from 'fs'

const router = Router()

router.get('/', (req, res) => {
    const groups = allGroups()
    const code = groups[0] ? groups[0].code : 'empty'
    res.redirect('/' + code)
})

router.get('/:code', (req, res) => {
    const groups = allGroups()
    const code = req.params.code
    
    const group = groups.find(group => group.code == code)

    console.dir(group)

    res.render('lessions', {
        groups,
        name: group?.name,
        code: group?.code,
        lessions: group?.lessons ?? [],
    })
})

router.get('/:code/:number', (req, res) => {

    const { code, number } = req.params

    try {
        const { group, lesson } = getGroupAndLesson(code, number)

        console.log(lesson.files);

        res.render('material', {
            code: group.code,
            group: group.name,
            number: lesson.number,
            theme: lesson.theme,
            description: lesson.description,
            date: lesson.date,
            files: lesson.files,
            materials: lesson.materials
        })
    } 
    catch (error: any) {
        res.render('error', {
            message: error
        })
    }
})

router.get('/:code/:number/material', (req, res) => {
    const { code, number } = req.params

    try {
        const { group, lesson } = getGroupAndLesson(code, number)

        if (fs.existsSync(lesson.materials)) {
            res.sendFile(lesson.materials, {
                root: './'
            })
        }
        else {
            res.send('(empty)')
        }
    }
    catch (error: any) {
        res.render('error', {
            message: error
        })
    }
})

router.get('/:code/:number/files/:file', (req, res) => {
    
    const { code, number, file } = req.params

    try {
        const { group, lesson } = getGroupAndLesson(code, number)

        const filePath = `${lesson.path}/files/${file}`

        res.sendFile(filePath, {
            root: './'
        })
    }
    catch (error: any) {
        res.render('error', {
            message: error
        })
    }
})

function getGroupAndLesson(code: string, number: string) {

    const group = findGroup(code)
    if (!group) {
        throw new Error(`Group ${code} not found.`)
    }
    
    if (isNaN(+number)) {
        throw new Error(`Lesson number '${number}' incorrect.`)
    }

    const lesson = group.lesson(+number)

    if (!lesson) {
        throw new Error(`Lesson ${number} for group ${code} not found.`)
    }

    return { group, lesson }
}


export default router