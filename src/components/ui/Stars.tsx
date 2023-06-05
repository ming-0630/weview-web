import { StarIcon } from '@heroicons/react/24/solid';

export interface StarsProps {
    className?: string;
}

const Stars = (props: StarsProps) => {
    return (
        <div className="flex text-yellow-500">
            <StarIcon className='w-7 h-7'></StarIcon>
            <StarIcon className='w-7 h-7'></StarIcon>
            <StarIcon className='w-7 h-7'></StarIcon>
            <StarIcon className='w-7 h-7'></StarIcon>
            <StarIcon className='w-7 h-7'></StarIcon>
        </div>
    )
}

export default Stars 