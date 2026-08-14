import { Construction, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type PlaceholderPageProps = { title: string; description: string };

export const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => (
  <section className="mx-auto grid min-h-[58vh] max-w-3xl place-items-center px-4 py-16 text-center"><div className="panel max-w-xl p-8 sm:p-10"><span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><Construction size={24} /></span><p className="eyebrow mt-5">Coming in the next learning phase</p><h1 className="mt-3 text-3xl font-black">{title}</h1><p className="mt-4 leading-7 text-muted">{description}</p><Link to="/learn" className="button-primary mt-7">Explore visual lessons <ArrowRight size={17} /></Link></div></section>
);
