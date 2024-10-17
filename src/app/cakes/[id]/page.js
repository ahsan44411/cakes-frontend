import React from 'react';
import Hero from "@/app/components/Hero";
import CakeDetails from "@/app/cakes/[id]/CakeDetails";
import axios from "axios";
import { unstable_cache } from 'next/cache'


const get_cake = unstable_cache(async (id) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cake/${id}`);
    return await res.data;
})

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const id = params.id

    const cake = await get_cake(id)

    if (!cake) {
        return {
            title: 'Not Found',
            description: 'Not Found'
        };
    }

    return {
        title: cake.name,
        description: cake.description
    };
}

export default function Page({params}) {
    const id = params.id

    return (
        <div>
            <Hero heroText={'Cakes'}/>

            <CakeDetails id={id}/>
        </div>
    );
}
