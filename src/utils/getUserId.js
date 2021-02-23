import jwt from 'jsonwebtoken'

const getUserId = (req) => {
    const header = req.request.headers.authorization
    if (!header) {
        throw new Error('Sorry pal, Authentication Requried!')
    }
    const token = header.substring(7)
    const decoded = jwt.verify(token, 'thisismysecret')

    return decoded.userId
}

export {
    getUserId as
    default
}