export const formatAmount = (amount: string): string => {
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(parseFloat(amount));
    return formatted;
}