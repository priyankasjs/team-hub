import { useMemo } from "react";

export default function useCertStatus(expiry) {
  return useMemo(() => {
    const today = new Date();
    const expiryDate = new Date(expiry);

    today.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);

    const diffInMs = expiryDate - today;
    const daysLeft = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) {
      return { status: "Expired", color: "red", daysLeft };
    }

    if (daysLeft <= 30) {
      return { status: "Expiring", color: "orange", daysLeft };
    }

    return { status: "Valid", color: "green", daysLeft };
  }, [expiry]);
}