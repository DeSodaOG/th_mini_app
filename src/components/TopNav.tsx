import logoWithText from '../assets/images/logo_with_text.png';

export const TopNav = () => (
    <div className="flex justify-center w-screen items-center p-4">
        <img
            alt="LogoWithText"
            className='h-11'
            src={logoWithText}
        />
    </div>
);
