import Link from "next/link";

export default function IndexPage() {
  return (
    <div>
      <h1>use example :D</h1>
      <div style={{ fontSize: "2em" }}>
        <Link href="/create">
          <a>Create an Essay</a>
        </Link>
      </div>

      <div style={{ fontSize: "1.3em", marginTop: '3em' }}>
      <Link href="https://github.com/iainnash/zora-essay-edition-minter">
        <a>fork on github</a>
      </Link>
      </div>
    </div>
  );
}
