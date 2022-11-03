const defaultProperties = ['padding', 'flex', 'margin', 'textColor', 'background', 'gap', 'text-align', 'height', 'width']

document.addEventListener('DOMContentLoaded', (event) => {
    applyDefaultProperties()
    applyIconNames()
    applyGrid()
    modals()
    flex()

    function flex() {
        const flexes = document.querySelectorAll('flex')
        for (const flex of flexes) {
            const direction = flex.getAttribute('direction')
            const justify = flex.getAttribute('justify')
            const items = flex.getAttribute('items')
            const wrap = flex.getAttribute('wrap')

            flex.style['flex-direction'] = direction
            flex.style['justify-content'] = justify
            flex.style['align-items'] = items
            flex.style['flex-wrap'] = wrap
        }
    }

    function modals() {
        const triggers = document.querySelectorAll('button[trigger]')
        for (const trigger of triggers) {
            trigger.addEventListener('click', (event) => {
                const id = event.target.getAttribute('trigger')
                const type = event.target.getAttribute('mode')
                const modal = document.querySelector('dimmer#' + id)
                if (modal) {
                    if (type == 'open' || type == 'close') {
                        modal.setAttribute("mode", type)
                    }
                }
            })
        }
    }


    function applyGrid() {
        const grids = document.querySelectorAll('grid')

        for (const grid of grids) {
            const columns = grid.getAttribute("column")
            const rows = grid.getAttribute("rows")
            if (columns) {
                grid.style['grid-template-columns'] = `repeat(${columns}, 1fr)`
            }
            if (rows) {
                grid.style['grid-template-rows'] = `repeat(${rows}, 1fr)`
            }
        }
    }

    function applyIconNames() {
        const icons = document.querySelectorAll('icon')

        for (const element of icons) {
            const icon = element.getAttribute('name')
            element.className = 'bi bi-' + icon
        }
    }

    function applyDefaultProperties() {
        const elements = document.querySelectorAll('*')

        for (const element of elements) {
            const attributes = element.getAttributeNames()
            for (const attribute of attributes) {
                const value = element.getAttribute(attribute)
                element.style[attribute] = value
            }
        }
    }
})
