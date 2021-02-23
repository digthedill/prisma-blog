import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getUserId from '../utils/getUserId'


const Mutation = {
    async createUser(parent, args, {
        prisma
    }, info) {
        if (args.data.password.length < 8) {
            throw new Error("Password must be at least 8 characters")
        }
        const password = await bcrypt.hash(args.data.password, 10)

        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password,
            },
        })
        return {
            user,
            token: jwt.sign({
                userId: user.id
            }, "thisismysecret"),
        }
    },
    async login(parent, args, {
        prisma
    }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.email,
            },
        })
        if (user === null) {
            throw new Error("Email or Password is inncorrect")
        }
        const password = await bcrypt.compare(args.password, user.password)

        if (!password) {
            throw new Error("Email or Password is inncorrect")
        }

        return {
            user,
            token: jwt.sign({
                userId: user.id
            }, "thisismysecret")
        }
    },
    async deleteUser(parent, args, {
        prisma,
        req
    }, info) {
        const userId = getUserId(req)

        return prisma.mutation.deleteUser({
                where: {
                    id: userId,
                },
            },
            info
        )
    },
    async updateUser(parent, args, {
        prisma,
        req
    }, info) {
        const userId = getUserId(req)

        return prisma.mutation.updateUser({
                where: {
                    id: userId,
                },
                data: args.data,
            },
            info
        )
    },
    async createPost(parent, args, {
        prisma,
        req
    }, info) {
        const userId = getUserId(req)

        return prisma.mutation.createPost({
                data: {
                    author: {
                        connect: {
                            id: userId,
                        },
                    },
                    title: args.data.title,
                    body: args.data.body,
                    published: args.data.published,
                },
            },
            info
        )
    },
    async deletePost(parent, args, {
        prisma,
        req
    }, info) {
        const userId = getUserId(req)

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })
        if (!postExists) {
            throw new Error("Unable to delete post")
        }

        return prisma.mutation.deletePost({
                where: {
                    id: args.id,
                },
            },
            info
        )
    },
    async updatePost(parent, args, {
        prisma,
        req
    }, info) {
        const userId = getUserId(req)
        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })
        if (!postExists) {
            throw new Error("Can't update post")
        }
        return prisma.mutation.updatePost({
                data: args.data,
                where: {
                    id: args.id,
                },
            },
            info
        )
    },
    async createComment(parent, args, {
        prisma,
        req
    }, info) {
        const userId = getUserId(req)

        return prisma.mutation.createComment({
                data: {
                    text: args.data.text,
                    author: {
                        connect: {
                            id: userId,
                        },
                    },
                    post: {
                        connect: {
                            id: args.data.post,
                        },
                    },
                },
            },
            info
        )
    },
    async deleteComment(parent, args, {
        prisma,
        req
    }, info) {
        const userId = getUserId(req)
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }

        })
        if (!commentExists) {
            throw new Error('Comment will not be deleted at this time')
        }

        return prisma.mutation.deleteComment({
                where: {
                    id: args.id,
                },
            },
            info
        )
    },
    async updateComment(parent, args, {
        prisma,
        req
    }, info) {
        const userId = getUserId(req)
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })
        if (!commentExists) {
            throw new Error("Comment will have to be updated at a different time, thank you")
        }
        return prisma.mutation.updateComment({
                data: args.data,
                where: {
                    id: args.id,
                },
            },
            info
        )
    },
}

export {
    Mutation as
    default
}