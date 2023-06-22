import Modal from "@/components/ui/Modal";
import Image from 'next/image';
import WeViewLogo from '/public/favicon.ico';
import { useGlobalStore } from "@/states/globalStates";
import { Table, Tabs } from "@mantine/core";
import { ChatBubbleLeftRightIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export interface ConfirmModalProps {
    title?: string,
    description?: string,
    onClickYes?: (...args: any[]) => void
}

const PointsSystemModal = () => {
    const isShow = useGlobalStore((state) => state.pointsIsOpen)
    const toggleModal = useGlobalStore((state) => state.togglePoints)

    return (
        <Modal isShow={isShow}
            toggleModal={toggleModal}>
            <div className="p-5 w-[60vw] lg:w-[40vw]">
                <div className="flex items-center ml-4">
                    <div className='w-10 h-10 relative'>
                        <Image src={WeViewLogo} alt='WeView Logo' fill />
                    </div>
                    <div className="text-2xl text-main ml-4">{"Points System"}</div>
                </div>
                <div className="p-3 flex flex-col">
                    <div>Unlock prizes by performing actions and earning points on this site!</div>
                    <Tabs defaultValue="review" className="mt-3">
                        <Tabs.List>
                            <Tabs.Tab value="review" icon={<PencilSquareIcon className='w-3'></PencilSquareIcon>}>Review</Tabs.Tab>
                            <Tabs.Tab value="comments" icon={<ChatBubbleLeftRightIcon className='w-3'></ChatBubbleLeftRightIcon>}>Comments</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="review" pt="xs">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Actions</th>
                                        <th>Points</th>
                                    </tr>
                                </thead>
                                <tbody className="[&>tr td]:odd:text-green-500">
                                    <tr>
                                        <td>Writing a review</td>
                                        <td>+ 100 pts</td>
                                    </tr>
                                    <tr>
                                        <td>Upvote</td>
                                        <td>+ 1 pts</td>
                                    </tr>
                                    <tr>
                                        <td>Downvote</td>
                                        <td>+ 1 pts</td>
                                    </tr>
                                    <tr>
                                        <td>Recieve upvote</td>
                                        <td>+ 4 pts</td>
                                    </tr>
                                    <tr>
                                        <td>Recieve downvote</td>
                                        <td>- 4 pts</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Tabs.Panel>

                        <Tabs.Panel value="comments" pt="xs">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Actions</th>
                                        <th>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Writing a comment</td>
                                        <td>0 pts</td>
                                    </tr>
                                    <tr>
                                        <td>Upvote</td>
                                        <td>+ 1 pts</td>
                                    </tr>
                                    <tr>
                                        <td>Downvote</td>
                                        <td>+ 1 pts</td>
                                    </tr>
                                    <tr>
                                        <td>Recieve upvote</td>
                                        <td>+ 2 pts</td>
                                    </tr>
                                    <tr>
                                        <td>Recieve downvote</td>
                                        <td>- 2 pts</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Tabs.Panel>
                    </Tabs>
                </div>

            </div>
        </Modal >
    )
}

export default PointsSystemModal 
