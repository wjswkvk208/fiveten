export default function LoginLayout({ children }: { children: React.ReactNode }) {
  // const cookieStore = cookies().get("gameId");
  // const gameId = cookieStore?.value;

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>

      {children}
    </section>
  );
}
