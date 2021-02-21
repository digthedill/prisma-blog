const Query = {
    users(parent, args, {
        db,
        prisma
    }, info) {

        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                // operation argumets -> defined in the 4466 docs
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }
        return prisma.query.users(opArgs, info)

    },
    posts(parent, args, {
        db,
        prisma
    }, info) {
        const opArgs = {}
        if (args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }
        }
        return prisma.query.posts(opArgs, info)
    },


    comments(parent, args, {
        db,
        prisma
    }, info) {
        return prisma.query.comments(null, info)
    },

    me() {
        return {
            email: "dilldog@gmail.com",
            name: "Dillon",
            id: 199,
            username: "hornyman",
        }
    },
    post() {
        return {
            id: 12389,
            body: "All I want is to learn everything the world has available for me!",
            title: "First blog!",
            published: false,
        }
    },
}
export {
    Query as
    default
}