"use client"

import React, {useEffect, useState} from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
    useDisclosure
} from "@nextui-org/react";
import ReactStars from "react-rating-stars-component";
import {LiaStarSolid} from "react-icons/lia";
import {Image} from "@nextui-org/image";
import axios from "axios";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import clsx from "clsx";
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/breadcrumbs";
import Link from "next/link";
import {GoPencil} from "react-icons/go";
import {MdDelete} from "react-icons/md";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const BreadCrumbComponent = ({screen, cake}) => {
    const router = useRouter()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const delete_cake = () => {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/cake/${cake.id}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then((response) => {
            toast.success("Cake Deleted")

            router.push(`/cakes`)
        }).catch(error => {
            const errorMessage = error.response?.data?.error;

            toast.error(errorMessage, {duration: 2000})
        })
    }

    return (
        <div className={clsx("mb-4", screen === 'md' ? "hidden md:flex" : "flex md:hidden")}>
            <Breadcrumbs className={'mr-auto'}>
                <BreadcrumbItem href="/cakes">Cakes</BreadcrumbItem>
                <BreadcrumbItem>{cake.id}</BreadcrumbItem>
            </Breadcrumbs>

            <Link
                className={'mr-2 text-xl my-auto'}
                href={`/cake/${cake.id}`}>
                <GoPencil/>
            </Link>
            <MdDelete
                onClick={onOpen}
                className={'hover:text-danger-600 text-xl my-auto cursor-pointer'}/>

            <Modal size={'sm'} placement={'center'} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Cake</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete <span className={'font-semibold'}>{cake.name}</span>.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" onPress={delete_cake}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

function CakeDetails({id, }) {
    const [cake, setCake] = useState(null)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cake/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(response => {
            setCake(response.data)
            setLoader(false)
        }).catch(error => {

        })
    }, [id]);

    return (
        <section className={'container mx-auto px-5 mb-5'}>
            {
                loader ?
                <div className={'w-full flex'}>
                    <Spinner
                        className={'m-auto'}
                        color="warning" labelColor="warning"/>
                </div>
                :
                cake ?
                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10'}>

                        <div className={'order-2 md:order-1'}>
                            <BreadCrumbComponent screen={'md'} cake={cake}/>

                            <h2 className={'uppercase font-black text-3xl'}>{cake.name}</h2>
                            <ReactStars
                                edit={false}
                                count={5}
                                value={cake.yumFactor}
                                emptyIcon={<LiaStarSolid/>}
                                fullIcon={<LiaStarSolid/>}
                                size={12}
                                isHalf={false}
                                activeColor={'#ffd700'}/>

                            <p className={'mt-5 font-normal text-md'}>{cake.comment}</p>
                        </div>
                        <div className={'order-1 md:order-2 w-full h-[350px] overflow-hidden rounded-lg mb-4'}>
                            <BreadCrumbComponent screen={'sm'} cake={cake}/>

                            <Image
                                alt="Cake Image"
                                src={cake.imageURL}
                                width={'100%'}
                                height={'100%'}
                                isZoomed
                                className="object-cover group-hover:scale-110 rounded-lg"
                                removeWrapper
                            />
                        </div>
                    </div>
                    :
                    <p className={'text-center'}>Cake not found</p>
            }
        </section>
    );
}

export default CakeDetails;