"use client"

import {Image} from "@nextui-org/image";
import Link from "next/link";
import Hero from "@/app/components/Hero";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {Spinner} from "@nextui-org/react";

export default function Home() {

    const [cakes, setCakes] = useState([])

    const [loader, setLoader] = useState(true)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cake/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(response => {
            setCakes(response.data)
            setLoader(false)
        }).catch(error => {
            const errorMessage = error.response?.data?.error;

            toast.error(errorMessage, {duration: 2000})
        })
    }, []);

    return (
        <div>
            <Hero heroText={'Cakes'}/>

            <section className={'container mx-auto px-5 mb-5'}>
                {loader ?
                    <div className={'w-full flex'}>
                        <Spinner
                            className={'m-auto'}
                            color="warning" labelColor="warning"/>
                    </div>
                    :
                    cakes.length ?
                        <div
                            className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5'}>
                            {cakes.map((cake, index) => {
                                return (
                                    <Link href={`/cakes/${cake.id}`} key={index}>
                                        <div className={'rounded-lg pb-4 shadow text-center group cursor-pointer'}>
                                            <div className={'w-full h-[250px] overflow-hidden rounded-lg mb-4'}>
                                                <Image
                                                    alt="Cake Image"
                                                    src={cake.imageURL}
                                                    width={'100%'}
                                                    height={'100%'}
                                                    className="object-cover group-hover:scale-110 rounded-lg"
                                                    removeWrapper
                                                />
                                            </div>

                                            <h2 className={'font-black text-base uppercase group-hover:text-red-400'}>
                                                {cake.name}
                                            </h2>

                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                        :
                        <p className={'text-center'}>No Cakes found, please add some cakes</p>
                }
            </section>
        </div>
    );
}
