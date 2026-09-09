import Home from "../page";

export function generateStaticParams() {
  return ["zh-tw", "en", "vi"].map(locale => ({ locale }));
}

export default function LocalizedHome() {
  return <Home />;
}
