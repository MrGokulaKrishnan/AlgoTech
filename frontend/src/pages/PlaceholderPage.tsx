import { Construction, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type PlaceholderPageProps = { title: string; description: string };

export const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => (
  <section className="mx-auto grid min-h-[65vh] max-w-4xl place-items-center px-5 py-20 text-center">
    <div className="panel max-w-2xl p-10 sm:p-14">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Construction size={32} />
      </span>
      <p className="eyebrow mt-7">Coming in the next learning phase</p>
      <h1 className="mt-4 text-4xl font-black sm:text-5xl">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-muted">{description}</p>
      <Link to="/learn" className="button-primary mt-10">Explore visual lessons <ArrowRight size={20} /></Link>
    </div>
  </section>
);
