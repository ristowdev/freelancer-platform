export const formatAmount = (amount: string | number): string => {
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(parseFloat(String(amount)));
    return formatted;
}