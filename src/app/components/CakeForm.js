import React, {useRef} from 'react';
import {Button, Input, Slider, Textarea} from "@nextui-org/react";
import {IoSadOutline} from "react-icons/io5";
import {FaRegSmileBeam} from "react-icons/fa";
import {IoIosArrowRoundBack} from "react-icons/io";
import {useRouter} from "next/navigation";
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/breadcrumbs";

function CakeForm({formData, setFormData, submit, id = null}) {
    const router = useRouter()

    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const formRef = useRef(null)

    return (
        <div className="container mx-auto p-5 flex">
            <form ref={formRef} className={'m-auto w-full sm:w-[500px] md:w-[600px]'}>
                {id ?
                    <Breadcrumbs className={'mb-4'}>
                        <BreadcrumbItem href="/cakes">Cakes</BreadcrumbItem>
                        <BreadcrumbItem href={`/cake/${id}`}>Update Cake</BreadcrumbItem>
                        <BreadcrumbItem>{id}</BreadcrumbItem>
                    </Breadcrumbs>
                    :
                    <Breadcrumbs className={'mb-4'}>
                        <BreadcrumbItem href="/cakes">Cakes</BreadcrumbItem>
                        <BreadcrumbItem>Add Cake</BreadcrumbItem>
                    </Breadcrumbs>
                }

                <Input
                    value={formData.name}
                    onChange={handleChange}
                    name={'name'}
                    label={'Name'}
                    placeholder={"Enter a name"}
                    description={"Enter a name for your cake. Name of Cake should be less then 100 characters. Cake name should be unique"}
                    type={'text'}
                    className={'mb-4'}
                    required={true}
                    validationBehavior={'native'}
                    minLength={1}
                    maxLength={100}
                    errorMessage={"Enter a name for your cake. Name of Cake should be less then 100 characters. Cake name should be unique"}
                />

                <Textarea
                    value={formData.comment}
                    onChange={handleChange}
                    name={'comment'}
                    label={'Comment'}
                    placeholder={"Enter a comment"}
                    description={"Leave a comment for you cake for others to read. Comments length should be between 5 to 200 letters"}
                    type={'text'}
                    className={'mb-4'}
                    required={true}
                    minLength={5}
                    maxLength={200}
                    validationBehavior={'native'}
                    errorMessage={"Leave a comment for you cake for others to read. Comments length should be between 5 to 200 letters"}
                />

                <Input
                    value={formData.imageURL}
                    onChange={handleChange}
                    name={'imageURL'}
                    label={'URL'}
                    placeholder={"Enter a URL"}
                    description={"Enter a URL for your cake image"}
                    type={'url'}
                    className={'mb-4'}
                    required={true}
                    validationBehavior={'native'}
                />

                <Slider
                    size="sm"
                    label="Yum Factor"
                    step={1}
                    minValue={1}
                    maxValue={5}
                    value={formData.yumFactor}
                    onChange={(value) => setFormData(prev => ({...prev, yumFactor: value}))}
                    className="w-full mb-4"
                    classNames={{
                        track: "border-s-red-100",
                        filler: ['bg-gradient-to-r  from-red-100 to-red-500'],
                        thumb: ['bg-red-500'],
                    }}
                    startContent={
                        <IoSadOutline className={'text-2xl'}/>
                    }
                    endContent={
                        <FaRegSmileBeam className={'text-2xl'}/>
                    }
                />

                <div className={'flex'}>
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            const form = formRef.current;
                            if (form) {
                                if (!form.checkValidity()) {
                                    form.reportValidity()
                                } else {
                                    submit()
                                }
                            }
                        }}
                        className={'text-white bg-red-500 hover:bg-red-400 hover:!opacity-100 ml-auto'}
                    >
                        {id ? "Update Cake" : "Add Cake"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CakeForm;
