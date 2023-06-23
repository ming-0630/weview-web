import Head from 'next/head';
import Image from 'next/image';
import { ReactNode } from 'react';
import SideNavBar from './AdminSideNavBar';
import WeViewLogo from '/public/favicon.ico';

export interface NavBarProps {
    children?: ReactNode;
    title?: string;
}

const AdminNavBar = (props: NavBarProps) => {
    const nav = (
        <div className='bg-white-plain shadow w-full h-20 z-20 sticky top-0'>
            <div className='flex-1 pl-20 flex items-center h-full'>
                <Image src={WeViewLogo} className='w-10' alt='WeView Logo' />
                <div className='text-main font-semibold ml-5 text-xl uppercase'>Admin</div>
            </div>
        </div>
    )

    return (
        <>
            <Head>
                <title>{props.title ?? "WeView"}</title>
            </Head>
            {nav}
            <div className='flex w-full'>
                <SideNavBar></SideNavBar>
                {props.children}
            </div>
        </>
    );
}

export default AdminNavBar;
