import {useNavigate} from "react-router-dom";

export const Nav = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    };

    const goToAbout = () => {
        navigate("/about");
    };

    const goToContact = () => {
        navigate("/contact");
    };

    const goToShop = () => {
        navigate("/shop");
    };

    return (
        <nav className='hidden md:flex justify-between'>
            <ul className='flex flex-row'>
                <li onClick={goToHome} className='text-lg cursor-pointer hover:text-pink-400 hover:scale-110 hover:font-semibold transition-all duration-300 px-2'>Home</li>
                <li onClick={goToAbout} className='text-lg cursor-pointer hover:text-pink-400 hover:scale-110 hover:font-semibold transition-all duration-300 px-2'>About</li>
                <li onClick={goToShop} className='text-lg cursor-pointer hover:text-pink-400 hover:scale-110 hover:font-semibold transition-all duration-300 px-2'>Shop</li>
                <li onClick={goToContact} className='text-lg cursor-pointer hover:text-pink-400 hover:scale-110 hover:font-semibold transition-all duration-300 px-2'>Contact</li>
            </ul>
        </nav>
    )
}