import "./globals.css";
import {Work_Sans} from 'next/font/google'
import AppLayout from "@/app/AppLayout";

const workSans = Work_Sans({
    subsets: ['latin'],
    display: 'swap',
})


export const metadata = {
    title: "Cakes",
    description: "Discover a delightful selection of cakes for every occasion, crafted with love and the finest ingredients. From classic flavors to creative custom designs, satisfy your sweet tooth with our irresistible cakes.",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={workSans.className}>
        <AppLayout>
            {children}
        </AppLayout>
        </body>
        </html>
    );
}
