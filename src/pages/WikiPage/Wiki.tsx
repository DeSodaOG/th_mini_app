const qaData = [
    {
        question: "Q1. What is Tele-Hunter?",
        answer: "Answer:  Welcome To Tele-Hunter Wiki, Here are some answers to key questions about Tele-Hunter!",
    },
    {
        question: "Q1. What is Tele-Hunter?",
        answer: "Answer:  Welcome To Tele-Hunter Wiki, Here are some answers to key questions about Tele-Hunter!",
    },
    {
        question: "Q1. What is Tele-Hunter?",
        answer: "Answer:  Welcome To Tele-Hunter Wiki, Here are some answers to key questions about Tele-Hunter!",
    },
    {
        question: "Q1. What is Tele-Hunter?",
        answer: "Answer:  Welcome To Tele-Hunter Wiki, Here are some answers to key questions about Tele-Hunter!",
    },
]


export const Wiki = () => {

    return <div className='flex flex-col w-full justify-center text-lg'>
        {/* <div className="flex justify-center h-24 bg-[url('./assets/images/logo_with_text.png')] bg-no-repeat bg-cover"> */}
        <div className="flex justify-center items-center m-5 text-xl text-center">
            Welcome To Tele-Hunter Wiki, Here are some answers to key questions about Tele-Hunter!
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
