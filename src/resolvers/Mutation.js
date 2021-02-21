const Mutation = {
    async createUser(parent, args, {
        prisma
    }, info) {
        //optional customization error message
        const emailTaken = await prisma.exists.User({
            email: args.data.email.toLowerCase()
        })

        if (emailTaken) {
            throw new Error('Email already in use')
        }

        return prisma.mutation.createUser({
            data: args.data
        }, info)

    },
    async deleteUser(parent, args, {
        prisma
    }, info) {
        const userExists = await prisma.exists.User({
            id: args.id
        })
        if (!userExists) {
            throw new Error("Couldn't find user")
        }
        return prisma.mutation.deleteUser({
            where: {
                id: args.id
            }
        }, info)
    },
    async updateUser(parent, args, {
        prisma
    }, info) {
        return prisma.mutation.updateUser({
            where: {
                id: args.id
            },
            data: args.data

        }, info)

    },
    async createPost(parent, args, {
        prisma
    }, info) {
        return prisma.mutation.createPost({
            data: {
                author: {
                    connect: {
                        id: args.data.author
                    }
                },
                title: args.data.title,
                body: args.data.body,
                published: args.data.published
            }
        }, info)
    },
    async deletePost(parent, args, {
        prisma
    }, info) {
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },
    async updatePost(parent, args, {
        prisma
    }, info) {
        return prisma.mutation.updatePost({
            data: args.data,
            where: {
                id: args.id
            }
        }, info)
    },
    async createComment(parent, args, {
        prisma
    }, info) {
        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: args.data.author
                    }
                },
                post: {
                    connect: {
                        id: args.data.post
                    }
                }
            }
        }, info)
    },
    async deleteComment(parent, args, {
        prisma
    }, info) {
        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info)
    },
    async updateComment(parent, args, {
        prisma
    }, info) {
        return prisma.mutation.updateComment({
            data: args.data,
            where: {
                id: args.id
            }
        }, info)
    }
}

export {
    Mutation as
    default
}