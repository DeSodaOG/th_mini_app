const qaData = [
    {
        question: "Q1. What is Tele-Hunter?",
        answer: "Answer: TeleHunter’s is dedicated to becoming the most viral user traffic growth platform on Telegram. By improving users’ bargaining power against advertisers in the online traffic business, users can earn more profits. TeleHunter will help each user build an exclusive TG traffic affiliate system, launching your first traffic monetization business with one click, and earn your first income on TG. At the same time, the unique mechanism design allows The most influential KOL helps you make money and help your business grow exponentially.",
    },
    {
        question: "Q2. What is the Multi-tier Referral Affiliate System in TeleHunter?",
        answer: "Answer: This is TeleHunter's first product. Users can create their own Multi-tier Referral Affiliate System, and your direct invite will become your Tier 1 affiliates, and Tier 1’s direct invite will become your Tier 2 affiliates etc.",
    },
    {
        question: "Q3. What are the benefits of building a Multi-tier Referral Affiliate System?",
        answer: "Answer: Continuously earn passive income. As the owner of the entire network fission, you can continue to obtain your own benefits from subsequent promotion. This means that you can accurately quantify your value in social networks, which is impossible in the traditional single-tier Referral system. And when the network reaches a certain scale, you don't need to work personally. You only need to manage your network and make it more efficient, allowing you to continuously earn passive income. This means you actually create your own social network’ traffic business.",
    },
    {
        question: "Q4. How can I build my Multi-tier referral affiliate system?",
        answer: "Answer: Launch Tele Hunter’s mini app, generate your exclusive link and shill around to expand your affiliates and push them to invite more.",
    },
    {
        question: "Q5. Can a newbie without influence make money at TeleHunter?",
        answer: "Answer: Of course, because in TeleHunter, the most influential people will help you develop your business and provide you with resources. This spirit of effective altruism stems from TeleHunter’s Inverted Pyramid Profit Sharing Mechanism.",
    },
    {
        question: "Q6. What is the Inverted Pyramid Profit Sharing Mechanism?",
        answer: "Answer: In case you build your own affiliate system at TeleHunter, the lower your affiliate's tier,  the higher rewards ratios you get. This means that for the most influential people, the strategy to maximize profits is to guide their affiliates, and help them start their user traffic business. This effective and altruistic design will bring benefits to ordinary users in starting their user traffic businesses.",
    },
    {
        question: "Q7. What do I earn with TeleHunter during the MVP stage?",
        answer: "Answer: In addition to the official $Hunter Point, you can also earn real money, $6000 $TON, participating  in the King-Of-Invite Contest. $Hunter Point will be converted into Hunter Token airdrops during the Platformization Stage, which is the core of the entire platform economic model.",
    },
    {
        question: "Q8. Is using TeleHunter free and safe?",
        answer: "Answer: Of course, in the MVP stage, you only need to use TeleHunter Mini App to join the official group to successfully build an affiliate system. All that is left to do is to continuously invite new affiliates and manage your system, so everything is completely free. And no other additional funds or data services are required, no risk and no cost.",
    },
    {
        question: "Q9. What is the future of TeleHunter in the long term?",
        answer: "Answer: Capture more value from the whole $Ton and Telegram Ecosystems by offering them real and authentic user traffic. By Introducing potential advertisers, such as project, TG group operators etc., as early TeleHunte users, you’re able to earn income and expand your social network as well. All Hunters can selectively participate based on the rewards paid by advertisers and grow them by organic viral promotions and invitations. Hence, TeleHunter will be further upgraded to become the most viral traffic growth platform on Telegram.",
    },
]


export const Wiki = () => {

    return <div className='flex flex-col w-full justify-center text-lg'>
        {/* <div className="flex justify-center h-24 bg-[url('./assets/images/logo_with_text.png')] bg-no-repeat bg-cover"> */}
        <div className="flex justify-center items-center m-5 text-xl text-center">
            FAQ
        </div>
        
        {qaData.map((value, index) => 
            <div key={index} className="my-5">
                <div className="flex justify-start items-center text-sm mx-5 my-2">
                    {value.question}
                </div>
                <div className="flex justify-start items-center text-sm mx-5 my-2 text-yellow-300">
                    {value.answer}
                </div>
            </div>
        )}
    </div>
};
