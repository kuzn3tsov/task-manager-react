import { useLocalStorage } from './useLocalStorage';
import { DICT, LANG_KEY } from '../utils/constants';

export function useTranslation() {
    const [lang, setLang] = useLocalStorage(LANG_KEY, 'en');

    const t = (key) => {
        return DICT[lang]?.[key] || DICT.en[key] || key;
    };

    return { lang, setLang, t };
}