import { Link } from "react-router-dom";

export const NotFoundPage = () => <section className="mx-auto grid min-h-[58vh] max-w-3xl place-items-center px-4 py-16 text-center"><div><p className="text-7xl font-black text-primary">404</p><h1 className="mt-4 text-3xl font-bold">This step does not exist.</h1><p className="mt-3 text-muted">Let’s get you back to a lesson that does.</p><Link to="/learn" className="button-primary mt-6">Browse lessons</Link></div></section>;
