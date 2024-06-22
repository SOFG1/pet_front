export interface ITodo {
    id: number,
    text: string
}



export type ResetPasswordData = {
    old: string
    new: string
    newConfirm: string
}