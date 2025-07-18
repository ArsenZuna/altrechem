import {Phone} from "lucide-react";

const WhatsAppButton = () => {
    const phoneNumber = '355699967356';
    const message = 'Pershendetje, dua te bej nje porosi per...';
    const encodedMessage = encodeURIComponent(message);

    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return (
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <button
                className="fixed bottom-4 right-4 p-2 text-lg font-semibold italic bg-green-500 hover:bg-green-700 text-white self-start cursor-pointer rounded-full shadow-md"
            >
                <Phone size={24}/>
            </button>
        </a>
    )
};

export default WhatsAppButton;
