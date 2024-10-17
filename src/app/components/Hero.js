import React from 'react';
import {Button} from "@nextui-org/react";
import Link from "next/link";
import {Image} from "@nextui-org/image";

function Hero({heroText}) {
    return (
        <section className={'mb-5'}>
            <div className={'w-full h-[170px] md:h-[240px] relative flex'}>
                <div className={'m-auto text-center'}>
                    <h1 className={'z-10 m-auto text-white font-black text-4xl md:text-6xl tracking-wide relative'}>
                        {heroText}
                    </h1>
                    {heroText === 'Cakes' &&
                        <Button
                            className={'z-10 relative mt-4 text-white bg-red-500 hover:bg-red-400 hover:!opacity-100'}>
                            <Link
                                href={'/cake'}>
                                Add Cake +
                            </Link>
                        </Button>
                    }
                </div>
                <Image
                    src={'https://plus.unsplash.com/premium_photo-1714669889975-90386fbb03e4?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                    alt={'Hero Cake Image'}
                    width={'100%'}
                    height={'100%'}
                    radius={'none'}
                    className="z-0 blur-[2px] object-cover absolute"
                    removeWrapper
                    isZoomed={false}
                />
            </div>
        </section>
    );
}

export default Hero;
