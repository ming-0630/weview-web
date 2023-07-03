import NavItem from '@/components/layout/nav/NavItem';
import { useAuthStore } from '@/states/authStates';
import { useGlobalStore } from '@/states/globalStates';
import { CubeIcon, FlagIcon, GiftIcon } from '@heroicons/react/24/outline';
import router from 'next/router';

const AdminSideNavBar = () => {
    const toggleConfirm = useGlobalStore((state) => state.toggleConfirm)
    const loadingHandler = useGlobalStore((state) => state.loadingHandler)
    const logout = useAuthStore((state) => state.logout)
    return (
        <div className='bg-white-plain w-[15vw] p-5 shadow flex flex-col z-10'>
            <NavItem
                title='All Products'
                href={'/admin/products'}
                icon={<CubeIcon className='w-6 m-3'></CubeIcon>}
            ></NavItem>
            <NavItem
                title='Rewards'
                href={'/admin/rewards'}
                icon={<GiftIcon className='w-6 m-3'></GiftIcon>}
            ></NavItem>
            <NavItem
                title='Reports'
                href={'/admin/reports'}
                icon={<FlagIcon className='w-6 m-3'></FlagIcon>}
            ></NavItem>
            <div className="btn btn-error text-white hover:brightness-95 justify-self-end mt-auto" onClick={() => {
                toggleConfirm({
                    title: "Confirm Logout?",
                    description: "Are you sure you want to logout?",
                    onClickYes: () => {
                        loadingHandler.open();
                        router.push("/");
                        toggleConfirm();
                        logout();
                        loadingHandler.close();
                    }
                });
            }}>Logout</div>
        </div>
    );
}

export default AdminSideNavBar;
