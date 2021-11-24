import type { LanguageCode } from 'src/types/dictionary.types';

const translations: Record<LanguageCode, Record<string, string>> = {
	en: {
		'settings.title': 'Settings',
		'settings.userLanguageTitle': 'I speak',
		'settings.targetLanguagesTitle': 'I want to learn',
		'settings.lightMode': 'Light mode',
		'settings.darkMode': 'Dark mode',
		'settings.close': 'Close',
		'card.words': 'Words',
		'content.empty': 'No content found.'
	},
	es: {
		'settings.title': 'Preferencias',
		'settings.userLanguageTitle': 'Yo hablo',
		'settings.targetLanguagesTitle': 'Yo quiero aprender',
		'settings.lightMode': 'Modo claro',
		'settings.darkMode': 'Modo oscuro',
		'settings.close': 'Cerrar',
		'card.words': 'Palabras',
		'content.empty': 'No se encontraron contenidos.'
	},
	zh: {
		'settings.title': '设置',
		'settings.userLanguageTitle': '我说',
		'settings.targetLanguagesTitle': '我想学习',
		'settings.lightMode': '浅色模式',
		'settings.darkMode': '深色模式',
		'settings.close': '关闭',
		'card.words': '单词',
		'content.empty': '没有找到内容。'
	},
	ca: {
		'settings.title': 'Preferències',
		'settings.userLanguageTitle': 'Estic parlant',
		'settings.targetLanguagesTitle': 'Estic interessat a aprendre',
		'settings.lightMode': 'Mode clar',
		'settings.darkMode': 'Mode fosc',
		'settings.close': 'Tancar',
		'card.words': 'Paraules',
		'content.empty': "No s'ha trobat cap contingut."
	},
	fr: {
		'settings.title': 'Paramètres',
		'settings.userLanguageTitle': 'Je parle',
		'settings.targetLanguagesTitle': 'Je veux apprendre',
		'settings.lightMode': 'Mode clair',
		'settings.darkMode': 'Mode sombre',
		'settings.close': 'Fermer',
		'card.words': 'Mots',
		'content.empty': 'Aucun contenu trouvé.'
	},
	de: {
		'settings.title': 'Einstellungen',
		'settings.userLanguageTitle': 'Ich spreche',
		'settings.targetLanguagesTitle': 'Ich möchte lernen',
		'settings.lightMode': 'Helles Modus',
		'settings.darkMode': 'Dunkles Modus',
		'settings.close': 'Schließen',
		'card.words': 'Wörter',
		'content.empty': 'Kein Inhalt gefunden.'
	},
	el: {
		'settings.title': 'Ρυθμίσεις',
		'settings.userLanguageTitle': 'Για να γνωρίζω',
		'settings.targetLanguagesTitle': 'Για να μάθω',
		'settings.lightMode': 'Λειτουργία φωτεινής οθόνης',
		'settings.darkMode': 'Λειτουργία μπάρας σκούρου',
		'settings.close': 'Κλείσιμο',
		'card.words': 'Λέξεις',
		'content.empty': 'Δεν βρέθηκαν περιεχόμενα.'
	},
	it: {
		'settings.title': 'Impostazioni',
		'settings.userLanguageTitle': 'Mi parlo',
		'settings.targetLanguagesTitle': 'Voglio imparare',
		'settings.lightMode': 'Modalità chiara',
		'settings.darkMode': 'Modalità scura',
		'settings.close': 'Chiudi',
		'card.words': 'Parole',
		'content.empty': 'Nessun contenuto trovato.'
	},
	ja: {
		'settings.title': '設定',
		'settings.userLanguageTitle': '私は話す',
		'settings.targetLanguagesTitle': '私は学ぶ',
		'settings.lightMode': 'ライトモード',
		'settings.darkMode': 'ダークモード',
		'settings.close': '閉じる',
		'card.words': '単語',
		'content.empty': 'コンテンツが見つかりませんでした。'
	},
	lt: {
		'settings.title': 'Nustatymai',
		'settings.userLanguageTitle': 'Aš kalbėsiu',
		'settings.targetLanguagesTitle': 'Aš noriu mokytis',
		'settings.lightMode': 'Šviesos režimas',
		'settings.darkMode': 'Tamsos režimas',
		'settings.close': 'Uždaryti',
		'card.words': 'Žodžiai',
		'content.empty': 'Nerasta jokių turinio.'
	},
	mk: {
		'settings.title': 'Поставки',
		'settings.userLanguageTitle': 'Ме говориме',
		'settings.targetLanguagesTitle': 'Ме сакам да учувам',
		'settings.lightMode': 'Слепа мода',
		'settings.darkMode': 'Темна мода',
		'settings.close': 'Затвори',
		'card.words': 'Речи',
		'content.empty': 'Не пронајдов ништо.'
	},
	nb: {
		'settings.title': 'Innstillinger',
		'settings.userLanguageTitle': 'Jeg taler',
		'settings.targetLanguagesTitle': 'Jeg ønsker å lære',
		'settings.lightMode': 'Lyst modus',
		'settings.darkMode': 'Mørk modus',
		'settings.close': 'Lukk',
		'card.words': 'Ord',
		'content.empty': 'Ingen innhold funnet.'
	},
	pl: {
		'settings.title': 'Ustawienia',
		'settings.userLanguageTitle': 'Mówię',
		'settings.targetLanguagesTitle': 'Chcę nauczyć się',
		'settings.lightMode': 'Tryb jasny',
		'settings.darkMode': 'Tryb ciemny',
		'settings.close': 'Zamknij',
		'card.words': 'Słowa',
		'content.empty': 'Nie znaleziono zawartości.'
	},
	pt: {
		'settings.title': 'Configurações',
		'settings.userLanguageTitle': 'Eu falo',
		'settings.targetLanguagesTitle': 'Eu quero aprender',
		'settings.lightMode': 'Modo claro',
		'settings.darkMode': 'Modo escuro',
		'settings.close': 'Fechar',
		'card.words': 'Palavras',
		'content.empty': 'Nenhum conteúdo encontrado.'
	},
	ro: {
		'settings.title': 'Setări',
		'settings.userLanguageTitle': 'Vorbește',
		'settings.targetLanguagesTitle': 'Vreau să înveț',
		'settings.lightMode': 'Modul luminoasă',
		'settings.darkMode': 'Modul întunecat',
		'settings.close': 'Închide',
		'card.words': 'Cuvinte',
		'content.empty': 'Nu s-a găsit conținutul.'
	},
	ru: {
		'settings.title': 'Настройки',
		'settings.userLanguageTitle': 'Я говорю',
		'settings.targetLanguagesTitle': 'Я хочу изучать',
		'settings.lightMode': 'Светлый режим',
		'settings.darkMode': 'Темный режим',
		'settings.close': 'Закрыть',
		'card.words': 'Слова',
		'content.empty': 'Не найдено ничего.'
	},
	da: {
		'settings.title': 'Indstillinger',
		'settings.userLanguageTitle': 'Jeg taler',
		'settings.targetLanguagesTitle': 'Jeg ønsker at lære',
		'settings.lightMode': 'Lyst tilstand',
		'settings.darkMode': 'Mørkt tilstand',
		'settings.close': 'Luk',
		'card.words': 'Ord',
		'content.empty': 'Ingen indhold fundet.'
	},
	nl: {
		'settings.title': 'Instellingen',
		'settings.userLanguageTitle': 'Ik spreek',
		'settings.targetLanguagesTitle': 'Ik wil leren',
		'settings.lightMode': 'Lichte modus',
		'settings.darkMode': 'Donkere modus',
		'settings.close': 'Sluiten',
		'card.words': 'Woorden',
		'content.empty': 'Geen inhoud gevonden.'
	}
};

export default translations;
