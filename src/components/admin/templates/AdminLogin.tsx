
import Image from 'next/image';
import WeViewLogo from '/public/favicon.ico';
import { Button, Input, LoadingOverlay, PasswordInput } from '@mantine/core';
import { useState } from 'react';
import { LoginDto, login } from '@/services/user/services';
import { useDisclosure } from '@mantine/hooks';
import CustomToastError from '@/utils/CustomToastError';
import User from '@/interfaces/userInterface';
import { base64StringToBlob } from 'blob-util';
import { AuthTokens, useAuthStore } from '@/states/authStates';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const AdminLoginPage = () => {
    const [loginValues, setLoginValues] = useState<LoginDto>({ email: "", password: "" })
    const [isLoading, loadingHandler] = useDisclosure(false);
    const router = useRouter();

    const { setTokens } = useAuthStore()
    const { setCurrentUser } = useAuthStore()

    const handleLogin = async () => {
        loadingHandler.open();
        if (isPopulated()) {
            const response = await login(loginValues!);
            if (response &&
                response.status === 200 &&
                response.data) {

                const data = response.data;
                const tokens: AuthTokens = {
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken
                }

                const user: User = {
                    id: data.user.id,
                    username: data.user.username,
                    userImageBase64: data.user.userImage,
                    isVerified: data.user.isVerified,
                    points: data.user.points,
                    role: data.user.role
                }

                if (data.user && data.user.userImage) {
                    const blob = base64StringToBlob(data.user.userImage);
                    const img = URL.createObjectURL(blob);
                    user.userImage = img
                }

                setTokens(tokens);
                setCurrentUser(user);


                if (!user.role.includes("ROLE_ADMIN")) {
                    toast.warning("This user is not an admin! Redirecting...")
                    router.push('/')
                } else {
                    toast.success("Login Successful!");
                    router.push('/admin/products')
                }


            }
        }
        loadingHandler.close();
    }

    const isPopulated = () => {
        if (loginValues?.email && loginValues?.password) {
            return true;
        } else {
            CustomToastError("Empty Fields!");
            return false;
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <div className="bg-white rounded-lg w-[30vw] py-5 px-10">
                <div className='flex flex-col gap-3 w-full'>
                    <div className='flex items-center'>
                        <Image src={WeViewLogo} className='w-12' alt='WeView Logo' />
                        <div className='text-main font-bold ml-5 text-2xl'>WeView Admin Login</div>
                    </div>
                    <div>
                        <Input placeholder='Username' size='lg'
                            value={loginValues?.email}
                            onChange={(e) => { setLoginValues({ ...loginValues, email: e.target.value }) }}
                            disabled={isLoading}
                        ></Input>
                    </div>
                    <div>
                        <PasswordInput placeholder='Password' size='lg'
                            value={loginValues?.password}
                            onChange={(e) => { setLoginValues({ ...loginValues, password: e.target.value }) }}
                            disabled={isLoading}
                        ></PasswordInput>
                    </div>
                    <div className='flex justify-end'>
                        <Button className='bg-main hover:opacity-90' onClick={handleLogin}>Login</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLoginPage;