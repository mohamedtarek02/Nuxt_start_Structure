import moment from "moment";

const arabicDateOptions: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

export function formatDate(date: string | Date | any): string {
  const pickedLanguage = useCookie<string>("preferred-language");
  const utcDate = new Date(date);

  const localDate = new Date(
    utcDate.toLocaleString("en-US", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
  );

  if (pickedLanguage.value === "ar") {
    return localDate.toLocaleString("ar-EG", arabicDateOptions);
  } else {
    return moment(localDate).locale("en").format("DD MMM YYYY, hh:mm a");
  }
}
