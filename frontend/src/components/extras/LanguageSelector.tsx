import { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import i18n from 'i18next';

import sqFlag from '../../assets/albanian.svg';
import enFlag from '../../assets/english.svg';

const languages = [
    { code: 'sq', label: 'Shqip', flag: sqFlag },
    { code: 'en', label: 'English', flag: enFlag },
];

export function LanguageSelector() {
    const [currentLang, setCurrentLang] = useState(i18n.language);

    useEffect(() => {
        const onLangChange = (lng: string) => setCurrentLang(lng);
        i18n.on('languageChanged', onLangChange);

        return () => {
            i18n.off('languageChanged', onLangChange);
        };
    }, []);

    const current = languages.find(l => l.code === currentLang) ?? languages[0];

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button
                className="flex items-center font-bold text-black rounded"
                aria-label="Language selector"
            >
                <img src={current.flag} alt={current.label} className="w-6 h-5 md:w-5 md:h-4" />
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-1.5 w-10 bg-white shadow-lg rounded">
                {languages.map(lang => (
                    <Menu.Item key={lang.code}>
                        {({ active }) => (
                            <button
                                onClick={() => i18n.changeLanguage(lang.code)}
                                className={`flex items-center w-full p-2 ${
                                    active ? 'bg-gray-100' : ''
                                }`}
                            >
                                <img src={lang.flag} alt={lang.label} className="w-5 h-4" />
                            </button>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
}