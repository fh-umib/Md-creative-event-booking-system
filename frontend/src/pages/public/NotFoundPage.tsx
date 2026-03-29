import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go back home</Link>
    </section>
  );
}