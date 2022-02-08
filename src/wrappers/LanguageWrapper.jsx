import en from '../languages/en';
import fr from '../languages/fr';
import mu from '../languages/mu';

export default function useLanguage(language) {
  if (language === 'fr') {
    return fr;
  } else if (language === 'mu') {
    return mu;
  }

  return en;
}
