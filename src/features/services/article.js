import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (builder) => ({
        getPostsById: builder.query({
            query: (id) => `posts/${id}`
        }),
        getAllPosts: builder.query({
            query: () => "posts"
        }),
        createPost: builder.query({
            query: (payload) => ({
                url: 'posts',
                method: "POST",
                body: payload
            })

        })
    })

})

export const { useLazyGetPostsByIdQuery, useLazyGetAllPostsQuery, useCreatePostMutation } = articleApi