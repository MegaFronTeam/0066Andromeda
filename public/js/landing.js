/**
 * Замените выражение в кавычках "css-selector" в коде ниже значением селектора элемента на Вашей лендинговой странице.
 * Вы можете использовать #id или любой другой CSS селектор, который будет точно определять поле ввода на Вашей лендинговой странице.
 * Пример: "Email": "#MyEmailField".
 * Если Ваша лендинговая страница не содержит одного или нескольких полей из приведенных ниже – оставьте строку без изменений или удалите полностью.
 */
var config = {
	fields: {
		Name: "input-company", // Имя посетителя, заполнившего форму
		Email: "input-email", // Email посетителя
		Zip: "css-selector", // Почтовый индекс посетителя
		MobilePhone: "input-tel", // Телефон посетителя
		Company: "input-company", // Название компании
		Industry: "css-selector", // Отрасль компании
		FullJobTitle: "css-selector", // Должность посетителя
		UseEmail: "css-selector", // Логическое значение «да» - согласие посетителя получать email рассылки
		City: "css-selector", // Город
		Country: "css-selector", // Страна
		Commentary: "css-selector", // Примечание
		GbcUtmSource: "css-selector", // UTM source
		GbcUtmMedium: "css-selector", // UTM medium
		GbcUtmCampaign: "css-selector", // UTM campaign
		GbcNameLid: "css-selector", // Имя
		GbcSurnameLid: "css-selector", // Фамилия
		GbcMiddleNameLid: "css-selector", // Отчество
		GbcPromoCode: "css-selector", // PromoCode
		Gbcymclientid: "css-selector", // Ym_client_id
		Gbcyclid: "css-selector", // Yclid
		GbcSaleSource: "css-selector", // Источник
		GbcDisqulifyComment: "css-selector", // Комментарий дисквалификации
	},
	contactFields: {
		FullName: "css-selector", // Name of a contact
		Phone: "css-selector", // Contact's mobile phone
		Email: "css-selector", // Contact's email
	},
	customFields: {},
	landingId: "2480d5b1-348a-48f5-9db0-fc1b006631c8",
	serviceUrl:
		"https://crm.euler.team:5002/ServiceModel/GeneratedObjectWebFormService.svc/SaveWebFormObjectData",
	redirectUrl: "",
};
/**
 * Функция ниже создает объект из введенных данных.
 * Привяжите вызов этой функции к событию "onSubmit" формы или любому другому элементу события.
 * Пример: <form class="mainForm" name="landingForm" onSubmit="createObject(); return false">
 */
function createObject() {
	landing.createObjectFromLanding(config);
}
/**
 * Функция ниже инициализирует лендинг из параметров URL.
 */
function initLanding() {
	landing.initLanding(config);
}
jQuery(document).ready(initLanding);
