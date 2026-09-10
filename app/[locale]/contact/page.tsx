import ContactPage from "../../ContactPage";
import SiteHeader from "../../SiteHeader";

export function generateStaticParams(){return [{locale:"zh-tw"},{locale:"en"},{locale:"vi"}];}

export default function Contact(){return <main className="contact-page"><SiteHeader/><ContactPage/></main>;}
