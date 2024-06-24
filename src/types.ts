export interface ITodo {
    id: number,
    text: string
}



export type ResetPasswordData = {
    old: string
    new: string
    newConfirm: string
}



export interface IEmail {
    service: string
    user: string
    pass: string
    recipient: string
    subject: string
    text: string
}


export interface IUser {
    _id: string
    createdAt: string
    updatedAt: string
    photoName: string
    login: string
    likes: string[]
}