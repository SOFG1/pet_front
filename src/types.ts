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