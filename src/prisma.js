 import {
     Prisma
 } from "prisma-binding"

 const prisma = new Prisma({
     typeDefs: "src/generated/prisma.graphql",
     endpoint: "http://localhost:4466",
 })

 //  prisma.exists.Comment({
 //      id: 'cklcvwyw002ag0893rb8esjox'
 //  }).then((res) => console.log(res))


 //  const createPostForUser = async (authorId, data) => {
 //      const userExists = await prisma.exists.User({
 //          id: authorId
 //      })
 //      if (!userExists) {
 //          throw new Error("User not found")
 //      }

 //      const post = await prisma.mutation.createPost({
 //          data: {
 //              ...data,
 //              author: {
 //                  connect: {
 //                      id: authorId
 //                  }
 //              }
 //          }
 //      }, '{ author { id name email posts { id title published } } }')

 //      return post
 //  }

 //  const updatePostForUser = async (postId, data) => {
 //      const postExists = await prisma.exists.Post({
 //          id: postId
 //      })
 //      if (!postExists) {
 //          throw new Error('Post not found')
 //      }
 //      const update = await prisma.mutation.updatePost({
 //          data: {
 //              ...data
 //          },
 //          where: {
 //              id: postId
 //          }
 //      }, '{ author { id name email posts { id title published } } }')

 //      return update
 //  }

 //  updatePostForUser('happy sailor', {

 //      published: true
 //  }).then((user) => console.log(JSON.stringify(user, undefined, 2))).catch((e) => console.log(e.message))


 //  createPostForUser('cklcvqtg5026b0893tpe87sa2', {
 //          title: 'Dillon Rules',
 //          body: "Fuck Yeah!",
 //          published: false
 //      }).then((user) => console.log(JSON.stringify(user, undefined, 2)))
 //      .catch(e => console.log(e.message))

 export {
     prisma as
     default
 }