const currencyToLocaleMap = {
	usd: "en-US",
	inr: "en-IN",
};

const formatNumber = (number, currency = "usd", symbol = true) => {
	const locale = currencyToLocaleMap[currency.toLowerCase()] || "en-US";
	const options = symbol
		? { style: "currency", currency: currency.toUpperCase() }
		: { minimumFractionDigits: 2, maximumFractionDigits: 2 };

	return new Intl.NumberFormat(locale, options).format(number);
};

export default formatNumber;
