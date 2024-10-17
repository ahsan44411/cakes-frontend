"use client"

import React, {useEffect, useState} from 'react';
import Hero from "@/app/components/Hero";
import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from 'next/navigation'
import CakeForm from "@/app/components/CakeForm";

function Page({params}) {
    const id = params.id;

    const router = useRouter()

    const [formData, setFormData] = useState({
        name: "",
        comment: '',
        imageURL: '',
        yumFactor: 3
    })

    const submit = () => {
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/cake/${id}/`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then((response) => {
            toast.success("Cake Updated")

            router.push(`/cakes/${id}`)
        }).catch(error => {
            const errorMessage = error.response?.data?.error;

            toast.error(errorMessage, {duration: 2000})
        })
    }

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cake/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then((response) => {
            setFormData(response.data)
        }).catch(error => {
            const errorMessage = error.response?.data?.error;

            toast.error(errorMessage, {duration: 2000})
        })
    }, []);

    return (
        <section>
            <Hero heroText={'Add Cakes'}/>

            <CakeForm formData={formData} setFormData={setFormData} submit={submit} id={id}/>
        </section>
    );
}

export default Page;
