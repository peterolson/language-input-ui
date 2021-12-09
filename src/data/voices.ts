import type { LanguageCode } from '../types/dictionary.types';

export type Voice = { name: string; region: string; code: string; isFemale: boolean };

export const voices: Record<LanguageCode, Voice[]> = {
	ca: [
		{
			name: 'ca-ES-AlbaNeural',
			region: 'Spain',
			code: 'ca-ES',
			isFemale: true
		},
		{
			name: 'ca-ES-JoanaNeural',
			region: 'Spain',
			code: 'ca-ES',
			isFemale: true
		},
		{
			name: 'ca-ES-EnricNeural',
			region: 'Spain',
			code: 'ca-ES',
			isFemale: false
		}
	],
	zh: [
		{
			name: 'zh-CN-XiaohanNeural',
			region: 'Mandarin, Simplified',
			code: 'zh-CN',
			isFemale: true
		},
		{
			name: 'zh-CN-XiaomoNeural',
			region: 'Mandarin, Simplified',
			code: 'zh-CN',
			isFemale: true
		},
		{
			name: 'zh-CN-XiaoruiNeural',
			region: 'Mandarin, Simplified',
			code: 'zh-CN',
			isFemale: true
		},
		{
			name: 'zh-CN-XiaoxiaoNeural',
			region: 'Mandarin, Simplified',
			code: 'zh-CN',
			isFemale: true
		},
		{
			name: 'zh-CN-XiaoxuanNeural',
			region: 'Mandarin, Simplified',
			code: 'zh-CN',
			isFemale: true
		},
		{
			name: 'zh-CN-XiaoyouNeural',
			region: 'Mandarin, Simplified',
			code: 'zh-CN',
			isFemale: true
		},
		{
			name: 'zh-CN-YunxiNeural',
			region: 'Mandarin, Simplified',
			code: 'zh-CN',
			isFemale: false
		},
		{
			name: 'zh-CN-YunyangNeural',
			region: 'Mandarin, Simplified',
			code: 'zh-CN',
			isFemale: false
		},
		{
			name: 'zh-CN-YunyeNeural',
			region: 'Mandarin, Simplified',
			code: 'zh-CN',
			isFemale: false
		},
		{
			name: 'zh-TW-HsiaoChenNeural',
			region: 'Taiwanese Mandarin',
			code: 'zh-TW',
			isFemale: true
		},
		{
			name: 'zh-TW-HsiaoYuNeural',
			region: 'Taiwanese Mandarin',
			code: 'zh-TW',
			isFemale: true
		},
		{
			name: 'zh-TW-YunJheNeural',
			region: 'Taiwanese Mandarin',
			code: 'zh-TW',
			isFemale: false
		}
	],
	da: [
		{
			name: 'da-DK-ChristelNeural',
			region: 'Denmark',
			code: 'da-DK',
			isFemale: true
		},
		{
			name: 'da-DK-JeppeNeural',
			region: 'Denmark',
			code: 'da-DK',
			isFemale: false
		}
	],
	nl: [
		{
			name: 'nl-NL-ColetteNeural',
			region: 'Netherlands',
			code: 'nl-NL',
			isFemale: true
		},
		{
			name: 'nl-BE-DenaNeural',
			region: 'Belgium',
			code: 'nl-BE',
			isFemale: true
		},
		{
			name: 'nl-BE-ArnaudNeural',
			region: 'Belgium',
			code: 'nl-BE',
			isFemale: false
		},
		{
			name: 'nl-NL-FennaNeural',
			region: 'Netherlands',
			code: 'nl-NL',
			isFemale: true
		},
		{
			name: 'nl-NL-MaartenNeural',
			region: 'Netherlands',
			code: 'nl-NL',
			isFemale: false
		}
	],
	en: [
		{
			name: 'en-US-AmberNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: true
		},
		{
			name: 'en-US-BrandonNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: false
		},
		{
			name: 'en-GB-LibbyNeural',
			region: 'United Kingdom',
			code: 'en-GB',
			isFemale: true
		},
		{
			name: 'en-GB-RyanNeural',
			region: 'United Kingdom',
			code: 'en-GB',
			isFemale: false
		},
		{
			name: 'en-AU-NatashaNeural',
			region: 'Australia',
			code: 'en-AU',
			isFemale: true
		},
		{
			name: 'en-AU-WilliamNeural',
			region: 'Australia',
			code: 'en-AU',
			isFemale: false
		},
		{
			name: 'en-CA-ClaraNeural',
			region: 'Canada',
			code: 'en-CA',
			isFemale: true
		},
		{
			name: 'en-CA-LiamNeural',
			region: 'Canada',
			code: 'en-CA',
			isFemale: false
		},
		{
			name: 'en-HK-YanNeural',
			region: 'Hongkong',
			code: 'en-HK',
			isFemale: true
		},
		{
			name: 'en-HK-SamNeural',
			region: 'Hongkong',
			code: 'en-HK',
			isFemale: false
		},
		{
			name: 'en-IN-NeerjaNeural',
			region: 'India',
			code: 'en-IN',
			isFemale: true
		},
		{
			name: 'en-IN-PrabhatNeural',
			region: 'India',
			code: 'en-IN',
			isFemale: false
		},
		{
			name: 'en-IE-EmilyNeural',
			region: 'Ireland',
			code: 'en-IE',
			isFemale: true
		},
		{
			name: 'en-IE-ConnorNeural',
			region: 'Ireland',
			code: 'en-IE',
			isFemale: false
		},
		{
			name: 'en-KE-AsiliaNeural',
			region: 'Kenya',
			code: 'en-KE',
			isFemale: true
		},
		{
			name: 'en-KE-ChilembaNeural',
			region: 'Kenya',
			code: 'en-KE',
			isFemale: false
		},
		{
			name: 'en-NZ-MollyNeural',
			region: 'New Zealand',
			code: 'en-NZ',
			isFemale: true
		},
		{
			name: 'en-NZ-MitchellNeural',
			region: 'New Zealand',
			code: 'en-NZ',
			isFemale: false
		},
		{
			name: 'en-NG-EzinneNeural',
			region: 'Nigeria',
			code: 'en-NG',
			isFemale: true
		},
		{
			name: 'en-NG-AbeoNeural',
			region: 'Nigeria',
			code: 'en-NG',
			isFemale: false
		},
		{
			name: 'en-PH-RosaNeural',
			region: 'Philippines',
			code: 'en-PH',
			isFemale: true
		},
		{
			name: 'en-PH-JamesNeural',
			region: 'Philippines',
			code: 'en-PH',
			isFemale: false
		},
		{
			name: 'en-SG-LunaNeural',
			region: 'Singapore',
			code: 'en-SG',
			isFemale: true
		},
		{
			name: 'en-SG-WayneNeural',
			region: 'Singapore',
			code: 'en-SG',
			isFemale: false
		},
		{
			name: 'en-ZA-LeahNeural',
			region: 'South Africa',
			code: 'en-ZA',
			isFemale: true
		},
		{
			name: 'en-ZA-LukeNeural',
			region: 'South Africa',
			code: 'en-ZA',
			isFemale: false
		},
		{
			name: 'en-TZ-ImaniNeural',
			region: 'Tanzania',
			code: 'en-TZ',
			isFemale: true
		},
		{
			name: 'en-TZ-ElimuNeural',
			region: 'Tanzania',
			code: 'en-TZ',
			isFemale: false
		},
		{
			name: 'en-GB-SoniaNeural',
			region: 'United Kingdom',
			code: 'en-GB',
			isFemale: true
		},
		{
			name: 'en-US-AriaNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: true
		},
		{
			name: 'en-US-AshleyNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: true
		},
		{
			name: 'en-US-CoraNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: true
		},
		{
			name: 'en-US-ElizabethNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: true
		},
		{
			name: 'en-US-JennyNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: true
		},
		{
			name: 'en-US-MichelleNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: true
		},
		{
			name: 'en-US-MonicaNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: true
		},
		{
			name: 'en-US-SaraNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: true
		},
		{
			name: 'en-US-AnaNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: true
		},
		{
			name: 'en-US-ChristopherNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: false
		},
		{
			name: 'en-US-EricNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: false
		},
		{
			name: 'en-US-GuyNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: false
		},
		{
			name: 'en-US-JacobNeural',
			region: 'United States',
			code: 'en-US',
			isFemale: false
		}
	],
	fr: [
		{
			name: 'fr-FR-DeniseNeural',
			region: 'France',
			code: 'fr-FR',
			isFemale: true
		},
		{
			name: 'fr-FR-HenriNeural',
			region: 'France',
			code: 'fr-FR',
			isFemale: false
		},
		{
			name: 'fr-BE-CharlineNeural',
			region: 'Belgium',
			code: 'fr-BE',
			isFemale: true
		},
		{
			name: 'fr-BE-GerardNeural',
			region: 'Belgium',
			code: 'fr-BE',
			isFemale: false
		},
		{
			name: 'fr-CA-SylvieNeural',
			region: 'Canada',
			code: 'fr-CA',
			isFemale: true
		},
		{
			name: 'fr-CA-AntoineNeural',
			region: 'Canada',
			code: 'fr-CA',
			isFemale: false
		},
		{
			name: 'fr-CA-JeanNeural',
			region: 'Canada',
			code: 'fr-CA',
			isFemale: false
		},
		{
			name: 'fr-CH-ArianeNeural',
			region: 'Switzerland',
			code: 'fr-CH',
			isFemale: true
		},
		{
			name: 'fr-CH-FabriceNeural',
			region: 'Switzerland',
			code: 'fr-CH',
			isFemale: false
		}
	],
	de: [
		{
			name: 'de-DE-KatjaNeural',
			region: 'Germany',
			code: 'de-DE',
			isFemale: true
		},
		{
			name: 'de-DE-ConradNeural',
			region: 'Germany',
			code: 'de-DE',
			isFemale: false
		},
		{
			name: 'de-AT-IngridNeural',
			region: 'Austria',
			code: 'de-AT',
			isFemale: true
		},
		{
			name: 'de-AT-JonasNeural',
			region: 'Austria',
			code: 'de-AT',
			isFemale: false
		},
		{
			name: 'de-CH-LeniNeural',
			region: 'Switzerland',
			code: 'de-CH',
			isFemale: true
		},
		{
			name: 'de-CH-JanNeural',
			region: 'Switzerland',
			code: 'de-CH',
			isFemale: false
		}
	],
	el: [
		{
			name: 'el-GR-AthinaNeural',
			region: 'Greece',
			code: 'el-GR',
			isFemale: true
		},
		{
			name: 'el-GR-NestorasNeural',
			region: 'Greece',
			code: 'el-GR',
			isFemale: false
		}
	],
	it: [
		{
			name: 'it-IT-ElsaNeural',
			region: 'Italy',
			code: 'it-IT',
			isFemale: true
		},
		{
			name: 'it-IT-IsabellaNeural',
			region: 'Italy',
			code: 'it-IT',
			isFemale: true
		},
		{
			name: 'it-IT-DiegoNeural',
			region: 'Italy',
			code: 'it-IT',
			isFemale: false
		}
	],
	ja: [
		{
			name: 'ja-JP-NanamiNeural',
			region: 'Japan',
			code: 'ja-JP',
			isFemale: true
		},
		{
			name: 'ja-JP-KeitaNeural',
			region: 'Japan',
			code: 'ja-JP',
			isFemale: false
		}
	],
	lt: [
		{
			name: 'lt-LT-OnaNeural',
			region: 'Lithuania',
			code: 'lt-LT',
			isFemale: true
		},
		{
			name: 'lt-LT-LeonasNeural',
			region: 'Lithuania',
			code: 'lt-LT',
			isFemale: false
		}
	],
	nb: [
		{
			name: 'nb-NO-IselinNeural',
			region: 'Bokmål, Norway',
			code: 'nb-NO',
			isFemale: true
		},
		{
			name: 'nb-NO-PernilleNeural',
			region: 'Bokmål, Norway',
			code: 'nb-NO',
			isFemale: true
		},
		{
			name: 'nb-NO-FinnNeural',
			region: 'Bokmål, Norway',
			code: 'nb-NO',
			isFemale: false
		}
	],
	pl: [
		{
			name: 'pl-PL-AgnieszkaNeural',
			region: 'Poland',
			code: 'pl-PL',
			isFemale: true
		},
		{
			name: 'pl-PL-ZofiaNeural',
			region: 'Poland',
			code: 'pl-PL',
			isFemale: true
		},
		{
			name: 'pl-PL-MarekNeural',
			region: 'Poland',
			code: 'pl-PL',
			isFemale: false
		}
	],
	pt: [
		{
			name: 'pt-BR-FranciscaNeural',
			region: 'Brazil',
			code: 'pt-BR',
			isFemale: true
		},
		{
			name: 'pt-BR-AntonioNeural',
			region: 'Brazil',
			code: 'pt-BR',
			isFemale: false
		},
		{
			name: 'pt-PT-FernandaNeural',
			region: 'Portugal',
			code: 'pt-PT',
			isFemale: true
		},
		{
			name: 'pt-PT-RaquelNeural',
			region: 'Portugal',
			code: 'pt-PT',
			isFemale: true
		},
		{
			name: 'pt-PT-DuarteNeural',
			region: 'Portugal',
			code: 'pt-PT',
			isFemale: false
		}
	],
	ro: [
		{
			name: 'ro-RO-AlinaNeural',
			region: 'Romania',
			code: 'ro-RO',
			isFemale: true
		},
		{
			name: 'ro-RO-EmilNeural',
			region: 'Romania',
			code: 'ro-RO',
			isFemale: false
		}
	],
	ru: [
		{
			name: 'ru-RU-DariyaNeural',
			region: 'Russia',
			code: 'ru-RU',
			isFemale: true
		},
		{
			name: 'ru-RU-SvetlanaNeural',
			region: 'Russia',
			code: 'ru-RU',
			isFemale: true
		},
		{
			name: 'ru-RU-DmitryNeural',
			region: 'Russia',
			code: 'ru-RU',
			isFemale: false
		}
	],
	es: [
		{
			name: 'es-MX-DaliaNeural',
			region: 'Mexico',
			code: 'es-MX',
			isFemale: true
		},
		{
			name: 'es-MX-JorgeNeural',
			region: 'Mexico',
			code: 'es-MX',
			isFemale: false
		},
		{
			name: 'es-ES-ElviraNeural',
			region: 'Spain',
			code: 'es-ES',
			isFemale: true
		},
		{
			name: 'es-ES-AlvaroNeural',
			region: 'Spain',
			code: 'es-ES',
			isFemale: false
		},
		{
			name: 'es-AR-ElenaNeural',
			region: 'Argentina',
			code: 'es-AR',
			isFemale: true
		},
		{
			name: 'es-AR-TomasNeural',
			region: 'Argentina',
			code: 'es-AR',
			isFemale: false
		},
		{
			name: 'es-BO-SofiaNeural',
			region: 'Bolivia',
			code: 'es-BO',
			isFemale: true
		},
		{
			name: 'es-BO-MarceloNeural',
			region: 'Bolivia',
			code: 'es-BO',
			isFemale: false
		},
		{
			name: 'es-CL-CatalinaNeural',
			region: 'Chile',
			code: 'es-CL',
			isFemale: true
		},
		{
			name: 'es-CL-LorenzoNeural',
			region: 'Chile',
			code: 'es-CL',
			isFemale: false
		},
		{
			name: 'es-CO-SalomeNeural',
			region: 'Colombia',
			code: 'es-CO',
			isFemale: true
		},
		{
			name: 'es-CO-GonzaloNeural',
			region: 'Colombia',
			code: 'es-CO',
			isFemale: false
		},
		{
			name: 'es-CR-MariaNeural',
			region: 'Costa Rica',
			code: 'es-CR',
			isFemale: true
		},
		{
			name: 'es-CR-JuanNeural',
			region: 'Costa Rica',
			code: 'es-CR',
			isFemale: false
		},
		{
			name: 'es-CU-BelkysNeural',
			region: 'Cuba',
			code: 'es-CU',
			isFemale: true
		},
		{
			name: 'es-CU-ManuelNeural',
			region: 'Cuba',
			code: 'es-CU',
			isFemale: false
		},
		{
			name: 'es-DO-RamonaNeural',
			region: 'Dominican Republic',
			code: 'es-DO',
			isFemale: true
		},
		{
			name: 'es-DO-EmilioNeural',
			region: 'Dominican Republic',
			code: 'es-DO',
			isFemale: false
		},
		{
			name: 'es-EC-AndreaNeural',
			region: 'Ecuador',
			code: 'es-EC',
			isFemale: true
		},
		{
			name: 'es-EC-LuisNeural',
			region: 'Ecuador',
			code: 'es-EC',
			isFemale: false
		},
		{
			name: 'es-SV-LorenaNeural',
			region: 'El Salvador',
			code: 'es-SV',
			isFemale: true
		},
		{
			name: 'es-SV-RodrigoNeural',
			region: 'El Salvador',
			code: 'es-SV',
			isFemale: false
		},
		{
			name: 'es-GQ-TeresaNeural',
			region: 'Equatorial Guinea',
			code: 'es-GQ',
			isFemale: true
		},
		{
			name: 'es-GQ-JavierNeural',
			region: 'Equatorial Guinea',
			code: 'es-GQ',
			isFemale: false
		},
		{
			name: 'es-GT-MartaNeural',
			region: 'Guatemala',
			code: 'es-GT',
			isFemale: true
		},
		{
			name: 'es-GT-AndresNeural',
			region: 'Guatemala',
			code: 'es-GT',
			isFemale: false
		},
		{
			name: 'es-HN-KarlaNeural',
			region: 'Honduras',
			code: 'es-HN',
			isFemale: true
		},
		{
			name: 'es-HN-CarlosNeural',
			region: 'Honduras',
			code: 'es-HN',
			isFemale: false
		},
		{
			name: 'es-NI-YolandaNeural',
			region: 'Nicaragua',
			code: 'es-NI',
			isFemale: true
		},
		{
			name: 'es-NI-FedericoNeural',
			region: 'Nicaragua',
			code: 'es-NI',
			isFemale: false
		},
		{
			name: 'es-PA-MargaritaNeural',
			region: 'Panama',
			code: 'es-PA',
			isFemale: true
		},
		{
			name: 'es-PA-RobertoNeural',
			region: 'Panama',
			code: 'es-PA',
			isFemale: false
		},
		{
			name: 'es-PY-TaniaNeural',
			region: 'Paraguay',
			code: 'es-PY',
			isFemale: true
		},
		{
			name: 'es-PY-MarioNeural',
			region: 'Paraguay',
			code: 'es-PY',
			isFemale: false
		},
		{
			name: 'es-PE-CamilaNeural',
			region: 'Peru',
			code: 'es-PE',
			isFemale: true
		},
		{
			name: 'es-PE-AlexNeural',
			region: 'Peru',
			code: 'es-PE',
			isFemale: false
		},
		{
			name: 'es-PR-Karina Neural',
			region: 'Puerto Rico',
			code: 'es-PR',
			isFemale: true
		},
		{
			name: 'es-PR-Victor Neural',
			region: 'Puerto Rico',
			code: 'es-PR',
			isFemale: false
		},
		{
			name: 'es-UY-ValentinaNeural',
			region: 'Uruguay',
			code: 'es-UY',
			isFemale: true
		},
		{
			name: 'es-UY-MateoNeural',
			region: 'Uruguay',
			code: 'es-UY',
			isFemale: false
		},
		{
			name: 'es-US-PalomaNeural',
			region: 'US',
			code: 'es-US',
			isFemale: true
		},
		{
			name: 'es-US-AlonsoNeural',
			region: 'US',
			code: 'es-US',
			isFemale: false
		},
		{
			name: 'es-VE-PaolaNeural',
			region: 'Venezuela',
			code: 'es-VE',
			isFemale: true
		},
		{
			name: 'es-VE-SebastianNeural',
			region: 'Venezuela',
			code: 'es-VE',
			isFemale: false
		}
	]
};
