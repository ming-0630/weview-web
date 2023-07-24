import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';

const FAQPage = () => {
    const template = (options: PanelHeaderTemplateOptions) => {
        const toggleIcon = options.collapsed ?
            <ChevronDownIcon className='w-5'></ChevronDownIcon> :
            <ChevronUpIcon className='w-5'></ChevronUpIcon>;
        return (
            <div className={classNames(options.className, "cursor-pointer")} onClick={options.onTogglerClick}>
                <span className='font-semibold'>{options.props.header}</span>
                <button className={options.togglerClassName} >
                    <span>{toggleIcon}</span>
                    <Ripple />
                </button>

            </div>
        );
    };

    return (
        <div className="min-h-[calc(100vh_-_5rem)] bg-white py-10 flex justify-center">
            <div className="bg-white-plain w-[60vw] rounded-2xl p-10 shadow-lg flex flex-col gap-5">
                <div className="font-bold text-main text-3xl">Frequently Asked Questions</div>
                <div className='flex flex-col gap-2'>
                    <Panel header="How do I change my profile picture?" headerTemplate={template} toggleable collapsed>
                        <p className="m-0">
                            Go to your profile by clicking on your picture, or name, or from the option at the side navigation bar.
                            Once you are at your profile, clicking on your profile picture will show a popup to handle your upload.
                        </p>
                    </Panel>

                    <Panel header="Why does it take so long to upload a new profile picture?" headerTemplate={template} toggleable collapsed>
                        <p className="m-0">
                            To ensure that images uploaded to the website adhere to proper guidelines, the images uploaded will be run though AI checking
                            to ensure that the image is appropriate.
                        </p>
                    </Panel>

                    <Panel header="How do I verify my account?" headerTemplate={template} toggleable collapsed>
                        <p className="m-0">
                            Clicking on the icon beside your name at the side navigation bar or at your profile picture will show a popup to handle
                            the verification process. You need to key in your phone number for the system to send a OTP code to your phone via SMS.
                            Then, use the code to verify your account!
                        </p>
                    </Panel>

                    <Panel header="Why should I verify my account!" headerTemplate={template} toggleable collapsed>
                        <p className="m-0">
                            To ensure that botted reviews are less prominent on this platform, phone number verification is used. We encourage all our users
                            to verify their account as their reviews will have more credibility if verified, and it unlocks the reward function.
                        </p>
                    </Panel>

                    <Panel header="What is the reward function?" headerTemplate={template} toggleable collapsed>
                        <p className="m-0">
                            To encourage user interaction, there is a points system in place to reward good interaction and punish bad interactions. These points
                            gained can be exchanged for promotional codes in the rewards page. For more information on how is the points system calculated, click on your points
                            at the side navigation bar!
                        </p>
                    </Panel>


                    <Panel header="How do I add a review?" headerTemplate={template} toggleable collapsed>
                        <p className="m-0">
                            Go to a product by selecting a category, or searching for the product. Then go to the review section of the page and there is a button for you
                            to write a review.

                        </p>
                        <p className="mt-2">
                            Keep in mind that you have to be logged in, and do not have a review already on the same product in order to add a review.
                        </p>
                    </Panel>

                    <Panel header="Why can't other people see my review?" headerTemplate={template} toggleable collapsed>
                        <p className="m-0">
                            To ensure that the reviews recieved on the platform are of good quality, a series of AI checking is in place that will verify your review once
                            it is submitted. Hence, please be patient while the checking is ongoing. If your review have no problems, the review will automatically be made
                            visible after all the checking is done.
                        </p>
                        <p className="mt-2">
                            However, if your review is flagged by the AI checker, a report will be sent to the admin for further checking. The admin will then decide if the review
                            can be shown on the platform.
                        </p>
                    </Panel>

                    <Panel header="My review has been reported! What happens now?" headerTemplate={template} toggleable collapsed>
                        <p className="m-0">
                            This means that your review is flagged by the AI checker AND accepted by the admin, which means that your review is banned. Click on the flag icon
                            to see the reasoning behind the report.
                        </p>
                        <p className="mt-2">
                            You can editing the review to resubmit it, or creating a new review after deleting the old review.
                        </p>
                    </Panel>

                    <Panel header="What is the knob on each review for?" headerTemplate={template} toggleable collapsed>
                        <p className="m-0">
                            To give a deeper understanding of the review recieved, a sentiment score of 1-100 will be given based on the description of each review. This can help
                            to further understand how satisfied the reviwer is with the product.
                        </p>
                    </Panel>
                </div>
            </div>
        </div>
    );
}

export default FAQPage;