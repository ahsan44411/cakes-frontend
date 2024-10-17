"use client"

import React, {useState} from 'react';
import Hero from "@/app/components/Hero";
import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from 'next/navigation'
import CakeForm from "@/app/components/CakeForm";

function Page({}) {
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: "",
        comment: '',
        imageURL: '',
        yumFactor: 3
    })

    const submit = () => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/cake/`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then((response) => {
            toast.success("Cake Added")

            router.push('/cakes')
        }).catch(error => {
            const errorMessage = error.response?.data?.error;

            toast.error(errorMessage, {duration: 2000})
        })
    }

    return (
        <section>
            <Hero heroText={'Add Cakes'}/>

            <CakeForm formData={formData} setFormData={setFormData} submit={submit}/>

        </section>
    );
}

export default Page;
