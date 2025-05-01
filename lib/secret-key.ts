

const SECRET_KEY = process.env.NEXT_PUBLIC_ADD_MEMBER_PASSWORD
console.log(SECRET_KEY)
export const checkSecretKey = (key: string) => {
    return SECRET_KEY !== key
}