export type Group = {
    name: string,
    code: string,
    path: string,
    lessons: Lesson[],
    lesson: (number: number) => Lesson | undefined 
}

export type Lesson = {
    number: number
    theme: string
    description: string
    date: string
    tags: string[]
    materials: string
    path: string
    files: string[]
}