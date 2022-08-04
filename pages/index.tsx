import Link from "next/link";

export default function IndexPage() {
  return (
    <div>
      Hello World.{" "}
      <Link href="/create">
        <a>Create an Essay</a>
      </Link>
    </div>
  );
}
