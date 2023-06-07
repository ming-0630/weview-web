import Stars from "@/components/ui/Stars";
import { ArrowDownCircleIcon, ArrowUpCircleIcon, FlagIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import blankUserImage from '../../../assets/blank_user.png'
import User from "@/interfaces/userInterface";
import Accordion from "@/components/ui/Accordion";
import CommentBlock from "./CommentBlock";
import FadedLine from "@/components/ui/FadedLine";
import Review from "@/interfaces/reviewInterface";
import dayjs from "dayjs";
import { Rating } from "@mantine/core";

export interface ReviewBlockProps {
    className?: string;
    user?: User;
    review?: Review;
    disabled?: boolean
}

const ReviewBlock = (props: ReviewBlockProps) => {
    return (
        <div className="flex gap-10">
            <div className="flex flex-col items-center gap-2">
                <ArrowUpCircleIcon className="w-7"></ArrowUpCircleIcon>
                <div className="font-semibold text-main text-xl">0</div>
                <ArrowDownCircleIcon className="w-7"></ArrowDownCircleIcon>
                <FlagIcon className="w-5 text-red-500"></FlagIcon>
            </div>
            <div className="grow flex flex-col gap-3">
                <div className="flex gap-4 items-center">
                    <Rating
                        value={props.review?.rating ?? 3}
                        readOnly
                    />
                    <div className="text-main font-semibold italic text-2xl">{props.review?.title || 'Incredible on Paper, Weak on Execution.'}</div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 border border-main rounded-full">
                            <Image src={props.user && props.user.userImage ? props.user.userImage : blankUserImage} alt="User Profile Pic" fill className='object-cover h-auto rounded-full'></Image>
                        </div>
                        <div className="text-main text-lg">{props.user && props.user.username}</div>
                    </div>

                    <div className="text-gray-500 text-sm">{props.review?.date_created ?? dayjs(Date.now()).format('D MMMM YYYY')}</div>
                </div>

                <pre style={{ whiteSpace: 'pre-wrap' }} className="text-justify font-sans text-sm">
                    {props.review?.description || `
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales magna at enim posuere condimentum. Curabitur aliquet aliquet tellus a aliquet. Aenean scelerisque lectus consectetur ante pretium, eu tincidunt ante feugiat. Cras porta eget dolor sed porta. Ut tempus magna at neque vulputate, nec interdum neque convallis. Donec eget elementum felis, non hendrerit sem. Maecenas semper, ipsum id venenatis porta, felis sapien interdum nulla, et vulputate odio justo sit amet lorem. Praesent eu velit rhoncus, euismod massa sit amet, luctus tortor. Nullam nec lobortis metus, et interdum est. Donec pretium lacus vitae fringilla efficitur. Suspendisse potenti. Quisque nec nunc eu ex semper blandit. Nunc et ante ex.

                    Nulla vel convallis est. Vivamus hendrerit scelerisque consectetur. In mattis urna condimentum facilisis bibendum. Praesent vel risus ullamcorper, auctor sapien id, tristique leo. Nunc volutpat nulla a magna ullamcorper sodales. Aenean erat velit, luctus eu est sit amet, facilisis mollis sem. Praesent eu lectus a nulla tempor consequat sed ornare nibh. Morbi maximus faucibus nunc et imperdiet. Nulla facilisi. Donec aliquet ligula et nunc dignissim, ac rutrum sapien sagittis. Vivamus luctus interdum orci, nec sagittis purus scelerisque quis. Sed ultrices eget lacus quis maximus. In hac habitasse platea dictumst.

                    Vestibulum sed ullamcorper neque. Nullam posuere vitae felis nec hendrerit. Suspendisse eget accumsan mauris, ac malesuada purus. Aenean et imperdiet lectus, at vulputate sapien. Integer in dui iaculis, dictum elit et, ullamcorper mi. Nam varius nulla aliquam vulputate lacinia. Curabitur vulputate urna et commodo feugiat. Nunc vel nibh eget arcu malesuada sodales vehicula ut tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat.`}
                </pre>

                <div className="flex flex-wrap">
                    {props.review?.images?.map((img) => {
                        return <div className="relative w-[10vw] h-[20vh]">
                            <Image src={img} alt={""} fill className="object-contain"></Image>
                        </div>
                    })}
                </div>
                <Accordion title="View more comments" disabled={props.disabled}>
                    <CommentBlock user={props.user}></CommentBlock>
                    <FadedLine className="w-[80%] m-auto"></FadedLine>
                    <CommentBlock user={props.user}></CommentBlock>
                </Accordion>
            </div>

        </div>
    )
}

export default ReviewBlock