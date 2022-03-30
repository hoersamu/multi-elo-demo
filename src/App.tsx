import { AddCircle24Regular, Calculator24Regular } from "@fluentui/react-icons";
import {
  DEFAULT_K_VALUE,
  DEFAULT_D_VALUE,
  DEFAULT_S_VALUE,
  MultiElo,
  MultiEloConfig,
} from "multi-elo";
import React, { FC, useRef, useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { Button } from "./components/button/Button";
import { ExtendedSettings } from "./components/extendedSettings/ExtendedSettings";
import { InputTable } from "./components/inputTable/InputTable";
import { OutputTable } from "./components/outputTable/OutputTable";

export type Team = {
  name: string;
  rating: string;
  order: string;
};

export type OutputTeam = {
  name: string;
  rating: number;
  newRating: number;
};

export const App: FC = () => {
  const [teams, setTeams] = useState<Team[]>([
    { name: "Team A", rating: "1000", order: "1" },
    { name: "Team B", rating: "1000", order: "2" },
  ]);
  const [outputTeams, setOutputTeams] = useState<OutputTeam[]>([]);
  const [eloConfig, setEloConfig] = useState<MultiEloConfig>({
    k: DEFAULT_K_VALUE,
    d: DEFAULT_D_VALUE,
    s: DEFAULT_S_VALUE,
  });

  const lastRowNameRef = useRef<HTMLInputElement>(null);

  const addTeam = (): void => {
    const maxOrder = Math.max(
      ...teams.map((team) => Number.parseInt(team.order, 10))
    );
    setTeams([
      ...teams,
      { name: "", rating: "", order: (maxOrder + 1).toString() },
    ]);
    setTimeout(() => lastRowNameRef.current?.focus(), 0);
  };

  const calculate = (): void => {
    const newScores = new MultiElo(eloConfig).getNewRatings(
      teams.map((team) => Number.parseFloat(team.rating)),
      teams.map((team) => Number.parseInt(team.order, 10))
    );

    setOutputTeams(
      teams.map(
        (team, index): OutputTeam => ({
          name: team.name,
          rating: Number.parseFloat(team.rating),
          newRating: newScores[index],
        })
      )
    );
  };

  useEffectOnce(calculate);

  return (
    <div className="bg-bg min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-semibold mt-20 mb-4">Multi-Elo Demo</h1>
      <p className="mb-8 text-center">
        This website showcases the functionality offered by my{" "}
        <a
          href="https://www.npmjs.com/package/multi-elo"
          className="text-accent"
        >
          multi-elo npm package.
        </a>
      </p>

      <InputTable
        teams={teams}
        setTeams={setTeams}
        lastRowNameRef={lastRowNameRef}
      />
      <ExtendedSettings config={eloConfig} setConfig={setEloConfig} />
      <div className="flex my-6">
        <Button className="mr-8" onClick={addTeam}>
          <AddCircle24Regular className="h-8 w-8" />
          <span className="ml-1 text-xl">Add Team</span>
        </Button>
        <Button primary onClick={calculate}>
          <Calculator24Regular className="h-8 w-8 fill-accent-font" />
          <span className="ml-1 text-xl text-accent-font">Calculate</span>
        </Button>
      </div>
      <OutputTable teams={outputTeams} />
      <div className="w-full h-8"></div>
    </div>
  );
};
