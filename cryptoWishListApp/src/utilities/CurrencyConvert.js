const currencyToLocaleMap = {
	usd: "en-US",
	inr: "en-IN",
};
const formatNumber = (number, currency, symbol = true) => {
	const locale = currencyToLocaleMap[currency.toLowerCase()] || "en-US";
	if (!symbol) {
		return new Intl.NumberFormat(locale, {
			currency: currency.toUpperCase(),
		}).format(number);
	}
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency.toUpperCase(),
	}).format(number);
};
export default formatNumber;
