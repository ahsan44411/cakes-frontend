"use client"

import React from 'react';
import {NextUIProvider} from "@nextui-org/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppLayout({children}) {
    return (
        <NextUIProvider>
            {children}
            <ToastContainer />
        </NextUIProvider>
    );
}

export default AppLayout;
