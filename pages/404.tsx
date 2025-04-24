import { Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

function NotFoundContent() {
  // useSearchParams gebruik binnen Suspense boundary
  const searchParams = useSearchParams();
  const referrer = searchParams?.get('from') || '';
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-center">
      <div className="space-y-6 max-w-lg">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-medium">Pagina niet gevonden</h2>
        <p className="text-muted-foreground">
          Sorry, we konden de pagina die je zocht niet vinden.
          {referrer && ` Je komt van ${referrer}.`}
        </p>
        <div className="pt-6">
          <Link
            href="/"
            className="px-6 py-3 text-sm font-medium text-center text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
          >
            Terug naar homepagina
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Custom404() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="space-y-6 max-w-lg">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-2xl font-medium">Pagina niet gevonden</h2>
          <div className="pt-6">
            <Link
              href="/"
              className="px-6 py-3 text-sm font-medium text-center text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
            >
              Terug naar homepagina
            </Link>
          </div>
        </div>
      </div>
    }>
      <NotFoundContent />
    </Suspense>
  );
} 