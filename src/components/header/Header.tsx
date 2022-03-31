import { FC } from "react";

export const Header: FC = () => (
  <>
    <h1 className="text-4xl font-semibold mt-20 mb-4">Multi-Elo Demo</h1>
    <p className="text-center">
      {"This website showcases the functionality offered by my "}
      <a href="https://www.npmjs.com/package/multi-elo" className="text-accent">
        multi-elo npm package.
      </a>
    </p>
    <p className="mb-8 text-center">
      {"You can learn more about the Elo rating system "}
      <a
        href="https://en.wikipedia.org/wiki/Elo_rating_system"
        className="text-accent"
      >
        here.
      </a>
    </p>
  </>
);
