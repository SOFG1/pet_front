


export const logErrors = (err: string[] | string) => {
    const msg = Array.isArray(err) ?  err.join("\n") : err
    alert(msg)
}