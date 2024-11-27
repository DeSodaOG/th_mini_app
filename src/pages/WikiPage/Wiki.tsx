import { en_locationText, ru_locationText } from "@/assets/location";
import { useInitData } from "@telegram-apps/sdk-react";

export const Wiki = () => {
    const initData = useInitData();
    const local = initData?.user?.languageCode === 'ru' || initData?.user?.languageCode === 'be' || initData?.user?.languageCode === 'uk' ? ru_locationText : en_locationText;
    const qaData = [
        {
            question: local.wiki.q1,
            answer: local.wiki.a1,
        },
        {
            question: local.wiki.q2,
            answer: local.wiki.a2,
        },
        {
            question: local.wiki.q3,
            answer: local.wiki.a3,
        },
        {
            question: local.wiki.q4,
            answer: local.wiki.a4,
        },
        {
            question: local.wiki.q5,
            answer: local.wiki.a5,
        },
        {
            question: local.wiki.q6,
            answer: local.wiki.a6,
        },
        {
            question: local.wiki.q7,
            answer: local.wiki.a7,
        },
        {
            question: local.wiki.q8,
            answer: local.wiki.a8,
        },
        {
            question: local.wiki.q9,
            answer: local.wiki.a9,
        },
    ]

    return <div className='flex flex-col w-full justify-center text-lg text-center'>
        {/* <div className="flex justify-center h-24 bg-[url('./assets/images/logo_with_text.png')] bg-no-repeat bg-cover"> */}
        <div className="flex justify-center items-center m-5 text-xl text-center">
            {local.wiki.title}
        </div>
        
        {qaData.map((value, index) => 
            <div key={index} className="my-5"  data-aos="zoom-in">
                <div className="flex justify-start items-center text-sm mx-5 my-2 text-left">
                    {value.question}
                </div>
                <div className="flex justify-start items-center text-sm mx-5 my-2 text-yellow-300 text-left">
                    {value.answer}
                </div>
            </div>
        )}
    </div>
};
