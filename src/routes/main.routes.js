import { Router } from 'express';
import { allGroups, groupLessions } from '../services/groups.service'

const router = Router()

router.get('/', (req, res) => {
    const groups = allGroups()
    const path = groups[0] ? groups[0].path : 'empty'
    res.redirect('/' + path)
})

router.get('/:path', (req, res) => {
    const groups = allGroups()
    const path = req.params.path
    
    const group = groups.find(group => group.path == path)

    res.render('lessions', {
        groups,
        name: group.name,
        lessions: group.lessions
    })
})

export default router