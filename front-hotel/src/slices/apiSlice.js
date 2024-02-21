import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/hotel'}),
    endpoints: (builder) => ({
        getHotelInfo: builder.query({
            query: () => '/hotelInfo',
        }),
    })
})

export const { useGetHotelInfoQuery } = api;