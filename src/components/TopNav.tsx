import logoWithText from '../assets/images/logo_with_text.png';

export const TopNav = () => (
    <div className="flex justify-center w-screen h-32 items-center px-4">
        <img
            alt="LogoWithText"
            className='h-14'
            src={logoWithText}
        />
    </div>
);
